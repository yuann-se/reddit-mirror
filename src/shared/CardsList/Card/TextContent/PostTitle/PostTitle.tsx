import React from 'react';
import styles from './posttitle.scss';

interface IPostTitleProps {
  postUrl: string;
  postTitle: string
}

export function PostTitle(props: IPostTitleProps) {
  return (
    <h2 className={styles.title}>
      <a href={props.postUrl} className={styles.postLink}>
        {props.postTitle}
      </a>
    </h2>
  );
}
