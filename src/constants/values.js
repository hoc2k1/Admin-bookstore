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

export const userForm = [
  {
    inputKey: 'firstName',
    type: 'text',
    placeholder: '',
    isValidate: true,
    defaultValue: '',
    required: true,
    label: 'Họ',
    errorMessage: 'Tên không hợp lệ'
  },
  {
    inputKey: 'lastName',
    type: 'text',
    placeholder: '',
    isValidate: true,
    defaultValue: '',
    required: true,
    label: 'Tên',
    errorMessage: 'Tên không hợp lệ'
  },
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
  },
  {
    inputKey: 'isAdmin',
    type: 'switch',
    isValidate: false,
    defaultValue: false,
    required: false,
    label: 'Là quản lý?',
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

export const addressForm = [
  {
    inputKey: 'firstName',
    type: 'text',
    placeholder: '',
    isValidate: true,
    defaultValue: '',
    required: true,
    label: 'Họ',
    errorMessage: 'Tên không hợp lệ'
  },
  {
    inputKey: 'lastName',
    type: 'text',
    placeholder: '',
    isValidate: true,
    defaultValue: '',
    required: true,
    label: 'Tên',
    errorMessage: 'Tên không hợp lệ'
  },
  {
    inputKey: 'province',
    type: 'picker',
    placeholder: 'Chọn tỉnh/thành phố',
    isValidate: true,
    defaultValue: '',
    required: true,
    label: 'Tỉnh/Thành phố',
    errorMessage: 'Tên tỉnh/thành phố không hợp lệ'
  },
  {
    inputKey: 'district',
    type: 'picker',
    placeholder: 'Chọn quận/huyện',
    isValidate: true,
    defaultValue: '',
    required: true,
    label: 'Quận/huyện',
    errorMessage: 'Tên quận/huyện không hợp lệ'
  },
  {
    inputKey: 'commune',
    type: 'picker',
    placeholder: 'Chọn phường/xã',
    isValidate: false,
    defaultValue: '',
    required: false,
    label: 'Phường/Xã',
    errorMessage: 'Tên phường/xã không hợp lệ'
  },
  {
    inputKey: 'specificAddress',
    type: 'text',
    placeholder: '',
    isValidate: false,
    defaultValue: '',
    required: false,
    label: 'Địa chỉ cụ thể',
    errorMessage: ''
  },
  {
    inputKey: 'phoneNumber',
    type: 'number',
    placeholder: '',
    isValidate: true,
    defaultValue: '',
    required: true,
    label: 'Số điện thoại',
    errorMessage: 'Số điện thoại không hợp lệ'
  }
]

export const currency = 'đ'

export const billStatus = {
  pending: 'pending',
  wait_accept: 'Chờ xác nhận',
  shipping: 'Đang vận chuyền',
  complete: 'Hoàn thành',
  cancel: "Đã huỷ"
}

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