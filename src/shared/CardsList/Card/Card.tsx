import React from 'react';
import styles from './card.css';

export function Card() {
  return (
    <li className={styles.card}>
      <div className={styles.textContent}>
        <div className={styles.metaData}>
          <div className={styles.userLink}>
            <img src=''
              alt="avatar" className={styles.avatar} />
            <a href="#user-url" className={styles.username}>Станислав Грачёв</a>
          </div>
          <span className={styles.createdAt}>5 часов назад</span>
        </div>
        <h2 className={styles.title}>
          <a href="#post-url" className={styles.postLink}>
            Но представители современных социальных течений
          </a>
        </h2>
      </div>
      <div className={styles.preview}></div>
      <div className={styles.menu}></div>
      <div className={styles.control}></div>
    </li>
  );
}
