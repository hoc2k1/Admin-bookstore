import React from 'react'
import { connect } from 'react-redux'
import HeaderContent from '../header/header.content'
import CustomModal from '../global/custom.modal'
import Form from '../global/form'

const Categories = (props) => {
  const renderHeaderGrid = () => {
    return (
      <div className='row w-100 mx-auto'>
        <div className='col-4 secondary-bg d-flex align-items-center py-md-2 py-1'>
          <span className='heading-small color-theme'>Tên Thể loại</span>
        </div>
        <div className='col-4 secondary-bg d-flex align-items-center py-md-2 py-1'>
          <span className='heading-small color-theme'>Ảnh</span>
        </div>
        <div className='col-4 secondary-bg d-flex align-items-center py-md-2 py-1'>
          <span className='heading-small color-theme'>Hành động</span>
        </div>
      </div>
    )
  }
  const renderItem = (item) => {
    let url_image = '/img/placeholder-image.png'
    if (item.image) {
      url_image = item.image
    }
    return (
      <div className='row border-bottom w-100 mx-auto'>
        <div className='col-4 d-flex align-items-center py-md-2 py-1'>
          <span>{item.name}</span>
        </div>
        <div className='col-4 d-flex align-items-center py-md-2 py-1'>
          <img className='image-in-grid' src={url_image}></img>
        </div>
        <div className='col-4 d-flex align-items-center py-md-2 py-1 gap-2 gap-md-3'>
          <i className='fa fa-pencil font-size-normal p-2 secondary-bg cursor-pointer icon-button' onClick={() => props.parent.onClickEdit(item)}></i>
          {/* <i className='fa fa-trash font-size-normal p-2 secondary-bg icon-delete cursor-pointer icon-button' onClick={() => props.parent.removeItem(item)}></i> */}
        </div>
      </div>
    )
  }
  const renderGrid = () => {
    if (props.categories?.length > 0) {
      return (
        <div className='w-100 flex-grow-1 d-flex py-md-3 py-2 overflow-auto'>
          <div className='content-width w-100 h-fit'>
            {renderHeaderGrid()}
            {props.categories.map((item, index) => {
              return (
                <div key={`item-grid-categories-${index}`}>
                  {renderItem(item)}
                </div>
              )
            })}
          </div>
        </div>
      )
    }
    else {
      return (
        <div className='w-100 flex-grow-1 d-flex py-md-3 py-2 overflow-auto'>
          <div className='content-width w-100 h-fit d-flex justify-content-center align-items-center'>
            <span className='heading'>Không có thể loại sách nào</span>
          </div>
        </div>
      )
    }
  }
  return (
    <div className='w-100 h-100 d-flex flex-column'>
      <HeaderContent onClickHeader={() => props.parent.onClickAdd()} title="Thêm thể loại sách"/>
      {renderGrid()}
      <CustomModal closeModal={() => props.parent.setState({showModal: false})} showModal={props.parent.state.showModal}>
        <Form 
          form={props.parent.form} 
          stateForm={props.parent.state.form} 
          onChangeField={props.parent.onChangeField} 
          onClickButton={props.parent.onClickButton}
        />
      </CustomModal>
    </div>
  )
}
const mapStateToProps = state => ({
  categories: state.productsReducers.products.categories
});

export default connect(mapStateToProps, null)(Categories)