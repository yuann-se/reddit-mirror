import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { postsContext } from '../context/postsContext';
import { tokenContext } from '../context/tokenContext';
import { generateRandomString } from '../utils/generateRandomString';
import { Card } from './Card/Card';
import styles from './cardslist.scss';

const postPreviewDefault = 'https://oksimetr.ru/wp-content/uploads/a/f/5/af5c6b86f119f4d8905d178695017163.jpeg';

export function CardsList() {

  const data = useContext(postsContext);
  useEffect(() => {
    if (data.length > 0) {
      axios.get(
        `https://api.reddit.com/r/${data[3].subreddit}/comments/${data[3].id}`,
      )
        .then((res) => {
          console.log(res.data)
        })
    }

    }, [])

  const list = data.map((post) => <Card
    key={generateRandomString()}
    id={post.id}
    author={post.author}
    authorUrl={post.authorUrl}
    avatarSrc={post.avatarSrc}
    createdAt={post.createdAt}
    postTitle={post.postTitle}
    postUrl={post.postUrl}
    previewSrc={post.previewSrc.length > 10 ? post.previewSrc : postPreviewDefault}
    upvotes={post.upvotes}
    comments={post.comments}
  />)

  return (
    <ul className={styles.cardsList}>
      {list}
    </ul>
  );
}
