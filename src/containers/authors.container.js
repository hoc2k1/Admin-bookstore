import React from 'react'
import BaseContainer from './base.container';
import Authors from '../components/products/authors';
import { connect } from 'react-redux'
import * as userActions from '../actions/user.action'
import * as productsAction from '../actions/products.action'
import { bindActionCreators } from 'redux'
import { checkNotEmpty } from '../config/identify';
import { authorForm } from '../constants/values';

class AuthorsContainer extends BaseContainer {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state
    }
    this.props.productsAction.getAllAuthors()
    this.props.userActions.auth()
    this.form = authorForm
  }
  componentWillReceiveProps(nextProps) {
    if (checkNotEmpty(this.props.authors)) {
      if (this.state.loading) {
        this.showLoading(false)
      }
    }
    else if (nextProps.authors != this.props.authors) {
      if (this.state.loading) {
        this.showLoading(false)
      }
    }
  }
  onAdd = async () => {
    this.showLoading(true);
    await this.props.productsAction.addAuthor(this.state.form.values);
    this.setState({ loading: false, showModal: false })
  };
  onEdit = async () => {
    this.showLoading(true);
    await this.props.productsAction.updateAuthor(this.state.form.values);
    this.setState({ loading: false, showModal: false })
  }
  renderContent() {
    return (
      <Authors 
        history={this.props.history}
        state={this.state}
        parent={this}
      />
    )
  }
}
const mapStateToProps = state => ({
  authors: state.productsReducers.products.authors
});

const mapDispatchToProps = dispatch => {
  return {
    userActions: bindActionCreators(userActions, dispatch),
    productsAction: bindActionCreators(productsAction, dispatch)
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AuthorsContainer)