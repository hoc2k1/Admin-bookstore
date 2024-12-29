import { combineReducers } from 'redux'
import productsReducers from './products.reducer'
import usersReducers from './user.reducer'
import homeReducers from './home.reducer';
export default combineReducers({
    productsReducers,
    usersReducers,
    homeReducers
})