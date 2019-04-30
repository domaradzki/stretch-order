import { getDataPromise } from "../services";

// Action types
const FETCH_DATA_REQUEST = "FETCH_DATA_REQUEST";
const FETCH_DATA_SUCCESS = "FETCH_DATA_SUCCESS";
const FETCH_DATA_FAILURE = "FETCH_DATA_FAILURE";
const ACTIVATE_DETAILS = "ACTIVATE_DETAILS";
const UNACTIVATE_DETAILS = "UNACTIVATE_DETAILS";

// Initial Value
const initialState = {
  isLoading: false,
  error: null,
  activeOrder: "",
  activeDetails: false,
  data: []
};

// Reducer
export default function dataReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_DATA_REQUEST:
      return {
        ...state,
        error: null,
        isLoading: true
      };
    case FETCH_DATA_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    case FETCH_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        data: action.data
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
const fetchDataRequest = () => ({ type: FETCH_DATA_REQUEST });
const fetchDataSuccess = data => ({
  type: FETCH_DATA_SUCCESS,
  data
});
const fetchDataFailure = error => ({
  type: FETCH_DATA_FAILURE,
  error
});

export const fetchData = () => {
  return dispatch => {
    dispatch(fetchDataRequest());
    // console.log("fetchDataRequest");
    getDataPromise()
      .then(data => {
        // console.log("fetchDataSuccess");
        dispatch(fetchDataSuccess(data));
      })
      .catch(error => {
        //  console.log(error)
        dispatch(fetchDataFailure(error));
      });
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
export const getDataLoading = state => state.data.isLoading;
export const pickedOrder = state => {
  const picked = state.data.data.filter(
    order => order.itemId === state.data.activeOrder
  );
  const pickedOrder = picked.length === 1 ? picked[0] : {};
  if (picked.kind === 'KT') {
    const productArray = picked.code.split(" ");
    const productCode = productArray[0];
    if (productCode === "FSRG") {
    } //"FSMG" "TPD" "TPD32"
  }

  

  return pickedOrder;
};
