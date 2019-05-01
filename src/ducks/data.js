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
  const pickedOrder = picked.length === 1 ? pickedOrder[0] : {};
  const colors = {
    CZ: "czarna",
    CZARNA: "czarna",
    RÓŻ: "różowa",
    B: "biała",
    BIAŁA: "biała",
    NIEB: "niebieska",
    ŻÓŁT: "żółta",
    ZIELO: "zielona",
    CZERW: "czerwona",
    POM: "pomarańczowa",
    _: "transparentna"
  };
  const order = {};
  if (pickedOrder.kind === "KT") {
    const code = picked.code.toUpperCase();
    const productArray = code.split(" ");
    const productCode = productArray[0];
    const productSize = productArray[1];
    if (productCode === "FSRG") {
      const sleeve = "";
      const stretchColor = "";
      const netWeight = "";
      const grossWeight = "";
      if (productSize === "OCEANIC") {
        order = { sleeve: productArray[2], postfix: productArray[1] };
      } else {
        const size = productSize.split("/");
        order = {
          sleeve:size[1],
          stretchThickness:size[0].slice(3),
          netWeight:size[0].slice(0,3),
          grossWeight:function(){
            return +this.sleeve + +this.netWeight;
          },
          stretchColor: function(){
            if (colors.hasOwnProperty(productArray[2])) {
              return colors[productArray[2]];
            } else {
              return colors._
            }
          },
          postfix: function(){
            const length = productArray.length;
            const str = '';
            for (let i=2;i<length;i++){
              str+=productArray[i];
              str+=' '
            }
            return str;
          }
        }
      }
      
    }
  }

  //"FSMG" "FSM" "TPD" "TPD32"
  return Object.assign(pickedOrder,order);
};
