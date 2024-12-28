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
    this.form = publisherForm
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
  onAdd = async () => {
    this.showLoading(true);
    await this.props.productsAction.addPublisher(this.state.form.values);
    this.setState({ loading: false, showModal: false })
  };
  onEdit = async () => {
    this.showLoading(true);
    await this.props.productsAction.updatePublisher(this.state.form.values);
    this.setState({ loading: false, showModal: false })
  }
  renderContent() {
    return (
      <Publishers 
        history={this.props.history} 
        state={this.state}
        parent={this}
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