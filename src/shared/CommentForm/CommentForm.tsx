import React, { ChangeEvent, FormEvent, forwardRef, useContext, useEffect, useState } from 'react';
import styles from './commentform.scss';

interface ICommentFormProps {
  value: string
}

export const CommentForm = forwardRef<HTMLTextAreaElement, ICommentFormProps>(({value}, ref) => {

  const [inputValue, setInputValue] = useState(value);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setInputValue(e.target.value);
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <textarea ref={ref} className={styles.input} value={inputValue} onChange={handleChange}></textarea>
      <button type='submit' className={styles.button}>Комментировать</button>
    </form>
  );
})


// export function CommentForm() {

//   const { value, onChange } = useContext(commentContext);
//   const [inputValue, setInputValue] = useState(value);

//   function handleSubmit(e: FormEvent<HTMLFormElement>) {
//     e.preventDefault();
//   }

//   function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
//     setInputValue(e.target.value);
//   }

//   return (
//     <form className={styles.form} onSubmit={handleSubmit}>
//       <textarea className={styles.input} value={inputValue} onChange={handleChange}></textarea>
//       <button type='submit' className={styles.button}>Комментировать</button>
//     </form>
//   );
// }
