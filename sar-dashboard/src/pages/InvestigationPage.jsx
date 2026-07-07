import React, { useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import PageHeader from '../components/PageHeader';
import TabPage from '../components/TabPage';
import { ScanEye, Activity, AlertCircle } from 'lucide-react';

/* ─── TAB 1: Typology Detection ─── */
const typologies = [
    { name: 'Funnel Accounts', desc: 'Multiple accounts channeling funds into a single account or entity', logic: 'Aggregate inflows > £50K from 5+ distinct senders within 7 days', active: true, freq: [12, 18, 15, 22, 19, 24, 28] },
    { name: 'Structuring', desc: 'Breaking transactions into smaller amounts to avoid reporting thresholds', logic: 'Multiple deposits £8K–£9.9K within 48 hours from same source', active: true, freq: [8, 11, 14, 9, 13, 16, 12] },
    { name: 'Mule Network', desc: 'Coordinated network of accounts used to layer illicit funds', logic: 'Graph analysis reveals > 3 layers of rapid fund pass-through', active: true, freq: [5, 7, 6, 9, 8, 11, 10] },
    { name: 'Layering', desc: 'Complex series of transactions to obscure the source of funds', logic: 'Circular transfers with > 50% value retention across 4+ hops', active: false, freq: [3, 5, 4, 6, 7, 5, 8] },
    { name: 'Geographic Risk', desc: 'Transactions involving high-risk jurisdictions flagged by FATF', logic: 'Wire transfers originating from or destined to FATF grey/blacklist countries', active: true, freq: [9, 12, 8, 14, 11, 15, 13] },
];

const TypologyTab = () => {
    const [items, setItems] = useState(typologies);
    const toggleActive = (idx) => { const next = [...items]; next[idx] = { ...next[idx], active: !next[idx].active }; setItems(next); };

    return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            {items.map((t, i) => (
                <div key={i} style={{ background: 'white', padding: '28px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', borderLeft: `4px solid ${t.active ? '#0c4a6e' : '#e2e8f0'}` }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <ScanEye size={20} color={t.active ? '#0c4a6e' : '#94a3b8'} />
                            <span style={{ fontSize: '16px', fontWeight: '700', color: t.active ? '#0c4a6e' : '#94a3b8' }}>{t.name}</span>
                        </div>
                        <button onClick={() => toggleActive(i)} style={{ width: '44px', height: '24px', borderRadius: '12px', border: 'none', cursor: 'pointer', background: t.active ? '#0c4a6e' : '#e2e8f0', position: 'relative', transition: 'background 0.2s' }}>
                            <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: 'white', position: 'absolute', top: '3px', transition: 'left 0.2s', left: t.active ? '23px' : '3px', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
                        </button>
                    </div>
                    <p style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.6', marginBottom: '12px' }}>{t.desc}</p>
                    <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '8px', marginBottom: '16px' }}>
                        <div style={{ fontSize: '11px', fontWeight: '600', color: '#94a3b8', marginBottom: '4px' }}>DETECTION LOGIC</div>
                        <div style={{ fontSize: '12px', color: '#475569' }}>{t.logic}</div>
                    </div>
                    <div style={{ fontSize: '12px', fontWeight: '600', color: '#64748b', marginBottom: '8px' }}>Detection Frequency (7 weeks)</div>
                    <ResponsiveContainer width="100%" height={80}>
                        <BarChart data={t.freq.map((v, j) => ({ w: `W${j + 1}`, v }))}>
                            <Bar dataKey="v" fill={t.active ? '#0c4a6e' : '#cbd5e1'} radius={[3, 3, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            ))}
        </div>
    );
};


/* ─── TAB 3: Pattern Monitor ─── */
const patternData = [
    { time: '00:00', structuring: 3, funnel: 2, velocity: 1, mule: 0 },
    { time: '04:00', structuring: 2, funnel: 4, velocity: 2, mule: 1 },
    { time: '08:00', structuring: 5, funnel: 3, velocity: 4, mule: 2 },
    { time: '12:00', structuring: 8, funnel: 6, velocity: 3, mule: 3 },
    { time: '16:00', structuring: 6, funnel: 5, velocity: 7, mule: 1 },
    { time: '20:00', structuring: 4, funnel: 7, velocity: 5, mule: 4 },
    { time: 'Now', structuring: 7, funnel: 4, velocity: 6, mule: 2 },
];
const activePatterns = [
    { pattern: 'Rapid structuring burst', severity: 'Critical', count: 7, since: '12:45 PM', desc: 'Multiple sub-threshold deposits from same source in last 2 hours' },
    { pattern: 'Funnel convergence', severity: 'High', count: 4, since: '11:20 AM', desc: '4 distinct senders funneling to single recipient account' },
    { pattern: 'Velocity spike detected', severity: 'High', count: 6, since: '10:15 AM', desc: 'Transaction frequency 280% above baseline for 3 accounts' },
    { pattern: 'Cross-border mule chain', severity: 'Medium', count: 2, since: '09:30 AM', desc: 'Sequential wire transfers across 3 jurisdictions within 4 hours' },
];
const sevColors = { Critical: '#dc2626', High: '#ea580c', Medium: '#eab308' };

const PatternTab = () => (
    <>
        <div style={{ background: 'white', padding: '28px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div style={{ fontSize: '16px', fontWeight: '700', color: '#0c4a6e' }}>Pattern Detection — 24 Hour Trend</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 12px', background: '#f0fdf4', borderRadius: '6px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#16a34a' }} />
                    <span style={{ fontSize: '12px', fontWeight: '600', color: '#16a34a' }}>Live</span>
                </div>
            </div>
            <ResponsiveContainer width="100%" height={240}>
                <LineChart data={patternData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="time" stroke="#64748b" style={{ fontSize: '12px' }} />
                    <YAxis stroke="#64748b" style={{ fontSize: '12px' }} />
                    <Tooltip />
                    <Line type="monotone" dataKey="structuring" stroke="#dc2626" strokeWidth={2} dot={{ r: 3 }} name="Structuring" />
                    <Line type="monotone" dataKey="funnel" stroke="#0369a1" strokeWidth={2} dot={{ r: 3 }} name="Funnel" />
                    <Line type="monotone" dataKey="velocity" stroke="#ea580c" strokeWidth={2} dot={{ r: 3 }} name="Velocity" />
                    <Line type="monotone" dataKey="mule" stroke="#7c3aed" strokeWidth={2} dot={{ r: 3 }} name="Mule Network" />
                </LineChart>
            </ResponsiveContainer>
        </div>
        <div style={{ background: 'white', padding: '28px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
            <div style={{ fontSize: '16px', fontWeight: '700', color: '#0c4a6e', marginBottom: '20px' }}>Active Pattern Alerts</div>
            {activePatterns.map((p, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', padding: '16px', borderLeft: `3px solid ${sevColors[p.severity]}`, borderRadius: '8px', marginBottom: '12px', background: '#f8fafc' }}>
                    <AlertCircle size={18} color={sevColors[p.severity]} style={{ marginTop: '2px', flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                            <span style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b' }}>{p.pattern}</span>
                            <span style={{ padding: '3px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: '700', background: `${sevColors[p.severity]}15`, color: sevColors[p.severity] }}>{p.severity}</span>
                        </div>
                        <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 6px' }}>{p.desc}</p>
                        <div style={{ fontSize: '12px', color: '#94a3b8' }}>Detections: {p.count} • Since: {p.since}</div>
                    </div>
                    <button style={{ padding: '6px 14px', background: '#0c4a6e', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: '600', whiteSpace: 'nowrap' }}>Investigate</button>
                </div>
            ))}
        </div>
    </>
);

/* ─── MAIN PAGE ─── */
const InvestigationPage = () => (
    <>
        <PageHeader title="Investigation Intelligence" subtitle="AI-powered typology detection and real-time pattern monitoring" />
        <TabPage tabs={[
            { label: 'Typology Detection', icon: ScanEye, content: <TypologyTab /> },
            { label: 'Pattern Monitor', icon: Activity, badge: '4', badgeColor: '#ea580c', content: <PatternTab /> },
        ]} />
    </>
);

export default InvestigationPage;
