// Action types
const CHANGE_INPUT = "CHANGE_INPUT";
const CHANGE_DATE = "CHANGE_DATE";
const CLEAR_INPUT = "CLEAR_INPUT";

// Initial Values
const initialState = {
  dateInsert: "",
  printName: "",
  client: "",
  invoice: "",
  kindOfPay: "",
  dateOfPay: "",
  quantity: 0,
  tapeLong: 0,
  tapeWidth: 0,
  tapeThickness: 0,
  tapeColor: "",
  numberOfColors: "",
  color1: "",
  color2: "",
  color3: "",
  glue: "",
  roller: "",
  dateOfAcceptation: "",
  transport: "",
  trader: "",
  deliveryAddress: "",
  dateOfRealisation: "",
  details: "",
  sleeve: "",
  stretchColor: "",
  stretchThickness: "",
  netWeight: "",
  grossWeight: "",
  price: "",
  netValue: 0,
  margin: "",
  postfix: ""
};

// Reducer
export default function orderReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_INPUT:
      return {
        ...state,
        [action.name]: action.value
      };
    case CLEAR_INPUT:
      return {
        ...state,
        initialState
      };
    case CHANGE_DATE:
      return {
        ...state,
        [action.name]: action.value
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
export const clearInput = () => {
  return {
    type: CLEAR_INPUT
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
