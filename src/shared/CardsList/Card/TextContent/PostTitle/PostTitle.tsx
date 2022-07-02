import React from 'react';
import { Post } from '../../../../Post';
import styles from './posttitle.scss';
import { CSSTransition } from 'react-transition-group';

interface IPostTitleProps {
  postUrl: string;
  postTitle: string
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
      {isModalOpen && (
        <Post onClose={() => setIsModalOpen(false)} isModalOpen={isModalOpen}/>
      )}
      {/* <CSSTransition
        in={isModalOpen}
        timeout={1000}
        classNames='modal'
        mountOnEnter
        unmountOnExit
      >
        <Post onClose={() => setIsModalOpen(false)} />
      </CSSTransition> */}
    </h2>
  );
}
