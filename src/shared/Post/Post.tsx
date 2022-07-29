import React, { Fragment, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { useHistory, useParams } from 'react-router-dom';
import { useBestPostsData } from '../../hooks/useBestPostsData';
import { useCommentsData } from '../../hooks/useCommentsData';
import { KarmaCounter } from '../CardsList/Card/Controls/KarmaCounter';
import { MetaData } from '../CardsList/Card/TextContent/MetaData';
import { EIcons, Icon } from '../Icon';
import { EColors, Text } from '../Text';
import { CommentForm } from './CommentForm';
import { CommentsBlock } from './CommentsBlock';
import styles from './post.scss';
import { Stats } from './Stats';

const imageReg = /[\/.](gif|jpg|jpeg|tiff|png)$/i;

export function Post() {

  const [isImgLoaded, setIsImgLoaded] = useState<boolean>(false);

  const history = useHistory();

  const { postID } = useParams<{ postID: string }>();

  const modalRef = useRef<HTMLDivElement>(null);

  const { data } = useBestPostsData('');
  const [postData] = data.filter((item) => item.id === postID);
  const chooseSrc = imageReg.test(postData.postUrl)
    ? postData.postUrl
    : postData.previewSrc


  const { commentsData, fetchError, loading } = useCommentsData(postID);
  const commentsList = commentsData[postID];

  const handleOverlayClick = (e: React.SyntheticEvent) => {
    if (e.target instanceof Node && !modalRef.current?.contains(e.target)) {
      e.stopPropagation();
      history.push('/best/');
    }
  }

  const handleClick = () => {
    history.push('/best/');
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    }
  })

  return ReactDOM.createPortal(
    (
      <div className={styles.modalWrapper} id='postModalWrapper' onClick={handleOverlayClick}>
        <div className={styles.modal} ref={modalRef}>
          <button className={styles.closeBtn} onClick={handleClick}>
            <Icon Name={EIcons.closeModal} width={21} />
          </button>
          <div className={styles.header}>
            <div className={styles.karmaCounter}>
              <KarmaCounter upvotes={postData.upvotes} />
            </div>
            <div className={styles.textcontent}>
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
              <Fragment>
                <img
                  src={postData.lqPreviewSrc}
                  className={styles.previewLoader}
                  alt={postData.postTitle}
                  style={{ visibility: isImgLoaded ? "hidden" : "visible" }}
                />
                <img
                  onLoad={() => setIsImgLoaded(true)}
                  src={chooseSrc}
                  className={styles.preview}
                  alt={postData.postTitle}
                  style={{ filter: isImgLoaded ? "none" : "blur(20px)", transition: "filter .2s ease-out" }}
                />
              </Fragment>
            )}
          </div>
          <Stats commentsNumber={postData.comments} ratio={postData.upvoteRatio} />
          <CommentForm postID={postID} />
          <CommentsBlock
            comments={commentsList}
            depth={undefined}
            loading={loading}
            fetchError={fetchError}
          />
        </div>
      </div>
    ), document.getElementById('modal_root')!);
}
