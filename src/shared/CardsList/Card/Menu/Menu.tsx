import React, { useRef, useState } from 'react';
import { Dropdown } from '../../../Dropdown';
import styles from './menu.scss';
import { ItemsList } from './ItemsList';
import { EIcons, Icon } from '../../../Icon';
import classNames from 'classnames';

interface IMenuProps {
  postID?: string;
  zIndex?: number;
}

export function Menu({ postID, zIndex }: IMenuProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownWidth, setDropdownWidth] = useState(typeof window !== "undefined" ? window.innerWidth > 320 ? 157 : 145 : 145);
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
        onClose={() => setIsOpen(false)}
        isOpen={isOpen}
        button={<button
          className={btnClasses}
          onClick={handleClick}
          ref={btnRef}
        >
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
        zIndex={zIndex}
      >
        <div
          className={styles.dropdown}
          style={btnRef.current ?
            {
              left: btnCoord().right - dropdownWidth,
              top: btnCoord().bottom + window.scrollY + 10
            } : {}}
        >
          <ItemsList postID={postID} />
          <button className={styles.closeBtn} onClick={handleClick}>
            Закрыть
          </button>
        </div>
      </Dropdown>
    </div>
  );
}
