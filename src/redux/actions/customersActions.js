import { ActionTypes } from "../constants/action-types";

export const setCustomers = (data) => {
  return {
    type: ActionTypes.SET_CUSTOMERS,
    payload: data,
  };
};