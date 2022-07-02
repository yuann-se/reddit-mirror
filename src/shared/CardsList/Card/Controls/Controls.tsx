import React from 'react';
import { Icon, EIcons } from '../../../Icon';
import { ActionBtns } from './ActionBtns';
import { CommentsBtn } from './CommentsBtn';
import styles from './controls.scss';
import { KarmaCounter } from './KarmaCounter';

interface IControlsProps {
  upvotes: number;
  comments: number
}

export function Controls({ upvotes, comments }: IControlsProps) {
  return (
    <div className={styles.controls}>
      <KarmaCounter upvotes={upvotes} />
      <CommentsBtn comments={comments} />
      <ActionBtns>
        <Icon Name={EIcons.shareRnd} width={20} />
        <Icon Name={EIcons.saveRnd} width={20} />
      </ActionBtns>
    </div>
  );
}
