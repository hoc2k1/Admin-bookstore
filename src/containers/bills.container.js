import React from 'react'
import BaseContainer from './base.container';
import Bills from '../components/bills/bills'
import { connect } from 'react-redux'
import * as userActions from '../actions/user.action'
import * as billActions from '../actions/bill.action'
import { bindActionCreators } from 'redux'
import { checkNotEmpty } from '../config/identify';
import { billStatus } from '../constants/values';

class BillsContainer extends BaseContainer {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state
    }
    this.props.userActions.auth()
    if(!this.state.searchType) {
      this.state.searchType = billStatus.wait_accept
    }
    this.props.billActions.getAllBills({status: this.state.searchType, page: this.state.page})
    this.onChangeLayout = this.onChangeLayout.bind(this) 
    this.updateStatus = this.updateStatus.bind(this)
    this.billStatus = [
      {
        value: billStatus.wait_accept,
        label: billStatus.wait_accept
      },
      {
        value: billStatus.shipping,
        label: billStatus.shipping
      },
      {
        value: billStatus.complete,
        label: billStatus.complete
      },
      {
        value: billStatus.cancel,
        label: billStatus.cancel
      },
    ]
  }

  componentWillReceiveProps(nextProps) {
    if (checkNotEmpty(this.props.bills)) {
      if (this.state.loading) {
        this.showLoading(false)
      }
    }
    else if ((nextProps.bills != this.props.bills)) {
      if (this.state.loading) {
        this.showLoading(false)
      }
    }
    if(nextProps.location.search != this.props.location.search) {
      const queryParams = new URLSearchParams(nextProps.location.search);
      this.state.page = queryParams.get('page') || 1;
      this.state.searchType = queryParams.get('searchType') || billStatus.wait_accept
      this.props.billActions.getAllBills({status: this.state.searchType, page: this.state.page || 1})
    }
  }
  onChangeLayout(nextStatus) {
    this.props.history.push({
      pathname: this.props.location.pathname,
      search: `?searchType=${nextStatus}`
    })
  }
  updateStatus = async (item, status) => {
    if (status != item.status) {
      const checkUpdate = await this.props.billActions.updateBill({id: item._id, status: status})
      if (checkUpdate) {
        await this.props.billActions.getAllBills({status: this.state.searchType, page: this.state.page || 1})
      } 
    }
  }
  onRemove = async () => {
    this.showLoading(true)
    const checkRemove = await this.props.billActions.deleteBill(this.state.form.values.id)
    if (checkRemove) {
      await this.props.billActions.getAllBills({status: this.state.searchType, page: this.state.page || 1})
      this.setState({ loading: false, showModalDelete: false })
    } 
  }
  renderContent() {
    return (
      <Bills 
        history={this.props.history} 
        state={this.state}
        parent={this}/>
    )
  }
}
const mapStateToProps = state => ({
  bills: state.billsReducers.bills.bills
});

const mapDispatchToProps = dispatch => {
  return {
    userActions: bindActionCreators(userActions, dispatch),
    billActions: bindActionCreators(billActions, dispatch)
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(BillsContainer)