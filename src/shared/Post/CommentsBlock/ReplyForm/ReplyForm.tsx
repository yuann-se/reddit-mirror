import React, { FormEvent, useEffect, useRef, useState } from 'react';
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
  openState?: boolean;
  refer?: string;
  savedValue?: string;
  setValue?: () => void;
}

export function ReplyForm({ openState, refer, savedValue }: IReplyFormProps) {

  const [inputValue, setInputValue] = useState(savedValue ? savedValue : refer);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    textareaRef.current?.focus()
  })

  // useEffect(() => {
  //   return () => {
  //     onChange(inputValue);
  //   }
  // }, [openState])

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

// export function ReplyForm({ openState, refer, savedValue }: IReplyFormProps) {

//   function handleSubmit(e: FormEvent<HTMLFormElement>) {
//     e.preventDefault();
//   }

//   const textareaRef = useRef<HTMLTextAreaElement>(null);

//   useEffect(() => {
//     textareaRef.current?.focus()
//   })

//   return (
//     <form className={styles.form} onSubmit={handleSubmit}>
//       <textarea
//         ref={textareaRef}
//         className={styles.input}
//         defaultValue={refer}
//         onFocus={(e) => e.currentTarget.setSelectionRange(e.currentTarget.value.length + 1, e.currentTarget.value.length + 1)}>
//       </textarea>
//       <div className={styles.controlsWrapper}>
//         <div className={styles.markdownBtnsWrapper}>
//           {markdownBtns}
//         </div>
//         <button type='submit' className={styles.button}>
//           <Text size={14} color={EColors.white}>Ответить</Text>
//         </button>
//       </div>
//     </form>
//   );
// }
