import React, { FC } from 'react'

interface Props {
    primaryMessage: string;
    secondaryMessage?: string;
}

export const SuccessComponent: FC<Props> = ({primaryMessage, secondaryMessage}) => {
  return (
    <div className="p-2 my-2 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800" role="alert">
        <span className="font-medium">{primaryMessage}!</span> {secondaryMessage}
    </div>
  )
}
