import { useState } from 'react';
import { createEntry } from '../../services/api/entries';
import { uploadFile } from '../../services/api/files';
import ButtonLoader from '../button-loader/button-loader';
import styles from './edit-entry.module.scss';

export default function EditEntry({ isNew, entry, onSave }) {
  const [title, setTitle] = useState(entry?.headline || '');
  const [content, setContent] = useState(entry?.content || '');
  const [image, setImage] = useState('');
  const [imagePath, setImagePath] = useState(entry?.image || '');
  const [isRequestInProgress, setIsRequestInProgress] = useState(false);

  const messages = {
    success: 'נשמר בהצלחה',
    failed: 'שגיאה בעת שמירת נתונים',
    validation: 'הכנס את כל הנתונים',
    existValue: 'הערך כבר קיים במערכת',
  }

  const changeImage = (newImage) => {
    if (newImage) {
      setImage(newImage);
      const reader = new FileReader();
      reader.onload = (e) => setImagePath(e.target.result);
      reader.readAsDataURL(newImage);
    }
  };

  const save = async () => {
    try {
      if (!title || !content || !image) {
        onSave(messages.validation)
      } else {
        if (isNew) {
          setIsRequestInProgress(true);
          const file = await uploadFile(image);
          await createEntry({
            headline: title,
            content,
            entryFiles: [{ fileId: file.id }],
          });
          onSave(messages.success);
          setContent('');
          setImage('');
          setImagePath('');
          setTitle('');
        }        
      }

    } catch (e) {
      if(e.response?.data?.message === 'Entry already exists')
        onSave(messages.existValue);
      else onSave(messages.failed);
    }
    finally {
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
        <textarea
          className={`${styles.content} input`}
          placeholder="הכנס תוכן"
          value={content}
          onChange={(event) => setContent(event.target.value)}
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
              onChange={(e) => changeImage(e.target.files[0])}
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
