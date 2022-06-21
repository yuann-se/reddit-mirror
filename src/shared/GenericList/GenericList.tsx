import React from 'react';
import styles from './genericlist.css';

interface IItem {
  text: string;
  id: string;
  icon?: React.ReactNode;
  onClick?: (is: string) => void;
  className?: string;
  As?: 'a' | 'li' | 'button' | 'div';
  href?: string;
}

interface IGenericListProps {
  list: IItem[];
}

const NOOP = () => { };

export function GenericList({ list }: IGenericListProps) {
  return (
    <>
      {list.map(({ As = 'li', text, icon = '', onClick = NOOP, className, id, href }) => (
        <As
          className={className}
          onClick={() => onClick(id)}
          key={id}
          href={href}
        >
          {icon}
          <span>{text}</span>
        </As>
      ))}
    </>
  );
}
