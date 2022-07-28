import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { RootState } from '../../../app';
import { IResponse } from '../../../store/comments';
import { updateReply } from '../../../store/store';
import { MetaData } from '../../CardsList/Card/TextContent/MetaData';
import { ErrorScreen } from '../../CardsList/ErrorScreen';
import { EIcons, Icon } from '../../Icon';
import { EColors, Text } from '../../Text';
import styles from './commentsblock.scss';
import { CommentsBlockLoader } from './CommentsBlockLoader';
import { ReplyForm } from './ReplyForm';

interface ICommentsBlockProps {
  comments: IResponse[];
  loading?: boolean;
  fetchError?: string;
  depth: number | undefined;
  isModalOpen: boolean;
}

const replyFormTransitionClasses = {
  enter: styles['reply-enter'],
  enterActive: styles['reply-enter-active'],
  exit: styles['reply-exit'],
  exitActive: styles['reply-exit-active']
}

export function CommentsBlock({ comments, depth, isModalOpen, loading, fetchError }: ICommentsBlockProps) {

  const dispatch = useDispatch();
  typeof depth == 'number' ? depth++ : depth = 0;

  return (
    <div className={styles.componentContainer}>
      {loading && <CommentsBlockLoader />}
      {fetchError && <ErrorScreen message={`${fetchError} :(`} />}
      {Array.isArray(comments) && comments.length > 0
        ? comments.map((item) => {

          const storeData = useSelector((state: RootState) => state.main.commentsReplies[item.data.id]);
          function handleReply() {
            storeData
              ? dispatch(updateReply(item.data.id, !storeData.isOpen, storeData.text))
              : dispatch(updateReply(item.data.id, true, `${item.data.author}, `))
          }

          return (
            item.data.body && (
              <div className={styles.mainWrapper} key={item.data.id}>
                <div className={styles.upvotes}>
                  <div className={styles.arrowsIcons}>
                    <button><Icon Name={EIcons.arrowUp} width={19} /></button>
                    <button className={styles.arrowDown}><Icon Name={EIcons.arrowUp} width={19} /></button>
                  </div>
                  <div className={styles.bar}></div>
                </div>
                <div className={styles.contentContainer}>
                  <div className={styles.metaDataContainer}>
                    <div className={styles.metaData}
                    >
                      <MetaData
                        avatarSrc={''}
                        author={item.data.author}
                        authorUrl={`https://www.reddit.com/user/${item.data.author}/`}
                        createdAt={item.data.created}
                      />
                    </div>
                  </div>
                  <div className={styles.commentBody}>
                    <Text As='p' size={14}>{item.data.body}</Text>
                  </div>
                  <ul className={typeof depth == 'number' && depth >= 4 ? styles.controlsNarrow : styles.controls}>
                    <li><button className={styles.menuItem} onClick={() => handleReply()}>
                      <span className={styles.iconWrapper}>
                        <Icon Name={EIcons.comments} width={15} />
                      </span>
                      {typeof depth != 'number' || depth < 4 && (
                        <Text size={14} color={EColors.grey99}>Ответить</Text>
                      )}
                    </button></li>

                    <li><button className={styles.menuItem} onClick={() => { }}>
                      <span className={styles.iconWrapper}>
                        <Icon Name={EIcons.share} width={12} />
                      </span>
                      {typeof depth != 'number' || depth < 4 && (
                        <Text size={14} color={EColors.grey99}>Поделиться</Text>
                      )}
                    </button></li>

                    <li><button className={styles.menuItem} onClick={() => { }}>
                      <span className={styles.iconWrapper}>
                        <Icon Name={EIcons.report} width={16} />
                      </span>
                      {typeof depth != 'number' || depth < 4 && (
                        <Text size={14} color={EColors.grey99}>Пожаловаться</Text>
                      )}
                    </button></li>
                  </ul>

                  <CSSTransition
                    in={storeData && storeData.isOpen}
                    timeout={200}
                    classNames={replyFormTransitionClasses}
                    mountOnEnter unmountOnExit
                  >
                    <ReplyForm
                      commentID={item.data.id}
                      isOpen={storeData && storeData.isOpen}
                      isModalOpen={isModalOpen}
                    />
                  </CSSTransition>

                  {item.data.replies && (
                    <CommentsBlock comments={item.data.replies.data.children} depth={depth} isModalOpen={isModalOpen} />
                  )}
                </div>
              </div>
            )
          )
        })
        : null}
      {/* <CommentsBlockLoader /> */}
    </div>
  );
}
