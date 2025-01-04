import { billTypes } from "../constants/action.types";
import { combineReducers } from "redux";

const bills = (state = {}, action) => {
  switch (action.type) {
    case billTypes.SET_BILL: {
      return {
        ...state,
        bills: action.data,
      };
    }
    case billTypes.SET_BILL_TOTAL_PAGE: {
      return {
        ...state,
        totalBillsPage: action.data,
      };
    }
    default:
      return state;
  }
};
export default combineReducers({
  bills
});
