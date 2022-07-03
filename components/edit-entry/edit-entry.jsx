/* eslint-disable max-statements */
import { useState } from 'react';
import ButtonLoader from '../button-loader/button-loader';
import styles from './edit-entry.module.scss';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { Footnote } from '../plugins/footnoot';
import EntryContent from '../entry-content/entry-content';
import { useRouter } from 'next/router';
import {
  getDefaultTitle,
  getDefaultContent,
  getDefaultImage,
  createNewEntry,
  editEntry,
  isValidEntry,
  changeImage,
  MESSAGES,
  getDefaultStatistics,
  getDefaultRanks,
} from '../../services/entry/edit';
import EditStatistics from './edit-statistics/edit-statistics';
import EditRanks from './edit-ranks/edit-ranks';

MdEditor.use(Footnote);

export default function EditEntry({ isNew, entry, onSave }) {
  const router = useRouter();

  const [title, setTitle] = useState(getDefaultTitle(isNew, entry));
  const [content, setContent] = useState(getDefaultContent(isNew, entry));
  const [image, setImage] = useState(getDefaultImage(isNew, entry));
  const [imagePath, setImagePath] = useState(getDefaultImage(isNew, entry));
  const [statistics, setStatistics] = useState(
    getDefaultStatistics(isNew, entry)
  );
  const [ranks, setRanks] = useState(getDefaultRanks(isNew, entry));
  const [isRequestInProgress, setIsRequestInProgress] = useState(false);

  const save = async () => {
    try {
      if (!isValidEntry(title, content, image)) {
        onSave(MESSAGES.validation);
      } else if (isNew) {
        setIsRequestInProgress(true);
        await createNewEntry(title, content, image);
        onSave(MESSAGES.success);
        setContent('');
        setImage('');
        setImagePath('');
        setTitle('');
      } else {
        setIsRequestInProgress(true);
        await editEntry(
          entry,
          title,
          content,
          image,
          imagePath,
          statistics,
          ranks
        );
        onSave(MESSAGES.success);
        router.push(`/entry?id=${entry.id}`);
      }
    } catch (error) {
      console.log(error);
      if (error.response?.data?.message === 'Entry already exists')
        onSave(MESSAGES.existValue);
      else onSave(MESSAGES.failed);
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
              onChange={(event) =>
                changeImage(event.target.files[0], setImage, setImagePath)
              }
            />
          </label>
          <EditStatistics
            entryStatistics={statistics}
            changeStatistics={setStatistics}
          />
          <EditRanks entryRanks={ranks} changeRanks={setRanks} />
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
