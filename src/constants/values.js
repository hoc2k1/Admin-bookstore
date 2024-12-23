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

export const authorForm = [
  {
    inputKey: 'name',
    type: 'text',
    placeholder: '',
    isValidate: true,
    defaultValue: '',
    required: true,
    label: 'Tác giả',
    errorMessage: 'Tên không hợp lệ'
  },
]

export const publisherForm = [
  {
    inputKey: 'name',
    type: 'text',
    placeholder: '',
    isValidate: true,
    defaultValue: '',
    required: true,
    label: 'Nhà xuất bản',
    errorMessage: 'Tên không hợp lệ'
  },
]

export const categoryForm = [
  {
    inputKey: 'name',
    type: 'text',
    placeholder: '',
    isValidate: true,
    defaultValue: '',
    required: true,
    label: 'Tên',
    errorMessage: 'Tên không hợp lệ'
  },
  {
    inputKey: 'image',
    type: 'image',
    placeholder: '',
    isValidate: false,
    defaultValue: '',
    required: false,
    label: 'Ảnh',
    errorMessage: ''
  },
]

export const currency = 'đ'

export const inputStatus = {
  normal: 'normal',
  error: 'error',
  success: 'success'
}

export const navBarMenu = [
  {
    key: 'homePage',
    title: 'Trang chủ',
    url: '/',
    childrens: []
  },
  {
    key: 'products',
    title: 'Sản phẩm',
    url: '',
    childrens: [
      {
        key: 'products_products',
        title: 'Sản phẩm',
        url: '/products',
      },
      {
        key: 'products_categories',
        title: 'Thể loại',
        url: '/categories',
      },
      {
        key: 'products_authors',
        title: 'Tác giả',
        url: '/authors',
      },
      {
        key: 'products_publishers',
        title: 'Nhà xuất bản',
        url: '/publishers',
      }
    ]
  },
  {
    key: 'users',
    title: 'Tài khoản',
    url: '',
    childrens: [
      {
        key: 'users_acount',
        title: 'Tài khoản',
        url: '/user',
      },
      {
        key: 'user_addresses',
        title: 'Địa chỉ',
        url: '/addresses',
      }
    ]
  },
  {
    key: 'bills',
    title: 'Đơn hàng',
    url: '/bills',
    childrens: []
  },
  {
    key: 'layout',
    title: 'Khác',
    url: '',
    childrens: [
      {
        key: 'layout_home',
        title: 'Giao diện trang chủ',
        url: '/layouthome',
      },
      {
        key: 'layout_banner',
        title: 'Banner',
        url: '/layoutbanner',
      }
    ]
  }
]