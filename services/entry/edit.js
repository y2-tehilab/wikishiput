import { createEntry, createSection, updateEntry } from '../api';
import { deleteFile, uploadFile } from '../api/files';

export const MESSAGES = {
  success: 'נשמר בהצלחה',
  failed: 'שגיאה בעת שמירת נתונים',
  validation: 'הכנס את כל הנתונים',
  existValue: 'הערך כבר קיים במערכת',
};

const DEFAULT_VALUE = '';

export const getDefaultTitle = (isNew, entry) =>
  (!isNew && entry?.headline) || DEFAULT_VALUE;

export const getDefaultContent = (isNew, entry) =>
  (!isNew && entry?.entrySections?.[0]?.content) || DEFAULT_VALUE;

export const getDefaultImage = (isNew, entry) =>
  (!isNew &&
    entry?.entryFiles?.[0]?.imageUri &&
    `http://${entry.entryFiles[0].imageUri}`) ||
  DEFAULT_VALUE;

export const changeImage = (newImage, setImage, setImagePath) => {
  if (newImage) {
    setImage(newImage);
    const reader = new FileReader();
    reader.onload = (event) => setImagePath(event.target.result);
    reader.readAsDataURL(newImage);
  }
};

export const isValidEntry = (title, content, image) =>
  title && content && image;

export const createNewEntry = async (title, content, image) => {
  const file = await uploadFile(image);
  const section = await createSection(title);
  await createEntry({
    headline: title,
    entrySections: [{ content, section }],
    entryFiles: [{ fileId: file.id }],
  });
};

export const editEntry = async (oldEntry, title, content, image, imagePath) => {
  let file;
  if (!imagePath.includes(oldEntry.entryFiles?.[0]?.imageUri)) {
    await deleteFile(oldEntry.entryFiles?.[0]?.fileId);
    file = await uploadFile(image);
  }
  await updateEntry({
    id: oldEntry.id,
    headline: title,
    entrySections: [{ content, section: oldEntry.entrySections[0].section }],
    entryFiles: file?.id ? [{ fileId: file.id }] : oldEntry.entryFiles,
  });
};
