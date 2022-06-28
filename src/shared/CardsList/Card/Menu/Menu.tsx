import React from 'react';
import { Dropdown } from '../../../Dropdown';
import styles from './menu.scss';
import { ItemsList } from './ItemsList';
import { EIcons, Icon } from '../../../Icon';
import classNames from 'classnames';

export function Menu(): JSX.Element {
  const [isOpen, setIsOpen] = React.useState(false);
  const handleClick = () => { setIsOpen(!isOpen) }

  const btnClasses = classNames(
    styles['menuBtn'],
    { [styles['menuBtnIsActive']]: isOpen }
  )

  return (
    <div className={styles.menu}>
      <Dropdown
        button={<button className={btnClasses} onClick={handleClick}>
          <Icon Name={EIcons.menuBtn} width={5} />
        </button>}
        transitionClasses={{
          enter: styles['open-enter'],
          enterActive: styles['open-enter-active'],
          exit: styles['open-exit'],
          exitActive: styles['open-exit-active']
        }}
        transitionTimeout={200}
      >
        <div className={styles.dropdown} onClick={handleClick}>
          <ItemsList postID='1111' />
          <button className={styles.closeBtn}>
            Закрыть
          </button>
        </div>
      </Dropdown>
    </div>
  );
}
