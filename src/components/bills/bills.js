import React from 'react'
import { connect } from 'react-redux'
import { checkNotEmpty } from '../../config/identify'
import Pagination from '../global/pagination'
import { billStatus, currency } from '../../constants/values'
import { InputPicker } from 'rsuite'

const Bills = (props) => {
  const renderHeader = () => {
    return (
      <div className='py-2 py-md-3 d-flex gap-3 align-items-center justify-content-center content-width'>
        <div
          onClick={() => props.state.searchType != billStatus.wait_accept && props.parent.onChangeLayout(billStatus.wait_accept)} 
          className={`bill-status-button secondary-bg ${ props.state.searchType == billStatus.wait_accept ? 'active cursor-not-allowed': 'cursor-pointer'}`}>
          <span className='heading-small p-2'>{billStatus.wait_accept}</span>
        </div>
        <div
          onClick={() => props.state.searchType != billStatus.shipping && props.parent.onChangeLayout(billStatus.shipping)} 
          className={`bill-status-button secondary-bg ${ props.state.searchType == billStatus.shipping ? 'active cursor-not-allowed': 'cursor-pointer'}`}>
          <span className='heading-small p-2'>{billStatus.shipping}</span>
        </div>
        <div
          onClick={() => props.state.searchType != billStatus.complete && props.parent.onChangeLayout(billStatus.complete)} 
          className={`bill-status-button secondary-bg ${ props.state.searchType == billStatus.complete ? 'active cursor-not-allowed': 'cursor-pointer'}`}>
          <span className='heading-small p-2'>{billStatus.complete}</span>
        </div>
        <div
          onClick={() => props.state.searchType != billStatus.cancel && props.parent.onChangeLayout(billStatus.cancel)} 
          className={`bill-status-button secondary-bg ${ props.state.searchType == billStatus.cancel ? 'active cursor-not-allowed': ''}cursor-pointer`}>
          <span className='heading-small p-2'>{billStatus.cancel}</span>
        </div>
      </div>
    )
  }
  const renderHeaderGrid = () => {
    return (
      <div className='row w-md-150 w-200 mx-auto'>
        <div className='col-1 secondary-bg d-flex align-items-center py-md-2 py-1'>
          <span className='heading-small color-theme'>Họ tên</span>
        </div>
        <div className='col-2 secondary-bg d-flex align-items-center py-md-2 py-1'>
          <span className='heading-small color-theme'>Địa chỉ</span>
        </div>
        <div className='col-1 secondary-bg d-flex align-items-center py-md-2 py-1'>
          <span className='heading-small color-theme'>Số điện thoại</span>
        </div>
        <div className='col-1 secondary-bg d-flex align-items-center py-md-2 py-1'>
          <span className='heading-small color-theme'>Phương thức thanh toán</span>
        </div>
        <div className='col-3 secondary-bg d-flex align-items-center py-md-2 py-1'>
          <span className='heading-small color-theme'>Sản phẩm</span>
        </div>
        <div className='col-1 secondary-bg d-flex align-items-center py-md-2 py-1'>
          <span className='heading-small color-theme'>Tổng số tiền</span>
        </div>
        <div className='col-1 secondary-bg d-flex align-items-center py-md-2 py-1'>
          <span className='heading-small color-theme'>Ngày đặt</span>
        </div>
        <div className='col-1 secondary-bg d-flex align-items-center py-md-2 py-1'>
          <span className='heading-small color-theme'>Trạng thái</span>
        </div>
        <div className='col-1 secondary-bg d-flex align-items-center py-md-2 py-1'>
          <span className='heading-small color-theme'>Hành động</span>
        </div>
      </div>
    )
  }
  const renderItem = (item) => {
    return (
      <div className='row border-bottom w-md-150 w-200 mx-auto'>
        <div className='col-1 d-flex align-items-center py-md-2 py-1'>
          <span>{`${item.name}`}</span>
        </div>
        <div className='col-2 d-flex align-items-center py-md-2 py-1'>
          <span>{item.address}</span>
        </div>
        <div className='col-1 d-flex align-items-center py-md-2 py-1'>
          <span>{item.phone}</span>
        </div>
        <div className='col-1 d-flex align-items-center py-md-2 py-1'>
          <span>{item.payment_method}</span>
        </div>
        <div className='col-3 d-flex align-items-center py-md-2 py-1'>
          <span>{item.email}</span>
        </div>
        <div className='col-1 d-flex align-items-center py-md-2 py-1'>
          <span>{item.total}<sup>{currency}</sup></span>
        </div>
        <div className='col-1 d-flex align-items-center py-md-2 py-1'>
          <span>{new Date(item.date_create).toLocaleDateString("vi-VN")}</span>
        </div>
        <div className='col-1 d-flex align-items-center py-md-2 py-1'>
          <InputPicker 
            data={props.parent.billStatus}
            placeholder={''}
            defaultValue={item.status}
            value={item.status}
            onChange={(value) => props.parent.updateStatus(item, value)}
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
    if (props.bills?.length > 0) {
      return (
        <div className='w-100 flex-grow-1 d-flex py-md-3 py-2 overflow-auto flex-column justify-content-between'>
          <div className='content-width w-100 h-100 overflow-x-auto'>
            <div className='h-fit w-200 w-md-150 w-lg-100'>
              {renderHeaderGrid()}
              {props.bills.map((item, index) => {
                return (
                  <div key={`item-grid-bill-${index}`}>
                    {renderItem(item)}
                  </div>
                )
              })}
            </div>
          </div>
          <Pagination
            history={props.history}
            state={props.state} 
            totalPage={props.totalBillsPage}
          />
        </div>
      )
    }
    else {
      return (
        <div className='w-100 flex-grow-1 d-flex py-md-3 py-2 overflow-auto'>
          <div className='content-width w-100 h-fit d-flex justify-content-center align-items-center'>
            <span className='heading'>Không có đơn hàng nào</span>
          </div>
        </div>
      )
    }
  }
  return (
    <div className='w-100 h-100 d-flex flex-column'>
      {renderHeader()}
      {renderGrid()}
    </div>
  )
}
const mapStateToProps = state => ({
  bills: state.billsReducers.bills.bills,
  totalBillsPage: state.billsReducers.bills.totalBillsPage
});
export default connect(mapStateToProps, null)(Bills)