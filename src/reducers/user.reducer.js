import { userTypes } from "../constants/action.types";
import { combineReducers } from "redux";
const users = (
  state = {
    data: [],
    page: 1,
    totalpage: null,
  },
  action
) => {
  switch (action.type) {
    case userTypes.SET_USER: {
      return {
        ...state,
        users: action.data,
      };
    }
    case userTypes.SET_USER_TOTAL_PAGE: {
      return {
        ...state,
        usersTotalPage: action.data
      }
    }
    case userTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        islogin: true,
      };
    }
    case userTypes.LOGIN_FAIL: {
      return {
        ...state,
        islogin: false,
      };
    }
    case userTypes.SET_ADDRESS: {
      return {
        ...state,
        addresses: action.data
      }
    }
    case userTypes.SET_ADDRESS_TOTAL_PAGE: {
      return {
        ...state,
        addressesTotalPage: action.data
      }
    }
    default:
      return state;
  }
};
export default combineReducers({
  users,
});
