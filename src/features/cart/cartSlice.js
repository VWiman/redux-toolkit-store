import { createSlice } from "@reduxjs/toolkit";

// Funktion för att generera ett unikt ID.
const generateUniqueId = (length) => {
	const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	let id = "";
	// Loop för att skapa ett slumpmässigt ID med tecken från characters.
	for (let i = 0; i < length * 2; i++) {
		const randomIndex = Math.floor(Math.random() * characters.length);
		id += characters[randomIndex];
		id += characters[randomIndex + 1];
	}
	return id;
};

// Initialt state för varukorgen som en tom lista.
const initialState = [];

// Skapar en slice för varukorgen med createSlice från Redux Toolkit.
const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		// Reducer för att lägga till en produkt i varukorgen.
		addedProduct(state, action) {
			console.log("Adding:", action.payload);
			const newID = generateUniqueId(action.payload.id.length);
			// Skapar en ny produkt för att lägga till i varukorgen.
			const cartProduct = {
				id: newID + action.payload.id,
				name: action.payload.name,
				type: action.payload.type,
				price: action.payload.price,
				imgUrl: action.payload.imgUrl,
			};
			state.push(cartProduct);
		},
		// Reducer för att ta bort en produkt från varukorgen.
		removedProduct(state, action) {
			return state.filter((product) => product.id !== action.payload);
		},
	},
});

export const { addedProduct, removedProduct } = cartSlice.actions;
export default cartSlice.reducer;
