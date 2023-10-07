import React from 'react'

const CurrentOrder = () => {
    const Orders = []
  return (
    <div className='w-4/5 p-4 bg-emerald-300 border rounded-lg'>
      <div>
        <h1 className='font-bold text-2xl'>Current Order</h1>
      </div>
      <div>
        {
            Orders > 0 ? 
            <>
            <div>
                <p>item: {Orders?.item}</p>
                <p>Pickup: {Orders?.pickUpLocation}</p>
                <p>Delivery To : {Orders?.DeliveryLocation}</p>
            </div>
            </> : <p>No Orders</p>
        }
        
      </div>
    </div>
  )
}

export default CurrentOrder
