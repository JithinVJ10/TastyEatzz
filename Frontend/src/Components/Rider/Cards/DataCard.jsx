import React from 'react'

const DataCard = (props) => {
  return (
    <div className={`${props.bgColor} m-1 p-10 w-96 border rounded-xl`}>
      <p className='text-3xl pb-3'>{props.title}</p>
      <p className='pb-3'>{props.text}</p>

    </div>
  )
}

export default DataCard
