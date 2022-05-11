import { useState } from 'react';
import { createEntry } from '../../services/api/entries';
import { uploadFile } from '../../services/api/files';
import styles from './edit-entry.module.scss';

export default function EditEntry({ isNew, entry, onSuccessSave }) {
  const [title, setTitle] = useState(entry?.headline || 'headline');
  const [content, setContent] = useState(entry?.content || 'content');
  const [image, setImage] = useState('');
  const [imagePath, setImagePath] = useState(entry?.image || '');

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
      if(isNew) {
        const file = await uploadFile(image)
        await createEntry({
          headline: title,
          content,
          entryFiles: [{fileId: file.id}],
        });    
        onSuccessSave();  
        setContent('');  
        setImage('');  
        setImagePath('');  
        setTitle('');  
      }
    } catch (e) {}
  };

  return (
    <div className={styles.editEntry}>
      <input
        type="text"
        className={`${styles.title} input`}
        placeholder="הכנס כותרת"
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
          <button className={styles.saveButton} onClick={save}>
            שמירה
          </button>
        </div>
      </div>
    </div>
  );
}
