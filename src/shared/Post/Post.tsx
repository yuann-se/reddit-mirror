import React, { useContext, useEffect } from 'react';
import styles from './post.scss';
import { CommentForm } from './CommentForm';
import { EIcons, Icon } from '../Icon';
import { bestPostsContext } from '../context/bestPostsContext';
import { KarmaCounter } from '../CardsList/Card/Controls/KarmaCounter';
import { EColors, Text } from '../Text';
import { MetaData } from '../CardsList/Card/TextContent/MetaData';
import { useCommentsData } from '../../hooks/useCommentsData';
import { CommentsBlock } from './CommentsBlock';
import { Stats } from './Stats';
import { useDispatch, useSelector } from 'react-redux';
import { setCommentsData, IMainState } from '../../store/store';
import { RootState } from '../../app';

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

  const savedComments = useSelector((state: RootState) => state.main.commentsData[`${props.postID}`]);
  const dispatch = useDispatch();

  const commentsData = savedComments && savedComments.length > 0 ? savedComments : useCommentsData(postData.subreddit, props.postID);

  useEffect(() => {
    return () => {
      if (!savedComments && commentsData.length > 0) {
        dispatch(setCommentsData(props.postID, commentsData));
      }
    }
  }, [props.isModalOpen])

  const handleClick = () => {
    props.onClose?.()
  }

  return (
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
      <CommentForm postID={props.postID} isOpen={props.isModalOpen} />
      <CommentsBlock comments={commentsData} depth={undefined} isModalOpen={props.isModalOpen} />
    </div>
  );
}
