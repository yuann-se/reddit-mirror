import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import styles from './post.scss';
import { PostContent } from './PostContent';

interface IPostProps {
  open: boolean;
  onClose: () => void;
  postID: string;
}

const transitionClasses = {
  enter: styles['modal-enter'],
  enterActive: styles['modal-enter-active'],
  exit: styles['modal-exit'],
  exitActive: styles['modal-exit-active']
}

export function Post({ open, onClose, postID }: IPostProps) {

  const modalRef = useRef<HTMLDivElement>(null);

  const handleOverlayClick = (e: React.SyntheticEvent) => {
    if (e.target instanceof Node && !modalRef.current?.contains(e.target)) {
      e.stopPropagation();
      onClose();
    }
  }

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    }
  })

  return ReactDOM.createPortal(
    (
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
            <PostContent postID={postID} isOpen={open} onClose={() => onClose()} />
          </div>
        </div>
      </CSSTransition>
    ), document.getElementById('modal_root')!);
}
