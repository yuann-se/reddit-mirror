import React from 'react';
import { EIcons, Icon } from '../../../../../Icon';
import styles from './sharebtn.css';

export function ShareBtn() {
  return (
    <button className={styles.shareBtn}>
      <Icon Name={EIcons.shareRnd} width={20}/>
    </button>
  );
}
