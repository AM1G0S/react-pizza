import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import deskRatingIcon from '../../assets/img/arrow-rating-desk.svg';

interface Sort {
	name: string;
	sortProperty: string;
	iconUrl: string;
}

interface FilterState {
	categoryId: number;
	currentPage: number;
	searchValue?: string;
	sort: Sort;
}

const initialState: FilterState = {
	categoryId: 0,
	currentPage: 1,
	searchValue: '',
	sort: {
		name: 'популярности',
		sortProperty: 'rating',
		iconUrl: deskRatingIcon,
	},
};

export const filterSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		setCategory: (state, action: PayloadAction<number>) => {
			state.categoryId = action.payload;
		},
		setSortType: (state, action: PayloadAction<Sort>) => {
			state.sort = action.payload;
		},
		setCurrentPage: (state, action: PayloadAction<number>) => {
			state.currentPage = action.payload;
		},
		setSearchValue: (state, action: PayloadAction<string>) => {
			state.searchValue = action.payload;
		},
		setFilters: (state, action: PayloadAction<FilterState>) => {
			state.categoryId = action.payload.categoryId;
			state.currentPage = action.payload.currentPage;
			state.sort = action.payload.sort;
		},
	},
});

export const { setCategory, setSortType, setCurrentPage, setFilters, setSearchValue } = filterSlice.actions;

export default filterSlice.reducer;
