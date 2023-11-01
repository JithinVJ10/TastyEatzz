import React from 'react'

const FoodList = () => {
    const foods =[]
  return (
    <main className='main-container'>
      <div className="flex justify-between items-start">
        <p className="text-4xl mb-8 font-extrabold text-yellow-950">Foods</p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Food item
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Catagory
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Price
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Image
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Available time
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Change
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Action
              </th>
              {/* Add more headers as needed */}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {foods?.map((food) => {
              return (
                <>
                  <tr>
                    <td className="px-6 py-4 whitespace-no-wrap">
                      {food?.username}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap">
                      {food?.email}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap">
                      {food?.phone}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap">
                    {food?.isBlocked ? 
                      <button onClick={()=> handleAction('unblock',food?._id)} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                        unBlock
                      </button> :
                    <>
                      <button onClick={()=> handleAction('block',food?._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                        Block
                      </button>
                    </>
                      }
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </main>
  )
}

export default FoodList
