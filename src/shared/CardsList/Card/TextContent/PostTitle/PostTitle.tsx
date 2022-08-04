import React from 'react';
import { Link, Route, Switch, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Post } from '../../../../Post';
import { Text } from '../../../../Text';
import styles from './posttitle.scss';

interface IPostTitleProps {
  postID: string;
  postUrl: string;
  permalink: string;
  postTitle: string;
}

export function PostTitle(props: IPostTitleProps) {

  const transitionClasses = {
    enter: styles['modal-enter'],
    enterActive: styles['modal-enter-active'],
    exit: styles['modal-exit'],
    exitActive: styles['modal-exit-active']
  }

  const location = useLocation();
  const postPath = `/best/${props.postID}/${props.permalink}/`;

  return (
    <h2 className={styles.title}>
      <Link to={postPath} className={styles.postLink}>
        <Text size={16} tabletSize={20}>{props.postTitle}</Text>
      </Link>
      <TransitionGroup>
        <CSSTransition
          key={location.pathname}
          timeout={200}
          classNames={transitionClasses}
        >
          <Switch location={location}>
            <Route path={`/best/:postID/${props.permalink}/`}>
              <Post />
            </Route>
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    </h2>
  );
}
