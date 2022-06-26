import React from 'react';
import styles from './posttitle.scss';

export function PostTitle() {
  return (
    <h2 className={styles.title}>
      <a href="#post-url" className={styles.postLink}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem ex modi placeat facilis!
      </a>
    </h2>
  );
}
