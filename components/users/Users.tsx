import React from 'react';
import styles from './Users.module.css'

import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
} from '@tanstack/react-table'

type User = {
    id: number
    firstName: string
    lastName: string
    email: string
    role: string
}

const defaultData: User[] = [
    {
        id: 0,
        firstName: 'John',
        lastName: 'Doe',
        email: 'happy@example.com',
        role: 'admin'
    },
    {
        id: 1,
        firstName: 'Michael',
        lastName: 'Duncan',
        email: 'michael.duncan@personifyhealth.com',
        role: 'subscriber'
    }
]

const columnHelper = createColumnHelper<User>()

const columns = [
    columnHelper.accessor(row => row.firstName, {
        id: 'firstName',
        cell: info => info.getValue(),
        header: () => <span>First Name</span>
    }),
    columnHelper.accessor(row => row.lastName, {
        id: 'lastName',
        cell: info => <i>{info.getValue()}</i>,
        header: () => <span>Last Name</span>
    }),
    columnHelper.accessor('email', {
        cell: info => info.getValue()
    }),
    columnHelper.accessor('role', {
        cell: info => info.getValue()
    })
]

export default function Users(): JSX.Element {
    const [data, _setData] = React.useState(() => [...defaultData])
    const [sorting, setSorting] = React.useState<SortingState>([])

    const rerender = React.useReducer(() => ({}), {})[1]

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(), //client-side sorting
        onSortingChange: setSorting, //optionally control sorting state in your own scope for easy access
        state: {
            sorting,
        },
    })

    return (
        <div className="p-2 block max-w-full overflow-x-scroll overflow-y-hidden">
            <div className={`${styles.header}`}>
                <div className={`${styles.leftHeader}`}>Users</div>
                <div className={`${styles.righHeader}`}>
                    <button type="button" className="btn btn-primary">Create New</button>
                </div>
            </div>
            <div className='h2' />
            <table className="table table-striped table-hover">
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
            <div className="h-4" />
            <button onClick={() => rerender()} className="border p-2">
                Refresh
            </button>
        </div>
    );
}
