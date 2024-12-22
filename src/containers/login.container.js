import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as userActions from "../actions/user.action";
import Login from "../components/login/login";
import { loginForm, URL_BE, inputStatus } from "../constants/values";
import toast from "react-hot-toast";

class LoginContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: {
        values: [],
        checkValidate: [],
        buttonStatus: false
      },
    };
    loginForm.map((item) => {
      if (item.inputKey) {
        this.state.login.values[item.inputKey] = ''
        if (item.isValidate) {
          this.state.login.checkValidate[item.inputKey] = inputStatus.normal
        }
      }
    })
  }
  onChangeFieldLogin(inputKey, text, newInputStatus) {
    const newLoginState = this.state.login;
    newLoginState.values[inputKey] = text;
    newLoginState.checkValidate[inputKey] = newInputStatus;
    let checkButtonStatus = true
    loginForm.map((item) => {
      if (item.isValidate && newLoginState.checkValidate[item.inputKey] != inputStatus.success) {
        if (!(newLoginState.checkValidate[item.inputKey] == inputStatus.normal && this.state.login.values[item.inputKey])) {
          checkButtonStatus = false
        }
      }
    })
    newLoginState.buttonStatus = checkButtonStatus
    this.setState({login: newLoginState})
  }
  loginSubmit = async () => {
    const loginSuccess = await this.props.userActions.login(this.state.login.values)
    if (loginSuccess) {
      toast.success('Đăng nhập thành công!')
      this.props.history.push('/')
    }
  };
  render() {
    return (
      <div className="h-100">
        <Login
          onChangeFieldLogin={(inputKey, text, newInputStatus) => this.onChangeFieldLogin(inputKey, text, newInputStatus)}
          loginSubmit={() => this.loginSubmit()}
          state={this.state}
        />
      </div>
    );
  }
}
const mapStateToProps = state => ({
    islogin: state.userReducers.user.islogin
});

const mapDispatchToProps = dispatch => {
  return {
    userActions: bindActionCreators(userActions, dispatch)
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginContainer);
