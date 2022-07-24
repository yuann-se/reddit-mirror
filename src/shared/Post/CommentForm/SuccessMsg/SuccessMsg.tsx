import React, { useRef } from 'react';
import { createPortal } from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import { EColors, Text } from '../../../Text';
import styles from './successmsg.scss';


const transitionClasses = {
  enter: styles['modal-enter'],
  enterActive: styles['modal-enter-active'],
  exit: styles['modal-exit'],
  exitActive: styles['modal-exit-active']
}

interface ISuccessMsgProps {
  open: boolean;
  onClose: () => void;
}

export function SuccessMsg({ open, onClose }: ISuccessMsgProps) {

  const modalRef = useRef<HTMLDivElement>(null);

  const node = document.getElementById('modal_root');
  if (!node) return null;

  const handleOverlayClick = (e: React.SyntheticEvent) => {
    if (e.target instanceof Node && !modalRef.current?.contains(e.target)) {
      e.stopPropagation();
      onClose();
    }
  }

  const handleClick = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    onClose();
  }

  return createPortal((
    <CSSTransition
      in={open}
      timeout={200}
      classNames={transitionClasses}
      mountOnEnter
      unmountOnExit
      nodeRef={modalRef}
    >
      <div className={styles.modalWrapper} onClick={handleOverlayClick}>
        <div className={styles.modal} ref={modalRef}>
          <img src="https://sun9-76.userapi.com/impf/rAvFsnKrnrRlVYFZ2tEfr-TsEGDNi_qmcUjJvA/Y-5H7GY-ngA.jpg?size=127x213&quality=95&sign=54dddd48135cece1432987b2e7d7bb3d&type=album"
            alt="Комментарий опубликован" />
          <Text As='p' size={28} color={EColors.orange}>Комментарий опубликован &#129321;</Text>
          <button className={styles.closeBtn} onClick={handleClick}>
            <Text As='span' size={20} color={EColors.white}>Ура!</Text>
          </button>
        </div>
      </div>
    </CSSTransition>
  ), node);
}
