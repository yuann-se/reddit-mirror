import React from 'react';
import styles from './preview.scss';

interface IPreviewProps {
  src: string
}

export function Preview({ src }: IPreviewProps) {
  return (
    <div className={styles.preview}>
      <img src={src}
        alt="preview" className={styles.previewImg} />
    </div>
  );
}
