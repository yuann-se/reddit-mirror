import React from 'react';
import { RoundSaveIcon } from '../../../../../icons/RoundSaveIcon';
import styles from './savebtn.css';

export function SaveBtn() {
  return (
    <button className={styles.saveBtn}>
      <RoundSaveIcon />
    </button>
  );
}
