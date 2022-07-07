import React, { ReactNode } from 'react';
import { useCommentsData } from '../../../hooks/useCommentsData';
import styles from './postcomments.scss';

interface ICommentsBlockProps {
  postID: string;
  subreddit: string;
}

export function CommentsBlock(props: ICommentsBlockProps) {
  const commentsData = useCommentsData(props.subreddit, props.postID);
    console.log(commentsData);

    function deepMap(data:object[]): ReactNode {
      data.map((item) => {
        <div>
        {item.data.body}
        {item.data.replies && (
          deepMap(item.data.replies)
        )}
      </div>
    })
  }

    const list = commentsData.deepMap((comment) => {

    })
  return (
    <div className=""></div>
  );
}
