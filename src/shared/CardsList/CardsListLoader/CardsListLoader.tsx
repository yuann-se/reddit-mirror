import React from 'react';
import { EIcons, Icon } from '../../Icon';
import styles from './cardslistloader.scss';

function Card() {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.preview}></div>
      <div className={styles.textContent}>
        <h2></h2>
        <p></p>
      </div>
      <div className={styles.controls}>
        <div className={styles.karmaCounter}>
          <Icon Name={EIcons.arrowUp} width={30} />
          <div></div>
          <Icon Name={EIcons.arrowUp} width={30} />
        </div>
        <span />
        <div>
          <span />
          <span />
        </div>
      </div>

    </div>
  )
}

const cardsAmount = typeof window !== 'undefined'
  ? window.innerWidth >= 768 ? 5 : 2
  : 5

const cards = () => {
  let cardslist = [];
  for (let i = 1; i <= cardsAmount; i++) {
    cardslist.push(<Card />);
  }
  return cardslist
}

export function CardsListLoader() {

  return (
    <div className={styles.mainWrapper}>
      {cards()}
    </div>
  );
}
