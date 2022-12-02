import { createSlice } from '@reduxjs/toolkit'
import { api } from '../../app/api'
import { RootState } from '../../app/store'

const pageSlice = createSlice({
	name: 'page',
	initialState: { totalPages: 0 },
	reducers: {},
	extraReducers: (builder) => {
		builder.addMatcher(
			api.endpoints.getUsers.matchFulfilled,
			(state, { payload: { totalPages } }) => {
				state.totalPages = totalPages
			}
		)
	},
})

export const selectTotalPage = (state: RootState) => state.page.totalPages

export default pageSlice.reducer
