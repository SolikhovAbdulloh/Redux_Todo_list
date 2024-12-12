import { createSlice } from "@reduxjs/toolkit";

const todoList = createSlice({
  name: "todo_list",
  initialState: {
    data: [],
  },
  reducers: {
    getData(state, { payload }) {
      state.data = [...state.data, { ...payload, id: Date.now() }];
    },
    deleteFuc(state, { payload }) {
      state.data = state.data.filter((e) => e.id !== payload);
    },
    updateTodo(state, { payload }){
      const index = state.data.findIndex((todo) => todo.id === payload.id);
      if (index !== -1) {
        state.data[index] = payload;
      }
    },
  },
});

export const { getData, deleteFuc,updateTodo} = todoList.actions;
export default todoList.reducer;
