import React from 'react'
import { connect } from 'react-redux'
import { checkNotEmpty } from '../../config/identify'

const Addresses = (props) => {
  const renderHeaderGrid = () => {
    return (
      <div className='row w-100 mx-auto'>
        <div className='col-2 secondary-bg d-flex align-items-center py-md-2 py-1'>
          <span className='heading-small color-theme'>Họ tên</span>
        </div>
        <div className='col-5 secondary-bg d-flex align-items-center py-md-2 py-1'>
          <span className='heading-small color-theme'>Địa chỉ</span>
        </div>
        <div className='col-2 secondary-bg d-flex align-items-center py-md-2 py-1'>
          <span className='heading-small color-theme'>Số điện thoại</span>
        </div>
        <div className='col-2 secondary-bg d-flex align-items-center py-md-2 py-1'>
          <span className='heading-small color-theme'>Email</span>
        </div>
        <div className='col-1 secondary-bg d-flex align-items-center py-md-2 py-1'>
          <span className='heading-small color-theme'>Hành động</span>
        </div>
      </div>
    )
  }
  const renderItem = (item) => {
    let address = ''
    if (item.specificAddress) {
      address += item.specificAddress
    }
    if (item.commune) {
      if (address) {
        address += ', ' + item.commune
      }
      else {
        address += item.commune
      }
    }
    if (address) {
      address += ', ' + item.district + ', ' + item.province
    }
    else {
      address += item.district + ', ' + item.province
    }
    let user;
    if (checkNotEmpty(props.users)) {
      user = props.users.find(user => user._id == item.id_user);
    }
    return (
      <div className='row border-bottom w-100 mx-auto'>
        <div className='col-2 d-flex align-items-center py-md-2 py-1'>
          <span>{`${item.firstName} ${item.lastName}`}</span>
        </div>
        <div className='col-5 d-flex align-items-center py-md-2 py-1'>
          <span>{address}</span>
        </div>
        <div className='col-2 d-flex align-items-center py-md-2 py-1'>
          <span>{item.phoneNumber}</span>
        </div>
        <div className='col-2 d-flex align-items-center py-md-2 py-1'>
          <span>{user?.email}</span>
        </div>
        <div className='col-1 d-flex align-items-center py-md-2 py-1 gap-2 gap-md-3'>
          <i className='fa fa-trash font-size-normal p-2 secondary-bg icon-delete cursor-pointer icon-button' onClick={() => props.parent.onClickRemove(item)}></i>
        </div>
      </div>
    )
  }
  const renderGrid = () => {
    if (props.addresses?.length > 0) {
      return (
        <div className='w-100 flex-grow-1 d-flex py-md-3 py-2 overflow-auto'>
          <div className='content-width w-100 h-full overflow-x-auto'>
            <div className='h-fit w-200 w-md-150 w-lg-100'>
              {renderHeaderGrid()}
              {props.addresses.map((item, index) => {
                return (
                  <div key={`item-grid-addresses-${index}`}>
                    {renderItem(item)}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )
    }
    else {
      return (
        <div className='w-100 flex-grow-1 d-flex py-md-3 py-2 overflow-auto'>
          <div className='content-width w-100 h-fit d-flex justify-content-center align-items-center'>
            <span className='heading'>Không có địa chỉ nào</span>
          </div>
        </div>
      )
    }
  }
  return (
    <div className='w-100 h-100 d-flex flex-column'>
      {renderGrid()}
    </div>
  )
}
const mapStateToProps = state => ({
  addresses: state.usersReducers.users.addresses,
  users: state.usersReducers.users.users
});
export default connect(mapStateToProps, null)(Addresses)