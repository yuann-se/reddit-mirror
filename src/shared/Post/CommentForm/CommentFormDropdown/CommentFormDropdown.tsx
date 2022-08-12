import React, { useEffect, useRef, useState } from 'react';
import { Dropdown } from '../../../Dropdown';
import styles from './commentformdropdown.scss';
import { EIcons, Icon } from '../../../Icon';
import classNames from 'classnames';
import { generateRandomString } from '../../../utils/generateRandomString';

const btnsList = [
  <Icon Name={EIcons.attachPhoto} width={18} />,
  <Icon Name={EIcons.reverse} width={22} />,
  <Icon Name={EIcons.attachLink} width={20} />,
  <Icon Name={EIcons.attachAudio} width={20} />,
  <Icon Name={EIcons.speechBubble} width={20} />,
  <Icon Name={EIcons.edit} width={18} />,
  <Icon Name={EIcons.changeText} width={16} />,
  <Icon Name={EIcons.attachPdf} width={20} />
].map((icon) =>
  <li key={generateRandomString()} className={styles.menuItem}>
    <button type='button' onClick={() => { }}>{icon}</button>
  </li>
)

interface IMenuProps {
  postID?: string;
  zIndex?: number;
}

export function CommentFormDropdown({ postID, zIndex }: IMenuProps): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [menuPosition, changeMenuPosition] = useState<number>(0);

  const handleClick = () => {
    setIsOpen(!isOpen)
  }

  const handleContainerClick = (e: React.SyntheticEvent) => {
    e.stopPropagation();
  }

  const btnClasses = classNames(
    styles['menuBtn'],
    { [styles['menuBtnIsActive']]: isOpen }
  );

  const btnRef = useRef<HTMLButtonElement>(null);
  const btnCoord = () => {
    return btnRef.current!.getBoundingClientRect()
  }

  const dropdownStyle = btnRef.current
    ? {
      left: window.innerWidth >= 768 ? btnCoord().right - 315 : btnCoord().right - 155,
      top: btnCoord().bottom + window.scrollY + 10
    } : {}

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

  return (
    <div className={styles.menu} onClick={handleContainerClick}>
      <Dropdown
        isOpen={isOpen}
        button={<button
          className={btnClasses}
          onClick={handleClick}
          type='button'
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
          style={dropdownStyle}
        >
          <ul className={styles.menuItemsList}>{btnsList}</ul>
        </div>
      </Dropdown>
    </div>
  );
}

