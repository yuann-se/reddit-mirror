import React from 'react';
import { EIcons, Icon } from '../../../../../Icon';
import styles from './savebtn.css';

export function SaveBtn() {
  return (
    <button className={styles.saveBtn}>
      <Icon Name={EIcons.saveRnd} width={20}/>
    </button>
  );
}
