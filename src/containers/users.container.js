import React from 'react'
import BaseContainer from './base.container';
import Users from '../components/users/users';
import { connect } from 'react-redux'
import * as userActions from '../actions/user.action'
import { bindActionCreators } from 'redux'
import { checkNotEmpty } from '../config/identify';
import { userForm } from '../constants/values';

class UsersContainer extends BaseContainer {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state
    }
    this.props.userActions.auth()
    this.props.userActions.getAllUsers({searchText: this.state.searchText, page: this.state.page})
    this.form = userForm
    this.role = [
      {
        value: false,
        label: 'Không'
      },
      {
        value: true,
        label: 'Có'
      }
    ]
    this.updateRole = this.updateRole.bind(this)
  }
  onRemove = async () => {
    this.showLoading(true)
    const checkRemove = await this.props.userActions.removeUser(this.state.form.values.id)
    if (checkRemove) {
      await this.props.userActions.getAllUsers({searchText: this.state.searchText, page: this.state.page})
      this.setState({ loading: false, showModalDelete: false })
    }
  }
  componentWillReceiveProps(nextProps) {
    if (checkNotEmpty(this.props.users)) {
      if (this.state.loading) {
        this.showLoading(false)
      }
    }
    else if ((nextProps.users != this.props.users)) {
      if (this.state.loading) {
        this.showLoading(false)
      }
    }
    if(nextProps.location.search != this.props.location.search) {
      this.state.searchText = this.state.searchText
      this.state.searchType = this.state.searchType
      const queryParams = new URLSearchParams(nextProps.location.search);
      this.state.page = queryParams.get('page') || 1;
      this.props.userActions.getAllUsers({searchText: this.state.searchText, page: queryParams.get('page') || 1})
    }
  }
  updateRole = async (item, value) => {
    if (value != item.is_admin) {
      const checkUpdate = await this.props.userActions.updateRole({ is_admin: value, firstName: item.firstName, lastName: item.lastName, email: item.email})
      if (checkUpdate) {
        await this.props.userActions.getAllUsers({searchText: this.state.searchText, page: this.state.page})
      } 
    }
  }
  renderContent() {
    return (
      <Users
        history={this.props.history} 
        state={this.state}
        parent={this}/>
    )
  }
}
const mapStateToProps = state => ({
  users: state.usersReducers.users.users
});

const mapDispatchToProps = dispatch => {
  return {
    userActions: bindActionCreators(userActions, dispatch)
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer)