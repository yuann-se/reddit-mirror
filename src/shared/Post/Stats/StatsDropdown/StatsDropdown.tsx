import React, { useEffect, useRef, useState } from 'react';
import { Dropdown } from '../../../Dropdown';
import styles from './statsdropdown.scss';
import { EIcons, Icon } from '../../../Icon';
import classNames from 'classnames';
import { EColors, Text } from '../../../Text';
import { generateRandomString } from '../../../utils/generateRandomString';

interface IMenuProps {
  postID?: string;
  zIndex?: number;
}

const btnsList = [
  {
    icon: <Icon Name={EIcons.share} width={12} />,
    text: <Text size={14} mobileSize={12} color={EColors.grey99}>Поделиться</Text>,
  },
  {
    icon: <Icon Name={EIcons.block} width={14} />,
    text: <Text size={14} mobileSize={12} color={EColors.grey99}>Скрыть</Text>,
  },
  {
    icon: <Icon Name={EIcons.save} width={14} />,
    text: <Text size={14} mobileSize={12} color={EColors.grey99}>Сохранить</Text>,
  },
  {
    icon: <Icon Name={EIcons.report} width={16} />,
    text: <Text size={14} mobileSize={12} color={EColors.grey99}>Пожаловаться</Text>,
  },
].map(({ icon, text }) =>
  <li key={generateRandomString()}>
    <button className={styles.menuItem}>{icon}{text}</button></li>
)

export function StatsDropdown({ postID, zIndex }: IMenuProps): JSX.Element {

  const [isOpen, setIsOpen] = useState(false);
  const [menuPosition, changeMenuPosition] = useState<number>(0);

  const handleClick = (e: React.SyntheticEvent) => {
    e.stopPropagation()
    setIsOpen(!isOpen)
  }

  const handleContainerClick = (e: React.SyntheticEvent) => {
    e.stopPropagation();
  }

  const btnClasses = classNames(
    styles['menuBtn'],
    { [styles['menuBtnIsActive']]: isOpen }
  );

  const postModalWrapper = document.getElementById('postModalWrapper');

  function handleScroll() {
    changeMenuPosition(postModalWrapper!.scrollTop)
  }

  useEffect(() => {
    if (postModalWrapper) {
      postModalWrapper!.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (postModalWrapper)
        postModalWrapper!.removeEventListener('scroll', handleScroll);
    }
  })

  const btnRef = useRef<HTMLButtonElement>(null);
  const btnCoord = () => {
    return btnRef.current!.getBoundingClientRect()
  }

  return (
    <div className={styles.menu} onClick={handleContainerClick}>
      <Dropdown
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
              left: btnCoord().right - 150,
              top: btnCoord().bottom + window.scrollY + 10
            } : {}}
        >
          <ul className={styles.menuItemsList}>
            {btnsList}
          </ul>
          <button className={styles.closeBtn} onClick={handleClick}>
            Закрыть
          </button>
        </div>
      </Dropdown>
    </div>
  );
}
