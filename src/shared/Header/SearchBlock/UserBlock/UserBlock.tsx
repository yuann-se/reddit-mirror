import React from 'react';
import { EIcons, Icon } from '../../../Icon';
import { EColors, Text } from '../../../Text';
import styles from './userblock.scss';

interface IUserBlockProps {
  avatarSrc?: string;
  username?: string;
  loading?: boolean;
}

export function UserBlock({ avatarSrc, username, loading }: IUserBlockProps) {
  return (
    <a
      href={`https://www.reddit.com/api/v1/authorize.compact?client_id=${process.env.CLIENT_ID}&response_type=code&state=random_string&redirect_uri=${process.env.REDIRECT_URI}&duration=permanent&scope=read submit identity`}
      className={styles.userBox}
    >
      <div className={styles.avatarBox}>
        {avatarSrc
          ? <img src={avatarSrc} alt='User avatar' className={styles.avatarImage} />
          : <Icon Name={EIcons.anonAvatar} width={50} />
        }
      </div>

      <div className={styles.username}>
        {loading
          ? <Text size={20} color={EColors.grey99}>Загрузка...</Text>
          : <Text size={20} color={username ? EColors.black : EColors.grey99}>{username || 'Аноним'}</Text>
        }
      </div>
    </a>
  );
}
