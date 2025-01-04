import axios from "axios";
import { billTypes } from "../constants/action.types";
import { URL_BE } from "../constants/values";

export const getAllBills =
  ({ status, page }) =>
  async (dispatch, getState) => {
    let res;
    console.log(1, status, page)
    try {
      res = await axios.post(`${URL_BE}admin/bills`, {
        status: status,
        page: page,
      });
    } catch (err) {
      console.error("error: ", err);
      return;
    }

    dispatch(setBill(res.data.data));
    dispatch(setTotalBillPage(res.data.totalRevenue));
  };

export const setBill = (data) => ({
  type: billTypes.SET_BILL,
  data,
});
export const setTotalBillPage = (data) => ({
  type: billTypes.SET_BILL_TOTAL_PAGE,
  data,
});
