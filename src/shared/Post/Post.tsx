import React, { useContext, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import styles from './post.scss';
import { CSSTransition } from 'react-transition-group';
import { CommentForm } from '../CommentForm';
import { commentContext } from '../context/commentContext';
import { EIcons, Icon } from '../Icon';
import { postsContext } from '../context/postsContext';

interface IPostProps {
  onClose?: () => void;
  isModalOpen?: boolean;
  postID: string
}

const imageReg = /[\/.](gif|jpg|jpeg|tiff|png)$/i;

export function Post(props: IPostProps) {

  const { value, onChange } = useContext(commentContext);
  const [inputValue, setInputValue] = useState(value);

  const data = useContext(postsContext);
  const [postData] = data.filter((item) => item.id === props.postID);
  const chooseSrc = imageReg.test(postData.postUrl)
    ? postData.postUrl
    : postData.previewSrc

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (props.isModalOpen) document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    }
  })

  const handleClick = () => {
    onChange(inputValue);
    props.onClose?.()
  }

  const handleOverlayClick = (e: React.SyntheticEvent) => {
    if (e.target instanceof Node && !modalRef.current?.contains(e.target)) {
      onChange(inputValue);
      props.onClose?.()
    }
  }

  const node = document.getElementById('modal_root');
  if (!node) return null;

  return ReactDOM.createPortal(
    (
      <CSSTransition
        in={props.isModalOpen}
        timeout={200}
        classNames={
          {
            enter: styles['modal-enter'],
            enterActive: styles['modal-enter-active'],
            exit: styles['modal-exit'],
            exitActive: styles['modal-exit-active']
          }
        }
        mountOnEnter
        unmountOnExit
        nodeRef={modalRef}
      >
        <div className={styles.modalWrapper} onClick={handleOverlayClick}>
          <div className={styles.modal} ref={modalRef}>
            <button className={styles.closeBtn} onClick={handleClick}>
              <Icon Name={EIcons.closeModal} width={21} />
            </button>
            <h2>{postData.postTitle}</h2>
            <div className={styles.content}>
              {postData.previewSrc.length > 10 && (
                <img src={chooseSrc} className={styles.preview} alt='Post image'></img>
              )}
            </div>
            <CommentForm value={inputValue} setValue={setInputValue} />
          </div>
        </div>
      </CSSTransition>
    ), node);
}
