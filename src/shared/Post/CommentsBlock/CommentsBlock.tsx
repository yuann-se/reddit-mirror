import React from 'react';
import { IInitData } from '../../../hooks/useCommentsData';
import { MetaData } from '../../CardsList/Card/TextContent/MetaData';
import { EIcons, Icon } from '../../Icon';
import { EColors, Text } from '../../Text';
import { generateRandomString } from '../../utils/generateRandomString';
import styles from './commentsblock.scss';

interface ICommentsBlockProps {
  comments: IInitData[];
  depth: number | undefined;
}

// const iconsList = []

export function CommentsBlock({ comments, depth }: ICommentsBlockProps ) {
  typeof depth == 'number' ? depth++ : depth = 0;
  return (
    <div style={{'width': '100%'}}>
      {Array.isArray(comments) && comments.length > 0
        ? comments.map((item) => {
          return (
            item.data.body && (
              <div className={styles.mainWrapper} key={generateRandomString()}>
                <div className={styles.upvotes}>
                  <div className={styles.arrowsIcons}>
                    <Icon Name={EIcons.arrowUp} width={30}/>
                    <div className={styles.arrowDown}>
                    <Icon Name={EIcons.arrowUp} width={30}/>
                    </div>
                  </div>
                  <div className={styles.bar}></div>
                </div>
                <div className={styles.container}>
                  <div className={styles.metaData}>
                    <MetaData
                      avatarSrc={''}
                      author={item.data.author}
                      authorUrl={`https://www.reddit.com/user/${item.data.author}/`}
                      createdAt={item.data.created}
                    />
                  </div>
                  <div className={styles.commentBody}>
                    <Text As='p' size={14}>{item.data.body}</Text>
                  </div>
                  <ul className={typeof depth == 'number' && depth >= 8 ? styles.controlsNarrow : styles.controls }>
                    <li>
                      <button className={styles.menuItem} onClick={() => { }}>
                        <span className={styles.iconWrapper}>
                          <Icon Name={EIcons.comments} width={15} />
                        </span>
                        {typeof depth != 'number' || depth < 8 && (
                          <Text size={14} color={EColors.grey99}>Ответить</Text>
                        )}
                      </button>
                    </li>

                    <li>
                      <button className={styles.menuItem} onClick={() => { }}>
                        <span className={styles.iconWrapper}>
                          <Icon Name={EIcons.share} width={12} />
                        </span>
                        {typeof depth != 'number' || depth < 8 && (
                          <Text size={14} color={EColors.grey99}>Поделиться</Text>
                        )}
                      </button>
                    </li>

                    <li>
                      <button className={styles.menuItem} onClick={() => { }}>
                        <span className={styles.iconWrapper}>
                          <Icon Name={EIcons.report} width={16} />
                        </span>
                        {typeof depth != 'number' || depth < 8 && (
                          <Text size={14} color={EColors.grey99}>Пожаловаться</Text>
                        )}
                      </button>
                    </li>

                  </ul>
                  {item.data.replies && (
                    <CommentsBlock comments={item.data.replies.data.children} depth={depth}/>
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
