import styled from '@emotion/styled'
import { Box, Button, Typography } from '@mui/material'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useGetUsersQuery } from '../app/api'
import CreateUserModal from '../components/modal/CreateUserModal'
import UserTable from '../components/table/UserTable'

const LIMIT = 10

function User() {
	const [searchParams] = useSearchParams()
	const [open, setOpen] = useState(false)
	const { isFetching, data } = useGetUsersQuery({
		page: searchParams.get('page') ? Number(searchParams.get('page')) : 1,
		limit: LIMIT,
	})

	return (
		<>
			<Box
				sx={{
					mb: 6,
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
				}}>
				<Typography variant='h4' component='h1'>
					Daftar Pengguna
				</Typography>
				<Button sx={{ height: 44 }} onClick={() => setOpen(true)} color='info' variant='contained'>
					Buat Pengguna
				</Button>
			</Box>
			<UserTable isFetching={isFetching} data={data} perPage={LIMIT} />
			<CreateUserModal onClose={() => setOpen(false)} isOpen={open} />
		</>
	)
}

export default User
