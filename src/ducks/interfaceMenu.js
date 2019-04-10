// Action types
const CHANGE_MENU = "CHANGE_MENU";
const CHANGE_VIEW = "CHANGE_VIEW";

// Initial Value
const initialState = {
  activeItem: "oczekujące",
  activeView: "dashboard"
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

// Selectors
