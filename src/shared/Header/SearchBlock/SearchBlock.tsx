import React from 'react';
import styles from './searchblock.scss';
import { UserBlock } from './UserBlock';
import { useSelector } from 'react-redux';
import { TInitialState } from '../../../store';

export function SearchBlock() {

  const { username, iconImg} = useSelector((state: TInitialState) => state.userData);

  return (
    <div className={styles.searchBlock}>
      <UserBlock avatarSrc={iconImg} username={username} />
    </div>
  );
}
