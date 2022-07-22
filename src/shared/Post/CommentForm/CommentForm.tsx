import React, { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../app';
import { updateComment } from '../../../store/store';
import { EIcons, Icon } from '../../Icon';
import { EColors, Text } from '../../Text';
import { generateRandomString } from '../../utils/generateRandomString';
import { SubmitHandler, useForm } from "react-hook-form";
import styles from './commentform.scss';
import { CSSTransition } from 'react-transition-group';
import { SuccessMsg } from './SuccessMsg';

const markdownBtns = [
  <Icon Name={EIcons.inlineCode} width={20} />,
  <Icon Name={EIcons.attachImg} width={18} />,
  <Icon Name={EIcons.attachDoc} width={16} />,
  <Icon Name={EIcons.download} width={14} />,
  <Icon Name={EIcons.attachPhoto} width={18} />,
  <Icon Name={EIcons.reverse} width={22} />,
  <Icon Name={EIcons.attachLink} width={20} />,
  <Icon Name={EIcons.attachAudio} width={20} />,
  <Icon Name={EIcons.speechBubble} width={20} />,
  <Icon Name={EIcons.edit} width={18} />,
  <Icon Name={EIcons.changeText} width={16} />,
  <Icon Name={EIcons.attachPdf} width={20} />
].map((btn) =>
  <button key={generateRandomString()} className={styles.markdownBtn}>{btn}</button>)

interface ICommentFormProps {
  postID: string;
  isOpen: boolean;
}

interface ITextarea {
  comment: string
}

const errorTransitionClasses = {
  enter: styles['show-enter'],
  enterActive: styles['show-enter-active'],
  exit: styles['show-exit'],
  exitActive: styles['show-exit-active']
};

export function CommentForm(props: ICommentFormProps) {

  const dispatch = useDispatch();
  const storeValue = useSelector((state: RootState) => state.main.myPostComment[props.postID]);
  const userName = useSelector((state: RootState) => state.me.data.username);
  const placeholder = userName
    ? `${userName}, оставьте ваш комментарий`
    : `Оставьте ваш комментарий`

  const [inputValue, setInputValue] = useState<string>(storeValue ? storeValue.text : '');
  const [startValidate, setStartValidate] = useState<boolean>(false);
  const [successMessage, showSuccessMessage] = useState<boolean>(false);

  useEffect(() => {
    return () => {
      dispatch(updateComment(props.postID, inputValue));
    }
  }, [props.isOpen])

  const { register, handleSubmit, formState: { errors }, reset, formState,
    formState: { isSubmitSuccessful } } = useForm<ITextarea>();

  const onSubmit: SubmitHandler<ITextarea> = () => {
    setInputValue('');
    setStartValidate(false);
    showSuccessMessage(true);
    reset();
  }

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor='comment'>Oставьте ваш комментарий</label>
      <textarea
        {...register("comment", { required: 'true', maxLength: 20 })}
        className={styles.input}
        id='comment'
        value={inputValue}
        placeholder={placeholder}
        onChange={handleChange}
        aria-invalid={!!errors.comment && (inputValue.length === 0 || inputValue.length > 20) || undefined}>
      </textarea>
      <div className={styles.controlsWrapper}>
        <div className={styles.markdownBtnsWrapper}>
          {markdownBtns}
        </div>
        <button type='submit' className={styles.button} onClick={() => setStartValidate(true)}>
          <Text size={14} color={EColors.white}>Комментировать</Text>
        </button>
      </div>
      <CSSTransition
        in={inputValue.length > 10 && inputValue.length <= 20}
        timeout={200}
        classNames={errorTransitionClasses}
        mountOnEnter
        unmountOnExit
      >
        <p className={styles.symbolsCounter}>Осталось {inputValue.length <= 20 ? 20 - inputValue.length : 0}/20 символов</p>
      </CSSTransition>

      <CSSTransition
        in={inputValue.length > 20}
        timeout={200}
        classNames={errorTransitionClasses}
        mountOnEnter
        unmountOnExit
      >
        <p className={styles.errorMessage}>Максимальная длина комментария - 20 символов</p>
      </CSSTransition>

      <CSSTransition
        in={inputValue.length === 0 && startValidate}
        timeout={200}
        classNames={errorTransitionClasses}
        mountOnEnter
        unmountOnExit
      >
        <p className={styles.errorMessage}>Введите комментарий</p>
      </CSSTransition>

      <SuccessMsg open={successMessage} onClose={() => showSuccessMessage(false)} />

    </form>
  );
}

