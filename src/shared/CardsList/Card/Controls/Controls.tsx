import React from 'react';
import { ActionBtns } from './ActionBtns';
import { SaveBtn } from './ActionBtns/SaveBtn';
import { ShareBtn } from './ActionBtns/ShareBtn';
import { CommentsBtn } from './CommentsBtn';
import styles from './controls.css';
import { KarmaCounter } from './KarmaCounter';

export function Controls() {
  return (
    <div className={styles.controls}>
      <KarmaCounter />
      <CommentsBtn />
      <ActionBtns>
        <ShareBtn />
        <SaveBtn />
      </ActionBtns>
    </div>
  );
}
