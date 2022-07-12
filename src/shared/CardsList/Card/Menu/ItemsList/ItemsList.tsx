import React from 'react';
import { EIcons, Icon } from '../../../../Icon';
import { EColors, Text } from '../../../../Text';
import { generateRandomString } from '../../../../utils/generateRandomString';
import styles from './itemslist.scss';

interface IItemList {
  postID: string
}

export function ItemsList({ postID }: IItemList) {

  const btnsList = [
    {
      icon: <Icon Name={EIcons.comments} width={15} />,
      text: <Text size={14} mobileSize={12} color={EColors.grey99}>Комментарии</Text>,
      classes: `${styles.smHidden}`
    },
    {
      icon: <Icon Name={EIcons.share} width={12} />,
      text: <Text size={14} mobileSize={12} color={EColors.grey99}>Поделиться</Text>,
      classes: `${styles.smHidden}`
    },
    {
      icon: <Icon Name={EIcons.block} width={14} />,
      text: <Text size={14} mobileSize={12} color={EColors.grey99}>Скрыть</Text>,
      classes: ``
    },
    {
      icon: <Icon Name={EIcons.save} width={14} />,
      text: <Text size={14} mobileSize={12} color={EColors.grey99}>Сохранить</Text>,
      classes: `${styles.smHidden}`
    },
    {
      icon: <Icon Name={EIcons.report} width={16} />,
      text: <Text size={14} mobileSize={12} color={EColors.grey99}>Пожаловаться</Text>,
      classes: ``
    },
  ].map(({ icon, text, classes }) =>
    <li key={generateRandomString()}>
      <button
        className={`${classes} ${styles.menuItem}`}
        onClick={() => console.log(postID)}
      >{icon}{text}</button></li>
  )

  return (
    <ul className={styles.menuItemsList}>
      {btnsList}
    </ul>
  );
}
