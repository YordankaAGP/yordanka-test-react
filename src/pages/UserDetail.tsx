import { Box, Button, Skeleton, Typography } from '@mui/material'
import { useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { useGetPostsQuery, useGetUserQuery } from '../app/api'
import { UserResponse } from '../app/types'
import CreatePostModal from '../components/modal/CreatePostModal'
import PostTable from '../components/table/PostTable'
import Error from './Error'

const Label = (props: { text: string }) => (
	<>
		<Typography fontWeight={500}>{props.text}</Typography>
		<span>:</span>
	</>
)

function UserDetail() {
	const { userId } = useParams()
	const { state } = useLocation()
	const isNaN = Number.isNaN(Number(userId))

	const [openModal, setOpenModal] = useState(false)

	const { isFetching: isUserFetching, data: userData } = useGetUserQuery(Number(userId), {
		skip: isNaN || !!state?.user,
	})

	const data: UserResponse | undefined = state?.user ? state.user : userData

	const { isFetching: isPostFetching, data: postData } = useGetPostsQuery(data!.id, {
		skip: !data,
	})

	console.log(postData, isPostFetching)

	if (isNaN || (!isUserFetching && !data)) return <Error />

	return (
		<Box maxWidth={1280} m='auto'>
			<CreatePostModal onClose={() => setOpenModal(false)} isOpen={openModal} />
			<Typography variant='h4' mb={6} component='h1'>
				Lihat Pengguna
			</Typography>
			<Box
				sx={{
					marginBottom: 6,
					display: 'grid',
					columnGap: 3,
					rowGap: 2,
					gridTemplateColumns: '1fr 0fr 10fr',
				}}>
				{isUserFetching ? (
					<>
						<Label text='Name' />
						<Skeleton width={250} />
						<Label text='Gender' />
						<Skeleton width={100} />
						<Label text='Email' />
						<Skeleton width={400} />
					</>
				) : (
					<>
						<Label text='Name' />
						<Typography>{data?.name}</Typography>
						<Label text='Gender' />
						<Typography textTransform='capitalize'>{data?.gender}</Typography>
						<Label text='Email' />
						<Typography>{data?.email}</Typography>
					</>
				)}
			</Box>
			<Box sx={{ mb: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
				<Typography variant='h5' component='h2'>
					Daftar Post
				</Typography>
				<Button variant='contained' onClick={() => setOpenModal(true)}>
					Buat Post
				</Button>
			</Box>
			<PostTable isLoading={isPostFetching} data={postData} />
		</Box>
	)
}

export default UserDetail
