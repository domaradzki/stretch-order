import { getDataPromise } from "../services";

// Action types
const FETCH_DATA_REQUEST = "FETCH_DATA_REQUEST";
const FETCH_DATA_SUCCESS = "FETCH_DATA_SUCCESS";
const FETCH_DATA_FAILURE = "FETCH_DATA_FAILURE";

// Initial Value
const initialState = {
  isLoading: false,
  error: null,
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
    console.log("fetchDataRequest");
    getDataPromise()
      .then(data => {
        console.log("fetchDataSuccess");
        dispatch(fetchDataSuccess(data));
      })
      .catch(error => {
        console.log(error)
        dispatch(fetchDataFailure(error));
      });
  };
};

// Selectors
export const getDataLoading = state => state.data.isLoading;
