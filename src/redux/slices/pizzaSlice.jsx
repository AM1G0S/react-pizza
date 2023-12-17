import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from "axios";

const initialState = {
	items: [],
	status: 'loading'
}

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzaStatus',
	async (params) => {
		const {category, search, sortBy, order, currentPage} = params;
		
		const {data} = await axios.get(
			`https://65787cc6f08799dc80456b95.mockapi.io/items?page=${currentPage}&limit=4&${category}${search}&sortBy=${sortBy}&order=${order}`
		);
		return data;
	}
)

export const pizzaSlice = createSlice({
	name: 'pizza',
	initialState,
	reducers: {
		setItems: (state, action) => {
			state.items = action.payload
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchPizzas.pending, (state) => {
				state.items = []
				state.status = 'loading';
			})
			.addCase(fetchPizzas.fulfilled, (state, action) => {
				state.items = action.payload;
				state.status = 'success';
			})
			.addCase(fetchPizzas.rejected, (state, action) => {
				state.items = []
				state.status = 'error';
			});
	},
})

export const {setItems} = pizzaSlice.actions

export default pizzaSlice.reducer
