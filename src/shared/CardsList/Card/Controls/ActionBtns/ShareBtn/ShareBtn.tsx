import React from 'react';
import { RoundShareIcon } from '../../../../../icons/RoundShareIcon';
import styles from './sharebtn.css';

export function ShareBtn() {
  return (
    <button className={styles.shareBtn}>
      <RoundShareIcon />
    </button>
  );
}
