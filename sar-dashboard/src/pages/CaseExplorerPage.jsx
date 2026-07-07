import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import DataTable from '../components/DataTable';
import FilterBar from '../components/FilterBar';
import {
    X, FileText, ChevronRight, Search, ArrowLeft, Network, AlertTriangle,
    Clock, DollarSign, User, Building, Shield, Activity, Eye, ZoomIn, ZoomOut,
    Maximize2, ArrowUpRight, ArrowDownLeft, TrendingUp, MapPin, Hash, Layers, ShieldCheck, Wifi
} from 'lucide-react';
import { SARWorkflowContent } from './SARWorkflowPage';
import { AuditExplainabilityContent } from './AuditExplainabilityPage';
import SARGeneratorModal from '../components/SARGeneratorModal';
import { getCases as fetchMLCases } from '../services/mlService';

/* ─── Fallback Case Data (used when backend is offline) ─── */
const fallbackCases = [
    { id: 'CSE-4521', customer: 'Mikhail Petrov', risk: 94, typology: 'Funnel Accounts', status: 'Open', opened: '2026-02-10', analyst: 'Jane D.', amount: '£245,300', txCount: 23, counterparties: 8, jurisdiction: 'Multi (UAE, BVI, HK)' },
    { id: 'CSE-4520', customer: 'Bella Trading LLC', risk: 88, typology: 'Structuring', status: 'Under Review', opened: '2026-02-09', analyst: 'Mike R.', amount: '£128,500', txCount: 14, counterparties: 3, jurisdiction: 'Domestic' },
    { id: 'CSE-4519', customer: 'Chen Wei Import Co.', risk: 82, typology: 'Mule Network', status: 'Open', opened: '2026-02-09', analyst: 'Jane D.', amount: '£312,000', txCount: 31, counterparties: 12, jurisdiction: 'HK, Singapore' },
    { id: 'CSE-4518', customer: 'Global Ventures SA', risk: 71, typology: 'Layering', status: 'Escalated', opened: '2026-02-08', analyst: 'Sarah K.', amount: '£89,400', txCount: 19, counterparties: 6, jurisdiction: 'Switzerland' },
    { id: 'CSE-4517', customer: 'Desert Holdings FZE', risk: 91, typology: 'Geo-Risk', status: 'Open', opened: '2026-02-08', analyst: 'Jane D.', amount: '£187,600', txCount: 11, counterparties: 4, jurisdiction: 'UAE (FATF grey)' },
    { id: 'CSE-4516', customer: 'Robert J. Phillips', risk: 58, typology: 'Behavioral', status: 'Closed', opened: '2026-02-07', analyst: 'Mike R.', amount: '£42,100', txCount: 8, counterparties: 2, jurisdiction: 'Domestic' },
];

/* ─── Per-Case Transaction Data ─── */
const caseTransactions = {
    'CSE-4521': [
        { date: '2026-02-10', time: '09:12 AM', type: 'Wire In', amount: '£18,200', from: 'Bella Trading LLC', to: 'Mikhail Petrov', flag: true, risk: 'medium' },
        { date: '2026-02-08', time: '04:10 PM', type: 'Wire In', amount: '£31,400', from: 'Shell Corp A (BVI)', to: 'Mikhail Petrov', flag: true, risk: 'critical' },
        { date: '2026-02-06', time: '03:45 PM', type: 'Wire Out', amount: '£42,000', from: 'Mikhail Petrov', to: 'Dubai Holdings FZE', flag: true, risk: 'critical' },
        { date: '2026-02-05', time: '10:15 AM', type: 'Cash Deposit', amount: '£9,100', from: 'Branch #42 Teller', to: 'Mikhail Petrov', flag: true, risk: 'high' },
        { date: '2026-02-03', time: '09:30 AM', type: 'Cash Deposit', amount: '£9,700', from: 'Branch #18 Teller', to: 'Mikhail Petrov', flag: true, risk: 'high' },
        { date: '2026-02-02', time: '10:45 AM', type: 'Wire Out', amount: '£28,500', from: 'Mikhail Petrov', to: 'Offshore Bank 1 (Cayman)', flag: true, risk: 'critical' },
        { date: '2026-02-01', time: '11:20 AM', type: 'Wire In', amount: '£15,800', from: 'Meridian Partners', to: 'Mikhail Petrov', flag: false, risk: 'medium' },
        { date: '2026-01-28', time: '02:45 PM', type: 'Wire In', amount: '£22,100', from: 'Chen Wei Import Co.', to: 'Mikhail Petrov', flag: false, risk: 'low' },
    ],
    'CSE-4520': [
        { date: '2026-02-09', time: '10:30 AM', type: 'Cash Deposit', amount: '£9,800', from: 'Branch #5 Teller', to: 'Bella Trading LLC', flag: true, risk: 'high' },
        { date: '2026-02-09', time: '02:15 PM', type: 'Cash Deposit', amount: '£9,600', from: 'Branch #12 Teller', to: 'Bella Trading LLC', flag: true, risk: 'high' },
        { date: '2026-02-08', time: '11:00 AM', type: 'Cash Deposit', amount: '£9,900', from: 'Branch #5 ATM', to: 'Bella Trading LLC', flag: true, risk: 'high' },
        { date: '2026-02-07', time: '09:45 AM', type: 'Wire Out', amount: '£28,000', from: 'Bella Trading LLC', to: 'Overseas Distributing', flag: true, risk: 'critical' },
    ],
};

/* ─── Per-Case Network Data ─── */
const caseNetworks = {
    'CSE-4521': {
        nodes: [
            { id: 'MP', label: 'Mikhail Petrov', type: 'subject', x: 400, y: 220, risk: 94 },
            { id: 'BT', label: 'Bella Trading', type: 'entity', x: 180, y: 100, risk: 45 },
            { id: 'GV', label: 'Global Ventures', type: 'entity', x: 620, y: 100, risk: 60 },
            { id: 'DH', label: 'Desert Holdings', type: 'entity', x: 180, y: 340, risk: 72 },
            { id: 'CW', label: 'Chen Wei Import', type: 'entity', x: 620, y: 340, risk: 55 },
            { id: 'SH1', label: 'Shell Corp A', type: 'shell', x: 80, y: 220, risk: 88 },
            { id: 'SH2', label: 'Shell Corp B', type: 'shell', x: 720, y: 220, risk: 85 },
            { id: 'BK1', label: 'Offshore Bank 1', type: 'bank', x: 400, y: 50, risk: 70 },
            { id: 'BK2', label: 'Offshore Bank 2', type: 'bank', x: 400, y: 400, risk: 75 },
        ],
        edges: [
            { from: 'MP', to: 'BT', amount: '£45K', type: 'wire' }, { from: 'MP', to: 'GV', amount: '£82K', type: 'wire' },
            { from: 'BT', to: 'SH1', amount: '£38K', type: 'wire' }, { from: 'GV', to: 'SH2', amount: '£65K', type: 'wire' },
            { from: 'SH1', to: 'DH', amount: '£32K', type: 'wire' }, { from: 'SH2', to: 'CW', amount: '£58K', type: 'wire' },
            { from: 'DH', to: 'BK2', amount: '£28K', type: 'wire' }, { from: 'CW', to: 'BK1', amount: '£50K', type: 'wire' },
            { from: 'BK1', to: 'MP', amount: '£42K', type: 'circular' },
        ]
    },
    'CSE-4520': {
        nodes: [
            { id: 'BT', label: 'Bella Trading LLC', type: 'subject', x: 400, y: 220, risk: 88 },
            { id: 'B5', label: 'Branch #5', type: 'entity', x: 200, y: 120, risk: 30 },
            { id: 'B12', label: 'Branch #12', type: 'entity', x: 600, y: 120, risk: 30 },
            { id: 'OD', label: 'Overseas Distributing', type: 'shell', x: 400, y: 380, risk: 75 },
        ],
        edges: [
            { from: 'B5', to: 'BT', amount: '£29K', type: 'cash' },
            { from: 'B12', to: 'BT', amount: '£19K', type: 'cash' },
            { from: 'BT', to: 'OD', amount: '£28K', type: 'wire' },
        ]
    },
};

/* ─── Per-Case Triggered Rules ─── */
const caseRules = {
    'CSE-4521': [
        { rule: 'RULE-007', name: 'Structuring Detection', severity: 'Critical', detail: '7 cash deposits between £8.5K–£9.8K across 3 branch locations', confidence: 94 },
        { rule: 'RULE-012', name: 'Layering Pattern', severity: 'Critical', detail: '8 distinct senders funneling funds into single account', confidence: 91 },
        { rule: 'RULE-031', name: 'FATF Geo-Risk', severity: 'High', detail: 'Transfers to UAE (grey-list) and BVI jurisdictions', confidence: 87 },
        { rule: 'RULE-041', name: 'Velocity Anomaly', severity: 'High', detail: '340% above 12-month historical baseline', confidence: 82 },
        { rule: 'RULE-025', name: 'Rapid Disbursement', severity: 'Medium', detail: 'Outbound within 48 hours of inflow receipt', confidence: 78 },
    ],
    'CSE-4520': [
        { rule: 'RULE-007', name: 'Structuring Detection', severity: 'Critical', detail: '3 cash deposits at £9.6K–£9.9K in 48 hours', confidence: 96 },
        { rule: 'RULE-025', name: 'Rapid Disbursement', severity: 'High', detail: 'Wire out within 24 hours of accumulated cash deposits', confidence: 84 },
    ],
};

const statusColors = {
    'Open': { color: '#0369a1', bg: '#f0f9ff', border: '#bae6fd' },
    'Under Review': { color: '#a16207', bg: '#fefce8', border: '#fde68a' },
    'Escalated': { color: '#dc2626', bg: '#fef2f2', border: '#fecaca' },
    'Closed': { color: '#16a34a', bg: '#f0fdf4', border: '#bbf7d0' },
};

const riskColors = { critical: '#dc2626', high: '#ea580c', medium: '#eab308', low: '#16a34a' };
const sevColors = { Critical: '#dc2626', High: '#ea580c', Medium: '#eab308', Low: '#16a34a' };
const typeColors = { subject: '#dc2626', entity: '#0369a1', shell: '#ea580c', bank: '#7c3aed' };

/* ─── Network Graph Component ─── */
const NetworkGraph = ({ networkData, onNodeSelect, selectedNode }) => {
    if (!networkData) return <div style={{ padding: '40px', textAlign: 'center', color: '#94a3b8', fontSize: '13px' }}>No network data available for this case</div>;
    const { nodes, edges } = networkData;
    const getNode = (id) => nodes.find(n => n.id === id);

    return (
        <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid #f1f5f9' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Network size={16} color="#0c4a6e" />
                    <span style={{ fontSize: '14px', fontWeight: '700', color: '#0c4a6e' }}>Entity Network</span>
                    <span style={{ fontSize: '11px', color: '#94a3b8' }}>({nodes.length} nodes · {edges.length} links)</span>
                </div>
                <div style={{ display: 'flex', gap: '6px' }}>
                    {[ZoomIn, ZoomOut, Maximize2].map((Icon, i) => (
                        <button key={i} style={{ width: '28px', height: '28px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#64748b' }}><Icon size={12} /></button>
                    ))}
                </div>
            </div>
            <svg width="100%" height="460" viewBox="0 0 800 460" style={{ background: 'linear-gradient(135deg, #fafbfc, #f8fafc)' }}>
                {/* Grid Pattern */}
                <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#f1f5f9" strokeWidth="0.5" />
                    </pattern>
                </defs>
                <rect width="800" height="460" fill="url(#grid)" />
                {/* Edges */}
                {edges.map((e, i) => {
                    const from = getNode(e.from); const to = getNode(e.to);
                    if (!from || !to) return null;
                    const mx = (from.x + to.x) / 2; const my = (from.y + to.y) / 2;
                    return (
                        <g key={i}>
                            <line x1={from.x} y1={from.y} x2={to.x} y2={to.y}
                                stroke={e.type === 'circular' ? '#dc2626' : '#cbd5e1'}
                                strokeWidth={e.type === 'circular' ? 2.5 : 1.5}
                                strokeDasharray={e.type === 'circular' ? '6,4' : 'none'}
                            />
                            <rect x={mx - 24} y={my - 11} width={48} height={22} rx={6} fill="white" stroke="#e2e8f0" strokeWidth="1" />
                            <text x={mx} y={my + 4} textAnchor="middle" fontSize="9" fill="#475569" fontWeight="700">{e.amount}</text>
                        </g>
                    );
                })}
                {/* Nodes */}
                {nodes.map((n) => {
                    const isSelected = selectedNode?.id === n.id;
                    const r = isSelected ? 30 : 25;
                    return (
                        <g key={n.id} onClick={() => onNodeSelect(n)} style={{ cursor: 'pointer' }}>
                            {/* Glow ring for selected */}
                            {isSelected && <circle cx={n.x} cy={n.y} r={r + 6} fill="none" stroke={typeColors[n.type]} strokeWidth="1.5" opacity="0.3" />}
                            <circle cx={n.x} cy={n.y} r={r} fill={`${typeColors[n.type]}15`} stroke={typeColors[n.type]} strokeWidth={isSelected ? 3 : 2} />
                            <text x={n.x} y={n.y + 4} textAnchor="middle" fontSize="11" fontWeight="800" fill={typeColors[n.type]}>{n.id}</text>
                            <text x={n.x} y={n.y + r + 16} textAnchor="middle" fontSize="10" fill="#475569" fontWeight="500">{n.label}</text>
                            {/* Risk badge */}
                            <circle cx={n.x + r - 4} cy={n.y - r + 4} r="9" fill={n.risk >= 80 ? '#dc2626' : n.risk >= 60 ? '#ea580c' : '#16a34a'} />
                            <text x={n.x + r - 4} y={n.y - r + 7.5} textAnchor="middle" fontSize="7" fill="white" fontWeight="700">{n.risk}</text>
                        </g>
                    );
                })}
            </svg>
            {/* Legend */}
            <div style={{ display: 'flex', gap: '16px', padding: '12px 20px', borderTop: '1px solid #f1f5f9', background: '#fafbfc' }}>
                {Object.entries(typeColors).map(([type, color]) => (
                    <div key={type} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: color }} />
                        <span style={{ fontSize: '11px', color: '#64748b', textTransform: 'capitalize', fontWeight: '500' }}>{type}</span>
                    </div>
                ))}
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginLeft: '8px' }}>
                    <div style={{ width: '16px', height: '0', borderTop: '2px dashed #dc2626' }} />
                    <span style={{ fontSize: '11px', color: '#64748b', fontWeight: '500' }}>Circular Flow</span>
                </div>
            </div>
        </div>
    );
};

/* ─── Case Detail Full View ─── */
const CaseDetailView = ({ caseData, onBack }) => {
    const [activeSection, setActiveSection] = useState('overview');
    const [selectedNode, setSelectedNode] = useState(null);
    const [showSARModal, setShowSARModal] = useState(false);

    const txns = caseTransactions[caseData.id] || caseTransactions['CSE-4521'];
    const rules = caseRules[caseData.id] || caseRules['CSE-4521'];
    const network = caseNetworks[caseData.id] || caseNetworks['CSE-4521'];

    const sCfg = statusColors[caseData.status] || statusColors['Open'];

    const sections = [
        { id: 'overview', label: 'Overview', icon: Eye },
        { id: 'network', label: 'Entity Network', icon: Network },
        { id: 'transactions', label: 'Transactions', icon: DollarSign },
        { id: 'rules', label: 'Triggered Rules', icon: Shield },
        { id: 'sar-workflow', label: 'SAR Workflow', icon: FileText },
        { id: 'audit', label: 'Audit & Explainability', icon: ShieldCheck },
    ];

    return (
        <div style={{ animation: 'fadeIn 0.25s ease forwards' }}>
            {/* Back + Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                <button
                    onClick={onBack}
                    style={{
                        display: 'flex', alignItems: 'center', gap: '6px',
                        padding: '8px 16px', borderRadius: '8px',
                        background: 'white', border: '1px solid #e2e8f0',
                        cursor: 'pointer', fontSize: '13px', fontWeight: '600',
                        color: '#475569', transition: 'all 0.15s'
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = '#0369a1'; e.currentTarget.style.color = '#0369a1'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.color = '#475569'; }}
                >
                    <ArrowLeft size={14} />Back to Cases
                </button>
                <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ fontSize: '22px', fontWeight: '800', color: '#0c4a6e' }}>{caseData.id}</span>
                        <span style={{
                            padding: '4px 14px', borderRadius: '6px', fontSize: '11px', fontWeight: '700',
                            background: sCfg.bg, color: sCfg.color, border: `1px solid ${sCfg.border}`
                        }}>{caseData.status.toUpperCase()}</span>
                    </div>
                    <div style={{ fontSize: '14px', color: '#64748b', marginTop: '2px' }}>{caseData.customer} · {caseData.typology} · Opened {caseData.opened}</div>
                </div>
                <button onClick={() => setShowSARModal(true)} style={{
                    display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px',
                    background: 'linear-gradient(135deg, #0c4a6e, #0369a1)', border: 'none',
                    borderRadius: '8px', fontSize: '13px', fontWeight: '600', color: 'white', cursor: 'pointer'
                }}><FileText size={15} />Generate SAR Draft</button>
            </div>

            {/* KPI Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '14px', marginBottom: '24px' }}>
                {[
                    { icon: AlertTriangle, label: 'Risk Score', value: `${caseData.risk}/100`, color: caseData.risk >= 80 ? '#dc2626' : '#ea580c' },
                    { icon: DollarSign, label: 'Total Amount', value: caseData.amount, color: '#0c4a6e' },
                    { icon: Activity, label: 'Transactions', value: caseData.txCount, color: '#7c3aed' },
                    { icon: Building, label: 'Counterparties', value: caseData.counterparties, color: '#ea580c' },
                    { icon: MapPin, label: 'Jurisdiction', value: caseData.jurisdiction, color: '#0369a1', small: true },
                ].map((kpi, i) => (
                    <div key={i} style={{
                        background: 'white', padding: '18px 20px', borderRadius: '12px',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                        borderLeft: `3px solid ${kpi.color}`
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                            <kpi.icon size={14} color={kpi.color} />
                            <span style={{ fontSize: '11px', fontWeight: '600', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{kpi.label}</span>
                        </div>
                        <div style={{ fontSize: kpi.small ? '14px' : '20px', fontWeight: '800', color: kpi.color }}>{kpi.value}</div>
                    </div>
                ))}
            </div>

            {/* Section Tabs */}
            <div style={{
                display: 'flex', gap: '4px', padding: '4px',
                background: '#f1f5f9', borderRadius: '10px', marginBottom: '24px'
            }}>
                {sections.map(s => {
                    const isActive = activeSection === s.id;
                    return (
                        <button
                            key={s.id}
                            onClick={() => setActiveSection(s.id)}
                            style={{
                                flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                                padding: '10px 16px', borderRadius: '8px', border: 'none',
                                background: isActive ? 'white' : 'transparent',
                                boxShadow: isActive ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                                color: isActive ? '#0c4a6e' : '#64748b',
                                fontSize: '13px', fontWeight: isActive ? '700' : '500',
                                cursor: 'pointer', transition: 'all 0.15s'
                            }}
                        >
                            <s.icon size={15} />{s.label}
                        </button>
                    );
                })}
            </div>

            {/* ─── Section: Overview ─── */}
            {activeSection === 'overview' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    {/* Case Details */}
                    <div style={{ background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                        <div style={{ fontSize: '15px', fontWeight: '700', color: '#0c4a6e', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <User size={16} color="#0c4a6e" />Case Details
                        </div>
                        {[
                            { label: 'Case ID', value: caseData.id },
                            { label: 'Subject', value: caseData.customer },
                            { label: 'Primary Typology', value: caseData.typology },
                            { label: 'Assigned Analyst', value: caseData.analyst },
                            { label: 'Date Opened', value: caseData.opened },
                            { label: 'Jurisdiction', value: caseData.jurisdiction },
                            { label: 'Total Amount', value: caseData.amount },
                            { label: 'Transaction Count', value: caseData.txCount },
                        ].map((item, i) => (
                            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '9px 0', borderBottom: '1px solid #f1f5f9' }}>
                                <span style={{ fontSize: '13px', color: '#64748b' }}>{item.label}</span>
                                <span style={{ fontSize: '13px', fontWeight: '600', color: '#1e293b' }}>{item.value}</span>
                            </div>
                        ))}
                    </div>

                    {/* Rules Summary + Risk Gauge */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        {/* Risk Visual */}
                        <div style={{ background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', textAlign: 'center' }}>
                            <div style={{ fontSize: '15px', fontWeight: '700', color: '#0c4a6e', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                                <TrendingUp size={16} color="#0c4a6e" />Risk Assessment
                            </div>
                            <div style={{
                                width: '100px', height: '100px', borderRadius: '50%', margin: '0 auto 16px',
                                background: `conic-gradient(${caseData.risk >= 80 ? '#dc2626' : '#ea580c'} ${caseData.risk * 3.6}deg, #f1f5f9 ${caseData.risk * 3.6}deg)`,
                                display: 'flex', alignItems: 'center', justifyContent: 'center'
                            }}>
                                <div style={{
                                    width: '80px', height: '80px', borderRadius: '50%', background: 'white',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: '24px', fontWeight: '800', color: caseData.risk >= 80 ? '#dc2626' : '#ea580c'
                                }}>{caseData.risk}</div>
                            </div>
                            <div style={{ fontSize: '12px', color: '#64748b' }}>{caseData.risk >= 80 ? 'HIGH RISK — Immediate review required' : 'ELEVATED RISK — Enhanced monitoring active'}</div>
                        </div>

                        {/* Top Rules */}
                        <div style={{ background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                            <div style={{ fontSize: '15px', fontWeight: '700', color: '#0c4a6e', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Shield size={16} color="#0c4a6e" />Top Triggered Rules
                            </div>
                            {rules.slice(0, 3).map((r, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 0', borderBottom: '1px solid #f1f5f9' }}>
                                    <div style={{
                                        width: '6px', height: '6px', borderRadius: '50%',
                                        background: sevColors[r.severity]
                                    }} />
                                    <div style={{ flex: 1 }}>
                                        <span style={{ fontSize: '13px', fontWeight: '600', color: '#1e293b' }}>{r.name}</span>
                                        <span style={{ fontSize: '11px', color: '#94a3b8', marginLeft: '8px' }}>{r.rule}</span>
                                    </div>
                                    <span style={{
                                        padding: '2px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: '700',
                                        color: sevColors[r.severity], background: `${sevColors[r.severity]}12`
                                    }}>{r.severity}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* ─── Section: Entity Network ─── */}
            {activeSection === 'network' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '20px' }}>
                    <NetworkGraph networkData={network} onNodeSelect={setSelectedNode} selectedNode={selectedNode} />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {/* Selected Node Info */}
                        <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                            <div style={{ fontSize: '14px', fontWeight: '700', color: '#0c4a6e', marginBottom: '14px' }}>
                                {selectedNode ? selectedNode.label : 'Select a Node'}
                            </div>
                            {selectedNode ? (
                                <>
                                    {[
                                        { label: 'Entity Type', value: selectedNode.type },
                                        { label: 'Risk Score', value: `${selectedNode.risk}/100` },
                                        { label: 'Connections', value: network.edges.filter(e => e.from === selectedNode.id || e.to === selectedNode.id).length },
                                    ].map((item, i) => (
                                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f1f5f9' }}>
                                            <span style={{ fontSize: '12px', color: '#64748b' }}>{item.label}</span>
                                            <span style={{ fontSize: '12px', fontWeight: '600', color: '#1e293b', textTransform: 'capitalize' }}>{item.value}</span>
                                        </div>
                                    ))}
                                    {/* Connected flows */}
                                    <div style={{ marginTop: '12px' }}>
                                        <div style={{ fontSize: '11px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Connected Flows</div>
                                        {network.edges.filter(e => e.from === selectedNode.id || e.to === selectedNode.id).map((e, i) => {
                                            const isOutbound = e.from === selectedNode.id;
                                            const otherNode = network.nodes.find(n => n.id === (isOutbound ? e.to : e.from));
                                            return (
                                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 0', borderBottom: '1px solid #f8fafc' }}>
                                                    {isOutbound ? <ArrowUpRight size={12} color="#dc2626" /> : <ArrowDownLeft size={12} color="#16a34a" />}
                                                    <span style={{ fontSize: '11px', color: '#475569', flex: 1 }}>{otherNode?.label}</span>
                                                    <span style={{ fontSize: '11px', fontWeight: '700', color: '#0c4a6e' }}>{e.amount}</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </>
                            ) : <p style={{ fontSize: '12px', color: '#94a3b8' }}>Click a node on the graph to see entity details and connected fund flows.</p>}
                        </div>
                        {/* Network Stats */}
                        <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                            <div style={{ fontSize: '14px', fontWeight: '700', color: '#0c4a6e', marginBottom: '14px' }}>Network Statistics</div>
                            {[
                                { label: 'Total Entities', value: network.nodes.length, icon: Layers },
                                { label: 'Fund Links', value: network.edges.length, icon: Activity },
                                { label: 'Circular Flows', value: network.edges.filter(e => e.type === 'circular').length, icon: TrendingUp },
                                { label: 'Shell Companies', value: network.nodes.filter(n => n.type === 'shell').length, icon: Building },
                            ].map((s, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f1f5f9' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <s.icon size={12} color="#64748b" />
                                        <span style={{ fontSize: '12px', color: '#64748b' }}>{s.label}</span>
                                    </div>
                                    <span style={{ fontSize: '12px', fontWeight: '700', color: '#0c4a6e' }}>{s.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* ─── Section: Transactions ─── */}
            {activeSection === 'transactions' && (
                <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
                    <div style={{ padding: '20px 24px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <DollarSign size={16} color="#0c4a6e" />
                            <span style={{ fontSize: '15px', fontWeight: '700', color: '#0c4a6e' }}>Transaction Timeline</span>
                            <span style={{ fontSize: '11px', color: '#94a3b8' }}>({txns.length} transactions)</span>
                        </div>
                    </div>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ background: '#f8fafc' }}>
                                {['Date & Time', 'Type', 'Amount', 'From', 'To', 'Risk'].map((h, i) => (
                                    <th key={i} style={{ padding: '12px 16px', textAlign: 'left', fontSize: '11px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #f1f5f9' }}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {txns.map((t, i) => (
                                <tr key={i} style={{ borderBottom: '1px solid #f8fafc', background: t.flag ? '#fefce812' : 'white' }}
                                    onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'}
                                    onMouseLeave={e => e.currentTarget.style.background = t.flag ? '#fefce812' : 'white'}
                                >
                                    <td style={{ padding: '14px 16px' }}>
                                        <div style={{ fontSize: '13px', fontWeight: '600', color: '#1e293b' }}>{t.date}</div>
                                        <div style={{ fontSize: '11px', color: '#94a3b8' }}>{t.time}</div>
                                    </td>
                                    <td style={{ padding: '14px 16px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            {t.type.includes('In') || t.type.includes('Deposit') ? <ArrowDownLeft size={13} color="#0369a1" /> : <ArrowUpRight size={13} color="#dc2626" />}
                                            <span style={{ fontSize: '13px', color: '#475569' }}>{t.type}</span>
                                        </div>
                                    </td>
                                    <td style={{ padding: '14px 16px', fontSize: '13px', fontWeight: '700', color: '#0c4a6e' }}>{t.amount}</td>
                                    <td style={{ padding: '14px 16px', fontSize: '12px', color: '#475569' }}>{t.from}</td>
                                    <td style={{ padding: '14px 16px', fontSize: '12px', color: '#475569' }}>{t.to}</td>
                                    <td style={{ padding: '14px 16px' }}>
                                        <span style={{
                                            padding: '3px 10px', borderRadius: '4px', fontSize: '10px', fontWeight: '700',
                                            background: `${riskColors[t.risk]}12`, color: riskColors[t.risk],
                                            textTransform: 'uppercase'
                                        }}>{t.risk}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* ─── Section: Triggered Rules ─── */}
            {activeSection === 'rules' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {rules.map((r, i) => (
                        <div key={i} style={{
                            background: 'white', padding: '20px 24px', borderRadius: '12px',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                            borderLeft: `4px solid ${sevColors[r.severity]}`
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <span style={{
                                        padding: '3px 10px', borderRadius: '4px', fontSize: '11px', fontWeight: '700',
                                        background: '#f5f3ff', color: '#7c3aed', fontFamily: "'Inter', monospace"
                                    }}>{r.rule}</span>
                                    <span style={{ fontSize: '15px', fontWeight: '700', color: '#1e293b' }}>{r.name}</span>
                                </div>
                                <span style={{
                                    padding: '4px 14px', borderRadius: '6px', fontSize: '11px', fontWeight: '700',
                                    background: `${sevColors[r.severity]}12`, color: sevColors[r.severity]
                                }}>{r.severity}</span>
                            </div>
                            <p style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.6', margin: '0 0 12px' }}>{r.detail}</p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: '600' }}>Confidence:</span>
                                <div style={{ width: '120px', height: '5px', borderRadius: '3px', background: '#e2e8f0', overflow: 'hidden' }}>
                                    <div style={{ width: `${r.confidence}%`, height: '100%', borderRadius: '3px', background: sevColors[r.severity], transition: 'width 0.5s' }} />
                                </div>
                                <span style={{ fontSize: '11px', fontWeight: '700', color: sevColors[r.severity] }}>{r.confidence}%</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* ─── Section: SAR Workflow ─── */}
            {activeSection === 'sar-workflow' && (
                <div style={{ animation: 'fadeIn 0.25s ease forwards' }}>
                    <SARWorkflowContent />
                </div>
            )}

            {/* ─── Section: Audit & Explainability ─── */}
            {activeSection === 'audit' && (
                <div style={{ animation: 'fadeIn 0.25s ease forwards' }}>
                    <AuditExplainabilityContent />
                </div>
            )}

            {/* SAR Generator Modal */}
            {showSARModal && (
                <SARGeneratorModal caseData={caseData} onClose={() => setShowSARModal(false)} />
            )}
        </div>
    );
};

/* ─── MAIN PAGE ─── */
const CaseExplorerPage = () => {
    const [selectedCase, setSelectedCase] = useState(null);
    const [cases, setCases] = useState(fallbackCases);
    const [mlConnected, setMlConnected] = useState(false);
    const location = useLocation();

    // Fetch ML cases from backend on mount
    useEffect(() => {
        let cancelled = false;
        async function loadMLCases() {
            const mlCases = await fetchMLCases();
            if (cancelled) return;
            if (mlCases && Array.isArray(mlCases) && mlCases.length > 0) {
                // Merge: ML cases first, then fallback cases
                const mlIds = new Set(mlCases.map(c => c.id));
                const merged = [
                    ...mlCases.map(c => ({ ...c, source: 'ml' })),
                    ...fallbackCases.filter(c => !mlIds.has(c.id)),
                ];
                setCases(merged);
                setMlConnected(true);
            }
        }
        loadMLCases();
        return () => { cancelled = true; };
    }, []);

    useEffect(() => {
        if (location.state?.openCustomer) {
            const matched = cases.find(c => c.customer === location.state.openCustomer);
            if (matched) setSelectedCase(matched);
            // Clear the state so back-navigation doesn't re-trigger
            window.history.replaceState({}, '');
        }
    }, [location.state, cases]);

    const columns = [
        {
            key: 'id', header: 'Case ID', render: (v, row) => (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontWeight: '600', color: 'var(--color-primary-700)' }}>{v}</span>
                    {row?.source === 'ml' && (
                        <span style={{
                            display: 'inline-flex', alignItems: 'center', gap: '3px',
                            padding: '1px 6px', borderRadius: '4px', fontSize: '9px', fontWeight: '700',
                            background: '#f0fdf4', color: '#16a34a', border: '1px solid #bbf7d0'
                        }}>
                            <Wifi size={8} />ML
                        </span>
                    )}
                </div>
            )
        },
        { key: 'customer', header: 'Customer' },
        {
            key: 'risk', header: 'Risk Score', render: (v) => (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{
                        width: '36px', height: '6px', borderRadius: 'var(--radius-full)',
                        background: 'var(--color-gray-200)', overflow: 'hidden'
                    }}>
                        <div style={{
                            height: '100%', width: `${v}%`,
                            background: v >= 80 ? 'var(--color-danger)' : v >= 60 ? 'var(--color-warning)' : 'var(--color-success)',
                            borderRadius: 'var(--radius-full)'
                        }} />
                    </div>
                    <span style={{ fontWeight: '700', color: v >= 80 ? 'var(--color-danger)' : v >= 60 ? 'var(--color-warning)' : 'var(--color-success)' }}>{v}</span>
                </div>
            )
        },
        { key: 'typology', header: 'Typology', render: (v) => <span className="badge badge-info">{v}</span> },
        {
            key: 'status', header: 'Status', render: (v) => {
                const sc = statusColors[v] || statusColors['Open'];
                return <span style={{ padding: '3px 10px', borderRadius: 'var(--radius-full)', fontSize: 'var(--font-sm)', fontWeight: '600', background: sc.bg, color: sc.color }}>{v}</span>;
            }
        },
        { key: 'amount', header: 'Amount', render: (v) => <span style={{ fontWeight: '600', color: '#0c4a6e' }}>{v}</span> },
        { key: 'opened', header: 'Opened' },
        { key: 'analyst', header: 'Analyst' },
    ];

    if (selectedCase) {
        return (
            <>
                <PageHeader title="Case Management" subtitle="Explore, investigate, and manage open cases" />
                <CaseDetailView caseData={selectedCase} onBack={() => setSelectedCase(null)} />
            </>
        );
    }

    return (
        <>
            <PageHeader title="Case Management" subtitle={mlConnected ? 'ML-powered case detection active · Isolation Forest model connected' : 'Explore, investigate, and manage open cases'} />
            <FilterBar
                searchPlaceholder="Search cases by ID, customer, or typology..."
                onSearch={() => { }}
                filters={[
                    { label: 'Status', options: ['Open', 'Under Review', 'Escalated', 'Closed'] },
                    { label: 'Typology', options: ['Funnel Accounts', 'Structuring', 'Mule Network', 'Geo-Risk', 'Anomaly Cluster'] },
                ]}
            />
            <DataTable columns={columns} data={cases} onRowClick={(row) => setSelectedCase(row)} />
        </>
    );
};

export default CaseExplorerPage;
