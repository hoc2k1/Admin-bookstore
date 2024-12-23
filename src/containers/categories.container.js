import React from 'react'
import BaseContainer from './base.container';
import Categories from '../components/products/categories';
import { connect } from 'react-redux'
import * as userActions from '../actions/user.action'
import * as productsAction from '../actions/products.action'
import { bindActionCreators } from 'redux'
import { checkNotEmpty } from '../config/identify';
import { categoryForm, inputStatus } from '../constants/values';

class CategoriesContainer extends BaseContainer {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state
    }
    this.props.productsAction.getAllCategories()
    this.props.userActions.auth()
    categoryForm.map((item) => {
      this.state.form.values[item.inputKey] = ''
      if (item.isValidate) {
        this.state.form.checkValidate[item.inputKey] = inputStatus.normal
      }
    })
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
  onChangeField(inputKey, text, newInputStatus) {
    const newFormState = this.state.form;
    newFormState.values[inputKey] = text;
    newFormState.checkValidate[inputKey] = newInputStatus;
    let checkButtonStatus = true

    categoryForm.map((item) => {
      if (item.isValidate && newFormState.checkValidate[item.inputKey] != inputStatus.success) {
        if (!(newFormState.checkValidate[item.inputKey] == inputStatus.normal && this.state.form.values[item.inputKey])) {
          checkButtonStatus = false
        }
      }
    })
    newFormState.buttonStatus = checkButtonStatus
    this.setState({form: newFormState})
  }
  onAdd = async () => {
    this.showLoading(true);
    await this.props.productsAction.addCategory(this.state.form.values);
    this.showLoading(false);
  };
  onEdit = async () => {
    this.showLoading(true);
    await this.props.productsAction.updateCategory(this.state.form.values);
    this.showLoading(false);
  }
  renderContent() {
    return (
      <Categories 
        history={this.props.history} 
        parent={this}
        onAdd={() => this.onAdd()}
        onEdit={() => this.onEdit()}
        onChangeField={(inputKey, text, newInputStatus) => this.onChangeField(inputKey, text, newInputStatus)}
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