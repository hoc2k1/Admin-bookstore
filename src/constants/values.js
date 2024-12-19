export const URL_BE = 'http://localhost:8080/'
export const ERROR_MESSAGE = "Something when wrong!"
export const loginForm = [
  {
    inputKey: 'email',
    type: 'email',
    placeholder: '',
    isValidate: true,
    defaultValue: '',
    required: true,
    label: 'Email',
    errorMessage: 'Email không hợp lệ'
  },
  {
    inputKey: 'password',
    type: 'password',
    placeholder: '',
    isValidate: true,
    defaultValue: '',
    required: true,
    label: 'Mật khẩu',
    errorMessage: 'Mật khẩu phải có ít nhất 6 ký tự'
  }
]

export const currency = 'đ'

export const inputStatus = {
  normal: 'normal',
  error: 'error',
  success: 'success'
}