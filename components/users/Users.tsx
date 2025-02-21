import React, { useEffect } from 'react';
import styles from './Users.module.css'
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
} from '@tanstack/react-table'
import CustomModal from '../modal/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import Image from 'next/image';
import { fetchUser } from '@/features/user/userSlice';

type User = {
    _id: string
    firstName: string
    lastName: string
    email: string
    roles: string[]
    phoneNumber: string
}

const columnHelper = createColumnHelper<User>()

const columns = [
    columnHelper.accessor('firstName', {
        cell: info => info.getValue(),
        header: () => <span>First Name</span>
    }),
    columnHelper.accessor('lastName', {
        cell: info => <i>{info.getValue()}</i>,
        header: () => <span>Last Name</span>
    }),
    columnHelper.accessor('email', {
        cell: info => info.getValue(),
        header: () => <span>Email</span>
    }),
    columnHelper.accessor(row => row.roles[0], {
        id: 'role',
        cell: info => info.getValue(),
        header: () => <span>Role</span>
    }),
    columnHelper.accessor('_id', {
        id: 'actions',
        cell: info => (
            <div>
                <Image className={styles.iconSection}
                    src="/icons/delete-icon.svg"
                    alt="delete-icon"
                    width={25}
                    height={20}
                    // onClick={() => handleDelete(info.getValue())}
                />
                <Image className={styles.iconSection}
                    src="/icons/edit-icon.svg"
                    alt="edit-icon"
                    width={25}
                    height={20}
                    // onClick={() => handleEdit(info.getValue())}
                />
            </div>
        ),
        header: () => <span>Actions</span>
    })
]

export default function Users(): JSX.Element {
    const [data, setData] = React.useState<User[]>([])
    const [sorting, setSorting] = React.useState<SortingState>([])

    const dispatch = useDispatch();
    const response = useSelector((state: RootState) => state.user);

    useEffect(() => {
        dispatch(fetchUser())
    }, [dispatch])

    useEffect(() => {
        if (response.users) {
            setData(response.users)
        }
    }, [response.users])

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onSortingChange: setSorting,
        state: {
            sorting,
        },
    })

    const handleEdit = (id: string) => {
        console.log(`Edit user with id: ${id}`);
    }

    const handleDelete = (id: string) => {
        console.log(`Delete user with id: ${id}`);
        setData(data.filter(user => user._id !== id));
    }

    return (
        <div className="p-2 block max-w-full overflow-x-scroll overflow-y-hidden">
            <div className={`${styles.header}`}>
                <div className={`${styles.leftHeader}`}>Users</div>
                <CustomModal />
            </div>
            <table className="table table-striped table-hover mt-3">
                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => {
                                return (
                                    <th key={header.id} colSpan={header.colSpan}>
                                        {header.isPlaceholder ? null : (
                                            <div
                                                className={
                                                    header.column.getCanSort()
                                                        ? 'cursor-pointer select-none'
                                                        : ''
                                                }
                                                onClick={header.column.getToggleSortingHandler()}
                                                title={
                                                    header.column.getCanSort()
                                                        ? header.column.getNextSortingOrder() === 'asc'
                                                            ? 'Sort ascending'
                                                            : header.column.getNextSortingOrder() === 'desc'
                                                                ? 'Sort descending'
                                                                : 'Clear sort'
                                                        : undefined
                                                }
                                            >
                                                {flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                                {{
                                                    asc: ' 🔼',
                                                    desc: ' 🔽',
                                                }[header.column.getIsSorted() as string] ?? null}
                                            </div>
                                        )}
                                    </th>
                                )
                            })}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map(row => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
