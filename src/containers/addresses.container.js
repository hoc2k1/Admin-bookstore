import React from 'react'
import BaseContainer from './base.container';
import Addresses from '../components/users/addresses';
import { connect } from 'react-redux'
import * as userActions from '../actions/user.action'
import { bindActionCreators } from 'redux'

class AddressesContainer extends BaseContainer {
  constructor(props) {
    super(props);
    this.props.userActions.auth()
  }
  renderContent() {
    return (
      <Addresses history={this.props.history}/>
    )
  }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => {
  return {
    userActions: bindActionCreators(userActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddressesContainer)