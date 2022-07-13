import React, { useContext } from 'react';
import styles from './post.scss';
import { CommentForm } from './CommentForm';
import { EIcons, Icon } from '../Icon';
import { bestPostsContext } from '../context/bestPostsContext';
import { KarmaCounter } from '../CardsList/Card/Controls/KarmaCounter';
import { EColors, Text } from '../Text';
import { MetaData } from '../CardsList/Card/TextContent/MetaData';
import { useCommentsData } from '../../hooks/useCommentsData';
import { CommentsBlock } from './CommentsBlock';
import { Modal } from '../Modal';
import { Stats } from './Stats';

interface IPostProps {
  onClose?: () => void;
  isModalOpen: boolean;
  postID: string;
}

const imageReg = /[\/.](gif|jpg|jpeg|tiff|png)$/i;

export function Post(props: IPostProps) {

  const data = useContext(bestPostsContext);
  const [postData] = data.filter((item) => item.id === props.postID);
  const chooseSrc = imageReg.test(postData.postUrl)
    ? postData.postUrl
    : postData.previewSrc

  const [commentsData] = useCommentsData(postData.subreddit, props.postID);

  const handleClick = () => {
    props.onClose?.()
  }

  return (
    <div className={styles.container}>
      <Modal
        open={props.isModalOpen}
        onClose={() => handleClick()}
        transitionTimeout={200}
        transitionClasses={{
          enter: styles['modal-enter'],
          enterActive: styles['modal-enter-active'],
          exit: styles['modal-exit'],
          exitActive: styles['modal-exit-active']
        }}
      >
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
        <CommentForm />
        <div className={styles.sortComments}>

        </div>
        <CommentsBlock comments={commentsData} depth={undefined} isModalOpen={props.isModalOpen} />
      </Modal>
    </div>
  );
}
