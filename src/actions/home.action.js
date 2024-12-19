import axios from 'axios'
import {homeTypes} from '../constants/action.types'
import { URL_BE } from '../constants/values'
export const setTopProduct = (data) => ({
    type: homeTypes.SET_TOP_PRODUCT,
    data
})
export const getTopProduct = () => async (dispatch, getState) => {
    let res = null
    try {
        res = await axios.post(`${URL_BE}bill/top/`)
    }
    catch(err) {
        console.log(err)
        return
    }
    dispatch(setTopProduct(res.data.data))
}