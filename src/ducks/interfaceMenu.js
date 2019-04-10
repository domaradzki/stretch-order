// Action types
const CHANGE_MENU = "CHANGE_MENU";

// Initial Value
const initialState = {
  activeItem:'oczekujące'
};

// Reducer
export default function interfaceReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_MENU:
      return {
        ...state,
        activeItem: action.name
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

// Selectors
