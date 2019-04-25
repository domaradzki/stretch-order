// Action types
const CHANGE_MENU = "CHANGE_MENU";
const CHANGE_VIEW = "CHANGE_VIEW";
const PAGINATION_MAINVIEW = "PAGINATION_MAINVIEW";
const ACTIVATE_DETAILS = "ACTIVATE_DETAILS";
const UNACTIVATE_DETAILS = "UNACTIVATE_DETAILS";

// Initial Value
const initialState = {
  activeItem: "oczekujące",
  activeView: "dashboard",
  paginationMain: 0,
  activeOrder: '',
  activeDetails: false
};

// Reducer
export default function interfaceReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_MENU:
      return {
        ...state,
        activeItem: action.name
      };
    case CHANGE_VIEW:
      return {
        ...state,
        activeView: action.name
      };
    case PAGINATION_MAINVIEW:
      return {
        ...state,
        paginationMain: action.value * 10
      };
    case ACTIVATE_DETAILS:
      return {
        ...state,
        activeDetails: true,
        activeOrder: action.id
      };
    case UNACTIVATE_DETAILS:
      return {
        ...state,
        activeDetails: false,
        activeOrder: null
      };
    default:
      return state;
  }
}

// Action creators
export const changeMenu = name => {
  return {
    type: CHANGE_MENU,
    name
  };
};
export const changeView = name => {
  return {
    type: CHANGE_VIEW,
    name
  };
};
export const changePaginationMainView = value => {
  return {
    type: PAGINATION_MAINVIEW,
    value
  };
};

export const activateDetails = id => {
  return {
    type: ACTIVATE_DETAILS,
    id
  };
};

export const unactivateDetails = () => {
  return {
    type: UNACTIVATE_DETAILS
  };
};

// Selectors
