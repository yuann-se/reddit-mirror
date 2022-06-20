import React from 'react';
import { CommentsIcon } from '../../../../icons/CommentsIcon';
import styles from './commentsbtn.css';

export function CommentsBtn() {
  return (
    <button className={styles.commentsBtn}>
      <CommentsIcon />
      <span className={styles.commentsNumber}>12</span>
    </button>
  );
}
