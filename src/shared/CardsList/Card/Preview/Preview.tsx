import classNames from 'classnames';
import React from 'react';
import styles from './preview.scss';

const postPreviewDefault = 'https://www.nicepng.com/png/full/0-7817_reddit-logo-reddit-png.png';

interface IPreviewProps {
  src: string
}

export function Preview({ src }: IPreviewProps) {

  const imgSrc = src.length > 10 ? src : postPreviewDefault;

  const imgClasses = classNames(
    styles['previewImg'],
    { [styles['defaultPreviewImg']]: imgSrc === postPreviewDefault }
  )

  return (
    <div className={styles.preview}>
      <img src={imgSrc} alt="preview" className={imgClasses} />
    </div>
  );
}
