import React, { useState, useRef, useEffect } from 'react';

const TabPage = ({ tabs, defaultTab = 0 }) => {
    const [activeTab, setActiveTab] = useState(defaultTab);
    const [indicatorStyle, setIndicatorStyle] = useState({});
    const tabRefs = useRef([]);
    const containerRef = useRef(null);

    // Animate underline indicator
    useEffect(() => {
        const activeEl = tabRefs.current[activeTab];
        if (activeEl && containerRef.current) {
            const containerRect = containerRef.current.getBoundingClientRect();
            const tabRect = activeEl.getBoundingClientRect();
            setIndicatorStyle({
                left: tabRect.left - containerRect.left,
                width: tabRect.width,
            });
        }
    }, [activeTab]);

    return (
        <div>
            {/* Tab Bar */}
            <div
                ref={containerRef}
                style={{
                    display: 'flex', gap: '0', background: 'var(--surface-card)',
                    borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0',
                    borderBottom: '2px solid var(--color-gray-200)',
                    overflowX: 'auto', position: 'relative',
                    boxShadow: 'var(--shadow-xs)'
                }}
            >
                {tabs.map((tab, i) => (
                    <button
                        key={i}
                        ref={el => tabRefs.current[i] = el}
                        onClick={() => setActiveTab(i)}
                        style={{
                            padding: '14px 24px', border: 'none', cursor: 'pointer',
                            fontSize: 'var(--font-md)', fontWeight: activeTab === i ? '700' : '500',
                            color: activeTab === i ? 'var(--color-primary-900)' : 'var(--color-gray-500)',
                            background: 'transparent',
                            transition: 'all var(--transition-base)',
                            whiteSpace: 'nowrap',
                            display: 'flex', alignItems: 'center', gap: '8px',
                            position: 'relative', zIndex: 1,
                            letterSpacing: '-0.01em'
                        }}
                        onMouseEnter={e => {
                            if (activeTab !== i) e.currentTarget.style.color = 'var(--color-gray-700)';
                        }}
                        onMouseLeave={e => {
                            if (activeTab !== i) e.currentTarget.style.color = 'var(--color-gray-500)';
                        }}
                    >
                        {tab.icon && <tab.icon size={16} strokeWidth={activeTab === i ? 2.2 : 1.8} />}
                        {tab.label}
                        {tab.badge && (
                            <span style={{
                                padding: '1px 7px', borderRadius: 'var(--radius-full)',
                                fontSize: '10px', fontWeight: '700',
                                background: tab.badgeColor || 'var(--color-danger)',
                                color: 'white', lineHeight: '16px'
                            }}>{tab.badge}</span>
                        )}
                    </button>
                ))}

                {/* Animated underline indicator */}
                <div style={{
                    position: 'absolute', bottom: '-2px', height: '3px',
                    background: 'var(--color-primary-700)',
                    borderRadius: '3px 3px 0 0',
                    transition: 'left 0.25s cubic-bezier(0.4, 0, 0.2, 1), width 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                    left: indicatorStyle.left || 0,
                    width: indicatorStyle.width || 0
                }} />
            </div>

            {/* Tab Content — with fade transition */}
            <div
                key={activeTab}
                style={{ paddingTop: '24px', animation: 'fadeIn 0.25s ease forwards' }}
            >
                {tabs[activeTab]?.content}
            </div>
        </div>
    );
};

export default TabPage;
