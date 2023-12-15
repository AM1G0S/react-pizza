import {createSlice} from '@reduxjs/toolkit'


const initialState = {
	categoryId: 0,
	sort: {
		name: "популярности",
		sortProperty: "rating",
	}
}

export const filterSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		setCategory: (state, action) => {
			state.categoryId = action.payload
		},
		setSortType: (state, action) => {
			state.sort = action.payload
		},
	},
})

export const {setCategory, setSortType} = filterSlice.actions

export default filterSlice.reducer
