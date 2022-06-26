import React from 'react';
import { Icon, EIcons } from '../../../Icon';
import { ActionBtns } from './ActionBtns';
import { CommentsBtn } from './CommentsBtn';
import styles from './controls.scss';
import { KarmaCounter } from './KarmaCounter';

export function Controls() {
  return (
    <div className={styles.controls}>
      <KarmaCounter />
      <CommentsBtn />
      <ActionBtns>
        <Icon Name={EIcons.shareRnd} width={20} />
        <Icon Name={EIcons.saveRnd} width={20} />
      </ActionBtns>
    </div>
  );
}
