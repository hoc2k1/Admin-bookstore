import React from 'react'
import BaseContainer from './base.container';
import Products from '../components/products/products';
import { connect } from 'react-redux'
import * as userActions from '../actions/user.action'
import * as productsAction from '../actions/products.action'
import { bindActionCreators } from 'redux'
import { productForm } from '../constants/values';
productForm

class ProductsContainer extends BaseContainer {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state
    }
    if (!this.state.searchType) this.state.searchType = 'name'
    this.props.userActions.auth()
    this.props.productsAction.getAllCategories()
    this.props.productsAction.getAllPublishers()
    this.props.productsAction.getAllAuthors()
    this.props.productsAction.getAllProducts({searchText: this.state.searchText, page: this.state.page, searchType: this.state.searchType})
    this.form = productForm
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.products && nextProps.publishers && nextProps.categories && nextProps.authors) {
      const dataCategories = [];
      const dataAuthors = [];
      const dataPublisher = [];
      nextProps.publishers.map((item) => dataPublisher.push({label: item.name, value: item._id}))
      nextProps.authors.map((item) => dataAuthors.push({label: item.name, value: item._id}))
      nextProps.categories.map((item) => dataCategories.push({label: item.name, value: item._id}))
      this.state.form.data={
        available: [
          {
            label: 'Còn hàng',
            value: true,
          },
          {
            label: 'Hết hàng',
            value: false,
          }
        ],
        id_category: dataCategories,
        id_author: dataAuthors,
        id_publisher: dataPublisher
      }
      if (this.state.loading) {
        this.showLoading(false)
      }
    }
    else if (nextProps.products != this.props.products) {
      if (this.state.loading) {
        this.showLoading(false)
      }
    }
    if(nextProps.location.search != this.props.location.search) {
      this.state.searchText = this.state.searchText
      this.state.searchType = this.state.searchType
      const queryParams = new URLSearchParams(nextProps.location.search);
      this.state.page = queryParams.get('page') || 1;
      this.props.productsAction.getAllProducts({searchText: this.state.searchText, page: this.state.page, searchType: this.state.searchType})
    }
  }
  onAdd = async () => {
    this.showLoading(true);
    const check = await this.props.productsAction.addProduct(this.state.form.values);
    if (check) {
      await this.props.productsAction.getAllProducts({searchText: this.state.searchText, page: this.state.page, searchType: this.state.searchType})
      this.setState({ loading: false, showModal: false })
    }
  };
  onEdit = async () => {
    this.showLoading(true);
    const check = await this.props.productsAction.updateProduct(this.state.form.values);
    if (check) {
      await this.props.productsAction.getAllProducts({searchText: this.state.searchText, page: this.state.page, searchType: this.state.searchType})
      this.setState({ loading: false, showModal: false })
    }
  }
  onRemove = async () => {
    this.showLoading(true)
    const checkRemove = await this.props.productsAction.deleteProduct(this.state.form.values.id)
    if (checkRemove) {
      await this.props.productsAction.getAllProducts({searchText: this.state.searchText, page: this.state.page, searchType: this.state.searchType})
      this.setState({ loading: false, showModalDelete: false })
    } 
  }
  renderContent() {
    return (
      <Products 
        history={this.props.history}
        state={this.state}
        categories={this.props.categories}
        authors={this.props.authors}
        publishers={this.props.publishers}
        parent={this}/>
    )
  }
}
const mapStateToProps = state => ({
  publishers: state.productsReducers.products.publishers,
  categories: state.productsReducers.products.categories,
  authors: state.productsReducers.products.authors,
  products: state.productsReducers.products.books,
});

const mapDispatchToProps = dispatch => {
  return {
    userActions: bindActionCreators(userActions, dispatch),
    productsAction: bindActionCreators(productsAction, dispatch),
    
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductsContainer)