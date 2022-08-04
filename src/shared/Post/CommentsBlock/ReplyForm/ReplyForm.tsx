import classNames from 'classnames';
import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { RootState } from '../../../../app';
import { IMainState, updateReply } from '../../../../store/store';
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
  depth?: number | undefined
}

export function ReplyForm({ commentID, isOpen, depth }: IReplyFormProps) {

  const dispatch = useDispatch();
  const storeValue = useSelector((state: RootState) => state.main.commentsReplies[`${commentID}`])

  const [inputValue, setInputValue] = useState(storeValue.text);

  const controlsWrapperClasses = classNames(
    styles.controlsWrapper,
    { [styles.controlsWrapperNarrow]: typeof depth == 'number' && depth >= 4 }
  )

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(updateReply(commentID, false, ''))
  }

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    textareaRef.current?.focus()
  })

  useEffect(() => {
    return () => {
      if (inputValue != storeValue.text) {
        dispatch(updateReply(commentID, false, inputValue))
      }
    }
  }, [isOpen])

  const history = useHistory();
  useEffect(() => {
    return history.listen(() => {
      dispatch(updateReply(commentID, true, inputValue));
    })
  })

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <textarea
        ref={textareaRef}
        className={styles.input}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onFocus={(e) => e.currentTarget.setSelectionRange(e.currentTarget.value.length + 1, e.currentTarget.value.length + 1)}>
      </textarea>
      <div className={controlsWrapperClasses}>
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

