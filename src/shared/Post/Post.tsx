import React, { useContext, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import { useCommentsData } from '../../hooks/useCommentsData';
import { KarmaCounter } from '../CardsList/Card/Controls/KarmaCounter';
import { MetaData } from '../CardsList/Card/TextContent/MetaData';
import { bestPostsContext } from '../context/bestPostsContext';
import { EIcons, Icon } from '../Icon';
import { CommentForm } from './CommentForm';
import { CommentsBlock } from './CommentsBlock';
import { Stats } from './Stats';
import { EColors, Text } from '../Text';
import styles from './post.scss';

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

const imageReg = /[\/.](gif|jpg|jpeg|tiff|png)$/i;

export function Post({ open, onClose, postID }: IPostProps) {

  const modalRef = useRef<HTMLDivElement>(null);
  const data = useContext(bestPostsContext);
  const [postData] = data.filter((item) => item.id === postID);
  const chooseSrc = imageReg.test(postData.postUrl)
    ? postData.postUrl
    : postData.previewSrc

  const commentsData = useCommentsData(postData.subreddit, postID);

  const handleOverlayClick = (e: React.SyntheticEvent) => {
    if (e.target instanceof Node && !modalRef.current?.contains(e.target)) {
      e.stopPropagation();
      onClose();
    }
  }

  const handleClick = () => {
    onClose?.()
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
        timeout={200}
        classNames={transitionClasses}
        mountOnEnter
        unmountOnExit
        nodeRef={modalRef}
      >
        <div className={styles.modalWrapper} onClick={handleOverlayClick}>
          <div className={styles.modal} ref={modalRef}>
            <div>
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
              <Stats commentsNumber={postData.comments} ratio={postData.upvoteRatio} />
              <CommentForm postID={postID} isOpen={open} />
              <CommentsBlock comments={commentsData} depth={undefined} isModalOpen={open} />
            </div>
          </div>
        </div>
      </CSSTransition>
    ), node);
}
