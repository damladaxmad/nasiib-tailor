import { ActionTypes } from "../constants/action-types";
const intialState = {
  customers: []
};

export const customersReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_CUSTOMERS:
      return { ...state, customers: payload };
    default:
      return state;
  }
};