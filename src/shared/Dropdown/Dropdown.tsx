import React from 'react';
import styles from './dropdown.css';
import { CSSTransition } from 'react-transition-group';

interface IDropdownProps {
  button: React.ReactNode;
  children: React.ReactNode;
  isOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  transitionClasses?: object
}

const NOOP = () => { };

export function Dropdown({ button, children, isOpen, onClose = NOOP, onOpen = NOOP, transitionClasses }: IDropdownProps) {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(isOpen);
  React.useEffect(() => setIsDropdownOpen(isOpen), [isOpen]);
  React.useEffect(() => isDropdownOpen ? onOpen : onClose, [isDropdownOpen]);

  const handleOpen = () => {
    if (isOpen === undefined) {
      setIsDropdownOpen(!isDropdownOpen)
    }
  }

  const listClasses = `${styles.listContainer}`

  return (
    <div className={styles.container}>
      <div onClick={handleOpen}>
        {button}
      </div>
      {/* <CSSTransition
        in={isDropdownOpen}
        timeout={1000}
        classNames={styles.display}
        unmountOnExit
      >
        <div className={listClasses}>
        <div className={styles.list} onClick={() => setIsDropdownOpen(false)}>
          {children}
        </div>
      </div>
      </CSSTransition> */}
      {isDropdownOpen && (
      <div className={styles.listContainer}>
        <div className={styles.list} onClick={() => setIsDropdownOpen(false)}>
          {children}
        </div>
      </div>
       )}
    </div>
  );
}
