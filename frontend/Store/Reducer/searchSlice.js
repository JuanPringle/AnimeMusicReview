import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    search: "",
  },
  reducers: {
    setSearchSlice(state, action) {
      state.search = action.payload;
    },
  },
});

export const { setSearchSlice } = searchSlice.actions;
export default searchSlice.reducer