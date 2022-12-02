export type UserResponse = {
	id: number
	name: string
	email: string
	status: 'active' | 'inactive'
	gender: 'male' | 'female'
}

export type PostResponse = {
	id: number
	userId: number
	title: string
	body: string
}

export type PagedResponse<T> = {
	data: Array<T>
	page: number
	totalPages: number
}
