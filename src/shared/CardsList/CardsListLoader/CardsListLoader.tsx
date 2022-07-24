import React, { Fragment } from 'react';
import { EIcons, Icon } from '../../Icon';
import styles from './cardslistloader.scss';

const card = <div className={styles.cardContainer}>
  <div className={styles.preview}></div>
  <div className={styles.textContent}>
    <h2></h2>
    <p></p>
    <span></span>
  </div>
  <div className={styles.karmaCounter}>
    <Icon Name={EIcons.arrowUp} width={30} />
    <div></div>
    <Icon Name={EIcons.arrowUp} width={30} />
  </div>
</div>

const cardsAmount = typeof window !== 'undefined'
  ? window.innerWidth >= 1240
    ? Math.floor((window.innerHeight - 220) / 150)
    : window.innerWidth >= 768
      ? Math.floor((window.innerHeight - 170) / 150)
      : 2
  : 5

export function CardsListLoader() {

  const cards = [];
  for (let i = 1; i <= cardsAmount; i++) {
    cards.push(<Fragment key={i}>{card}</Fragment>);
  }

  return (
    <div className={styles.mainWrapper}>
      {cards}
    </div>
  );
}
