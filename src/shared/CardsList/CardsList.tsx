import React, { useContext, useEffect } from 'react';
import { bestPostsContext } from '../context/bestPostsContext';
import { generateRandomString } from '../utils/generateRandomString';
import { Card } from './Card/Card';
import styles from './cardslist.scss';

export function CardsList() {

  const data = useContext(bestPostsContext);

  const list = data.map((post) => <Card
    key={generateRandomString()}
    id={post.id}
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
