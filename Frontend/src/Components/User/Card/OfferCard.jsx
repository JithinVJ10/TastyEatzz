import React from 'react'

const OfferCard = (props) => {
  return (
    <div className={`${props.bgColor} m-1 p-10 w-96 border rounded-xl`}>
      <p className='text-3xl pb-3'>{props.title}</p>
      <p className='pb-3'>{props.text}</p>
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      Claim Voucher
      </button>

    </div>
  )
}

export default OfferCard
