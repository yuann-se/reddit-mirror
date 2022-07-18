import React from 'react';
import { EIcons, Icon } from '../../../../Icon';
import styles from './metadata.scss';

interface IMetaDataProps {
  avatarSrc: string;
  authorUrl: string;
  author: string;
  createdAt: string
}

const timeSince = (date: string) => {
  const now = new Date();
  const nowSeconds = now.getTime();
  const dateSec = Number(date) * 1000;
  const seconds = Math.floor((nowSeconds - dateSec) / 1000);

  let interval = Math.floor(seconds / 86400);
  if (interval >= 1 && interval <= 6) {
    if (interval.toString().endsWith('1'))
      return `${interval} день назад`;
    if (['2', '3', '4'].some(char => interval.toString().endsWith(char)))
      return `${interval} дня назад`
  } else if (interval > 6) {
    let created = new Date(dateSec);
    return created.toLocaleDateString();
  }

  interval = Math.floor(seconds / 3600);
  if (interval >= 1) {
    if (interval.toString().endsWith('1') && !interval.toString().endsWith('11'))
      return `${Math.floor(interval)} час назад`;
    if (['2', '3', '4'].some(char => interval.toString().endsWith(char))
      && !['12', '13', '14'].some(char => interval.toString().endsWith(char)))
      return `${Math.floor(interval)} часа назад`;
    return `${Math.floor(interval)} часов назад`
  }

  interval = Math.floor(seconds / 60);
  if (interval >= 1) {
    if (interval.toString().endsWith('1') && !interval.toString().endsWith('11')) return `${Math.floor(interval)} минуту назад`;
    if (interval.toString().endsWith('2' || '3' || '4')) return `${Math.floor(interval)} минуты назад`;
    return `${Math.floor(interval)} минут назад`
  } else if (interval < 1) return 'менее минуты назад';
}

export function MetaData(props: IMetaDataProps) {

  return (
    <div className={styles.metaData}>
      <div className={styles.userLink}>
        {props.avatarSrc
          ? <img src={props.avatarSrc}
            alt="avatar" className={styles.avatar} />
          : <span className={styles.avatar}><Icon Name={EIcons.anonAvatar} width={20} /></span>
        }
        <a href={props.authorUrl} className={styles.username}>{props.author}</a>
      </div>
      <span className={styles.createdAt}>
        <span className={styles.publishedLabel}>опубликовано </span>
        {timeSince(props.createdAt)}
      </span>
    </div>
  );
}
