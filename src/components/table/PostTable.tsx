import {
	Button,
	Paper,
	Skeleton,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from '@mui/material'
import { useMemo, useState } from 'react'
import ReactQuill from 'react-quill'
import { useParams } from 'react-router-dom'
import { useDeletePostMutation } from '../../app/api'
import { PostResponse } from '../../app/types'
import AlertModal from '../modal/AlertModal'
import styles from './table.module.css'

interface Props {
	data?: Array<PostResponse>
	isLoading: boolean
}

function PostTable(props: Props) {
	const { isLoading, data } = props
	const { userId } = useParams()
	const [openDeleteModal, setOpenDeleteModal] = useState(false)
	const [selectedId, setSelectedId] = useState(0)
	const [deletePost, { isLoading: isDeleteLoading }] = useDeletePostMutation()

	const skeletonRows = useMemo(() => (isLoading ? new Array(5).fill('') : []), [isLoading])

	const handleDeletePost = async () => {
		try {
			const id = Number(userId)
			await deletePost({ id: selectedId, userId: id })
		} catch (e) {
			console.error(e)
		}
		setOpenDeleteModal(false)
	}

	const handleOpenDeleteModal = (postId: number) => {
		setSelectedId(postId)
		setOpenDeleteModal(true)
	}

	return (
		<>
			<AlertModal
				title='Hapus Post'
				body='Apakah anda yakin?'
				isOpen={openDeleteModal}
				onClose={() => setOpenDeleteModal(false)}
				onConfirm={handleDeletePost}
				confirmText='Hapus'
				rejectText='Batalkan'
				isLoading={isDeleteLoading}
			/>
			<TableContainer component={Paper}>
				<Table aria-label='post-table'>
					<TableHead>
						<TableRow>
							<TableCell width='20%'>Title</TableCell>
							<TableCell width='65%'>Body</TableCell>
							<TableCell />
						</TableRow>
					</TableHead>
					<TableBody>
						{!isLoading &&
							!!data &&
							data.map((d) => (
								<TableRow key={d.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
									<TableCell component='th' scope='row'>
										{d.title}
									</TableCell>
									<TableCell>
										<ReactQuill
											className={styles.quillTable}
											value={d.body}
											readOnly
											theme='bubble'
										/>
									</TableCell>
									<TableCell>
										<Button
											sx={{ display: 'block', ml: 'auto' }}
											onClick={() => handleOpenDeleteModal(d.id)}
											variant='contained'
											color='error'>
											Delete
										</Button>
									</TableCell>
								</TableRow>
							))}
						{skeletonRows.length > 0 &&
							skeletonRows.map((_, index) => (
								<TableRow key={`skeleton-${index}`} sx={{ height: '69px' }}>
									<TableCell>
										<Skeleton variant='rounded' animation='wave' />
									</TableCell>
									<TableCell>
										<Skeleton variant='rounded' animation='wave' />
									</TableCell>
									<TableCell sx={{ display: 'flex', justifyContent: 'right' }}>
										<Skeleton width={80} height={36} variant='rounded' animation='wave' />
									</TableCell>
								</TableRow>
							))}
						{!isLoading && !!data && data.length === 0 && (
							<TableRow>
								<TableCell colSpan={3}>
									<Typography
										sx={{
											minHeight: '20vh',
											display: 'flex',
											justifyContent: 'center',
											alignItems: 'center',
										}}
										variant='h4'
										component='h2'>
										No Post to Show
									</Typography>
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	)
}

export default PostTable
