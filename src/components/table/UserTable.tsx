import {
	Button,
	Paper,
	Skeleton,
	styled,
	Table,
	TableBody,
	TableCell as _TableCell,
	tableCellClasses,
	TableContainer,
	TableHead,
	TableRow,
} from '@mui/material'
import { grey } from '@mui/material/colors'
import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDeleteUserMutation } from '../../app/api'
import { PagedResponse, UserResponse } from '../../app/types'
import AlertModal from '../modal/AlertModal'
import UpdateUserModal from '../modal/UpdateUserModal'
import PaginationActions from './PaginationActions'

const TableCell = styled(_TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
		textTransform: 'uppercase',
		border: 'none',
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
	},
})) as typeof _TableCell

const StyledTableRow = styled(TableRow)(({ theme }) => ({
	cursor: 'pointer',
	transition: theme.transitions.create('background-color', {
		duration: theme.transitions.duration.shorter,
		easing: theme.transitions.easing.sharp,
	}),
	'&:nth-of-type(odd)': {
		backgroundColor: grey[50],
	},
	'@media (hover: hover)': {
		'&:hover': {
			backgroundColor: grey[200],
		},
	},
})) as typeof TableRow

interface Props {
	isFetching: boolean
	data?: PagedResponse<UserResponse>
	perPage: number
}

function UserTable(props: Props) {
	const { isFetching, perPage, data } = props
	const [openDeleteModal, setOpenDeleteModal] = useState(false)
	const [openUpdateModal, setOpenUpdateModal] = useState(false)
	const [selectedUser, setSelectedUser] = useState<UserResponse | null>(null)
	const [selectedId, setSelectedId] = useState(0)

	const navigate = useNavigate()
	const [deleteUser, { isLoading: isDeleteLoading }] = useDeleteUserMutation()

	const skeletonRows = useMemo(
		() => (isFetching ? new Array(perPage).fill('') : []),
		[isFetching, perPage]
	)

	const handleDeleteUser = async () => {
		try {
			await deleteUser(selectedId)
		} catch (e) {
			console.error(e)
		}
		setOpenDeleteModal(false)
	}

	const handleOpenDeleteModal = (e: React.MouseEvent<HTMLButtonElement>, userId: number) => {
		e.stopPropagation()
		setSelectedId(userId)
		setOpenDeleteModal(true)
	}
	const handleOpenUpdateModal = (e: React.MouseEvent<HTMLButtonElement>, payload: UserResponse) => {
		e.stopPropagation()
		setSelectedUser(payload)
		setOpenUpdateModal(true)
	}
	const handleRowClick = (user: UserResponse) => {
		navigate(`/${user.id}`, { state: { user } })
	}

	return (
		<Paper sx={{ width: '100%', overflow: 'hidden' }}>
			<AlertModal
				title='Hapus Pengguna'
				body='Apakah anda yakin?'
				isOpen={openDeleteModal}
				onClose={() => setOpenDeleteModal(false)}
				onConfirm={handleDeleteUser}
				confirmText='Hapus'
				rejectText='Batalkan'
				isLoading={isDeleteLoading}
			/>
			<UpdateUserModal
				data={selectedUser}
				isOpen={openUpdateModal}
				onClose={() => setOpenUpdateModal(false)}
			/>
			<TableContainer sx={{ maxHeight: '65vh', borderBottom: '1px solid lightgrey' }}>
				<Table stickyHeader aria-label='user table'>
					<TableHead>
						<TableRow>
							<TableCell>Id</TableCell>
							<TableCell>Name</TableCell>
							<TableCell>Email</TableCell>
							<TableCell>Gender</TableCell>
							<TableCell>Status</TableCell>
							<TableCell />
						</TableRow>
					</TableHead>
					<TableBody>
						{!isFetching &&
							!!data &&
							data.data.map((d) => (
								<StyledTableRow key={d.id} onClick={() => handleRowClick(d)}>
									<TableCell width='10%' component='th' scope='row'>
										{d.id}
									</TableCell>
									<TableCell width='20%'>{d.name}</TableCell>
									<TableCell width='25%'>{d.email}</TableCell>
									<TableCell width='10%' sx={{ textTransform: 'capitalize' }}>
										{d.gender}
									</TableCell>
									<TableCell width='10%' sx={{ textTransform: 'uppercase' }}>
										{d.status}
									</TableCell>
									<TableCell
										align='right'
										sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'right' }}>
										<Button variant='outlined' onClick={(e) => handleOpenUpdateModal(e, d)}>
											Update
										</Button>
										<Button
											sx={{ ml: 2 }}
											onClick={(e) => handleOpenDeleteModal(e, d.id)}
											color='error'
											variant='contained'>
											Delete
										</Button>
									</TableCell>
								</StyledTableRow>
							))}

						{skeletonRows.length > 0 &&
							skeletonRows.map((_, index) => (
								<TableRow key={`skeleton-${index}`} sx={{ height: '69px' }}>
									<TableCell width='10%'>
										<Skeleton variant='rounded' animation='wave' />
									</TableCell>
									<TableCell width='20%'>
										<Skeleton variant='rounded' animation='wave' />
									</TableCell>
									<TableCell width='25%'>
										<Skeleton variant='rounded' animation='wave' />
									</TableCell>
									<TableCell width='10%'>
										<Skeleton variant='rounded' animation='wave' />
									</TableCell>
									<TableCell width='10%'>
										<Skeleton variant='rounded' animation='wave' />
									</TableCell>
									<TableCell
										align='right'
										sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'right' }}>
										<Skeleton width={80} height={36} variant='rounded' animation='wave' />
										<Skeleton
											sx={{ ml: 2 }}
											width={80}
											height={36}
											variant='rounded'
											animation='wave'
										/>
									</TableCell>
								</TableRow>
							))}
						{/* {emptyRows > 0 && (
						<TableRow
							style={{
								backgroundColor: 
								height: (dense ? 33 : 53) * emptyRows,
							}}>
							<TableCell colSpan={6} />
						</TableRow>
					)} */}
					</TableBody>
				</Table>
			</TableContainer>
			<PaginationActions sx={{ p: 2 }} />
		</Paper>
	)
}

export default UserTable
