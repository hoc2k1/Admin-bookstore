import React, { useState } from 'react'

export const HeaderContent = ({title, onClickHeader}) => {
  return (
    <div className='pt-md-3 pt-2 content-width'>
      <div 
        onClick={() => onClickHeader()}
        className="d-flex justify-content-center align-items-center gap-2 w-100 p-1 p-md-2 border-dashed cursor-pointer">
        <i className='fa fa-plus-circle heading'></i>
        <span className='heading'>{title}</span>
      </div>
    </div>
  )
}
export default HeaderContent