import React from 'react';
import styles from './dropdown.scss';
import { CSSTransition } from 'react-transition-group';

interface IDropdownProps {
  button: React.ReactNode;
  children: React.ReactNode;
  isOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  transitionClasses?: object;
  transitionTimeout?: number
}

const NOOP = () => { };

export function Dropdown({ button, children, isOpen, onClose = NOOP, onOpen = NOOP, transitionClasses = {}, transitionTimeout = 0 }: IDropdownProps) {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(isOpen);
  React.useEffect(() => setIsDropdownOpen(isOpen), [isOpen]);
  React.useEffect(() => isDropdownOpen ? onOpen : onClose, [isDropdownOpen]);

  const handleOpen = () => {
    if (isOpen === undefined) {
      setIsDropdownOpen(!isDropdownOpen)
    }
  }

  return (
    <div className={styles.container}>
      <div onClick={handleOpen}>
        {button}
      </div>
      <CSSTransition
        in={isDropdownOpen}
        timeout={transitionTimeout}
        classNames={transitionClasses}
        mountOnEnter
        unmountOnExit
      >
        <div className={styles.listContainer}>
          <div className={styles.list} onClick={() => setIsDropdownOpen(false)}>
            {children}
          </div>
        </div>
      </CSSTransition>
    </div>
  );
}
