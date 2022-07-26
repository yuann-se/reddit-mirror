import React from 'react';
import { EIcons, Icon } from '../../Icon';
import { EColors, Text } from '../../Text';
import { generateRandomString } from '../../utils/generateRandomString';
import styles from './stats.scss';
import { StatsDropdown } from './StatsDropdown';

interface IStatsProps {
  commentsNumber: number;
  ratio: number;
}

export function Stats(props: IStatsProps) {

  const btnsList = [
    {
      icon: <Icon Name={EIcons.comments} width={15} />,
      text: <Text size={14} color={EColors.grey99}>Комментарии: {props.commentsNumber}</Text>,
    },
    {
      icon: <Icon Name={EIcons.share} width={12} />,
      text: <Text size={14} color={EColors.grey99}>Поделиться</Text>,
    },
    {
      icon: <Icon Name={EIcons.block} width={14} />,
      text: <Text size={14} color={EColors.grey99}>Скрыть</Text>,
    },
    {
      icon: <Icon Name={EIcons.save} width={14} />,
      text: <Text size={14} color={EColors.grey99}>Сохранить</Text>,
    },
    {
      icon: <Icon Name={EIcons.report} width={16} />,
      text: <Text size={14} color={EColors.grey99}>Пожаловаться</Text>,
    },
  ].map(({ icon, text }) =>
    <li key={generateRandomString()}>
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
      <div className={styles.menu}>
        <StatsDropdown zIndex={1000} />
      </div>
    </div>
  );
}
