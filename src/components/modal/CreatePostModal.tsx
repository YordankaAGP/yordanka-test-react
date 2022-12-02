import { Box, Fade, Modal, TextField, Typography } from '@mui/material'
import { FormEventHandler, useState } from 'react'
import ReactQuill from 'react-quill'
import { useCreatePostMutation, useCreateUserMutation } from '../../app/api'
import { PostResponse, UserResponse } from '../../app/types'
import LoadingButton from '../button/LoadingButton'
import 'react-quill/dist/quill.snow.css'
import { useParams } from 'react-router-dom'

interface Props {
	isOpen: boolean
	onClose: () => void
}

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 600,
	bgcolor: 'background.paper',
	borderRadius: '16px',
	boxShadow: 24,
	p: 4,
}

const mbStyle = { mb: 3.5 }

function CreatePostModal(props: Props) {
	const { isOpen, onClose } = props
	const { userId } = useParams()
	const [body, setBody] = useState('')
	const [createPost, { isLoading }] = useCreatePostMutation()

	const handleFormSubmit = async (e: any) => {
		e.preventDefault()

		if (body.length === 0) return

		const title: string = e.target.title.value
		const id = Number(userId)

		const payload: Omit<PostResponse, 'id'> = { body, title, userId: id }

		try {
			await createPost(payload)
		} catch (e) {
			console.error(e)
		}

		setBody('')
		onClose()
	}

	return (
		<Modal
			aria-labelledby='create-post-modal-title'
			open={isOpen}
			onClose={onClose}
			closeAfterTransition>
			<Fade in={isOpen}>
				<Box component='form' onSubmit={handleFormSubmit} autoComplete='off' sx={style}>
					<Typography id='create-post-modal-title' variant='h6' component='h2' sx={mbStyle}>
						Buat Post
					</Typography>
					<TextField required name='title' fullWidth sx={mbStyle} label='Title' type='text' />
					<Box mb={4}>
						<ReactQuill theme='snow' value={body} onChange={setBody} />
					</Box>
					<LoadingButton
						sx={{ width: 120, ml: 'auto' }}
						isLoading={isLoading}
						color='info'
						type='submit'>
						Buat
					</LoadingButton>
				</Box>
			</Fade>
		</Modal>
	)
}

export default CreatePostModal
