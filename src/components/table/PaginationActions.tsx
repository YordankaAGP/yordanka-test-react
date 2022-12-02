import { Box, BoxProps, IconButton } from '@mui/material'
import { FirstPage, KeyboardArrowLeft, KeyboardArrowRight, LastPage } from '@mui/icons-material'
import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks'
import { selectTotalPage } from './pageSlice'

function PaginationActions(props: BoxProps) {
	const { ...restProps } = props
	const [searchParams, setSearchParams] = useSearchParams()
	const totalPages = useAppSelector(selectTotalPage)

	const page = useMemo(
		() => (searchParams.get('page') ? Number(searchParams.get('page')) : 1),
		[searchParams]
	)

	const selectablePages = useMemo(() => {
		const pages = [page - 2, page - 1, page, page + 1, page + 2]

		if (page === 1) pages.push(page + 3, page + 4)
		if (page === 2) pages.push(page + 3)
		if (page === totalPages - 1) pages.unshift(page - 3)
		if (page === totalPages) pages.unshift(page - 3, page - 4)

		return pages.filter((p) => p > 0 && p < totalPages + 1)
	}, [page, totalPages])

	const handleFirstPageButtonClick = () => {
		setSearchParams({ page: '1' })
	}

	const handleBackButtonClick = () => {
		setSearchParams({ page: `${page - 1}` })
	}

	const handleNextButtonClick = () => {
		setSearchParams({ page: `${page + 1}` })
	}

	const handleLastPageButtonClick = () => {
		setSearchParams({ page: `${totalPages}` })
	}

	const handleNumberClick = (number: number) => {
		setSearchParams({ page: `${number}` })
	}

	return (
		<Box sx={{ minWidth: 'max-content' }} {...restProps}>
			<IconButton
				onClick={handleFirstPageButtonClick}
				disabled={page === 1}
				aria-label='first page'>
				<FirstPage />
			</IconButton>
			<IconButton onClick={handleBackButtonClick} disabled={page === 1} aria-label='previous page'>
				<KeyboardArrowLeft />
			</IconButton>
			{selectablePages.map((p) => (
				<IconButton
					disabled={p === page}
					sx={{
						width: '40px',
						height: '40px',
						fontSize: '16px',
						color: p === page ? 'black !important' : 'grey',
					}}
					key={p}
					onClick={() => handleNumberClick(p)}
					aria-label={`page ${p}`}>
					<Box sx={{ fontWeight: 600 }}>{p}</Box>
				</IconButton>
			))}
			<IconButton
				onClick={handleNextButtonClick}
				disabled={page >= totalPages}
				aria-label='next page'>
				<KeyboardArrowRight />
			</IconButton>
			<IconButton
				onClick={handleLastPageButtonClick}
				disabled={page >= totalPages}
				aria-label='last page'>
				<LastPage />
			</IconButton>
		</Box>
	)
}

export default PaginationActions
