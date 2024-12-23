import React from 'react'
import BaseContainer from './base.container';
import Publishers from '../components/products/publishers';
import { connect } from 'react-redux'
import * as userActions from '../actions/user.action'
import * as productsAction from '../actions/products.action'
import { bindActionCreators } from 'redux'
import { checkNotEmpty } from '../config/identify';
import { publisherForm, inputStatus } from '../constants/values';

class PublishersContainer extends BaseContainer {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state
    }
    this.props.productsAction.getAllPublishers()
    this.props.userActions.auth()
    publisherForm.map((item) => {
      this.state.form.values[item.inputKey] = ''
      if (item.isValidate) {
        this.state.form.checkValidate[item.inputKey] = inputStatus.normal
      }
    })
  }
  componentWillReceiveProps(nextProps) {
    if (checkNotEmpty(this.props.publishers)) {
      if (this.state.loading) {
        this.showLoading(false)
      }
    }
    else if (nextProps.publishers != this.props.publishers) {
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

    publisherForm.map((item) => {
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
    await this.props.productsAction.addPublisher(this.state.form.values);
    this.showLoading(false);
  };
  onEdit = async () => {
    this.showLoading(true);
    await this.props.productsAction.updatePublisher(this.state.form.values);
    this.showLoading(false);
  }
  renderContent() {
    return (
      <Publishers 
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
  publishers: state.productsReducers.products.publishers
});

const mapDispatchToProps = dispatch => {
  return {
    userActions: bindActionCreators(userActions, dispatch),
    productsAction: bindActionCreators(productsAction, dispatch)
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PublishersContainer)