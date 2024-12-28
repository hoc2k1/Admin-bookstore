import React, { useState } from 'react'
import { connect } from 'react-redux'
import * as homeActions from '../../actions/home.action'
import { bindActionCreators } from 'redux'
import HeaderContent from '../header/header.content'
import CustomModal from '../global/custom.modal'

const LayoutBanner = (props) => {
  const [showModal, setShowModal] = useState(false)
  const renderGrid = () => {
    return (
      <div className='w-100 flex-grow-1 d-flex py-md-3 py-2 overflow-auto'>
        <div className='content-width w-100 h-fit'>
          
        </div>
      </div>
    )
  }
  return (
    <div className='w-100 h-100 d-flex flex-column'>
      <HeaderContent onClickHeader={() => setShowModal(true)} title="Thêm banner"/>
      {renderGrid()}
      <CustomModal closeModal={() => setShowModal(false)} showModal={showModal}>

      </CustomModal>
    </div>
  )
}

const mapStateToProps = state => ({
  banners: state.homeReducers.home.banners
});

const mapDispatchToProps = dispatch => {
  return {
    homeActions: bindActionCreators(homeActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LayoutBanner)