import React from 'react'
import { connect } from 'react-redux'
import { checkNotEmpty } from '../../config/identify'
import Pagination from '../global/pagination'
import { InputPicker } from 'rsuite'

const Users = (props) => {
  const renderSearch = () => {
    return (
      <div className='content-width mt-md-4 mt-3 d-flex align-items-center gap-2'>
        <span>Tìm kiếm: </span>
        <div className='border d-flex align-items-center w-fit'>
          <input 
            type="text"
            className={`p-2 border-0 outline-none`}
            placeholder={"Tìm kiếm theo email"}
            value={props.state.searchText}
            onSubmit={() => props.parent.onSearch()}
            onChange={(e) => {
              props.parent.setState({ searchText: e.target.value })
            }}
          ></input>
          <i className='fa fa-search heading color-theme borber-left p-2 cursor-pointer' onClick={() => props.parent.onSearch()}></i>
        </div>
        
      </div>
    )
  }
  const renderHeaderGrid = () => {
    return (
      <div className='row w-100 mx-auto'>
        <div className='col-3 secondary-bg d-flex align-items-center py-md-2 py-1'>
          <span className='heading-small color-theme'>Họ</span>
        </div>
        <div className='col-3 secondary-bg d-flex align-items-center py-md-2 py-1'>
          <span className='heading-small color-theme'>Tên</span>
        </div>
        <div className='col-3 secondary-bg d-flex align-items-center py-md-2 py-1'>
          <span className='heading-small color-theme'>Email</span>
        </div>
        <div className='col-2 secondary-bg d-flex align-items-center py-md-2 py-1'>
          <span className='heading-small color-theme'>Là quản lý?</span>
        </div>
        <div className='col-1 secondary-bg d-flex align-items-center py-md-2 py-1'>
          <span className='heading-small color-theme'>Hành động</span>
        </div>
      </div>
    )
  }
  const renderItem = (item) => {
    return (
      <div className='row border-bottom w-100 mx-auto'>
        <div className='col-3 d-flex align-items-center py-md-2 py-1'>
          <span>{`${item.firstName} ${item.lastName}`}</span>
        </div>
        <div className='col-3 d-flex align-items-center py-md-2 py-1'>
          <span>{item.lastName}</span>
        </div>
        <div className='col-3 d-flex align-items-center py-md-2 py-1'>
          <span>{item.email}</span>
        </div>
        <div className='col-2 d-flex align-items-center py-md-2 py-1'>
          <InputPicker
            data={props.parent.role}
            placeholder={''}
            defaultValue={item.is_admin}
            value={item.is_admin}
            onChange={(value) => props.parent.updateRole(item, value)}
            cleanable={false}
          />
        </div>
        <div className='col-1 d-flex align-items-center py-md-2 py-1 gap-2 gap-md-3'>
          <i className='fa fa-trash font-size-normal p-2 secondary-bg icon-delete cursor-pointer icon-button' onClick={() => props.parent.onClickRemove(item)}></i>
        </div>
      </div>
    )
  }
  const renderGrid = () => {
    if (props.users?.length > 0) {
      return (
        <div className='w-100 flex-grow-1 d-flex py-md-3 py-2 overflow-auto flex-column justify-content-between'>
          <div className='content-width w-100 h-100 overflow-x-auto'>
            <div className='h-fit w-200 w-md-150 w-lg-100'>
              {renderHeaderGrid()}
              {props.users.map((item, index) => {
                return (
                  <div key={`item-grid-users-${index}`}>
                    {renderItem(item)}
                  </div>
                )
              })}
            </div>
          </div>
          <Pagination
            history={props.history}
            state={props.state} 
            totalPage={props.usersTotalPage}
          />
        </div>
      )
    }
    else {
      return (
        <div className='w-100 flex-grow-1 d-flex py-md-3 py-2 overflow-auto'>
          <div className='content-width w-100 h-fit d-flex justify-content-center align-items-center'>
            <span className='heading'>Không có tài khoản nào nào</span>
          </div>
        </div>
      )
    }
  }
  return (
    <div className='w-100 h-100 d-flex flex-column'>
      {renderSearch()}
      {renderGrid()}
    </div>
  )
}
const mapStateToProps = state => ({
  users: state.usersReducers.users.users,
  usersTotalPage: state.usersReducers.users.usersTotalPage
});
export default connect(mapStateToProps, null)(Users)