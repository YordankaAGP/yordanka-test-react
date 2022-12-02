import { Button, ButtonProps, CircularProgress } from '@mui/material'

type Props = { isLoading: boolean } & ButtonProps

function LoadingButton(props: Props) {
	const { isLoading, children, sx, ...restProps } = props
	return (
		<Button
			variant='contained'
			sx={{ display: 'flex', alignItems: 'center', ...sx }}
			disabled={isLoading}
			{...restProps}>
			{isLoading ? (
				<CircularProgress sx={{ maxWidth: '24px', maxHeight: '24px' }} color='inherit' />
			) : (
				children
			)}
		</Button>
	)
}

export default LoadingButton
