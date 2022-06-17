import React from 'react';
import styles from './actionbtns.css';

interface IActionBtnsProps {
  children?: React.ReactNode;
}

export function ActionBtns({ children }: IActionBtnsProps) {
  return (
    <div className={styles.actions}>
      {children}
    </div>
  );
}
