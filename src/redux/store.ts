import { configureStore } from '@reduxjs/toolkit'
import filter from './slices/filterSlice'
import basket from './slices/basketSlice'
import pizza from './slices/pizzaSlice'

const store = configureStore({
	reducer: {
		filter,
		basket,
		pizza
	},
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store
