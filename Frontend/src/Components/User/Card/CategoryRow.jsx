import React from 'react'

const CategoryRow = (props) => {
    
  return (
    <div className=' w-40 h-40 flex flex-col items-center justify-center ms-4'>
      <img className='rounded-full h-32 w-32' src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80" alt="" />
      <p className='text-center'>{props.category}</p>
    </div>
  )
}

export default CategoryRow
