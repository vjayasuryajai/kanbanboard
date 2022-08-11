import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  laneName: { type: "", items: [] },
  cardItem: {
    type: "",
    item: { description: "", id: "", type: "" },
  },
  laneList: [
    {
      type: "To-do List",
      items: [
        { description: "Fix broken Layout in Safari", id: "1", type: "Bug" },
      ],
    },
    {
      type: "InProgress",
      items: [
        { description: "", id: "12", type: "Bug" },
        { description: "", id: "23", type: "Bug" },
      ],
    },
    {
      type: "QA",
      items: [
        { description: "Search results", id: "1", type: "Feature" },
        { description: "Check layout issue", id: "2", type: "Request" },
      ],
    },
    {
      type: "Done",
      items: [
        { description: "Search results", id: "1", type: "Bug" },
        { description: "Search results", id: "2", type: "Feature" },
      ],
    },
  ],
};

export const BoardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    addLane: (state, action) => {
      state.laneList = [...state.value, action.payload];
    },

    deleteLane: (state, action) => {
      const { type } = action.payload;
      state.laneList = state.laneList.filter((data) => data.type !== type);
    },

    insertCard: (state, action) => {
      const { type, item } = action.payload;
      state.laneList = state.laneList.map((data) =>
        data.type === type
          ? { ...data, items: [...data.items, item] }
          : { ...data }
      );
    },
    deleteCard: (state, action) => {
      const { type, id } = action.payload;
      state.laneList = state.laneList.map((data) =>
        data.type === type
          ? { ...data, items: [...data.items.filter((data) => data.id !== id)] }
          : { ...data }
      );
    },
  },
});

export const { addLane, deleteLane, insertCard, deleteCard } =
  BoardSlice.actions;

export const boardValue = (state) => state.board.laneList;
export const cardItem = (state) => state.board.cardItem;
export default BoardSlice.reducer;
