import React, { useContext, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import styles from './post.scss';
import { CSSTransition } from 'react-transition-group';
import { CommentForm } from '../CommentForm';
import { commentContext } from '../context/commentContext';
import { EIcons, Icon } from '../Icon';
import { postsContext } from '../context/postsContext';

interface IPostProps {
  onClose?: () => void;
  isModalOpen?: boolean;
  postID: string
}

export function Post(props: IPostProps) {

  const { value, onChange } = useContext(commentContext);

  const data = useContext(postsContext);
  const [postData] = data.filter((item) => item.id === props.postID);

  const modalRef = useRef<HTMLDivElement>(null);
  const commentRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (props.isModalOpen) document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    }
  })

  const handleClick = (e: React.SyntheticEvent) => {
    onChange(commentRef.current?.value ? commentRef.current?.value : '');
    props.onClose?.()
  }

  const handleOverlayClick = (e: React.SyntheticEvent) => {
    if (e.target instanceof Node && !modalRef.current?.contains(e.target)) {
      onChange(commentRef.current?.value ? commentRef.current?.value : '');
      props.onClose?.()
    }
  }

  const node = document.getElementById('modal_root');
  if (!node) return null;

  return ReactDOM.createPortal(
    (
      <CSSTransition
        in={props.isModalOpen}
        timeout={200}
        classNames= {
          {enter: styles['modal-enter'],
          enterActive: styles['modal-enter-active'],
          exit: styles['modal-exit'],
          exitActive: styles['modal-exit-active']}
        }
        mountOnEnter
        unmountOnExit
        nodeRef={modalRef}
      >
      <div className={styles.modalWrapper} onClick={handleOverlayClick}>
        <div className={styles.modal} ref={modalRef}>
          <button className={styles.closeBtn} onClick={handleClick}>
            <Icon Name={EIcons.closeModal} width={21} />
          </button>
          <h2>{postData.postTitle}</h2>
          {postData.previewSrc.length > 10 && (
            <img src={postData.previewSrc} alt='Post imaage'></img>
          )}
          <div className={styles.content}>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Atque dignissimos laudantium blanditiis, nesciunt possimus inventore aut harum sequi amet minus eligendi dolorem reiciendis nulla fugiat enim autem, quae aliquid sit.</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur repellat fugit nisi non voluptatem, iusto eaque eos alias enim? Quo officia pariatur quos, vitae voluptatibus, consectetur odio, culpa iure deserunt dolor ullam vel maxime aperiam! Velit consectetur itaque molestias voluptas, perferendis quisquam. Quia unde error reiciendis praesentium aperiam inventore rerum magnam sint, consequuntur doloremque nisi eius, in vel ullam! Perferendis ullam ad reprehenderit totam, veritatis quo atque, modi facilis sed quam magni fugit animi commodi laudantium quae error officiis odit dicta repudiandae pariatur explicabo autem! Accusamus aspernatur libero corporis deleniti amet, molestiae vel at, ut iure repudiandae esse soluta quasi.</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, reprehenderit sit et maiores in sint eos cumque adipisci debitis dolor libero labore non, enim aspernatur ducimus perspiciatis ut nesciunt totam id excepturi. Aliquid enim ex non earum error odio quisquam voluptate sapiente autem! Delectus voluptatibus magni atque? Praesentium reprehenderit laborum mollitia eaque eveniet ducimus at voluptatem modi beatae distinctio qui, perspiciatis sunt inventore doloribus similique quod. Nisi consectetur quibusdam ex dolores dicta rem nihil fuga tempora obcaecati eveniet possimus necessitatibus autem doloremque optio id, vero nesciunt sint placeat maxime blanditiis iusto similique incidunt aspernatur. Eius eveniet natus fugit? Nostrum dignissimos pariatur distinctio sunt cumque eum tempore. Nostrum rem hic dolorum itaque repellendus in alias iste eligendi qui, inventore reprehenderit harum rerum ipsam? Eligendi ipsa modi inventore hic dolor odit repellendus dicta, commodi, quae molestiae eum similique enim earum soluta aliquam perferendis itaque voluptas voluptate! Accusamus repellat nihil facere quas laborum.</p>
          </div>
          <CommentForm value={value} ref={commentRef} />
        </div>
      </div>
      </CSSTransition>
    ), node);
}
