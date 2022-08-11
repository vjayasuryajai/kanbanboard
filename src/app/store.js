import { configureStore } from "@reduxjs/toolkit";
import BoardReducer from "../features/KanbanSlice";

export const store = configureStore({
  reducer: {
    board: BoardReducer,
  },
});
