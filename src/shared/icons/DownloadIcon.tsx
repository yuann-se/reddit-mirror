import React from 'react';
import { ISvgProps } from '.';

export function DownloadIcon({ iconWidth }: ISvgProps) {
  return (
    <svg width={iconWidth} viewBox="0 0 14 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 6H10V0H4V6H0L7 13L14 6ZM0 15V17H14V15H0Z" fill="#999999" />
    </svg>
  );
}
