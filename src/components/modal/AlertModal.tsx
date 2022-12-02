import { Box, Button, Fade, Modal, Typography } from '@mui/material'
import LoadingButton from '../button/LoadingButton'

interface Props {
	title: string
	body: string
	isOpen: boolean
	isLoading: boolean
	rejectText: string
	confirmText: string
	onClose: () => void
	onConfirm: () => void
}

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	borderRadius: '16px',
	boxShadow: 24,
	p: 4,
}

function AlertModal(props: Props) {
	const { title, body, isOpen, onClose, onConfirm, confirmText, rejectText, isLoading } = props
	return (
		<Modal
			aria-labelledby='delete-user-modal-title'
			aria-describedby='delete-user-modal-description'
			open={isOpen}
			onClose={onClose}
			closeAfterTransition>
			<Fade in={isOpen}>
				<Box sx={style}>
					<Typography id='delete-user-modal-title' variant='h6' component='h2' sx={{ mb: 2 }}>
						{title}
					</Typography>
					<Typography id='delete-user-modal-description' sx={{ mb: 4, color: 'GrayText' }}>
						{body}
					</Typography>
					<Box
						sx={{
							mb: -4,
							mx: -4,
							borderTop: '0.5px solid grey',
							padding: 2.5,
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'flex-end',
						}}>
						<Button sx={{ mr: 2 }} variant='outlined' onClick={onClose}>
							{rejectText}
						</Button>
						<LoadingButton isLoading={isLoading} onClick={onConfirm} color='error'>
							{confirmText}
						</LoadingButton>
					</Box>
				</Box>
			</Fade>
		</Modal>
	)
}

export default AlertModal
