import React from 'react'
import BaseContainer from './base.container';
import LayoutBanner from '../components/layout/layout.banner'
import { connect } from 'react-redux'
import * as userActions from '../actions/user.action'
import * as homeActions from '../actions/home.action'
import { bindActionCreators } from 'redux'
import { checkNotEmpty } from '../config/identify';

class LayoutBannerContainer extends BaseContainer {
  constructor(props) {
    super(props);
    this.props.userActions.auth()
    this.props.homeActions.getAllBanner()
    this.state = {
      ...this.state
    }
  }
  componentWillReceiveProps(nextProps) {
    if (checkNotEmpty(this.props.banners)) {
      if (this.state.loading) {
        this.showLoading(false)
      }
    }
    else if (nextProps.banners != this.props.banners) {
      if (this.state.loading) {
        this.showLoading(false)
      }
    }
  }
  renderContent() {
    return (
      <LayoutBanner history={this.props.history} parent={this}/>
    )
  }
}
const mapStateToProps = state => ({
  banners: state.homeReducers.home.banners
});

const mapDispatchToProps = dispatch => {
  return {
    userActions: bindActionCreators(userActions, dispatch),
    homeActions: bindActionCreators(homeActions, dispatch)
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LayoutBannerContainer)