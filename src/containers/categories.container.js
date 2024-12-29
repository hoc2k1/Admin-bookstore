import React from 'react'
import BaseContainer from './base.container';
import Categories from '../components/products/categories';
import { connect } from 'react-redux'
import * as userActions from '../actions/user.action'
import * as productsAction from '../actions/products.action'
import { bindActionCreators } from 'redux'
import { checkNotEmpty } from '../config/identify';
import { categoryForm } from '../constants/values';

class CategoriesContainer extends BaseContainer {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state
    }
    this.props.productsAction.getAllCategories()
    this.props.userActions.auth()
    this.form = categoryForm
  }
  componentWillReceiveProps(nextProps) {
    if (checkNotEmpty(this.props.categories)) {
      if (this.state.loading) {
        this.showLoading(false)
      }
    }
    else if (nextProps.categories != this.props.categories) {
      if (this.state.loading) {
        this.showLoading(false)
      }
    }
  }
  onAdd = async () => {
    this.showLoading(true);
    await this.props.productsAction.addCategory(this.state.form.values);
    this.setState({ loading: false, showModal: false })
  };
  onEdit = async () => {
    this.showLoading(true);
    await this.props.productsAction.updateCategory(this.state.form.values);
    this.setState({ loading: false, showModal: false })
  }
  renderContent() {
    return (
      <Categories 
        history={this.props.history} 
        state={this.state}
        parent={this}
      />
    )
  }
}
const mapStateToProps = state => ({
  categories: state.productsReducers.products.categories
});

const mapDispatchToProps = dispatch => {
  return {
    userActions: bindActionCreators(userActions, dispatch),
    productsAction: bindActionCreators(productsAction, dispatch)
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CategoriesContainer)