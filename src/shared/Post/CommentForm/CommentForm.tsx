import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { TInitialState, updateComment } from '../../../store';
import { EIcons, Icon } from '../../Icon';
import { EColors, Text } from '../../Text';
import { generateRandomString } from '../../utils/generateRandomString';
import styles from './commentform.scss';

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

export function CommentForm(props: ICommentFormProps) {

  const dispatch = useDispatch();
  const storeValue = useSelector((state: TInitialState) => state.myPostComment[`${props.postID}`]);

  const [inputValue, setInputValue] = useState(storeValue ? storeValue.text : '');

  useEffect(() => {
    return () => {
      if (storeValue && storeValue.text !== inputValue) {
        dispatch(updateComment(props.postID, inputValue));
      }
    }
  }, [props.isOpen])


  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(updateComment(props.postID, inputValue));
  }

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <textarea
        className={styles.input}
        value={inputValue}
        onChange={handleChange}>
      </textarea>
      <div className={styles.controlsWrapper}>
        <div className={styles.markdownBtnsWrapper}>
          {markdownBtns}
        </div>
        <button type='submit' className={styles.button}>
          <Text size={14} color={EColors.white}>Комментировать</Text>
        </button>
      </div>
    </form>
  );
}

