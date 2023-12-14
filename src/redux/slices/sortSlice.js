import {createSlice} from '@reduxjs/toolkit'


const initialState = {
	value: {
		name: "популярности",
		sortProperty: "rating",
	}
}

export const sortSlice = createSlice({
	name: 'counter',
	initialState,
	reducers: {
		onChangeSortType: (state, action) => {
			state.value = action.payload
		},
	},
})

export const {onChangeSortType} = sortSlice.actions

export default sortSlice.reducer
