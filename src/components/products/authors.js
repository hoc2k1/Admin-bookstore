import React, { useState } from 'react'
import { connect } from 'react-redux'
import * as homeActions from '../../actions/home.action'
import { bindActionCreators } from 'redux'
import HeaderContent from '../header/header.content'
import CustomModal from '../global/custom.modal'
import { authorForm, inputStatus } from '../../constants/values'
import FloatingInput from '../global/floating.input'
import Button from '../global/button'

const Authors = (props) => {
  const [showModal, setShowModal] = useState(false)

  const editItem = (data) => {
    const newFormState = props.parent.state.form
    props.parent.isEdit = true
    newFormState.values['id'] = data._id
    authorForm.map((item) => {
      newFormState.values[item.inputKey] = data[item.inputKey]
      if (item.isValidate) {
        newFormState.checkValidate[item.inputKey] = inputStatus.normal
      }
    })

    let checkButtonStatus = true
    authorForm.map((item) => {
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
  const removeItem = (data) => {

  }
  const addItem = () => {
    const newFormState = props.parent.state.form
    props.parent.isEdit = false
    authorForm.map((item) => {
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
        <div className='col-6 secondary-bg d-flex align-items-center py-md-2 py-1'>
          <span className='heading-small color-theme'>Tên tác giả</span>
        </div>
        <div className='col-6 secondary-bg d-flex align-items-center py-md-2 py-1'>
          <span className='heading-small color-theme'>Hành động</span>
        </div>
      </div>
    )
  }
  const renderItem = (item) => {
    return (
      <div className='row border-bottom w-100 mx-auto'>
        <div className='col-6 d-flex align-items-center py-md-2 py-1'>
          <span>{item.name}</span>
        </div>
        <div className='col-6 d-flex align-items-center py-md-2 py-1 gap-2 gap-md-3'>
          <i className='fa fa-pencil font-size-normal p-2 secondary-bg cursor-pointer icon-button' onClick={() => editItem(item)}></i>
          {/* <i className='fa fa-trash font-size-normal p-2 secondary-bg icon-delete cursor-pointer icon-button' onClick={() => removeItem(item)}></i> */}
        </div>
      </div>
    )
  }
  const renderGrid = () => {
    if (props.authors?.length > 0) {
      return (
        <div className='w-100 flex-grow-1 d-flex py-md-3 py-2 overflow-auto'>
          <div className='content-width w-100 h-fit'>
            {renderHeaderGrid()}
            {props.authors.map((item, index) => {
              return (
                <div key={`item-grid-authors-${index}`}>
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
            <span className='heading'>Không có tác giả nào</span>
          </div>
        </div>
      )
    }
  }
  return (
    <div className='w-100 h-100 d-flex flex-column'>
      <HeaderContent onCLickHeader={() => addItem()} title="Thêm tác giả"/>
      {renderGrid()}
      <CustomModal closeModal={() => setShowModal(false)} showPopup={showModal}>
        <div className='login-form'>
          {authorForm.map((item, index) => {
            return (
              <FloatingInput
                {...item}
                key={`login-${index}`}
                value={props.parent.state.form.values[item.inputKey]}
                checkValidate={props.parent.state.form.checkValidate[item.inputKey]}
                onChange={(inputKey, text, newInputStatus) => props.onChangeField(inputKey, text, newInputStatus)} />
            )
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
  authors: state.productsReducers.products.authors
});
const mapDispatchToProps = dispatch => {
  return {
    homeActions: bindActionCreators(homeActions, dispatch)
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Authors)