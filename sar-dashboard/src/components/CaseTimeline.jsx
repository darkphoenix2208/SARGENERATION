import React, { useState } from 'react';
import { Clock, Filter, ChevronDown, ChevronUp, AlertTriangle, ArrowUpRight, ArrowDownLeft, DollarSign, Shield, User, Building } from 'lucide-react';

/* ─── Timeline Event Data ─── */
const timelineEvents = [
    { date: '2026-01-15', time: '09:12 AM', event: 'First incoming wire transfer received', amount: '£18,200', type: 'wire_in', entity: 'Bella Trading LLC', account: 'ACC-7741', risk: 'low', detail: 'Wire transfer from known trading entity. Within normal parameters at this point.' },
    { date: '2026-01-18', time: '02:45 PM', event: 'Second large wire from new counterparty', amount: '£9,800', type: 'wire_in', entity: 'Global Ventures SA', account: 'ACC-7741', risk: 'low', detail: 'New counterparty not previously seen. KYC lookup initiated but no negative hits.' },
    { date: '2026-01-20', time: '10:30 AM', event: 'Cash deposit below reporting threshold', amount: '£9,800', type: 'cash_in', entity: 'Branch #42 — Teller Deposit', account: 'ACC-7741', risk: 'medium', detail: 'First of 7 cash deposits just below reporting threshold. Structuring rule RULE-007 flagged.' },
    { date: '2026-01-21', time: '11:15 AM', event: 'Second cash deposit — structuring pattern emerging', amount: '£9,500', type: 'cash_in', entity: 'Branch #42 — Teller Deposit', account: 'ACC-7741', risk: 'medium', detail: 'Consecutive day deposit from same branch. Structuring confidence: 72%.' },
    { date: '2026-01-22', time: '03:20 PM', event: 'Wire from Desert Holdings (FATF jurisdiction)', amount: '£14,500', type: 'wire_in', entity: 'Desert Holdings FZE', account: 'ACC-7741', risk: 'high', detail: 'Entity based in UAE — FATF grey-list jurisdiction. Geo-risk rule RULE-031 triggered.' },
    { date: '2026-01-24', time: '09:45 AM', event: 'Third cash deposit — different branch', amount: '£8,900', type: 'cash_in', entity: 'Branch #18 — Teller Deposit', account: 'ACC-7741', risk: 'high', detail: 'Branch switching behavior detected. Structuring confidence elevated to 88%.' },
    { date: '2026-01-25', time: '01:30 PM', event: 'Large wire from Chen Wei Import', amount: '£22,100', type: 'wire_in', entity: 'Chen Wei Import Co.', account: 'ACC-7741', risk: 'medium', detail: 'Cross-border wire from Hong Kong. Cumulative inflows now exceed £70K in 10 days.' },
    { date: '2026-01-26', time: '10:00 AM', event: 'Fourth cash deposit — structuring confirmed', amount: '£9,200', type: 'cash_in', entity: 'Branch #42 — Teller Deposit', account: 'ACC-7741', risk: 'critical', detail: 'RULE-007 elevated to CRITICAL. 4 deposits in 6 days ranging £8.5K–£9.8K. Alert generated.' },
    { date: '2026-01-28', time: '04:10 PM', event: 'Large wire from Shell Corp A (BVI)', amount: '£31,400', type: 'wire_in', entity: 'Shell Corp A (BVI)', account: 'ACC-7741', risk: 'critical', detail: 'BVI-registered shell company. No public beneficial ownership. Layering pattern rule RULE-012 confirmed.' },
    { date: '2026-01-29', time: '09:00 AM', event: 'Fifth cash deposit via ATM', amount: '£8,500', type: 'cash_in', entity: 'ATM #7 — Self-Service', account: 'ACC-7741', risk: 'critical', detail: 'Method variation: switched from teller to ATM. Anti-detection behaviour suspected.' },
    { date: '2026-02-01', time: '11:20 AM', event: 'Wire from Meridian Partners', amount: '£15,800', type: 'wire_in', entity: 'Meridian Partners', account: 'ACC-7741', risk: 'high', detail: '8th distinct counterparty. Layering threshold breached. Case escalated.' },
    { date: '2026-02-01', time: '02:00 PM', event: '⚡ Alert: Layering Pattern confirmed', amount: '—', type: 'alert', entity: 'AML System', account: 'ACC-7741', risk: 'critical', detail: 'RULE-012 confirmed: 8 distinct senders, £245K+ aggregate. Case CSE-4521 created.' },
    { date: '2026-02-02', time: '10:45 AM', event: 'Outbound wire to Offshore Bank 1', amount: '£28,500', type: 'wire_out', entity: 'Offshore Bank 1 (Cayman)', account: 'ACC-7741', risk: 'critical', detail: 'Rapid disbursement detected: outbound within 48 hours of last inflow. RULE-025 triggered.' },
    { date: '2026-02-03', time: '09:30 AM', event: 'Sixth cash deposit', amount: '£9,700', type: 'cash_in', entity: 'Branch #18 — Teller Deposit', account: 'ACC-7741', risk: 'critical', detail: 'Continued structuring despite alert generation. Non-cooperative subject behaviour.' },
    { date: '2026-02-05', time: '10:15 AM', event: 'Seventh cash deposit — final structuring event', amount: '£9,100', type: 'cash_in', entity: 'Branch #42 — Teller Deposit', account: 'ACC-7741', risk: 'critical', detail: '7th sub-threshold deposit confirmed. Total cash: £64,700 across 3 locations.' },
    { date: '2026-02-06', time: '03:45 PM', event: 'Wire to Dubai Holdings (FATF grey-list)', amount: '£42,000', type: 'wire_out', entity: 'Dubai Holdings FZE (UAE)', account: 'ACC-7741', risk: 'critical', detail: 'FATF grey-list destination. Combined with structuring = multi-typology case. RULE-031 + RULE-007.' },
    { date: '2026-02-08', time: '11:00 AM', event: 'Wire to Vanuatu Trading Corp', amount: '£38,500', type: 'wire_out', entity: 'Vanuatu Trading Corp', account: 'ACC-7741', risk: 'critical', detail: 'Second FATF high-risk destination. Velocity anomaly: 340% above baseline (RULE-041).' },
    { date: '2026-02-10', time: '09:00 AM', event: '📋 SAR Draft auto-generated by AI Engine', amount: '—', type: 'sar', entity: 'SAR Platform', account: 'ACC-7741', risk: 'critical', detail: 'AI-generated SAR narrative v1.0 covering all detected typologies. Sent to review queue.' },
];

const riskConfig = {
    low: { color: '#16a34a', bg: '#f0fdf4', border: '#bbf7d0', label: 'LOW' },
    medium: { color: '#ea580c', bg: '#fff7ed', border: '#fed7aa', label: 'MED' },
    high: { color: '#dc2626', bg: '#fef2f2', border: '#fecaca', label: 'HIGH' },
    critical: { color: '#991b1b', bg: '#fef2f2', border: '#fca5a5', label: 'CRIT' },
};

const typeIcons = {
    wire_in: { icon: ArrowDownLeft, color: '#0369a1' },
    wire_out: { icon: ArrowUpRight, color: '#dc2626' },
    cash_in: { icon: DollarSign, color: '#ea580c' },
    alert: { icon: AlertTriangle, color: '#dc2626' },
    sar: { icon: Shield, color: '#7c3aed' },
};

const CaseTimeline = () => {
    const [expandedEvent, setExpandedEvent] = useState(null);
    const [riskFilter, setRiskFilter] = useState('all');
    const [entityFilter, setEntityFilter] = useState('all');
    const [showFilters, setShowFilters] = useState(false);

    // Get unique entities
    const entities = [...new Set(timelineEvents.map(e => e.entity))];

    // Filter events
    const filteredEvents = timelineEvents.filter(e => {
        if (riskFilter !== 'all' && e.risk !== riskFilter) return false;
        if (entityFilter !== 'all' && e.entity !== entityFilter) return false;
        return true;
    });

    return (
        <div style={{ animation: 'fadeIn 0.3s ease forwards' }}>
            {/* Header */}
            <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                marginBottom: '20px'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                        width: '40px', height: '40px', borderRadius: '10px',
                        background: 'linear-gradient(135deg, #0c4a6e, #0369a1)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                        <Clock size={20} color="white" />
                    </div>
                    <div>
                        <div style={{ fontSize: '18px', fontWeight: '800', color: '#0c4a6e' }}>Case Timeline Reconstruction</div>
                        <div style={{ fontSize: '13px', color: '#64748b' }}>
                            {filteredEvents.length} events · Jan 15 – Feb 10, 2026 · CSE-4521
                        </div>
                    </div>
                </div>
                <button
                    onClick={() => setShowFilters(!showFilters)}
                    style={{
                        display: 'flex', alignItems: 'center', gap: '6px',
                        padding: '8px 16px', borderRadius: '8px',
                        background: showFilters ? '#f0f9ff' : 'white',
                        border: `1px solid ${showFilters ? '#bae6fd' : '#e2e8f0'}`,
                        cursor: 'pointer', fontSize: '13px', fontWeight: '600',
                        color: showFilters ? '#0369a1' : '#475569'
                    }}
                >
                    <Filter size={14} />Filters
                    {(riskFilter !== 'all' || entityFilter !== 'all') && (
                        <span style={{
                            width: '18px', height: '18px', borderRadius: '50%',
                            background: '#0369a1', color: 'white', fontSize: '10px',
                            fontWeight: '700', display: 'flex', alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            {(riskFilter !== 'all' ? 1 : 0) + (entityFilter !== 'all' ? 1 : 0)}
                        </span>
                    )}
                </button>
            </div>

            {/* Filter Bar */}
            {showFilters && (
                <div style={{
                    display: 'flex', gap: '12px', padding: '16px 20px',
                    background: '#f8fafc', borderRadius: '10px',
                    border: '1px solid #e2e8f0', marginBottom: '20px',
                    animation: 'fadeIn 0.2s ease forwards', alignItems: 'center'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '12px', fontWeight: '600', color: '#64748b' }}>Risk:</span>
                        <select
                            value={riskFilter}
                            onChange={e => setRiskFilter(e.target.value)}
                            style={{
                                padding: '6px 10px', borderRadius: '6px',
                                border: '1px solid #e2e8f0', fontSize: '12px',
                                color: '#475569', cursor: 'pointer', background: 'white'
                            }}
                        >
                            <option value="all">All Severity</option>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                            <option value="critical">Critical</option>
                        </select>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '12px', fontWeight: '600', color: '#64748b' }}>Entity:</span>
                        <select
                            value={entityFilter}
                            onChange={e => setEntityFilter(e.target.value)}
                            style={{
                                padding: '6px 10px', borderRadius: '6px',
                                border: '1px solid #e2e8f0', fontSize: '12px',
                                color: '#475569', cursor: 'pointer', background: 'white',
                                maxWidth: '220px'
                            }}
                        >
                            <option value="all">All Entities</option>
                            {entities.map(e => <option key={e} value={e}>{e}</option>)}
                        </select>
                    </div>
                    {(riskFilter !== 'all' || entityFilter !== 'all') && (
                        <button
                            onClick={() => { setRiskFilter('all'); setEntityFilter('all'); }}
                            style={{
                                padding: '6px 12px', borderRadius: '6px',
                                background: '#fef2f2', border: '1px solid #fecaca',
                                cursor: 'pointer', fontSize: '11px', fontWeight: '600',
                                color: '#dc2626'
                            }}
                        >Clear All</button>
                    )}
                </div>
            )}

            {/* Timeline */}
            <div style={{ position: 'relative', paddingLeft: '32px' }}>
                {/* Vertical line */}
                <div style={{
                    position: 'absolute', left: '11px', top: '0', bottom: '0',
                    width: '2px', background: 'linear-gradient(to bottom, #e2e8f0, #cbd5e1)',
                    borderRadius: '1px'
                }} />

                {filteredEvents.map((evt, idx) => {
                    const isExpanded = expandedEvent === idx;
                    const rCfg = riskConfig[evt.risk];
                    const tIcon = typeIcons[evt.type] || typeIcons.wire_in;
                    const TypeIcon = tIcon.icon;
                    const isEscalation = evt.risk === 'critical' || evt.risk === 'high';

                    return (
                        <div
                            key={idx}
                            onClick={() => setExpandedEvent(isExpanded ? null : idx)}
                            style={{
                                position: 'relative',
                                marginBottom: '4px',
                                cursor: 'pointer',
                            }}
                        >
                            {/* Timeline Dot */}
                            <div style={{
                                position: 'absolute', left: '-28px', top: '16px',
                                width: '14px', height: '14px', borderRadius: '50%',
                                background: rCfg.color,
                                border: `3px solid ${isEscalation ? rCfg.border : '#e2e8f0'}`,
                                zIndex: 2,
                                boxShadow: isEscalation ? `0 0 8px ${rCfg.color}40` : 'none'
                            }} />

                            {/* Event Card */}
                            <div style={{
                                padding: '14px 18px',
                                borderRadius: '10px',
                                border: `1px solid ${isExpanded ? rCfg.border : '#f1f5f9'}`,
                                background: isExpanded
                                    ? `linear-gradient(135deg, ${rCfg.bg}, white)`
                                    : 'white',
                                transition: 'all 0.2s ease',
                                boxShadow: isExpanded ? '0 2px 8px rgba(0,0,0,0.06)' : 'none'
                            }}
                                onMouseEnter={e => {
                                    if (!isExpanded) e.currentTarget.style.background = '#fafbfc';
                                }}
                                onMouseLeave={e => {
                                    if (!isExpanded) e.currentTarget.style.background = 'white';
                                }}
                            >
                                {/* Top Row */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <TypeIcon size={15} color={tIcon.color} style={{ flexShrink: 0 }} />
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                                            <span style={{ fontSize: '13px', fontWeight: '600', color: '#1e293b' }}>{evt.event}</span>
                                            {evt.amount !== '—' && (
                                                <span style={{ fontSize: '12px', fontWeight: '700', color: '#0c4a6e' }}>{evt.amount}</span>
                                            )}
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '3px' }}>
                                            <span style={{ fontSize: '11px', color: '#94a3b8' }}>{evt.date} · {evt.time}</span>
                                            <span style={{ fontSize: '11px', color: '#94a3b8' }}>•</span>
                                            <span style={{ fontSize: '11px', color: '#64748b' }}>{evt.entity}</span>
                                        </div>
                                    </div>
                                    <span style={{
                                        padding: '2px 8px', borderRadius: '4px',
                                        fontSize: '9px', fontWeight: '800',
                                        background: rCfg.bg, color: rCfg.color,
                                        border: `1px solid ${rCfg.border}`,
                                        letterSpacing: '0.05em', flexShrink: 0
                                    }}>{rCfg.label}</span>
                                    {isExpanded ? <ChevronUp size={14} color="#94a3b8" /> : <ChevronDown size={14} color="#94a3b8" />}
                                </div>

                                {/* Expanded Detail */}
                                {isExpanded && (
                                    <div style={{
                                        marginTop: '12px', paddingTop: '12px',
                                        borderTop: `1px solid ${rCfg.border}`,
                                        fontSize: '12px', color: '#475569', lineHeight: '1.6'
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                                            <Shield size={13} color="#64748b" style={{ marginTop: '2px', flexShrink: 0 }} />
                                            <span>{evt.detail}</span>
                                        </div>
                                        <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                <User size={11} color="#94a3b8" />
                                                <span style={{ fontSize: '11px', color: '#94a3b8' }}>{evt.account}</span>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                <Building size={11} color="#94a3b8" />
                                                <span style={{ fontSize: '11px', color: '#94a3b8' }}>{evt.entity}</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CaseTimeline;
