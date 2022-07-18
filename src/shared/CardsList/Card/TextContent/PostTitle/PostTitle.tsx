import React from 'react';
import { Modal } from '../../../../Modal';
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
    setIsModalOpen(true);
    e.preventDefault();
  }

  return (
    <h2 className={styles.title}>
      <a href={props.postUrl} className={styles.postLink} onClick={handleClick}>
        {props.postTitle}
      </a>
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        transitionTimeout={200}
        transitionClasses={{
          enter: styles['modal-enter'],
          enterActive: styles['modal-enter-active'],
          exit: styles['modal-exit'],
          exitActive: styles['modal-exit-active']
        }}
      >
        <Post
          onClose={() => setIsModalOpen(false)}
          isModalOpen={isModalOpen}
          postID={props.postID} />
      </Modal>
    </h2>
  );
}
