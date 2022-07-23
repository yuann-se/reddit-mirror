import React from 'react';
import { Post } from '../../../../Post';
import styles from './posttitle.scss';

interface IPostTitleProps {
  postID: string;
  postUrl: string;
  postTitle: string;
}

export function PostTitle(props: IPostTitleProps) {

  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleClick = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setIsModalOpen(true);
  }

  return (
    <h2 className={styles.title}>
      <a href={props.postUrl} className={styles.postLink} onClick={handleClick}>
        {props.postTitle}
      </a>
      <Post
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        postID={props.postID}
      />
    </h2>
  );
}
