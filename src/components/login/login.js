import React from 'react'
import { loginForm } from '../../constants/values';
import Button from '../global/button'
import FloatingInput from '../global/floating.input'

function LoginRegister({ onChangeFieldLogin, state, loginSubmit }) {
  return (
    <div className="container d-flex justify-content-center align-items-center flex-column h-100">
      <div className="d-flex p-0 width-small header-login active align-items-center justify-content-center">
        <span className={`heading p-3 p-md-4 text-center`}>Đăng nhập</span>
      </div>
      <div className='login-form'>
        {loginForm.map((item, index) => {
          return (
            <FloatingInput
              {...item}
              key={`login-${index}`}
              value={state.login.values[item.inputKey]}
              checkValidate={state.login.checkValidate[item.inputKey]}
              onChange={(inputKey, text, newInputStatus) => onChangeFieldLogin(inputKey, text, newInputStatus)} />
          )
        })}
        <Button buttonStatus={state.login.buttonStatus} onClick={loginSubmit}>
          <span className="heading">Đăng nhập</span>
        </Button>
      </div>
    </div>
  );
}
export default LoginRegister