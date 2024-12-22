import { productsTypes } from '../constants/action.types'
import { combineReducers } from 'redux'
const products = (state = { data: [] }, action) => {
    switch (action.type) {
        case productsTypes.SET_CATEGORIES: {
            return {
                ...state,
                categories: action.data
            }
        }
        case productsTypes.SET_PUBLISHERS: {
            return {
                ...state,
                publishers: action.data
            }
        }
        case productsTypes.SET_AUTHORS: {
            return {
                ...state,
                authors: action.data
            }
        }
        case productsTypes.SET_BOOKS: {
            return {
                ...state,
                books: action.data
            }
        }
        case productsTypes.SET_TOTAL_BOOKS_PAGE: {
            return {
                ...state,
                totalBooksPage: action.data
            }
        }
        default: return state
    }
}
export default combineReducers({
    products
})