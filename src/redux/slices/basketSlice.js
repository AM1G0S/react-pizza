import {createSlice} from '@reduxjs/toolkit'


const initialState = {
	items: [],
	totalPrice: 0,
}

export const basketSlice = createSlice({
	name: 'basket',
	initialState,
	reducers: {
		addItem: (state, action) => {
			const findItem = state.items.find(obj => obj.id === action.payload.id && obj.type === action.payload.type && obj.size === action.payload.size);
			
			if (findItem) {
				findItem.count++
			} else {
				state.items.push({
					...action.payload,
					count: 1
				})
			}
			
			state.totalPrice = state.items.reduce((sum, obj) => {
				return obj.price * obj.count + sum;
			}, 0)
		},
		
		removeItem: (state, action) => {
			state.items = state.items.filter(obj => !(obj.id === action.payload.id && obj.type === action.payload.type && obj.size === action.payload.size));
			state.totalPrice = 0
		},
		
		itemMinus:
			(state, action) => {
				const findItem = state.items.find(obj => obj.id === action.payload.id && obj.type === action.payload.type && obj.size === action.payload.size);
				
				if (findItem.count > 1) {
					findItem.count--
					state.totalPrice -= findItem.price;
				} else {
					state.items = state.items.filter(obj => !(obj.id === action.payload.id && obj.type === action.payload.type && obj.size === action.payload.size));
					state.totalPrice = 0
				}
			},
		
		clearItems:
			(state) => {
				state.items = []
				state.totalPrice = 0
			}
	},
})

export const {addItem, removeItem, itemMinus, clearItems} = basketSlice.actions

export default basketSlice.reducer
