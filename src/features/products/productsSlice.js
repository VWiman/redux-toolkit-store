import { createSlice } from "@reduxjs/toolkit";
import fetchProducts from "../../services/fetchProducts";

// Initialt state för produkterna.
const initialState = {
	products: [],
	isLoading: false,
	error: null,
};

// Skapar en slice för produkter med createSlice från Redux Toolkit.
const productsSlice = createSlice({
	name: "products",
	initialState,
	reducers: {},
	// extraReducers hanterar asynkrona actions och uppdaterar state.
	extraReducers: (builder) => {
		// Hanterar state när fetchProducts är pending.
		builder.addCase(fetchProducts.pending, (state) => {
			state.isLoading = true;
		});

		// Hanterar state när fetchProducts har fullgjorts.
		builder.addCase(fetchProducts.fulfilled, (state, action) => {
			state.isLoading = false;
			state.products = action.payload;
		});

		// Hanterar state när fetchProducts misslyckas.
		builder.addCase(fetchProducts.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.error.message;
		});
	},
});

export default productsSlice.reducer;