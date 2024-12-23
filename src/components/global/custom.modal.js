import React from 'react'
import Modal from 'react-modal';

const CustomModal = ({children, showPopup, closeModal}) => {
  return (
    <Modal 
      isOpen={showPopup}
      onRequestClose={() => closeModal()}
      shouldCloseOnOverlayClick={true}
      ariaHideApp={false}
    >
      <i className='fa fa-times-circle cursor-pointer font-size-normal text-end p-2 p-md-3 position-fixed top-0 right-0' onClick={() => closeModal()}></i>
      <div className='container h-100'>
        {children}
      </div>
    </Modal>
  ) 
}
export default CustomModal