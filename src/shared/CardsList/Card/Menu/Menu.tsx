import React, { useEffect, useRef } from 'react';
import { Dropdown } from '../../../Dropdown';
import styles from './menu.scss';
import { ItemsList } from './ItemsList';
import { EIcons, Icon } from '../../../Icon';
import classNames from 'classnames';

interface IMenuProps {
  postID: string
}

export function Menu({ postID }: IMenuProps): JSX.Element {
  const [isOpen, setIsOpen] = React.useState(false);
  const [dropdownWidth, setDropdownWidth] = React.useState(window.innerWidth > 320 ? 157 : 145);
  const handleClick = () => { setIsOpen(!isOpen) }

  const btnClasses = classNames(
    styles['menuBtn'],
    { [styles['menuBtnIsActive']]: isOpen }
  );

  const btnRef = useRef<HTMLButtonElement>(null);
  const btnCoord = () => {
    return btnRef.current!.getBoundingClientRect()
  }

  return (
    <div className={styles.menu}>
      <Dropdown
        button={<button
          className={btnClasses}
          onClick={handleClick}
          ref={btnRef}>
          <Icon
            Name={EIcons.menuBtn}
            width={5} />
        </button>}
        transitionClasses={{
          enter: styles['open-enter'],
          enterActive: styles['open-enter-active'],
          exit: styles['open-exit'],
          exitActive: styles['open-exit-active']
        }}
        transitionTimeout={200}
      >
        <div
          className={styles.dropdown}
          style={btnRef.current ?
            {
              left: btnCoord().left - dropdownWidth,
              top: btnCoord().bottom + window.scrollY + 10
            } : {}}
          onClick={handleClick}>
          <ItemsList postID={postID} />
          <button className={styles.closeBtn}>
            Закрыть
          </button>
        </div>
      </Dropdown>
    </div>
  );
}
