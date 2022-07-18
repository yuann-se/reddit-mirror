import React from 'react';
import styles from './searchblock.scss';
import { UserBlock } from './UserBlock';
import { useUserData } from '../../../hooks/useUserData';

export function SearchBlock() {

  const {data, loading} = useUserData();
  const iconImg = data.iconImg;
  const username = data.username

  return (
    <div className={styles.searchBlock}>
      <UserBlock avatarSrc={iconImg} username={username} loading={loading}/>
    </div>
  );
}
