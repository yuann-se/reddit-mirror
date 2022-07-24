import React from 'react';
import { EColors, Text } from '../../Text';
import styles from './errorscreen.scss';

interface IErrorScreenProps {
  message: string;
}

export function ErrorScreen({ message }: IErrorScreenProps) {
  return (
    <div className={styles.container}>
      <img
        className={styles.img}
        src="https://sun9-34.userapi.com/impf/UbXdj63f0W9eVCwaPQAwOj0MRp6QdnF-0zsshQ/GjsMJfq1h-g.jpg?size=148x245&quality=96&sign=f8a5cff96f9f14096720c31a6985a928&type=album"
        alt="Ошибка загрузки" />
      <Text As='p' size={28} color={EColors.grey66}>{message}</Text>
    </div>
  );
}
