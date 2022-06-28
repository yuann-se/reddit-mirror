import React, { useEffect, useState } from 'react';
import styles from './searchblock.scss';
import { UserBlock } from './UserBlock';
import axios from 'axios';

interface ISearchBlockProps {
  token: string
}

interface IUserData {
  name?: string;
  iconImg?: string;
}

export function SearchBlock({ token }: ISearchBlockProps) {

  const [data, setData] = useState<IUserData>({})

  useEffect(() => {
    console.log(token)
    if (token && token.length > 0) {
      axios.get(
        'https://oauth.reddit.com/api/v1/me',
        { headers: { Authorization: `bearer ${token}` } }
      )
        .then((res) => {
          const userData = res.data;
          setData({ name: userData.name, iconImg: userData.icon_img.substring(0, userData.icon_img.indexOf('?')) })
        })
        .catch(console.log)
    }
  }, [token])


  return (
    <div className={styles.searchBlock}>
      <UserBlock avatarSrc={data.iconImg} username={data.name} />
    </div>
  );
}
