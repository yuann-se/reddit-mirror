import React from 'react';
import { IInitData } from '../../../hooks/useCommentsData';
import { generateRandomString } from '../../utils/generateRandomString';

interface ICommentsBlockProps {
  comments: IInitData[];
}

export function CommentsBlock({ comments }: ICommentsBlockProps) {
  return (
    <div>
      {Array.isArray(comments) && comments.length > 0
        ? comments.map((item) => {
          return (
            <div className="" key={generateRandomString()}>

              <p>{item.data.body}</p>
              {item.data.replies && (
                <CommentsBlock comments={item.data.replies.data.children} />
              )}
            </div>)
        })
        : <div></div>}
    </div>
  );
}
