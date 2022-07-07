import React, { useContext, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import styles from './post.scss';
import { CSSTransition } from 'react-transition-group';
import { CommentForm } from './CommentForm';
import { commentContext } from '../context/commentContext';
import { EIcons, Icon } from '../Icon';
import { bestPostsContext } from '../context/bestPostsContext';
import { KarmaCounter } from '../CardsList/Card/Controls/KarmaCounter';
import { EColors, Text } from '../Text';
import { MetaData } from '../CardsList/Card/TextContent/MetaData';
import { useCommentsData } from '../../hooks/useCommentsData';
import { CommentsBlock } from './CommentsBlock';

interface IPostProps {
  onClose?: () => void;
  isModalOpen?: boolean;
  postID: string;
}

const imageReg = /[\/.](gif|jpg|jpeg|tiff|png)$/i;

export function Post(props: IPostProps) {

  const { value, onChange } = useContext(commentContext);
  const [inputValue, setInputValue] = useState(value);

  const data = useContext(bestPostsContext);
  const [postData] = data.filter((item) => item.id === props.postID);
  const chooseSrc = imageReg.test(postData.postUrl)
    ? postData.postUrl
    : postData.previewSrc

  const modalRef = useRef<HTMLDivElement>(null);

  const [commentsData] = useCommentsData(postData.subreddit, props.postID);

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
            <div className={styles.header}>
              <div className={styles.karmaCounter}>
                <KarmaCounter upvotes={postData.upvotes} />
              </div>
              <div>
                <div className={styles.title}>
                  <Text As={'h2'} size={20} color={EColors.black}>{postData.postTitle}</Text>
                </div>
                <MetaData
                  avatarSrc={postData.avatarSrc}
                  authorUrl={postData.authorUrl}
                  author={postData.author}
                  createdAt={postData.createdAt}
                />
              </div>
            </div>
            <div className={styles.content}>
              {postData.previewSrc.length > 10 && (
                <img src={chooseSrc} className={styles.preview} alt='Post image'></img>
              )}
            </div>
            <CommentForm value={inputValue} setValue={setInputValue} />
            <CommentsBlock comments={commentsData} />
          </div>
        </div>
      </CSSTransition>
    ), node);
}
