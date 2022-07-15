import React from 'react';
import { EIcons, Icon } from '../../Icon';
import { EColors, Text } from '../../Text';
import styles from './stats.scss';

interface IStatsProps {
  commentsNumber: number;
  ratio: number
}

export function Stats(props: IStatsProps) {

  const btnsList = [
    {
      icon: <Icon Name={EIcons.comments} width={15} />,
      text: <Text size={14} color={EColors.grey99}>Комментарии: {props.commentsNumber}</Text>,
      name: 'Комментарии'
    },
    {
      icon: <Icon Name={EIcons.share} width={12} />,
      text: <Text size={14} color={EColors.grey99}>Поделиться</Text>,
      name: 'Поделиться'
    },
    {
      icon: <Icon Name={EIcons.block} width={14} />,
      text: <Text size={14} color={EColors.grey99}>Скрыть</Text>,
      name: 'Скрыть'
    },
    {
      icon: <Icon Name={EIcons.save} width={14} />,
      text: <Text size={14} color={EColors.grey99}>Сохранить</Text>,
      name: 'Сохранить'
    },
    {
      icon: <Icon Name={EIcons.report} width={16} />,
      text: <Text size={14} color={EColors.grey99}>Пожаловаться</Text>,
      name: 'Пожаловаться'
    },
  ].map(({ icon, text, name }) =>
    <li key={name}>
      <button
        className={styles.menuItem}
        onClick={() => { }}
      >{icon}{text}
      </button>
    </li>
  )

  return (
    <div className={styles.container}>
      <ul className={styles.controlsContainer}>
        {btnsList}
      </ul>
      <span className={styles.voted}>
        <Text size={14} color={EColors.grey99}>{props.ratio * 100}% Проголосовали</Text>
      </span>
    </div>
  );
}
