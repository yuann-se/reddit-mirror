import React from 'react';
import { BlockIcon } from '../../../../icons';
import { CommentsIcon } from '../../../../icons';
import { ReportIcon } from '../../../../icons';
import { SaveIcon } from '../../../../icons';
import { ShareIcon } from '../../../../icons';
import { EColors, Text } from '../../../../Text';
import styles from './itemslist.css';

interface IItemList {
  postID: string
}

export function ItemsList({ postID }: IItemList) {
  return (
    <ul className={styles.menuItemsList}>
      <li className={`${styles.menuItem} ${styles.smHidden}`} onClick={() => console.log(postID)}>
        <CommentsIcon />
        <Text size={14} mobileSize={12} color={EColors.grey99}>Комментарии</Text>
      </li>

      <li className={`${styles.menuItem} ${styles.smHidden}`} onClick={() => console.log(postID)}>
        <ShareIcon />
        <Text size={14} mobileSize={12} color={EColors.grey99}>Поделиться</Text>
      </li>

      <li className={`${styles.menuItem}`} onClick={() => console.log(postID)}>
        <BlockIcon />
        <Text size={14} mobileSize={12} color={EColors.grey99}>Скрыть</Text>
      </li>

      <li className={`${styles.menuItem} ${styles.smHidden}`} onClick={() => console.log(postID)}>
        <SaveIcon />
        <Text size={14} mobileSize={12} color={EColors.grey99}>Сохранить</Text>
      </li>

      <li className={`${styles.menuItem}`} onClick={() => console.log(postID)}>
        <ReportIcon />
        <Text size={14} mobileSize={12} color={EColors.grey99}>Пожаловаться</Text>
      </li>
    </ul>
  );
}
