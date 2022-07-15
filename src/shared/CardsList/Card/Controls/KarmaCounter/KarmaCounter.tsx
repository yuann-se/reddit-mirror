import React from 'react';
import { EIcons, Icon } from '../../../../Icon';
import styles from './karmacounter.scss';

interface IKarmaCounterProps {
  upvotes: number;
}

export function KarmaCounter({ upvotes }: IKarmaCounterProps) {
  return (
    <div className={styles.karmaCounter}>
      <button className={styles.up}>
        <Icon Name={EIcons.arrowUp} width={19} />
      </button>
      <span className={styles.karmaValue}>{upvotes}</span>
      <button className={styles.down}>
        <Icon Name={EIcons.arrowUp} width={19} />
      </button>
    </div>
  );
}
