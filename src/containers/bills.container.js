import React from 'react'
import BaseContainer from './base.container';
import Bills from '../components/bills/bills'
import { connect } from 'react-redux'
import * as userActions from '../actions/user.action'
import { bindActionCreators } from 'redux'

class BillsContainer extends BaseContainer {
  constructor(props) {
    super(props)
    this.props.userActions.auth()
  }
  renderContent() {
    return (
      <Bills history={this.props.history}/>
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
export default connect(mapStateToProps, mapDispatchToProps)(BillsContainer)