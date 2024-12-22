import React from 'react'
import BaseContainer from './base.container';
import LayoutHome from '../components/layout/layout.home'
import { connect } from 'react-redux'
import * as userActions from '../actions/user.action'
import { bindActionCreators } from 'redux'

class LayoutHomeContainer extends BaseContainer {
  constructor(props) {
    super(props);
    this.props.userActions.auth()
  }
  renderContent() {
    return (
      <LayoutHome history={this.props.history}/>
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
export default connect(mapStateToProps, mapDispatchToProps)(LayoutHomeContainer)