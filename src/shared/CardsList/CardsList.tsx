import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app';
import { saveBestPosts } from '../../store/bestPosts';
import { EColors, Text } from '../Text';
import { Card } from './Card/Card';
import styles from './cardslist.scss';
import { CardsListLoader } from './CardsListLoader';
import { ErrorScreen } from './ErrorScreen';

export function CardsList() {

  const dispatch = useDispatch<any>();
  const { data, loading, fetchError, after } = useSelector((state: RootState) => state.bestPosts);
  const [count, setCount] = useState<number>(0);

  const bottomOfList = useRef<HTMLLIElement>(null);

  const handleClick = () => {
    dispatch(saveBestPosts(after));
    setCount(1);
  }

  useEffect(() => {
    if (data.length === 0) dispatch(saveBestPosts(''));
    setCount(1);
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && count < 2 && after) {
        dispatch(saveBestPosts(after));
        setCount(count + 1);
      }
    }, { rootMargin: '300px' });

    if (bottomOfList.current) observer.observe(bottomOfList.current);

    return () => {
      if (bottomOfList.current) observer.unobserve(bottomOfList.current);
    }

  }, [after, bottomOfList.current])

  const list = data.map((post) => <Card
    key={post.id}
    id={post.id}
    author={post.author}
    authorUrl={post.authorUrl}
    avatarSrc={post.avatarSrc}
    createdAt={post.createdAt}
    permalink={post.permalink}
    postTitle={post.postTitle}
    postUrl={post.postUrl}
    previewSrc={post.previewSrc}
    lqPreviewSrc={post.lqPreviewSrc}
    upvotes={post.upvotes}
    comments={post.comments}
  />)

  return (
    <>
      <ul className={styles.cardsList}>
        {fetchError && <ErrorScreen message={`${fetchError} :(`} />}
        {data.length > 1 && list}
        <li className={styles.bottomOfList} ref={bottomOfList}></li>
        {loading && <CardsListLoader />}
        {/* <CardsListLoader /> */}
      </ul>
      {count === 2 && !loading && (
        <button className={styles.loadMoreBtn} onClick={handleClick}>
          <Text size={24} color={EColors.white}>Загрузить еще</Text>
        </button>
      )}
    </>
  );
}
