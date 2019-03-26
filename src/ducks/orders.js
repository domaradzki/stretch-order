// Action types
const CHANGE_INPUT = "CHANGE_INPUT";
const CHANGE_DATE = "CHANGE_DATE";

// Initial Value
const initialState = {
  orders: [
    {
      id: 1,
      client: "Dynamit",
      kind: "Stretch",
      invoice: "",
      dateOfPay: "",
      quantity: 100,
      price: 10.0,
      netValue: 1000.0,
      margin: 2,
      comments: "",
      isDone: false
    }
  ],
  client: "",
  kind: "",
  invoice: "",
  dateOfPay: "",
  quantity: "",
  price: "",
  netValue: "",
  margin: "",
  comments: ""
};

// Reducer
export default function orderReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_INPUT:
      return {
        ...state,
        [action.name]: action.value
      };
      case CHANGE_DATE:
      return {
        ...state,
        dateOfPay: action.selectedDay
      };

    default:
      return state;
  }
}

// Action creators
export const changeInput = (name, value) => {
  return {
    type: CHANGE_INPUT,
    name,
    value
  };
};
export const changeDate = (name, value) => {
  return {
    type: CHANGE_DATE,
    name,
    value
  };
};

// Selectors
