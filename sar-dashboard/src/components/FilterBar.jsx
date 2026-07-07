import React from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';

const FilterBar = ({ filters, searchPlaceholder, onSearch }) => (
    <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap', alignItems: 'center' }}>
        {onSearch && (
            <div style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                background: 'var(--surface-card)', padding: '9px 14px',
                borderRadius: 'var(--radius-md)', border: '1px solid var(--color-gray-200)',
                flex: '1', minWidth: '250px',
                transition: 'border-color var(--transition-fast)',
                boxShadow: 'var(--shadow-xs)'
            }}>
                <Search size={15} color="var(--color-gray-400)" />
                <input
                    type="text"
                    placeholder={searchPlaceholder || 'Search...'}
                    onChange={e => onSearch(e.target.value)}
                    style={{
                        border: 'none', outline: 'none', width: '100%',
                        fontSize: 'var(--font-md)', background: 'transparent',
                        color: 'var(--color-gray-800)'
                    }}
                />
            </div>
        )}
        {filters && filters.map((f, i) => (
            <select key={i} style={{
                padding: '9px 14px', borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-gray-200)', fontSize: 'var(--font-md)',
                color: 'var(--color-gray-600)', background: 'var(--surface-card)',
                cursor: 'pointer', minWidth: '140px',
                boxShadow: 'var(--shadow-xs)',
                transition: 'border-color var(--transition-fast)'
            }}>
                <option>{f.label}</option>
                {f.options.map((o, j) => <option key={j} value={o}>{o}</option>)}
            </select>
        ))}
    </div>
);

export default FilterBar;
