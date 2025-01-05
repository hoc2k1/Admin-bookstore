import React from 'react'
import { connect } from 'react-redux'
import { checkNotEmpty } from '../../config/identify'
import Pagination from '../global/pagination'
import { InputPicker } from 'rsuite';
import Price from '../global/price';
import Form from '../global/form';
import CustomModal from '../global/custom.modal';
import HeaderContent from '../header/header.content';

const Products = (props) => {
  const renderSearch = () => {
    const data = [
      {
        label: 'Tên',
        value: "name"
      },
      {
        label: 'Tác giả',
        value: "author"
      },
      {
        label: 'Thể loại',
        value: "category"
      },
      {
        label: 'Nhà xuất bản',
        value: "publisher"
      }
    ]
    return (
      <div className='content-width mt-md-4 mt-3 d-flex align-items-center gap-2'>
        <div className='w-1'>
          <InputPicker
            placeholder={''}
            data={data}
            defaultValue={props.state.searchType}
            onChange={(value) => props.parent.setState({searchType: value})}
            cleanable={false}
          />
        </div>

        <div className='border d-flex align-items-center w-fit'>
          <input 
            type="text"
            className={`p-2 border-0 outline-none`}
            placeholder={"Nhập từ tìm kiếm"}
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
      <div className='row w-200 w-md-150 w-lg-100 mx-auto'>
        <div className='col-3 secondary-bg d-flex align-items-center py-md-2 py-1'>
          <span className='heading-small color-theme'>Sản phẩm</span>
        </div>
        <div className='col-4 secondary-bg d-flex align-items-center py-md-2 py-1'>
          <span className='heading-small color-theme'>Mô tả</span>
        </div>
        <div className='col-2 secondary-bg d-flex align-items-center py-md-2 py-1'>
          <span className='heading-small color-theme'>Số lượng</span>
        </div>
        <div className='col-1 secondary-bg d-flex align-items-center py-md-2 py-1'>
          <span className='heading-small color-theme'>Còn hàng?</span>
        </div>
        <div className='col-2 secondary-bg d-flex align-items-center py-md-2 py-1'>
          <span className='heading-small color-theme'>Hành động</span>
        </div>
      </div>
    )
  }
  const renderItem = (item) => {
    const category = props.categories?.find(item1 => item1._id == item.id_category)
    const author = props.authors?.find(item1 => item1._id == item.id_author)
    const publisher = props.publishers?.find(item1 => item1._id == item.id_publisher)
    let url_image = '/img/placeholder-image.png'
    if (item.img && item.img.length > 0) {
      url_image = item.img[0]
    }
    
    return (
      <div className='row border-bottom w-200 w-md-150 w-lg-100 mx-auto'>
        <div className='col-3 d-flex align-items-center py-md-2 py-1'>
          <img className='image-in-grid m-1' src={url_image}></img>
          <div>
            <div>
              <span className='heading p'>{item.name}</span>
            </div>
            <div>
              <Price price={item.price} sales={item.sales}/>
            </div>
            <div>
              <span><span className='heading-small'>Thể loại: </span>{category?.name}</span>
            </div>
            <div>
              <span><span className='heading-small'>Tác giả: </span>{author?.name}</span>
            </div>
            <div>
              <span><span className='heading-small'>Nhà sản xuất: </span>{publisher?.name}</span>
            </div>
          </div>
        </div>
        <div className='col-4 d-flex align-items-center py-md-2 py-1'>
          <span className='text-truncate-multiline'>{item.describe}</span>
        </div>
        <div className='col-2 d-flex align-items-center py-md-2 py-1'>
          <span>{item.count}</span>
        </div>
        <div className='col-1 d-flex align-items-center py-md-2 py-1'>
          <span>{item.available ? 'Còn hàng' : 'Hết hàng'}</span>
        </div>
        <div className='col-2 d-flex align-items-center py-md-2 py-1 gap-2 gap-md-3'>
          <i className='fa fa-pencil font-size-normal p-2 secondary-bg cursor-pointer icon-button' onClick={() => props.parent.onClickEdit(item)}></i>
          <i className='fa fa-trash font-size-normal p-2 secondary-bg icon-delete cursor-pointer icon-button' onClick={() => props.parent.onClickRemove(item)}></i>
        </div>
      </div>
    )
  }
  const renderGrid = () => {
    if (props.products?.length > 0) {
      return (
        <div className='w-100 flex-grow-1 d-flex py-md-3 py-2 overflow-auto flex-column justify-content-between'>
          <div className='content-width w-100 h-100 overflow-x-auto'>
            <div className='h-fit w-200 w-md-150 w-lg-100'>
              {renderHeaderGrid()}
              {props.products.map((item, index) => {
                return (
                  <div key={`item-grid-products-${index}`}>
                    {renderItem(item)}
                  </div>
                )
              })}
            </div>
          </div>
          <Pagination
            history={props.history}
            state={props.state} 
            totalPage={props.productsTotalPage}
          />
        </div>
      )
    }
    else {
      return (
        <div className='w-100 flex-grow-1 d-flex py-md-3 py-2 overflow-auto'>
          <div className='content-width w-100 h-fit d-flex justify-content-center align-items-center'>
            <span className='heading'>Không có sách nào</span>
          </div>
        </div>
      )
    }
  }
  return (
    <div className='w-100 h-100 d-flex flex-column'>
      <HeaderContent onClickHeader={() => props.parent.onClickAdd()} title="Thêm sách"/>
      {renderSearch()}
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
  products: state.productsReducers.products.books,
  productsTotalPage: state.productsReducers.products.totalBooksPage
});
export default connect(mapStateToProps, null)(Products)