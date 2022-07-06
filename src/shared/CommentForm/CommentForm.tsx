import React, { FormEvent } from 'react';
import styles from './commentform.scss';

interface ICommentFormProps {
  value: string;
  setValue: (value: string) => void;
}

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
      <button type='submit' className={styles.button}>Комментировать</button>
    </form>
  );
}

