// Action types
const CHANGE_PAGE = "CHANGE_PAGE";
const ROWS_PER_PAGE = "ROWS_PER_PAGE";

// Initial Value
const initialState = {
  page: 0,
  rowsPerPage: 5
};

// Reducer
export default function interfaceReducer(state = initialState, action) {
  switch (action.type) {
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
