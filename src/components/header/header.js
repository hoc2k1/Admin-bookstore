import React, { useState } from 'react'
import { connect } from 'react-redux'
import * as userActions from '../../actions/user.action'
import { bindActionCreators } from 'redux'
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import NavBar from '../navbar/navbar'

const Header = (props) => {
  const [showDrawer, setShowDrawer] = useState(false)
  return (
    <div>
      <div className='header-container'>
        <div className='d-flex gap-2 align-items-center'>
          <div className='d-flex d-md-none' onClick={() => setShowDrawer(true)}>
            <i className='fa fa-bars font-size-normal p-2'></i>
          </div>
          <div className='cursor-pointer w-fit' onClick={() => props.history.push('/')}>
            <img className='logo' src="/img/logo.png"></img>
          </div>
        </div>
        <div className='w-fit cursor-pointer' onClick={() => {
          props.userActions.logout()
          props.history.push('/login')
        }}>
          <span className='text-link'>Đăng xuất</span>
        </div>
      </div>
      <Drawer
        open={showDrawer}
        onClose={() => setShowDrawer(false)}
        direction='left'
        className=''
      >
        <NavBar history={props.history} isDrawer={true}/>
      </Drawer>
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