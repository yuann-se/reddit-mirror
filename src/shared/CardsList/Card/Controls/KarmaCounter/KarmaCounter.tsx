import React from 'react';
import { KarmaArrowUpIcon } from '../../../../icons';
import styles from './karmacounter.css';

export function KarmaCounter() {
  return (
    <div className={styles.karmaCounter}>
      <button className={styles.up}>
        <KarmaArrowUpIcon />
      </button>
      <span className={styles.karmaValue}>236</span>
      <button className={styles.down}>
        <KarmaArrowUpIcon />
      </button>
    </div>
  );
}
