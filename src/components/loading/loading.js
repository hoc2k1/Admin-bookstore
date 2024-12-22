import React from 'react'

const Loading = (props) => {
  return (
    <div className='w-100 h-100 d-flex justify-content-center align-items-center'>
      <img className='spinner' src='/img/loading.gif'></img>
    </div>
  )
}

export default Loading