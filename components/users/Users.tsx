import React, { useEffect, useState } from 'react';
import styles from './Users.module.css';
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
} from '@tanstack/react-table';
import CustomModal from '../modal/Modal';
import DeleteModal from '../modal/DeleteModal';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import Image from 'next/image';
import { fetchUser, addUser, editUser, deleteUser } from '@/features/user/userSlice';

type User = {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    roles: string[];
    phoneNumber: string;
};

const columnHelper = createColumnHelper<User>();

export default function Users(): JSX.Element {
    const [data, setData] = useState<User[]>([]);
    const [sorting, setSorting] = useState<SortingState>([]);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deletingUser, setDeletingUser] = useState<User | null>(null);

    const dispatch = useDispatch();
    const response = useSelector((state: RootState) => state.user);

    useEffect(() => {
        dispatch(fetchUser());
    }, [dispatch]);

    useEffect(() => {
        if (response.users) {
            setData(response.users);
        }
    }, [response.users]);

    const handleEdit = (user: User) => {
        setEditingUser(user);
        setIsModalOpen(true);
    };

    const handleDelete = (user: User) => {
        setDeletingUser(user);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        if (deletingUser) {
            dispatch(deleteUser(deletingUser._id));
            setData(data.filter(user => user._id !== deletingUser._id));
            setDeletingUser(null);
            setIsDeleteModalOpen(false);
        }
    };

    const handleModalClose = () => {
        setEditingUser(null);
        setIsModalOpen(false);
    };

    const handleDeleteModalClose = () => {
        setDeletingUser(null);
        setIsDeleteModalOpen(false);
    };

    const columns = [
        columnHelper.accessor('firstName', {
            cell: info => info.getValue(),
            header: () => <span>First Name</span>,
        }),
        columnHelper.accessor('lastName', {
            cell: info => <i>{info.getValue()}</i>,
            header: () => <span>Last Name</span>,
        }),
        columnHelper.accessor('email', {
            cell: info => info.getValue(),
            header: () => <span>Email</span>,
        }),
        columnHelper.accessor(row => row.roles[0], {
            id: 'role',
            cell: info => info.getValue(),
            header: () => <span>Role</span>,
        }),
        columnHelper.accessor('_id', {
            id: 'actions',
            cell: info => (
                <div>
                    <Image
                        className={styles.iconSection}
                        src="/icons/delete-icon.svg"
                        alt="delete-icon"
                        width={25}
                        height={20}
                        onClick={() => handleDelete(info.row.original)}
                    />
                    <Image
                        className={styles.iconSection}
                        src="/icons/edit-icon.svg"
                        alt="edit-icon"
                        width={25}
                        height={20}
                        onClick={() => handleEdit(info.row.original)}
                    />
                </div>
            ),
            header: () => <span>Actions</span>,
        }),
    ];

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onSortingChange: setSorting,
        state: {
            sorting,
        },
    });

    return (
        <div className="p-2 block max-w-full overflow-y-hidden m-4">
            <div className={`${styles.header}`}>
                <div className={`${styles.leftHeader}`}>
                    <h3>Users</h3>
                </div>
                <button className="btn btn-primary" onClick={() => setIsModalOpen(true)} style={{
                backgroundColor:' #163B42',
                borderColor: '#163B42',
                color: 'white',
                }}>
                    Create New
                </button>
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
                                );
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
            {isModalOpen && (
                <CustomModal
                    user={editingUser}
                    onClose={handleModalClose}
                    onSave={(user: User) => {
                        if (editingUser) {
                            setData(data.map(u => (u._id === user._id ? user : u)));
                            dispatch(editUser(user))
                        } else {
                            dispatch(addUser(user))
                        }
                        handleModalClose();
                    }}
                />
            )}
            {isDeleteModalOpen && (
                <DeleteModal
                    user={deletingUser}
                    onClose={handleDeleteModalClose}
                    onDelete={confirmDelete}
                />
            )}
        </div>
    );
}