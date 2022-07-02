import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import styles from './post.scss';
import { CSSTransition } from 'react-transition-group';

interface IPostProps {
  onClose?: () => void;
  isModalOpen?: boolean;
}

export function Post(props: IPostProps) {

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (e.target instanceof Node && !ref.current?.contains(e.target)) {
        props.onClose?.()
      }
    }

    document.addEventListener('click', handleClick);

    return () => { document.removeEventListener('click', handleClick) };
  })


  const node = document.getElementById('modal_root');
  if (!node) return null;

  return ReactDOM.createPortal(
    (
      <CSSTransition
      in={props.isModalOpen}
      timeout={1000}
      classNames='modal'
      mountOnEnter
      unmountOnExit
    >
    <div className={styles.modal} ref={ref}>
      <h2>Lorem ipsum dolor sit, amet consectetur adipisicing.</h2>
      <div className={styles.content}>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Atque dignissimos laudantium blanditiis, nesciunt possimus inventore aut harum sequi amet minus eligendi dolorem reiciendis nulla fugiat enim autem, quae aliquid sit.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur repellat fugit nisi non voluptatem, iusto eaque eos alias enim? Quo officia pariatur quos, vitae voluptatibus, consectetur odio, culpa iure deserunt dolor ullam vel maxime aperiam! Velit consectetur itaque molestias voluptas, perferendis quisquam. Quia unde error reiciendis praesentium aperiam inventore rerum magnam sint, consequuntur doloremque nisi eius, in vel ullam! Perferendis ullam ad reprehenderit totam, veritatis quo atque, modi facilis sed quam magni fugit animi commodi laudantium quae error officiis odit dicta repudiandae pariatur explicabo autem! Accusamus aspernatur libero corporis deleniti amet, molestiae vel at, ut iure repudiandae esse soluta quasi.</p>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Necessitatibus, reprehenderit.</p>
      </div>
    </div>
    </CSSTransition>
    ), node);
}
