import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TInitialState, updateReply } from '../../../../store';
import { EIcons, Icon } from '../../../Icon';
import { EColors, Text } from '../../../Text';
import { generateRandomString } from '../../../utils/generateRandomString';
import styles from './replyform.scss';

const markdownBtns = [
  <Icon Name={EIcons.inlineCode} width={20} />,
  <Icon Name={EIcons.attachLink} width={20} />,
  <Icon Name={EIcons.speechBubble} width={20} />,
  <Icon Name={EIcons.edit} width={18} />,
  <Icon Name={EIcons.changeText} width={16} />,
].map((btn) =>
  <button key={generateRandomString()} className={styles.markdownBtn}>{btn}</button>)

interface IReplyFormProps {
  commentID: string;
  isOpen?: boolean;
  isModalOpen?: boolean;
}

export function ReplyForm({ commentID, isOpen, isModalOpen }: IReplyFormProps) {

  const dispatch = useDispatch();
  const storeValue = useSelector((state: TInitialState) => state.commentsReplies[`${commentID}`])

  const [inputValue, setInputValue] = useState(storeValue.text);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(updateReply(commentID, false, inputValue))
  }

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    textareaRef.current?.focus()
  })

  useEffect(() => {
    return () => {
      dispatch(updateReply(commentID, false, inputValue))
    }
  }, [isOpen, isModalOpen])

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <textarea
        ref={textareaRef}
        className={styles.input}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onFocus={(e) => e.currentTarget.setSelectionRange(e.currentTarget.value.length + 1, e.currentTarget.value.length + 1)}>
      </textarea>
      <div className={styles.controlsWrapper}>
        <div className={styles.markdownBtnsWrapper}>
          {markdownBtns}
        </div>
        <button type='submit' className={styles.button}>
          <Text size={14} color={EColors.white}>Ответить</Text>
        </button>
      </div>
    </form>
  );
}

