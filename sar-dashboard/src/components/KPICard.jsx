import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const KPICard = ({ label, value, change, changeType, badge, icon: Icon, accentColor }) => {
    const accent = accentColor || 'var(--color-primary-900)';
    const isPositive = changeType === 'positive';

    return (
        <div
            className="card card-interactive"
            style={{
                padding: '24px',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'default'
            }}
        >
            {/* Accent top border */}
            <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
                background: accent, borderRadius: '12px 12px 0 0'
            }} />

            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <div style={{ flex: 1 }}>
                    <div style={{
                        color: 'var(--color-gray-500)', fontSize: 'var(--font-sm)',
                        fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em',
                        marginBottom: '10px'
                    }}>{label}</div>
                    <div style={{
                        fontSize: 'var(--font-3xl)', fontWeight: '800',
                        color: 'var(--color-gray-950)', letterSpacing: '-0.02em',
                        lineHeight: 1.1, marginBottom: '10px'
                    }}>{value}</div>
                    <div style={{
                        display: 'flex', alignItems: 'center', gap: '4px',
                        fontSize: 'var(--font-sm)', fontWeight: '600',
                        color: isPositive ? 'var(--color-success)' : 'var(--color-danger)'
                    }}>
                        {isPositive
                            ? <TrendingUp size={14} strokeWidth={2.5} />
                            : <TrendingDown size={14} strokeWidth={2.5} />
                        }
                        <span>{change}</span>
                    </div>
                </div>

                {/* Icon container */}
                {Icon && (
                    <div style={{
                        width: '44px', height: '44px', borderRadius: 'var(--radius-lg)',
                        background: `${accent}12`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0
                    }}>
                        <Icon size={22} color={accent} strokeWidth={1.8} />
                    </div>
                )}
            </div>

            {badge && (
                <span style={{
                    display: 'inline-block', marginTop: '12px',
                    background: 'var(--color-gray-100)', color: 'var(--color-gray-600)',
                    padding: '3px 10px', borderRadius: 'var(--radius-full)',
                    fontSize: 'var(--font-xs)', fontWeight: '600'
                }}>{badge}</span>
            )}
        </div>
    );
};

export default KPICard;
