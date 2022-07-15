import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { IInitData } from '../../../hooks/useCommentsData';
import { TInitialState, updateReply } from '../../../store';
import { MetaData } from '../../CardsList/Card/TextContent/MetaData';
import { EIcons, Icon } from '../../Icon';
import { EColors, Text } from '../../Text';
import styles from './commentsblock.scss';
import { ReplyForm } from './ReplyForm';

interface ICommentsBlockProps {
  comments: IInitData[];
  depth: number | undefined;
  isModalOpen: boolean;
}

export function CommentsBlock({ comments, depth, isModalOpen }: ICommentsBlockProps) {

  const dispatch = useDispatch();
  typeof depth == 'number' ? depth++ : depth = 0;

  return (
    <div className={styles.componentContainer}>
      {Array.isArray(comments) && comments.length > 0
        ? comments.map((item) => {

          const storeData = useSelector((state: TInitialState) => state.commentsReplies[`${item.data.id}`]);
          function handleReply() {
            if (storeData) {
              dispatch(updateReply(item.data.id, !storeData.isOpen, storeData.text))
            } else {
              dispatch(updateReply(item.data.id, true, `${item.data.author}, `))
            }
          }

          return (
            item.data.body && (
              <div className={styles.mainWrapper} key={item.data.id}>
                <div className={styles.upvotes}>
                  <div className={styles.arrowsIcons}>
                    <Icon Name={EIcons.arrowUp} width={19} />
                    <div className={styles.arrowDown}>
                      <Icon Name={EIcons.arrowUp} width={19} />
                    </div>
                  </div>
                  <div className={styles.bar}></div>
                </div>
                <div className={styles.contentContainer}>
                  <div className={styles.metaDataContainer}>
                    <div className={styles.metaData}>
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
                  <ul className={typeof depth == 'number' && depth >= 8 ? styles.controlsNarrow : styles.controls}>
                    <li><button className={styles.menuItem} onClick={() => handleReply()}>
                      <span className={styles.iconWrapper}>
                        <Icon Name={EIcons.comments} width={15} />
                      </span>
                      {typeof depth != 'number' || depth < 8 && (
                        <Text size={14} color={EColors.grey99}>Ответить</Text>
                      )}
                    </button></li>

                    <li><button className={styles.menuItem} onClick={() => { }}>
                      <span className={styles.iconWrapper}>
                        <Icon Name={EIcons.share} width={12} />
                      </span>
                      {typeof depth != 'number' || depth < 8 && (
                        <Text size={14} color={EColors.grey99}>Поделиться</Text>
                      )}
                    </button></li>

                    <li><button className={styles.menuItem} onClick={() => { }}>
                      <span className={styles.iconWrapper}>
                        <Icon Name={EIcons.report} width={16} />
                      </span>
                      {typeof depth != 'number' || depth < 8 && (
                        <Text size={14} color={EColors.grey99}>Пожаловаться</Text>
                      )}
                    </button></li>

                  </ul>

                  <CSSTransition
                    in={storeData && storeData.isOpen}
                    timeout={200}
                    classNames={{
                      enter: styles['reply-enter'],
                      enterActive: styles['reply-enter-active'],
                      exit: styles['reply-exit'],
                      exitActive: styles['reply-exit-active']
                    }}
                    mountOnEnter
                    unmountOnExit
                  >
                    <div>
                      <ReplyForm
                      commentID={item.data.id}
                      isOpen={storeData && storeData.isOpen}
                      isModalOpen={isModalOpen}
                       />
                    </div>
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
    </div>
  );
}
