import React from 'react';
import { MetaData } from './MetaData';
import { PostTitle } from './PostTitle';
import styles from './textcontent.scss';

interface ITextContentProps {
  avatarSrc: string;
  authorUrl: string;
  author: string;
  createdAt: string;

  postUrl: string;
  postTitle: string
}

export function TextContent(props: ITextContentProps) {
  return (
    <div className={styles.textContent}>
      <MetaData
        avatarSrc={props.avatarSrc}
        author={props.author}
        authorUrl={props.authorUrl}
        createdAt={props.createdAt}
      />
      <PostTitle
        postUrl={props.postUrl}
        postTitle={props.postTitle}
      />
    </div>
  );
}
