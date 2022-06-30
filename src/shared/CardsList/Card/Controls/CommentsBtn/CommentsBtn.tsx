import React from 'react';
import { EIcons, Icon } from '../../../../Icon';
import styles from './commentsbtn.scss';

interface ICommentsBtnProps {
  comments: number
}

export function CommentsBtn({ comments }: ICommentsBtnProps) {
  return (
    <button className={styles.commentsBtn}>
      <Icon Name={EIcons.comments} width={15} />
      <span className={styles.commentsNumber}>{comments}</span>
    </button>
  );
}
