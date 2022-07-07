import React, { FormEvent } from 'react';
import { EIcons, Icon } from '../../Icon';
import { EColors, Text } from '../../Text';
import { generateRandomString } from '../../utils/generateRandomString';
import styles from './commentform.scss';

interface ICommentFormProps {
  value: string;
  setValue: (value: string) => void;
}

const markdownBtns = [
  <Icon Name={EIcons.inlineCode} width={20}/>,
  <Icon Name={EIcons.attachImg} width={18}/>,
  <Icon Name={EIcons.attachDoc} width={16}/>,
  <Icon Name={EIcons.download} width={14}/>,
  <Icon Name={EIcons.attachPhoto} width={18}/>,
  <Icon Name={EIcons.reverse} width={22}/>,
  <Icon Name={EIcons.attachLink} width={20}/>,
  <Icon Name={EIcons.attachAudio} width={20}/>,
  <Icon Name={EIcons.speechBubble} width={20}/>,
  <Icon Name={EIcons.edit} width={18}/>,
  <Icon Name={EIcons.changeText} width={16}/>,
  <Icon Name={EIcons.attachPdf} width={20}/>
]

const btnsList = markdownBtns.map((btn) =>
<button key={generateRandomString()} className={styles.markdownBtn}>{btn}</button>)

export function CommentForm(props: ICommentFormProps) {

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <textarea
        className={styles.input}
        value={props.value}
        onChange={(e) => props.setValue(e.target.value)}>
      </textarea>
      <div className={styles.controlsWrapper}>
        <div className={styles.markdownBtnsWrapper}>
          {btnsList}
        </div>
        <button type='submit' className={styles.button}>
          <Text size={14} color={EColors.white}>Комментировать</Text>
        </button>
      </div>
    </form>
  );
}

