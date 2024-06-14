// actions.js
import axios from "axios";

export const ADD_GROUP = "ADD_GROUP";
export const DELETE_GROUP = "DELETE_GROUP";
export const UPDATE_GROUP = "UPDATE_GROUP";
export const SET_STATUS = "SET_STATUS";

export const addGroup = (group) => ({
  type: ADD_GROUP,
  payload: group,
});

export const deleteGroup = (index) => ({
  type: DELETE_GROUP,
  payload: index,
});

export const updateGroup = (index, group) => ({
  type: UPDATE_GROUP,
  payload: { index, group },
});

export const setStatus = (id, status) => ({
  type: SET_STATUS,
  payload: { id, status },
});

export const fetchStatuses = (group) => {
  return (dispatch) => {
    for (let i = group.from; i <= group.to; i++) {
      axios
        .get(`https://jsonplaceholder.typicode.com/todos/${i}`)
        .then((response) => {
          dispatch(setStatus(i, response.data));
        });
    }
  };
};
