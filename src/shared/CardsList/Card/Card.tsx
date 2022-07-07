import React from 'react';
import styles from './card.scss';
import { Controls } from './Controls';
import { Menu } from './Menu';
import { Preview } from './Preview';
import { TextContent } from './TextContent';

interface ICardProps {
  id: string;
  author: string;
  authorUrl: string;
  avatarSrc: string;
  createdAt: string;
  postTitle: string;
  postUrl: string
  previewSrc: string;
  upvotes: number;
  comments: number;
}

export function Card(props: ICardProps) {
  return (
    <li
      className={styles.card}
      id={props.id}
    >
      <TextContent
        postID={props.id}
        avatarSrc={props.avatarSrc}
        author={props.author}
        authorUrl={props.authorUrl}
        createdAt={props.createdAt}
        postUrl={props.postUrl}
        postTitle={props.postTitle}
      />
      {props.previewSrc && (
        <Preview src={props.previewSrc} />
      )}
      <Menu postID={props.id} />
      <Controls
        upvotes={props.upvotes}
        comments={props.comments}
      />
    </li>
  );
}
