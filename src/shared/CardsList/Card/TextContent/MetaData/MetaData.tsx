import React from 'react';
import styles from './metadata.scss';

export function MetaData() {
  return (
    <div className={styles.metaData}>
      <div className={styles.userLink}>
        <img src='https://upload.wikimedia.org/wikipedia/commons/8/8f/Mhohl-potrait-web.jpg'
          alt="avatar" className={styles.avatar} />
        <a href="#user-url" className={styles.username}>Станислав Грачёв</a>
      </div>
      <span className={styles.createdAt}>
        <span className={styles.publishedLabel}>опубликовано </span>
        5 часов назад
      </span>
    </div>
  );
}
