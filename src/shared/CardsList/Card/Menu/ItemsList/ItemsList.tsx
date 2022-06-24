import React from 'react';
import { EIcons, Icon } from '../../../../Icon';
import { EColors, Text } from '../../../../Text';
import styles from './itemslist.css';

interface IItemList {
  postID: string
}

export function ItemsList({ postID }: IItemList) {
  return (
    <ul className={styles.menuItemsList}>
      <li>
        <button className={`${styles.menuItem} ${styles.smHidden}`} onClick={() => console.log(postID)}>
          <Icon Name={EIcons.comments} width={15} />
          <Text size={14} mobileSize={12} color={EColors.grey99}>Комментарии</Text>
        </button>
      </li>

      <li>
        <button className={`${styles.menuItem} ${styles.smHidden}`} onClick={() => console.log(postID)}>
          <Icon Name={EIcons.share} width={12} />
          <Text size={14} mobileSize={12} color={EColors.grey99}>Поделиться</Text>
        </button>
      </li>

      <li>
        <button className={`${styles.menuItem}`} onClick={() => console.log(postID)}>
          <Icon Name={EIcons.block} width={14} />
          <Text size={14} mobileSize={12} color={EColors.grey99}>Скрыть</Text>
        </button>
      </li>

      <li>
        <button className={`${styles.menuItem} ${styles.smHidden}`} onClick={() => console.log(postID)}>
          <Icon Name={EIcons.save} width={14} />
          <Text size={14} mobileSize={12} color={EColors.grey99}>Сохранить</Text>
        </button>
      </li>

      <li>
        <button className={`${styles.menuItem}`} onClick={() => console.log(postID)}>
          <Icon Name={EIcons.report} width={16} />
          <Text size={14} mobileSize={12} color={EColors.grey99}>Пожаловаться</Text>
        </button>
      </li>
    </ul>
  );
}
