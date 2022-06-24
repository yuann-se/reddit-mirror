import React from 'react';
import { Dropdown } from '../../../Dropdown';
import styles from './menu.css';
import { ItemsList } from './ItemsList';
import { EIcons, Icon } from '../../../Icon';

export function Menu(): JSX.Element {
  const [isOpen, setIsOpen] = React.useState(false);
  const handleClick = () => { setIsOpen(!isOpen) }

  const btnClasses = `${styles.menuBtn} ${isOpen ? styles.menuBtnIsActive : ''}`;

  return (
    <div className={styles.menu}>
      <Dropdown
        button={<button className={btnClasses} onClick={handleClick}>
          <Icon Name={EIcons.menuBtn} width={5} />
        </button>}
      >
        <div className={styles.dropdown}>
          <ItemsList postID='1111' />
          <button className={styles.closeBtn}>
            Закрыть
          </button>
        </div>
      </Dropdown>
    </div>
  );
}
