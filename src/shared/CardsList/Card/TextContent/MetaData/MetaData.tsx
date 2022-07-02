import React from 'react';
import styles from './metadata.scss';

interface IMetaDataProps {
  avatarSrc: string;
  authorUrl: string;
  author: string;
  createdAt: string
}

export function MetaData(props: IMetaDataProps) {

  let date = new Date(Number(props.createdAt) * 1000);
  let createdAt = date.toLocaleDateString();

  return (
    <div className={styles.metaData}>
      <div className={styles.userLink}>
        {props.avatarSrc && (
          <img src={props.avatarSrc}
            alt="avatar" className={styles.avatar} />
        )}
        <a href={props.authorUrl} className={styles.username}>{props.author}</a>
      </div>
      <span className={styles.createdAt}>
        <span className={styles.publishedLabel}>опубликовано </span>
        {createdAt}
      </span>
    </div>
  );
}
