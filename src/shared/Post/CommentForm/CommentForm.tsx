import React, { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../app';
import { updateComment } from '../../../store/store';
import { EIcons, Icon } from '../../Icon';
import { EColors, Text } from '../../Text';
import { generateRandomString } from '../../utils/generateRandomString';
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import styles from './commentform.scss';
import { CSSTransition } from 'react-transition-group';
import { SuccessMsg } from './SuccessMsg';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

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
  const [successMessage, showSuccessMessage] = useState<boolean>(false);

  const validationSchema = Yup.object().shape({
    comment: Yup.string()
      .required('Введите комментарий')
      .max(500, 'Максимальная длина комментария - 500 символов'),
  });

  useEffect(() => {
    return () => {
      dispatch(updateComment(props.postID, inputValue));
    }
  }, [props.isOpen]);

  const { control, handleSubmit, formState: { errors, isSubmitSuccessful }, reset } =
    useForm<ITextarea>({ resolver: yupResolver(validationSchema), defaultValues: { comment: inputValue } });

  const onSubmit: SubmitHandler<ITextarea> = () => {
    setInputValue('');
    showSuccessMessage(true);
  }

  useEffect(() => {
    if (isSubmitSuccessful) reset()
  }, [isSubmitSuccessful, reset])

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor='comment'>Oставьте ваш комментарий</label>
      <Controller
        control={control}
        name="comment"
        render={({ field: { onChange } }) => (
          <textarea className={styles.input}
            value={inputValue} onChange={(e) => {
              onChange(e);
              handleChange(e);
            }}
            aria-invalid={!!errors.comment || undefined}
            placeholder={placeholder} />
        )}
      />

      <div className={styles.controlsWrapper}>
        <div className={styles.markdownBtnsWrapper}>
          {markdownBtns}
        </div>
        <button type='submit' className={styles.button}
        >
          <Text size={14} color={EColors.white}>Комментировать</Text>
        </button>
      </div>

      <CSSTransition
        in={inputValue.length > 400 && inputValue.length <= 500 && !errors.comment}
        timeout={200} classNames={errorTransitionClasses}
        mountOnEnter unmountOnExit
      >
        <p className={styles.symbolsCounter}>Осталось {500 - inputValue.length}/500 символов</p>
      </CSSTransition>

      <CSSTransition
        in={inputValue.length > 500 && !errors.comment} timeout={200}
        classNames={errorTransitionClasses}
        mountOnEnter unmountOnExit
      >
        <div className={styles.symbolsCounter}>Превышена максимальная длина комментария</div>
      </CSSTransition>

      <CSSTransition
        in={errors.comment?.type === 'max'} timeout={200}
        classNames={errorTransitionClasses}
        mountOnEnter unmountOnExit
      >
        <div className={styles.errorMessage}>{errors.comment?.message}</div>
      </CSSTransition>

      <CSSTransition
        in={errors.comment?.type === 'required'} timeout={200}
        classNames={errorTransitionClasses}
        mountOnEnter unmountOnExit
      >
        <div className={styles.errorMessage}>{errors.comment?.message}</div>
      </CSSTransition>

      <SuccessMsg open={successMessage} onClose={() => showSuccessMessage(false)} />

    </form>
  );
}

