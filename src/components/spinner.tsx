import React from 'react'

type Props = {}

function Spinner({}: Props) {
  return (
      <div className='w-4 h-4 border-t-2 border-b-2 border-primary rounded-full animate-spin'></div>
  )
}

export default Spinner