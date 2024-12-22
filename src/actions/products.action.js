import axios from 'axios'
import { productsTypes } from '../constants/action.types'
import { URL_BE } from '../constants/values'

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