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
  transitionTimeout?: number;
  zIndex?: number;
}

const NOOP = () => { };

export function Dropdown({ button, children, isOpen, onClose = NOOP, onOpen = NOOP, transitionClasses = {}, transitionTimeout = 0, zIndex = 100 }: IDropdownProps) {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(isOpen);
  React.useEffect(() => setIsDropdownOpen(isOpen), [isOpen]);
  // React.useEffect(() => isDropdownOpen ? onOpen : onClose, [isDropdownOpen]);

  const handleOpen = () => {
    if (isOpen === undefined) {
      setIsDropdownOpen(!isDropdownOpen);
    }
  }

  return (
    <div className={styles.container}>
      <div>
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
          <div className={styles.listContainer} style={{ zIndex: zIndex }}>
            <div className={styles.list}>
              {children}
            </div>
          </div>
        </CSSTransition>), document.getElementById('dropdown_root')!
      )}

    </div>
  );
}
