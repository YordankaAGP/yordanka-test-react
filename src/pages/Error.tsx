import { Box, Typography } from '@mui/material'

const Error = () => (
	<Box
		sx={{
			m: 'auto',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
		}}>
		<Typography sx={{ fontWeight: 600 }} variant='h1'>
			Error 404
		</Typography>
	</Box>
)

export default Error
