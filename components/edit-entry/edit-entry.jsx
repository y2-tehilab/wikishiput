/* eslint-disable max-statements */
import { useState } from 'react';
import {
  createEntry,
  createSection,
  updateEntry,
} from '../../services/api/entries';
import { uploadFile, deleteFile } from '../../services/api/files';
import ButtonLoader from '../button-loader/button-loader';
import styles from './edit-entry.module.scss';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { Footnote } from '../plugins/footnoot';
import EntryContent from '../entry-content/entry-content';
import { useRouter } from 'next/router';

MdEditor.use(Footnote);

export default function EditEntry({ isNew, entry, onSave }) {
  const router = useRouter();

  const [title, setTitle] = useState(entry?.headline || '');
  const [content, setContent] = useState(
    entry?.entrySections?.[0]?.content || ''
  );
  const [image, setImage] = useState(
    (entry?.entryFiles?.[0]?.imageUri &&
      `http://${entry.entryFiles[0].imageUri}`) ||
      ''
  );
  const [imagePath, setImagePath] = useState(
    (entry?.entryFiles?.[0]?.imageUri &&
      `http://${entry.entryFiles[0].imageUri}`) ||
      ''
  );
  const [isRequestInProgress, setIsRequestInProgress] = useState(false);

  const messages = {
    success: 'נשמר בהצלחה',
    failed: 'שגיאה בעת שמירת נתונים',
    validation: 'הכנס את כל הנתונים',
    existValue: 'הערך כבר קיים במערכת',
  };

  const changeImage = (newImage) => {
    if (newImage) {
      setImage(newImage);
      const reader = new FileReader();
      reader.onload = (event) => setImagePath(event.target.result);
      reader.readAsDataURL(newImage);
    }
  };

  const save = async () => {
    try {
      if (!title || !content || !image) {
        onSave(messages.validation);
      } else if (isNew) {
        setIsRequestInProgress(true);
        const file = await uploadFile(image);
        const section = await createSection(title);
        await createEntry({
          headline: title,
          entrySections: [{ content, section }],
          entryFiles: [{ fileId: file.id }],
        });
        onSave(messages.success);
        setContent('');
        setImage('');
        setImagePath('');
        setTitle('');
      } else {
        setIsRequestInProgress(true);

        let file;
        if (!imagePath.includes(entry.entryFiles?.[0]?.imageUri)) {
          await deleteFile(entry.entryFiles?.[0]?.fileId);
          file = await uploadFile(image);
        }
        await updateEntry({
          id: entry.id,
          headline: title,
          entrySections: [{ content, section: entry.entrySections[0].section }],
          entryFiles: file?.id ? [{ fileId: file.id }] : entry.entryFiles,
        });

        onSave(messages.success);
        router.push(`/entry?id=${entry.id}`);
      }
    } catch (error) {
      console.log(error);
      if (error.response?.data?.message === 'Entry already exists')
        onSave(messages.existValue);
      else onSave(messages.failed);
    } finally {
      setIsRequestInProgress(false);
    }
  };

  return (
    <div className={styles.editEntry}>
      <input
        type="text"
        className={`${styles.title} input`}
        placeholder="הכנס שם ערך"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <div className={styles.description}>
        <MdEditor
          className={`${styles.content} input`}
          placeholder="הכנס תוכן"
          value={content}
          view={{ menu: true, md: true, html: false }}
          renderHTML={(text) => <EntryContent content={text} />}
          onChange={({ text }) => setContent(text)}
        />

        <div className={styles.imageBox}>
          <label className={styles.fileSelect}>
            {imagePath ? (
              <img src={imagePath} alt="entry image" />
            ) : (
              <span className={styles.uploadText}>העלה תמונה</span>
            )}
            <input
              type="file"
              className={`${styles.fileUploadInput} input`}
              accept="image/*"
              multiple={false}
              onChange={(event) => changeImage(event.target.files[0])}
            />
          </label>
          <ButtonLoader
            text="שמירה"
            onClick={save}
            isLoading={isRequestInProgress}
          />
        </div>
      </div>
    </div>
  );
}
