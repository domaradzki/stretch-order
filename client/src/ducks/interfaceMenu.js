// Action types
const CHANGE_MENU = "CHANGE_MENU";
const CHANGE_VIEW = "CHANGE_VIEW";
const PAGINATION_MAINVIEW = "PAGINATION_MAINVIEW";


// Initial Value
const initialState = {
  activeItem: "oczekujące",
  activeView: "dashboard",
  paginationMain: 0,
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



// Selectors
