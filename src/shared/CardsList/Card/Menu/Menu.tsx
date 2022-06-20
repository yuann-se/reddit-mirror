import React from 'react';
import { Dropdown } from '../../../Dropdown';
import { BlockIcon } from '../../../icons/BlockIcon';
import { CommentsIcon } from '../../../icons/CommentsIcon';
import { ComplaintIcon } from '../../../icons/ComplaintIcon';
import { DropdownMenuBtn } from '../../../icons/DropdownMenuBtn';
import { generateRandomString } from '../../../utils/generateRandomString';
import styles from './menu.css';
import { ShareIcon } from '../../../icons/ShareIcon';
import { SaveIcon } from '../../../icons/SaveIcon';

const list = [
  { icon: <CommentsIcon />, text: 'Комментарии', classes: `${styles.smHidden}` },
  { icon: <ShareIcon />, text: 'Поделиться', classes: `${styles.smHidden}` },
  { icon: <BlockIcon />, text: 'Скрыть', classes: '' },
  { icon: <SaveIcon />, text: 'Сохранить', classes: `${styles.smHidden}` },
  { icon: <ComplaintIcon />, text: 'Пожаловаться', classes: ''}
]
.map((item) => <li key={generateRandomString()} className={`${styles.menuItem} ${item.classes}`}>{item.icon}<span>{item.text}</span></li>)

export function Menu(): JSX.Element {
  const [isOpen, setIsOpen] = React.useState(false);
  const handleClick = () => { setIsOpen(!isOpen) }

  const classes = `${styles.menuBtn} ${isOpen ? styles.menuBtnIsActive : ''}`

  return (
    <div className={styles.menu}>
      <Dropdown
        button={<button className={classes} onClick={handleClick}>
          <DropdownMenuBtn />
        </button>}
      >
        <div className={styles.dropdown} onClick={() => setIsOpen(false)}>
          <ul className={styles.menuItemsList}>
            {list}
          </ul>
          <button className={styles.closeBtn}>
            Закрыть
          </button>
        </div>
      </Dropdown>
    </div>
  );
}
