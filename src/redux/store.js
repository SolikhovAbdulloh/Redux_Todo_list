import { configureStore } from "@reduxjs/toolkit";
import todoList from "./todo"
export const store = configureStore({
  reducer: {
    todoList,
  },
});
