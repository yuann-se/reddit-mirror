import React, { useContext } from 'react';
import { bestPostsContext } from '../context/bestPostsContext';
import { Card } from './Card/Card';
import styles from './cardslist.scss';

export function CardsList() {

  const data = useContext(bestPostsContext);

  const list = data.map((post) => <Card
    key={post.id}
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
