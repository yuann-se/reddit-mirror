import React from 'react';
import { MetaData } from './MetaData';
import { PostTitle } from './PostTitle';
import styles from './textcontent.css';

export function TextContent() {
  return (
    <div className={styles.textContent}>
      <MetaData />
      <PostTitle />
    </div>
  );
}
