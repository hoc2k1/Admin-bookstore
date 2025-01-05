import axios from "axios";
import { billTypes } from "../constants/action.types";
import { ERROR_MESSAGE, URL_BE } from "../constants/values";
import toast from "react-hot-toast";

export const getAllBills =
  ({ status, page }) =>
  async (dispatch, getState) => {
    let res;
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
    dispatch(setTotalBillPage(res.data.totalPages));
  };

export const deleteBill = (id) => async (dispatch, getState) => {
  let res;
  try {
    res = await axios.get(`${URL_BE}admin/deletebill/${id}`);
  } catch (err) {
    toast.error(ERROR_MESSAGE);
    return false;
  }

  if (res.data.error) {
    toast.error(res.data.error);
    return false;
  } else {
    toast.success("Xóa đơn hàng thành công!");
    return true;
  }
}

export const updateBill = ({id, status}) => async (dispatch, getState) => {
  let res;
  try {
    res = await axios.post(`${URL_BE}bill/update`, {
      id: id,
      status: status
    });
  } catch (err) {
    toast.error(ERROR_MESSAGE);
    return false;
  }

  if (res.data.error) {
    toast.error(res.data.error);
    return false;
  } else {
    toast.success("Cập nhật trạng thái đơn hàng thành công!");
    return true;
  }
}

export const setBill = (data) => ({
  type: billTypes.SET_BILL,
  data,
});
export const setTotalBillPage = (data) => ({
  type: billTypes.SET_BILL_TOTAL_PAGE,
  data,
});
