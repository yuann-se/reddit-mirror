import React from 'react';
import { Dropdown } from '../../../Dropdown';
import { BlockIcon } from '../../../icons/BlockIcon';
import { CommentsIcon } from '../../../icons/CommentsIcon';
import { ReportIcon } from '../../../icons/ReportIcon';
import { DropdownMenuBtn } from '../../../icons/DropdownMenuBtn';
import { generateRandomString } from '../../../utils/generateRandomString';
import styles from './menu.css';
import { ShareIcon } from '../../../icons/ShareIcon';
import { SaveIcon } from '../../../icons/SaveIcon';
import { GenericList } from '../../../GenericList';

const LIST = [
  { icon: <CommentsIcon />, text: 'Комментарии', className: `${styles.smHidden} ` },
  { icon: <ShareIcon />, text: 'Поделиться', className: `${styles.smHidden} ` },
  { icon: <BlockIcon />, text: 'Скрыть', className: `` },
  { icon: <SaveIcon />, text: 'Сохранить', className: `${styles.smHidden} ` },
  { icon: <ReportIcon />, text: 'Пожаловаться', className: `` }
]
  .map((item) => ({
    ...item, id: generateRandomString(),
    className: item.className + `${styles.menuItem}`
  }))

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
            <GenericList list={LIST} />
          </ul>
          <button className={styles.closeBtn}>
            Закрыть
          </button>
        </div>
      </Dropdown>
    </div>
  );
}
