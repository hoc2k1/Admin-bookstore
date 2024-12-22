import { combineReducers } from 'redux'
import productsReducers from './products.reducer'
import userReducers from './user.reducer'
import homeReducers from './home.reducer';
export default combineReducers({
    productsReducers,
    userReducers,
    homeReducers
})