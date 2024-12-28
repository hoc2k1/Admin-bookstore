import axios from 'axios'
import { productsTypes } from '../constants/action.types'
import { ERROR_MESSAGE, URL_BE } from '../constants/values'
import toast from 'react-hot-toast'

export const getAllCategories = () => async (dispatch, getState) => {
    let res
    try {
      res = await axios.get(`${URL_BE}category/all`)
    }
    catch (err) {
      return
    }
    dispatch(setCategories(res.data.data))
}

export const addCategory = (data) => async (dispatch, getState) => {
  const formData = new FormData();
  formData.append('name', data.name);
  formData.append('image', data.image);
  let res
  try {
    res = await axios.post(`${URL_BE}admin/addcategory`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
    })
  }
  catch (err) {
    toast.error(ERROR_MESSAGE)
    return false
  }
  if(res.data.error) {
    toast.error(res.data.error)
    return false
  }
  else {
    toast.success('Thêm thể loại sách thành công!')
    dispatch(getAllCategories())
    return true
  }
}
export const updateCategory = (data) => async (dispatch, getState) => {
  let res
  const formData = new FormData();
  formData.append('name', data.name);
  formData.append('image', data.image);
  formData.append('id', data.id)
  try {
    res = await axios.post(`${URL_BE}admin/updatecategory`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
    })
  }
  catch (err) {
    toast.error(ERROR_MESSAGE)
    return
  }
  if(res.data.error) {
    toast.error(res.data.error)
    return false
  }
  else {
    toast.success('Cập nhật tác giả thành công!')
    dispatch(getAllCategories())
    return true
  }
}


export const getAllAuthors = () => async (dispatch, getState) => {
    let res
    try {
      res = await axios.get(`${URL_BE}author`)
    }
    catch (err) {
      return
    }

    dispatch(setAuthors(res.data.data))
}
export const addAuthor = (data) => async (dispatch, getState) => {
  let res
  try {
    res = await axios.post(`${URL_BE}admin/addauthor`, {
      name: data.name
    })
  }
  catch (err) {
    toast.error(ERROR_MESSAGE)
    return false
  }
  if(res.data.error) {
    toast.error(res.data.error)
    return false
  }
  else {
    toast.success('Thêm tác giả thành công!')
    dispatch(getAllAuthors())
    return true
  }
}
export const updateAuthor = (data) => async (dispatch, getState) => {
  let res
  try {
    res = await axios.post(`${URL_BE}admin/updateauthor`, {
      id: data.id,
      name: data.name
    })
  }
  catch (err) {
    toast.error(ERROR_MESSAGE)
    return
  }
  if(res.data.error) {
    toast.error(res.data.error)
    return false
  }
  else {
    toast.success('Cập nhật tác giả thành công!')
    dispatch(getAllAuthors())
    return true
  }
}

export const getAllPublishers = () => async (dispatch, getState) => {
  let res
  try {
    res = await axios.get(`${URL_BE}publisher`)
  }
  catch (err) {
    return
  }

  dispatch(setPublishers(res.data.data))
}
export const addPublisher = (data) => async (dispatch, getState) => {
let res
try {
  res = await axios.post(`${URL_BE}admin/addpublisher`, {
    name: data.name
  })
}
catch (err) {
  toast.error(ERROR_MESSAGE)
  return false
}
if(res.data.error) {
  toast.error(res.data.error)
  return false
}
else {
  toast.success('Thêm nhà xuất bản thành công!')
  dispatch(getAllPublishers())
  return true
}
}
export const updatePublisher = (data) => async (dispatch, getState) => {
let res
try {
  res = await axios.post(`${URL_BE}admin/updatepublisher`, {
    id: data.id,
    name: data.name
  })
}
catch (err) {
  toast.error(ERROR_MESSAGE)
  return
}
if(res.data.error) {
  toast.error(res.data.error)
  return false
}
else {
  toast.success('Cập nhật nhà xuất bản thành công!')
  dispatch(getAllPublishers())
  return true
}
}

export const setCategories = (data) => ({
    type: productsTypes.SET_CATEGORIES,
    data
})
export const setPublishers = (data) => ({
    type: productsTypes.SET_PUBLISHERS,
    data
})
export const setAuthors = (data) => ({
    type: productsTypes.SET_AUTHORS,
    data
})
export const setBooks = (data) => ({
    type: productsTypes.SET_BOOKS,
    data
})
export const setToTalBooksPage = (data) => ({
    type: productsTypes.SET_TOTAL_BOOKS_PAGE,
    data
})