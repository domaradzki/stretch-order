import { getDataPromise } from "../services";
import moment from "moment";

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
  activeType: "",
  activeKind:"",
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
        activeOrder: action.id,
        activeType: action.name,
        activeKind:action.kind
      };
    case UNACTIVATE_DETAILS:
      return {
        ...state,
        activeDetails: false,
        activeOrder: '',
        activeType: ''
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

export const activateDetails = (id,name,kind) => {
  return {
    type: ACTIVATE_DETAILS,
    id,
    name,
    kind
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
    _: "transparentna",
    T: "transparentna",
    BR: "brązowa"
  };
  let order = {};
  if (pickedOrder.kind === "KT") {
    const code = picked[0].code.toUpperCase();
    const productArray = code.split(" ");
    const productCode = productArray[0];
    const productSize = productArray[1];
    //reguła dla FSRG
    if (productCode === "FSRG") {
      if (productSize === "OCEANIC") {
        order = { sleeve: productArray[2], postfix: productArray[1] };
      } else {
        const size = productSize.split("/");
        order = {
          sleeve: +size[1],
          stretchThickness: +size[0].slice(3),
          netWeight: +size[0].slice(0, 3),
          grossWeight: function() {
            return this.sleeve + this.netWeight;
          },
          stretchColor: function() {
            if (colors.hasOwnProperty(productArray[2])) {
              return colors[productArray[2]];
            } else {
              return colors._;
            }
          },
          dateOfRealisation: function() {return moment(pickedOrder.dateInsert)
            .add(3, "days")
            .format("YYYY-MM-DD")
          },
          postfix: function() {
            const length = productArray.length;
            let str = "";
            for (let i = 2; i < length; i++) {
              str += productArray[i];
              str += " ";
            }
            return str;
          }
        };
      }
    }
    //reguła dla FSMG
    if (productCode === "FSMG") {
      order = {
        stretchThickness: +productSize.slice(4),
        sleeve: +productSize.slice(0, 4),
        grossWeight: function() {
          return +this.sleeve + +this.netWeight;
        },
        stretchColor: function() {
          if (colors.hasOwnProperty(productArray[2])) {
            return colors[productArray[2]];
          } else {
            return colors._;
          }
        },
        dateOfRealisation:function() {return moment(pickedOrder.dateInsert)
          .add(3, "days")
          .format("YYYY-MM-DD")
        },
        postfix: function() {
          const length = productArray.length;
          let str = "";
          for (let i = 2; i < length; i++) {
            str += productArray[i];
            str += " ";
          }
          return str;
        }
      };
    }
    //reguła dla FSM
    if (productCode === "FSM") {
      order = {
        stretchThickness: +productSize.slice(3),
        sleeve: +productSize.slice(0, 3),
        grossWeight: function() {
          return +this.sleeve + +this.netWeight;
        },
        stretchColor: function() {
          if (colors.hasOwnProperty(productArray[2])) {
            return colors[productArray[2]];
          } else {
            return colors._;
          }
        },
        dateOfRealisation: function() {return moment(pickedOrder.dateInsert)
          .add(3, "days")
          .format("YYYY-MM-DD")
        },
        postfix: function() {
          const length = productArray.length;
          let str = "";
          for (let i = 2; i < length; i++) {
            str += productArray[i];
            str += " ";
          }
          return str;
        }
      };
    }
    //reguła dla TPD
    if (productCode === "TPD" || productCode === "TPD32") {
      const ind =
        productSize.indexOf("F") !== -1
          ? productSize.indexOf("F")
          : productSize.indexOf("H");
      order = {
        productCode,
        tapeLong: +productSize.slice(0, ind - 2),
        tapeWidth: +productSize.slice(ind - 2, ind),
        tapeThickness: productCode === "TPD32" ? 32 : 28,
        numberOfColors: productSize.slice(-1),
        glue: productSize.slice(ind, ind + 1),
        tapeColor: function() {
          const indR =
            productSize.indexOf("R") !== -1 ? productSize.indexOf("R")+1 : ind+2;
          const colorSymbol = productSize.slice(ind+1, indR);
          if (colors.hasOwnProperty(colorSymbol)) {
            return colors[colorSymbol];
          } else {
            return colors._;
          }
        },
        dateOfRealisation: function() {return moment(pickedOrder.dateInsert)
          .add(14, "days")
          .format("YYYY-MM-DD")
        },
        postfix: function() {
          const length = productArray.length;
          let str = "";
          for (let i = 2; i < length; i++) {
            str += productArray[i];
            str += " ";
          }
          return str;
        }
      };
    }
    return Object.assign(pickedOrder, order);
    
  } else {
    return pickedOrder;
  }

  
};
