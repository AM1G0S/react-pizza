import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	value: 0,
}

export const categorySlice = createSlice({
	name: 'counter',
	initialState,
	reducers: {
		onChangeCategory: (state, action) => {
			state.value = action.payload
		},
	},
})

export const {onChangeCategory} = categorySlice.actions

export default categorySlice.reducer
