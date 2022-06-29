import React, { useContext } from 'react';
import { postsData } from '../context/postsContext';
import { generateRandomString } from '../utils/generateRandomString';
import { Card } from './Card/Card';
import styles from './cardslist.scss';

export function CardsList() {

  const data = useContext(postsData);

  const list = data.map(({data}) => <Card
  key={generateRandomString()}
  author={data['author']}
  authorUrl='#user-url'
  avatarSrc='https://upload.wikimedia.org/wikipedia/commons/8/8f/Mhohl-potrait-web.jpg'
  createdAt={data['created']}
  postTitle={data['title']}
  postUrl={data['url']}
  previewSrc= 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Tehran_Stock_Exchange_3513528.jpg'
  upvotes={data['ups']}
  comments={data['num_comments']}
  />)

  return (
    <ul className={styles.cardsList}>
      <Card />
    </ul>
  );
}
