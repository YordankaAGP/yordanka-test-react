import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import counterReducer from '../components/counter/counterSlice'
import pageReducer from '../components/table/pageSlice'

import { api } from './api'

export const store = configureStore({
	reducer: {
		counter: counterReducer,
		page: pageReducer,
		[api.reducerPath]: api.reducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>
