// Action types
const CHANGE_INPUT = "CHANGE_INPUT";
const CHANGE_DATE = "CHANGE_DATE";

// Initial Values
const initialState = {
  dateInsert:'',
  printName:'',
  client: '',
  invoice: '',
  kindOfPay:'',
  dateOfPay: '',
  quantity: 0,
  tapeLong:'',
  tapeWidth:'',
  tapeThickness:'',
  numberOfColors:0,
  color1:'',
  color2:'',
  color3:'',
  glue:'',
  roller:'',
  dateOfAcceptation:'',
  transport:'',
  trader:'',
  dateOfRealisation:'',
  details:'',
  sleeve:'',
  stretchColor:'',
  netWeight:'',
  grossWeight:'',
  price: '',
  netValue: 0,
  margin: '',
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
