import React from 'react'
import BaseContainer from './base.container';
import Addresses from '../components/users/addresses';
import { connect } from 'react-redux'
import * as userActions from '../actions/user.action'
import { bindActionCreators } from 'redux'
import { checkNotEmpty } from '../config/identify'
import { addressForm } from '../constants/values';

class AddressesContainer extends BaseContainer {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state
    }
    this.props.userActions.auth()
    this.props.userActions.getAllUsers()
    this.props.userActions.getAllAddresses()
    this.form = addressForm
  }
  onRemove = async () => {
    this.showLoading(true)
    await this.props.userActions.removeAddress(this.state.form.values.id)
    this.setState({ loading: false, showModalDelete: false })
  }
  componentWillReceiveProps(nextProps) {
    if (checkNotEmpty(this.props.addresses) && checkNotEmpty(this.props.users)) {
      if (this.state.loading) {
        this.showLoading(false)
      }
    }
    else if ((nextProps.addresses != this.props.addresses) || (nextProps.users != this.props.users)) {
      if (this.state.loading) {
        this.showLoading(false)
      }
    }
  }
  renderContent() {
    return (
      <Addresses
        history={this.props.history}
        state={this.state}
        parent={this}
      />
    )
  }
}

const mapStateToProps = state => ({
  addresses: state.usersReducers.users.addresses,
  users: state.usersReducers.users.users
});

const mapDispatchToProps = dispatch => {
  return {
    userActions: bindActionCreators(userActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddressesContainer)