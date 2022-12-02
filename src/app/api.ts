import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { PagedResponse, PostResponse, UserResponse } from './types'

const ACCESS_TOKEN = 'ad24e16d7c162bc960c5ada605a9379c45c3e0269f7895a28076d109b84240d1'

const baseQuery = fetchBaseQuery({
	baseUrl: 'https://gorest.co.in/public/v2',
	prepareHeaders: (headers) => {
		headers.set('authorization', `Bearer ${ACCESS_TOKEN}`)
		return headers
	},
})

// Define a service using a base URL and expected endpoints
export const api = createApi({
	reducerPath: 'api',
	baseQuery,
	tagTypes: ['User', 'Post'],
	endpoints: (builder) => ({
		getUsers: builder.query<PagedResponse<UserResponse>, { page: number; limit: number }>({
			query: ({ page, limit }) => ({
				url: `/users?page=${page}&per_page=${limit}`,
				method: 'GET',
				headers: {
					'content-type': 'text/plain',
				},
			}),
			transformResponse(data: Array<UserResponse>, meta) {
				return {
					data,
					page: Number(meta?.response?.headers.get('X-Pagination-Page')),
					totalPages: Number(meta?.response?.headers.get('X-Pagination-Pages')),
				}
			},
			providesTags: (result) =>
				result
					? [
							...result.data.map(({ id }) => ({ type: 'User' as const, id })),
							{ type: 'User', id: 'PARTIAL-LIST' },
					  ]
					: [{ type: 'User', id: 'PARTIAL-LIST' }],
		}),
		getUser: builder.query<UserResponse, number>({
			query: (id) => ({
				url: `/users/${id}`,
				method: 'GET',
				headers: {
					'content-type': 'text/plain',
				},
			}),
		}),
		createUser: builder.mutation<any, Omit<UserResponse, 'id'>>({
			query: (payload) => ({
				url: '/users',
				method: 'POST',
				body: payload,
			}),
			invalidatesTags: () => [{ type: 'User', id: 'PARTIAL-LIST' }],
		}),
		deleteUser: builder.mutation<any, number>({
			query: (id) => ({
				url: `/users/${id}`,
				method: 'DELETE',
				headers: {
					'content-type': 'text/plain',
				},
			}),
			invalidatesTags: (_, __, id) => [
				{ type: 'User', id },
				{ type: 'User', id: 'PARTIAL-LIST' },
			],
		}),
		updateUser: builder.mutation<any, UserResponse>({
			query: ({ id, ...payload }) => ({
				url: `/users/${id}`,
				method: 'PATCH',
				body: payload,
			}),
			invalidatesTags: (_, __, arg) => [{ type: 'User', id: arg.id }],
		}),
		getPosts: builder.query<Array<PostResponse>, number>({
			query: (id) => ({
				url: `/users/${id}/posts`,
				method: 'GET',
				headers: {
					'content-type': 'text/plain',
				},
			}),
			transformResponse(data: (Omit<PostResponse, 'userId'> & { user_id: number })[]) {
				return data.map(({ user_id: userId, ...rest }) => ({
					userId,
					...rest,
				}))
			},
			providesTags: (_, __, id) => {
				return [{ type: 'Post', id }]
			},
		}),
		createPost: builder.mutation<any, Omit<PostResponse, 'id'>>({
			query: ({ userId, ...payload }) => ({
				url: `/users/${userId}/posts`,
				method: 'POST',
				body: { user: userId, ...payload },
			}),
			invalidatesTags: (_, __, payload) => [{ type: 'Post', id: payload.userId }],
		}),
		deletePost: builder.mutation<any, { id: number; userId: number }>({
			query: ({ id }) => ({
				url: `/posts/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: (_, __, args) => [{ type: 'Post', id: args.userId }],
		}),
	}),
})

export const {
	useGetUsersQuery,
	useGetUserQuery,
	useGetPostsQuery,
	useCreateUserMutation,
	useDeleteUserMutation,
	useUpdateUserMutation,
	useCreatePostMutation,
	useDeletePostMutation,
} = api
