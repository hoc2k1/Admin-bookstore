import React, { useState } from 'react'
import { connect } from 'react-redux'
import * as homeActions from '../../actions/home.action'
import { bindActionCreators } from 'redux'
import HeaderContent from '../header/header.content'
import CustomModal from '../global/custom.modal'
import { categoryForm, inputStatus } from '../../constants/values'
import FloatingInput from '../global/floating.input'
import ImagePickerInput from '../global/imagePickerInput'
import Button from '../global/button'

const Categories = (props) => {
  const [showModal, setShowModal] = useState(false)
  const editItem = (data) => {
    const newFormState = props.parent.state.form
    props.parent.isEdit = true
    newFormState.values['id'] = data._id
    categoryForm.map((item) => {
      newFormState.values[item.inputKey] = data[item.inputKey]
      if (item.isValidate) {
        newFormState.checkValidate[item.inputKey] = inputStatus.normal
      }
    })

    let checkButtonStatus = true
    categoryForm.map((item) => {
      if (item.isValidate && newFormState.checkValidate[item.inputKey] != inputStatus.success) {
        if (!(newFormState.checkValidate[item.inputKey] == inputStatus.normal && newFormState.values[item.inputKey])) {
          checkButtonStatus = false
        }
      }
    })
    newFormState.buttonStatus = checkButtonStatus

    props.parent.setState({form: newFormState})
    setShowModal(true)
  }
  const removeItem = (item) => {

  }
  const addItem = () => {
    const newFormState = props.parent.state.form
    props.parent.isEdit = false
    categoryForm.map((item) => {
      newFormState.values[item.inputKey] = ''
      if (item.isValidate) {
        newFormState.checkValidate[item.inputKey] = inputStatus.normal
      }
    })
    props.parent.setState({form: newFormState})
    setShowModal(true)
  }
  const onClickButton = (id=null) => {
    setShowModal(false)
    if(props.parent.isEdit) {
      props.onEdit()
    }
    else {
      props.onAdd()
    }
  }
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
          <i className='fa fa-pencil font-size-normal p-2 secondary-bg cursor-pointer icon-button' onClick={() => editItem(item)}></i>
          {/* <i className='fa fa-trash font-size-normal p-2 secondary-bg icon-delete cursor-pointer icon-button' onClick={() => removeItem(item)}></i> */}
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
      <HeaderContent onCLickHeader={() => setShowModal(true)} title="Thêm thể loại sách"/>
      {renderGrid()}
      <CustomModal closeModal={() => setShowModal(false)} showPopup={showModal}>
        <div className='login-form'>
          {categoryForm.map((item, index) => {
            if(item.type == 'image') {
              return (
                <ImagePickerInput 
                  {...item}
                  key={`login-${index}`}
                  value={props.parent.state.form.values[item.inputKey]}
                  checkValidate={props.parent.state.form.checkValidate[item.inputKey]}
                  onChange={(inputKey, text, newInputStatus) => props.onChangeField(inputKey, text, newInputStatus)}
                />
              )
            }
            else {
              return (
                <FloatingInput
                  {...item}
                  key={`login-${index}`}
                  value={props.parent.state.form.values[item.inputKey]}
                  checkValidate={props.parent.state.form.checkValidate[item.inputKey]}
                  onChange={(inputKey, text, newInputStatus) => props.onChangeField(inputKey, text, newInputStatus)} 
                />
              )
            }
          })}
          <Button buttonStatus={props.parent.state.form.buttonStatus} onClick={() => onClickButton()}>
            <span className="heading">Lưu thông tin</span>
          </Button>
        </div>
      </CustomModal>
    </div>
  )
}
const mapStateToProps = state => ({
  categories: state.productsReducers.products.categories
});

const mapDispatchToProps = dispatch => {
  return {
    homeActions: bindActionCreators(homeActions, dispatch)
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Categories)