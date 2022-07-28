import classNames from 'classnames';
import React, { useState } from 'react';
import styles from './preview.scss';

const postPreviewDefault = 'https://www.nicepng.com/png/full/0-7817_reddit-logo-reddit-png.png';

interface IPreviewProps {
  src: string
  lqSrc: string;
}

export function Preview({ src, lqSrc }: IPreviewProps) {

  const [isImgLoaded, setIsImgLoaded] = useState<boolean>(false);

  const imgSrc = src.length > 10 ? src : postPreviewDefault;

  const imgClasses = classNames(
    styles['previewImg'],
    { [styles['defaultPreviewImg']]: imgSrc === postPreviewDefault }
  )

  return (
    <div className={styles.preview}>
      {/* <img src={imgSrc} alt="preview" className={imgClasses} /> */}
      <img
        src={lqSrc.length > 10 ? lqSrc : imgSrc}
        className={imgClasses}
        alt="preview"
        style={{ visibility: isImgLoaded ? "hidden" : "visible" }}
      />
      <img
        onLoad={() => setIsImgLoaded(true)}
        src={imgSrc}
        className={imgClasses}
        alt="preview"
        style={{ filter: isImgLoaded ? "none" : "blur(20px)", transition: "filter .2s ease-out" }}
      />
    </div>
  );
}
