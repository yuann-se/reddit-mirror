import React from 'react';
import { ISvgProps } from '.';

export function AttachDocIcon({ iconWidth }: ISvgProps) {
  return (
    <svg width={iconWidth} viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 0H2C0.9 0 0.0100002 0.9 0.0100002 2L0 18C0 19.1 0.89 20 1.99 20H14C15.1 20 16 19.1 16 18V6L10 0ZM12 16H4V14H12V16ZM12 12H4V10H12V12ZM9 7V1.5L14.5 7H9Z" fill="#999999" />
    </svg>
  );
}
