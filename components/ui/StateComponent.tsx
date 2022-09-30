import React, { FC } from 'react'

interface Props {
    state: string;
    secondaryMessage?: string;
}

export const StateComponent: FC<Props> = ({state}) => {
    if(state == 'pending'){
        return (
            <span className="py-1 px-4 inline-flex justify-center items-center text-sm font-medium text-red-800 bg-red-200 rounded-full uppercase">
                {state}
            </span>
          )
    }
    if(state == 'ready'){
        return (
            <span className="py-1 px-4 inline-flex justify-center items-center text-sm font-medium text-green-800 bg-green-200 rounded-full uppercase">
                {state}
            </span>
          )
    }
  return (
    <span className="py-1 px-4 inline-flex justify-center items-center text-sm font-medium text-yellow-800 bg-yellow-200 rounded-full uppercase">
        In Progress
    </span>
  )
}

