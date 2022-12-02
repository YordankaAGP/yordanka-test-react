import { Box, BoxProps } from '@mui/material'
import { Outlet } from 'react-router-dom'

function Layout(props: BoxProps) {
	const { children, ...restProps } = props
	return (
		<Box p={4} bgcolor='#fff5f5' minHeight='100vh' {...restProps}>
			<Outlet />
		</Box>
	)
}

export default Layout
