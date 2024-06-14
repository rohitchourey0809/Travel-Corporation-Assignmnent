// reducers.js
import { ADD_GROUP, DELETE_GROUP, UPDATE_GROUP, SET_STATUS } from "./actions";

const initialState = {
  groups: [{ from: 1, to: 10 }],
  statuses: {},
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_GROUP:
      return { ...state, groups: [...state.groups, action.payload] };
    case DELETE_GROUP:
      return {
        ...state,
        groups: state.groups.filter((_, index) => index !== action.payload),
      };
    case UPDATE_GROUP:
      return {
        ...state,
        groups: state.groups.map((group, index) =>
          index === action.payload.index ? action.payload.group : group
        ),
      };
    case SET_STATUS:
      return {
        ...state,
        statuses: {
          ...state.statuses,
          [action.payload.id]: action.payload.status,
        },
      };
    default:
      return state;
  }
};

export default rootReducer;
