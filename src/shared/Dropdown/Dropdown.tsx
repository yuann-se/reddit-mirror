import React, { useEffect } from 'react';
import styles from './dropdown.scss';
import { CSSTransition } from 'react-transition-group';
import ReactDOM from 'react-dom';

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
      setIsDropdownOpen(!isDropdownOpen);
    }
  }

  return (
    <div className={styles.container}>
      <div onClick={handleOpen}>
        {button}
      </div>
      {ReactDOM.createPortal(
        (<CSSTransition
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
        </CSSTransition>), document.getElementById('dropdown_root')!
      )}

    </div>
  );
}
