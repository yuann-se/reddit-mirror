import React, { useContext } from 'react';
import { postsContext } from '../context/postsContext';
import { generateRandomString } from '../utils/generateRandomString';
import { Card } from './Card/Card';
import styles from './cardslist.scss';

export function CardsList() {

  const data = useContext(postsContext);

  const list = data.map((post) => <Card
    key={generateRandomString()}
    author={post.author}
    authorUrl={post.authorUrl}
    avatarSrc={post.avatarSrc}
    createdAt={post.createdAt}
    postTitle={post.postTitle}
    postUrl={post.postUrl}
    previewSrc={post.previewSrc}
    upvotes={post.upvotes}
    comments={post.comments}
  />)

  return (
    <ul className={styles.cardsList}>
      {list}
    </ul>
  );
}
