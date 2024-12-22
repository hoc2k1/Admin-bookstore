import React from 'react'
import { connect } from 'react-redux'
import * as userActions from '../../actions/user.action'
import { bindActionCreators } from 'redux'

const Header = (props) => {
  return (
    <div className='header-container'>
      <div className='cursor-pointer w-fit' onClick={() => this.props.history.push('/')}>
        <img className='logo' src="/img/logo.png"></img>
      </div>
      <div className='w-fit cursor-pointer' onClick={() => {
        props.userActions.logout()
        props.history.push('/login')
      }}>
        <span className='text-link'>Đăng xuất</span>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => {
  return {
    userActions: bindActionCreators(userActions, dispatch)
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Header)