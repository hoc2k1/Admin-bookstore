import axios from 'axios'
import { userTypes } from '../constants/action.types'
import storeConfig from '../config/store.config'
import { URL_BE, ERROR_MESSAGE } from '../constants/values'
import toast from 'react-hot-toast'

export const getAllUsers = () => async (dispatch, getState) => {
  let res
  try {
    res = await axios.get(`${URL_BE}admin/getAllUsers/`)
  }
  catch (err) {
    console.log(err)
    return
  }
  dispatch(setUser(res.data.data))
}

export const deleteUser = (email) => async (dispatch, getState) => {
  let res
  try {
    res = await axios.post(`${URL_BE}admin/deleteuser/`, {
      email: email
    })
  }
  catch (err) {
    console.log(err)
    return
  }
  dispatch(getAllUsers())
}
export const auth = () => async (dispatch, getState) => {
  if (storeConfig.getUser() === null) {
    dispatch(setLoginFail())
    window.location.href = '/login'
    return false
  }
  let email = storeConfig.getUser().email
  let token = storeConfig.getToken()
  let res
  try {
    res = await axios.post(`${URL_BE}auth`, {
      email: email,
      token: token,
    })
  }
  catch (err) {
    toast.error(ERROR_MESSAGE)
    window.location.href = '/login'
    dispatch(setLoginFail())
    return false
  }
  if (res.data.error) {
    toast.error("Hết phiên đăng nhập!")
    window.location.href = '/login'
    return false;
  }
  else {
    dispatch(setLoginSuccess())
    return true
  }
}
export const login = (data) => async (dispatch, getState) => {
  let res
  try {
    res = await axios.post(`${URL_BE}admin/login`, {
      email: data.email,
      password: data.password
    });
  } catch (err) {
    toast.error(ERROR_MESSAGE)
    return false;
  }
  if (res.data.error) {
    toast.error(res.data.error)
    return false;
  }
  else if (res.data.token) {
    dispatch(loginSuccess(res.data.token, res.data.user));
    return true
  }
}
export const logout = () => (dispatch, getState) => {
  storeConfig.clear()
  dispatch(setLoginFail())
  toast.success('Đăng xuất thành công!')
}
export const getAllAddresses = ({searchText, page}) => async (dispatch, getState) => {
  let res
  try {
    res = await axios.post(`${URL_BE}admin/getAllAddresses/`, {
      searchText: searchText,
      page: page
    })
  }
  catch (err) {
    console.log(err)
    return
  }
  dispatch(setAddress(res.data.data))
  dispatch(setAddressTotalPage(res.data.totalPages))
}
export const removeAddress = (id) => async (dispatch, getState) => {
  let res
  try {
    res = await axios.get(`${URL_BE}address/delete/${id}`)
    toast.success('Xóa địa chỉ thành công')
  }
  catch (err) {
    console.log(err)
    toast.error(ERROR_MESSAGE)
    return
  }
  dispatch(getAllAddresses())
}
export const loginSuccess = (token, user) => async (dispatch, getState) => {
  storeConfig.setUser(user)
  storeConfig.setToken(token)
  dispatch(setLoginSuccess())
}
export const setLoginSuccess = () => ({
  type: userTypes.LOGIN_SUCCESS,
  data: 'login success'
})
export const setLoginFail = () => ({
  type: userTypes.LOGIN_FAIL,
  data: 'login fail'
})
export const setUser = (data) => ({
  type: userTypes.SET_USER,
  data
})
export const setAddress = (data) => ({
  type: userTypes.SET_ADDRESS,
  data
})
export const setAddressTotalPage = (data) => ({
  type: userTypes.SET_ADDRESS_TOTAL_PAGE,
  data
})
