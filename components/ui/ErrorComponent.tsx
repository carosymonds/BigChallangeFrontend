import React from 'react'
import { FC } from 'react';

interface Props {
    primaryMessage: string;
    secondaryMessage?: string;
}

export const ErrorComponent: FC<Props> = ({primaryMessage, secondaryMessage}) => {
  return (
    <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
      <span className="font-medium">{primaryMessage}</span> {secondaryMessage}
    </div>
  )
}
