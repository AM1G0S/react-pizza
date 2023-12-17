import {createSlice} from '@reduxjs/toolkit'

import deskRatingIcon from '../../assets/img/arrow-rating-desk.svg'

const initialState = {
	categoryId: 0,
	currentPage: 1,
	searchValue: '',
	sort: {
		name: "популярности",
		sortProperty: "rating",
		iconUrl: deskRatingIcon
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
		setCurrentPage: (state, action) => {
			state.currentPage = action.payload
		},
		setSearchValue: (state, action) => {
			state.searchValue = action.payload
		},
		setFilters: (state, action) => {
			state.categoryId = action.payload.categoryId;
			state.currentPage = action.payload.currentPage;
			state.sort = action.payload.sort;
		}
	},
})

export const {setCategory, setSortType, setCurrentPage, setFilters, setSearchValue} = filterSlice.actions

export default filterSlice.reducer
