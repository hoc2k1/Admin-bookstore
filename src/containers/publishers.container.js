import React from 'react'
import BaseContainer from './base.container';
import Publishers from '../components/products/publishers';
import { connect } from 'react-redux'
import * as userActions from '../actions/user.action'
import { bindActionCreators } from 'redux'
import { checkNotEmpty } from '../config/identify';

class PublishersContainer extends BaseContainer {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state
    }
    this.props.userActions.auth()
  }
  renderContent() {
    return (
      <Publishers history={this.props.history} parent={this}/>
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
export default connect(mapStateToProps, mapDispatchToProps)(PublishersContainer)