import React from 'react';
import { Link, Route, Switch, useHistory, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Post } from '../../../../Post';
import styles from './posttitle.scss';

interface IPostTitleProps {
  postID: string;
  postUrl: string;
  permalink: string;
  postTitle: string;
}

export function PostTitle(props: IPostTitleProps) {

  const history = useHistory();

  const handleClose = () => {
    history.push('/');
  }

  const transitionClasses = {
    enter: styles['modal-enter'],
    enterActive: styles['modal-enter-active'],
    exit: styles['modal-exit'],
    exitActive: styles['modal-exit-active']
  }

  const location = useLocation();

  return (
    <h2 className={styles.title}>
      <Link to={`/posts/${props.postID}/${props.permalink}`} className={styles.postLink}>
        {props.postTitle}
      </Link>
      <TransitionGroup>
        <CSSTransition
          key={location.pathname}
          timeout={200}
          classNames={transitionClasses}
        >
          <Switch location={location}>
            <Route path={`/posts/${props.postID}/${props.permalink}`}>
              <Post
                onClose={handleClose}
                postID={props.postID}
              />
            </Route>
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    </h2>
  );
}
