import {
	Box,
	Fade,
	FormControl,
	InputLabel,
	MenuItem,
	Modal,
	Select,
	SelectChangeEvent,
	TextField,
	Typography,
} from '@mui/material'
import { FormEventHandler, useState } from 'react'
import { useCreateUserMutation } from '../../app/api'
import { UserResponse } from '../../app/types'
import LoadingButton from '../button/LoadingButton'

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

function CreateUserModal(props: Props) {
	const { isOpen, onClose } = props
	const [gender, setGender] = useState('')
	const [status, setStatus] = useState('')
	const [createUser, { isLoading }] = useCreateUserMutation()

	const handleGenderChange = (event: SelectChangeEvent) => {
		setGender(event.target.value)
	}

	const handleStatusChange = (event: SelectChangeEvent) => {
		setStatus(event.target.value)
	}

	const handleFormSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
		e.preventDefault()
		const payload: { [key: string]: string } = {}
		const formData = new FormData(e.currentTarget)
		for (const [key, value] of Array.from(formData)) {
			payload[key] = value as string
		}
		try {
			await createUser(payload as Omit<UserResponse, 'id'>)
		} catch (e) {
			console.error(e)
		}

		setStatus('')
		setGender('')
		onClose()
	}

	return (
		<Modal
			aria-labelledby='create-user-modal-title'
			open={isOpen}
			onClose={onClose}
			closeAfterTransition>
			<Fade in={isOpen}>
				<Box component='form' onSubmit={handleFormSubmit} autoComplete='off' sx={style}>
					<Typography id='create-user-modal-title' variant='h6' component='h2' sx={mbStyle}>
						Buat Pengguna
					</Typography>
					<TextField
						name='email'
						fullWidth
						sx={mbStyle}
						required
						label='Email'
						type='email'
						autoComplete='email'
					/>
					<TextField
						name='name'
						fullWidth
						sx={mbStyle}
						required
						label='Name'
						type='text'
						autoComplete='name'
					/>
					<FormControl sx={mbStyle} required fullWidth>
						<InputLabel id='gender-select-label'>Gender</InputLabel>
						<Select
							name='gender'
							labelId='gender-select-label'
							id='gender-select'
							value={gender}
							label='Age'
							onChange={handleGenderChange}>
							<MenuItem value='female'>Female</MenuItem>
							<MenuItem value='male'>Male</MenuItem>
						</Select>
					</FormControl>
					<FormControl sx={mbStyle} required fullWidth>
						<InputLabel id='status-select-label'>Status</InputLabel>
						<Select
							name='status'
							labelId='status-select-label'
							id='status-select'
							value={status}
							label='Status'
							onChange={handleStatusChange}>
							<MenuItem value='active'>Active</MenuItem>
							<MenuItem value='inactive'>Inactive</MenuItem>
						</Select>
					</FormControl>
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

export default CreateUserModal
