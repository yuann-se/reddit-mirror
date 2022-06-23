import React from 'react';
import { EIcons, Icon } from '../../../../Icon';
import styles from './commentsbtn.css';

export function CommentsBtn() {
  return (
    <button className={styles.commentsBtn}>
      <Icon Name={EIcons.comments} width={15}/>
      <span className={styles.commentsNumber}>12</span>
    </button>
  );
}
