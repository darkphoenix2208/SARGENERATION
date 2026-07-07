import React from 'react';

const PageHeader = ({ title, subtitle, icon: Icon, badge, badgeColor, actions }) => (
    <div style={{
        display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
        marginBottom: '28px', gap: '16px', flexWrap: 'wrap'
    }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
            {Icon && (
                <div style={{
                    width: '44px', height: '44px', borderRadius: 'var(--radius-lg)',
                    background: 'var(--color-primary-50)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0, marginTop: '2px'
                }}>
                    <Icon size={22} color="var(--color-primary-700)" strokeWidth={1.8} />
                </div>
            )}
            <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                    <h1 style={{
                        fontSize: 'var(--font-2xl)', fontWeight: '800',
                        color: 'var(--color-gray-950)', letterSpacing: '-0.02em',
                        lineHeight: 1.2
                    }}>{title}</h1>
                    {badge && (
                        <span style={{
                            padding: '3px 10px', borderRadius: 'var(--radius-full)',
                            fontSize: 'var(--font-xs)', fontWeight: '700',
                            background: badgeColor || 'linear-gradient(135deg, var(--color-purple), #6366f1)',
                            color: 'white', letterSpacing: '0.02em',
                            display: 'inline-flex', alignItems: 'center', gap: '4px'
                        }}>{badge}</span>
                    )}
                </div>
                {subtitle && (
                    <p style={{
                        fontSize: 'var(--font-md)', color: 'var(--color-gray-500)',
                        marginTop: '4px', lineHeight: 1.5, maxWidth: '600px'
                    }}>{subtitle}</p>
                )}
            </div>
        </div>
        {actions && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                {actions}
            </div>
        )}
    </div>
);

export default PageHeader;
