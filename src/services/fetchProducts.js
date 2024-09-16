import { createAsyncThunk } from "@reduxjs/toolkit";

// Skapar en asynkron funktion för att hämta produkter med createAsyncThunk från Redux Toolkit.
const fetchProducts = createAsyncThunk("data/fetchProducts", async () => {
	try {
		// Hämtar produkter från API.
		const result = await fetch("https://lnr8xmgf03.execute-api.eu-north-1.amazonaws.com/products", {
			method: "GET",
			// Lägger till API-nyckel från env.
			headers: { "x-zocom": import.meta.env.VITE_SOME_KEY },
		});

		// Omvandlar svaret till JSON.
		const data = await result.json();

		// Kollar om data finns.
		if (!data) {
			console.log("Failed to fetch");
		}

		// Returnerar produkterna.
		return data.products;
	} catch (error) {
		// Loggar fel.
		console.log(error);
	}
});

export default fetchProducts;