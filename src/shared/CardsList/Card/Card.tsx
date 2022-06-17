import React from 'react';
import styles from './card.css';
import { Controls } from './Controls';
import { MenuBtn } from './MenuBtn';
import { Preview } from './Preview';
import { TextContent } from './TextContent';

export function Card() {
  return (
    <li className={styles.card}>
      <TextContent />
      <Preview />
      <MenuBtn />
      <Controls />
    </li>
  );
}
