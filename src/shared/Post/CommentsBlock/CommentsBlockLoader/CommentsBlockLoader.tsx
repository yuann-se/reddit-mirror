import React from 'react';
import { EIcons, Icon } from '../../../Icon';
import styles from './commentsblockloader.scss';

interface IProps {
  depth?: number | undefined
}

export function CommentsBlockLoader({ depth }: IProps) {

  typeof depth == 'number' ? depth++ : depth = 0;

  return (
    <>
      <div className={styles.container}>
        {depth < 3 &&
          <>
            <div className={styles.upvotes}>
              <div className={styles.arrowsIcons}>
                <Icon Name={EIcons.arrowUp} width={19} />
                <Icon Name={EIcons.arrowUp} width={19} />
              </div>
              <div className={styles.bar}></div>
            </div>
            <div className={styles.content}>
              <div className={styles.metaData}>
                <span /><span /><span />
              </div>
              <div className={styles.commentBody}>
                <span /><span />
              </div>
              <div className={styles.controls}>
                <span /><span /><span />
              </div>
              <CommentsBlockLoader depth={depth} />
            </div>
          </>
        }
      </div>
    </>
  );
}
