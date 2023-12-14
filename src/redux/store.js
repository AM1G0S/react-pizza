import { configureStore } from '@reduxjs/toolkit'
import categorySlice from './slices/categorySlice'
import sortSlice from './slices/sortSlice'

export const store = configureStore({
	reducer: {
		categorySlice,
		sortSlice
	},
})
