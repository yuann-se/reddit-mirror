import React, { ReactNode, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import styles from './modal.scss';

interface IModalProps {
  children: ReactNode;
  open: boolean;
  onClose: () => void;
  transitionClasses?: object;
  transitionTimeout?: number;
}

export function Modal({ children, open, onClose, transitionTimeout = 0, transitionClasses = {} }: IModalProps) {

  const modalRef = useRef<HTMLDivElement>(null);

  const handleOverlayClick = (e: React.SyntheticEvent) => {
    if (e.target instanceof Node && !modalRef.current?.contains(e.target)) {
      onClose();
    }
  }

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    }
  })

  const node = document.getElementById('modal_root');
  if (!node) return null;

  return ReactDOM.createPortal(
    (
      <CSSTransition
        in={open}
        timeout={transitionTimeout}
        classNames={transitionClasses}
        mountOnEnter
        unmountOnExit
        nodeRef={modalRef}
      >
    <div className={styles.modalWrapper} onClick={handleOverlayClick}>
      <div className={styles.modal} ref={modalRef}>
        {children}
      </div>
    </div>
    </CSSTransition>
    ), node);
}
