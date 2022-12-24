import { createSlice } from "@reduxjs/toolkit";

const filtersSlide = createSlice({
	name: "filters",
	initialState: {
		search: "",
		status: "All",
		priority: [],
		loadingFilter: false,
	},
	reducers: {
		searchChange: (state, action) => {
			state.loadingFilter = true;
			state.search = action.payload;
			state.loadingFilter = false;
		},
		statusChange: (state, action) => {
			state.status = action.payload;
			state.loadingFilter = false;
		},
		priorityChange: (state, action) => {
			state.priority = action.payload;
			state.loadingFilter = false;
		},
	},
});

export const { searchChange, priorityChange, statusChange } = filtersSlide.actions;
export default filtersSlide.reducer;
