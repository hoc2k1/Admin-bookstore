import { combineReducers } from 'redux'
import productsReducers from './products.reducer'
import usersReducers from './user.reducer'
import homeReducers from './home.reducer';
import billsReducers from './bill.reducer';

export default combineReducers({
    productsReducers,
    usersReducers,
    homeReducers,
    billsReducers
})