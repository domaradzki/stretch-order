// Action types
const CHANGE_MENU = "CHANGE_MENU";
const CHANGE_VIEW = "CHANGE_VIEW";
const CHANGE_PAGE = "CHANGE_PAGE";
const ROWS_PER_PAGE = "ROWS_PER_PAGE";

// Initial Value
const initialState = {
  activeItem: "Produkcja Nadruk",
  activeView: "dashboard",
  page: 0,
  rowsPerPage: 5
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
    case CHANGE_PAGE:
      return {
        ...state,
        page: action.value
      };
    case ROWS_PER_PAGE:
      return {
        ...state,
        rowsPerPage: action.value
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
export const changePage = value => {
  return {
    type: CHANGE_PAGE,
    value
  };
};
export const setRowsPerPage = value => {
  return {
    type: ROWS_PER_PAGE,
    value
  };
};

// Selectors
