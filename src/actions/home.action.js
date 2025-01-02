import axios from "axios";
import { homeTypes } from "../constants/action.types";
import { URL_BE } from "../constants/values";

export const setTopProduct = (data) => ({
  type: homeTypes.SET_TOP_PRODUCT,
  data,
});
export const getTopProduct = () => async (dispatch, getState) => {
  let res = null;
  try {
    res = await axios.post(`${URL_BE}bill/top/`);
  } catch (err) {
    console.log(err);
    return;
  }
  dispatch(setTopProduct(res.data.data));
};
export const getAllBanner = () => async (dispatch, getState) => {
  let res;
  try {
    res = await axios.get(`${URL_BE}banner/all`);
    res.data.data = res.data.data.sort((a, b) => {
      if (a.position == null) return 1;
      if (b.position == null) return -1;
      return a.position - b.position;
    });
  } catch (err) {
    console.error("error: ", err);
    return;
  }
  dispatch(setBanners(res.data.data));
};

export const setBanners = (data) => ({
  type: homeTypes.SET_BANNERS,
  data,
});

export const getRevenue = ({startDate, endDate}) => async (dispatch, getState) => {
  let res;
  try {
    res = await axios.post(`${URL_BE}admin/revenue`, {
      startDate: startDate,
      endDate: endDate
    });
  } catch (err) {
    console.error("error: ", err);
    return;
  }
  console.log(111, res.data.data[0].products[0])
  dispatch(setRevenue(res.data.data));
  dispatch(setTotalRevenue(res.data.totalRevenue));
};

export const setRevenue = (data) => ({
  type: homeTypes.SET_REVENUE,
  data,
})
export const setTotalRevenue = (data) => ({
  type: homeTypes.SET_TOTAL_REVENUE,
  data,
})