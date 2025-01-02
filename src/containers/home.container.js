import React from 'react'
import BaseContainer from './base.container';
import Home from '../components/home/home';
import { connect } from 'react-redux'
import * as userActions from '../actions/user.action'
import * as homeActions from '../actions/home.action'
import { bindActionCreators } from 'redux'
import { checkNotEmpty } from '../config/identify';
import toast from 'react-hot-toast';

class HomeContainer extends BaseContainer {
  constructor(props) {
    super(props);
    const currentDate = new Date();
    const startDate = new Date();
    startDate.setDate(currentDate.getDate() - 7);

    this.state = {
      ...this.state,
      startDate: startDate,
      endDate: currentDate
    }
    this.props.userActions.auth()
    const dataBody = {
      startDate: this.state.startDate.toISOString().split("T")[0],
      endDate: this.state.endDate.toISOString().split("T")[0]
    }
    this.props.homeActions.getRevenue(dataBody)
    this.onChangeDate=this.onChangeDate.bind(this)
  }
  componentWillReceiveProps(nextProps) {
    if (checkNotEmpty(this.props.revenue)) {
      if (this.state.loading) {
        this.showLoading(false)
      }
    }
    else if (nextProps.revenue != this.props.revenue) {
      if (this.state.loading) {
        this.showLoading(false)
      }
    }
  }
  onChangeDate(dateType, data) {
    const dataBody = {
      startDate: this.state.startDate.toISOString().split("T")[0],
      endDate: this.state.endDate.toISOString().split("T")[0]
    }
    dataBody[dateType] = data.toISOString().split("T")[0]

    if (dataBody.endDate < dataBody.startDate) {
      toast.error("Ngày không hợp lệ")
    }
    else {
      this.props.homeActions.getRevenue(dataBody)
      this.setState({ [dateType]: data })
    }

  }
  renderContent() {
    return (
      <Home 
        history={this.props.history}
        state={this.state}
        parent={this}/>
    )
  }
}
const mapStateToProps = state => ({
  revenue: state.homeReducers.home.revenue
});

const mapDispatchToProps = dispatch => {
  return {
    userActions: bindActionCreators(userActions, dispatch),
    homeActions: bindActionCreators(homeActions, dispatch)
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer)