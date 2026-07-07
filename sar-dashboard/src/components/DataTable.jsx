import React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

const DataTable = ({ columns, data, onRowClick, sortConfig, onSort }) => {
    const renderSortIcon = (col) => {
        if (!onSort) return null;
        const colKey = col.key || col.header;
        const isActive = sortConfig?.key === colKey;
        return (
            <span style={{
                display: 'inline-flex', flexDirection: 'column', marginLeft: '4px',
                opacity: isActive ? 1 : 0.3, transition: 'opacity var(--transition-fast)'
            }}>
                <ChevronUp size={10} style={{ marginBottom: '-3px', color: isActive && sortConfig?.dir === 'asc' ? 'var(--color-primary-700)' : 'var(--color-gray-400)' }} />
                <ChevronDown size={10} style={{ color: isActive && sortConfig?.dir === 'desc' ? 'var(--color-primary-700)' : 'var(--color-gray-400)' }} />
            </span>
        );
    };

    return (
        <div className="card" style={{ overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' }}>
                <table className="data-table">
                    <thead>
                        <tr>
                            {columns.map((col, i) => (
                                <th
                                    key={i}
                                    onClick={() => onSort && onSort(col.key)}
                                    style={{
                                        cursor: onSort ? 'pointer' : 'default',
                                        userSelect: 'none', whiteSpace: 'nowrap',
                                        ...(col.width && { width: col.width })
                                    }}
                                >
                                    <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                                        {col.label || col.header}
                                        {renderSortIcon(col)}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, rowIdx) => (
                            <tr
                                key={rowIdx}
                                onClick={() => onRowClick && onRowClick(row)}
                                style={{ cursor: onRowClick ? 'pointer' : 'default' }}
                            >
                                {columns.map((col, colIdx) => (
                                    <td key={colIdx}>
                                        {col.render ? col.render(row[col.key], row) : row[col.key]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                        {data.length === 0 && (
                            <tr>
                                <td colSpan={columns.length} style={{
                                    textAlign: 'center', padding: '40px',
                                    color: 'var(--color-gray-400)', fontSize: 'var(--font-md)'
                                }}>
                                    No data available
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DataTable;
