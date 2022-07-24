import React from 'react';
import { useBestPostsData } from '../../hooks/useBestPostsData';
import { Card } from './Card/Card';
import styles from './cardslist.scss';
import { CardsListLoader } from './CardsListLoader';
import { ErrorScreen } from './ErrorScreen';

export function CardsList() {

  const { data, loading, fetchError } = useBestPostsData();

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
    lqPreviewSrc={post.lqPreviewSrc}
    upvotes={post.upvotes}
    comments={post.comments}
  />)

  return (
    <ul className={styles.cardsList}>
      {loading && <CardsListLoader />}
      {fetchError && <ErrorScreen message={`${fetchError} :(`} />}
      {data.length > 1 && list}
      {/* <CardsListLoader /> */}
    </ul>
  );
}
