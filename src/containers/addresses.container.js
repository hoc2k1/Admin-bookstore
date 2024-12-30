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
    this.props.userActions.getAllAddresses({searchText: this.state.searchText, page: this.state.page})
    this.form = addressForm
  }
  onRemove = async () => {
    this.showLoading(true)
    const checkRemove = await this.props.userActions.removeAddress(this.state.form.values.id)
    if (checkRemove) {
      await this.props.userActions.getAllAddresses({searchText: this.state.searchText, page: this.state.page})
      this.setState({ loading: false, showModalDelete: false })
    } 
  }
  componentWillReceiveProps(nextProps) {
    if (checkNotEmpty(this.props.addresses)) {
      if (this.state.loading) {
        this.showLoading(false)
      }
    }
    else if ((nextProps.addresses != this.props.addresses)) {
      if (this.state.loading) {
        this.showLoading(false)
      }
    }
    if(nextProps.location.search != this.props.location.search) {
      this.state.searchText = this.state.searchText
      this.state.searchType = this.state.searchType
      const queryParams = new URLSearchParams(nextProps.location.search);
      this.state.page = queryParams.get('page') || 1;
      this.props.userActions.getAllAddresses({searchText: this.state.searchText, page: queryParams.get('page') || 1})
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
  addresses: state.usersReducers.users.addresses
});

const mapDispatchToProps = dispatch => {
  return {
    userActions: bindActionCreators(userActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddressesContainer)