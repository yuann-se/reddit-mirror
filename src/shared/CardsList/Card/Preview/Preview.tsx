import React from 'react';
import styles from './preview.css';

export function Preview() {
  return (
    <div className={styles.preview}>
      <img src="https://upload.wikimedia.org/wikipedia/commons/7/7e/Tehran_Stock_Exchange_3513528.jpg"
        alt="preview" className={styles.previewImg} />
    </div>
  );
}
