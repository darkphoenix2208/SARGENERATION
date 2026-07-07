import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import PageHeader from '../components/PageHeader';
import { ScanEye } from 'lucide-react';

const typologies = [
    { name: 'Funnel Accounts', desc: 'Multiple accounts channeling funds into a single account or entity', logic: 'Aggregate inflows > £50K from 5+ distinct senders within 7 days', active: true, freq: [12, 18, 15, 22, 19, 24, 28] },
    { name: 'Structuring', desc: 'Breaking transactions into smaller amounts to avoid reporting thresholds', logic: 'Multiple deposits £8K–£9.9K within 48 hours from same source', active: true, freq: [8, 11, 14, 9, 13, 16, 12] },
    { name: 'Mule Network', desc: 'Coordinated network of accounts used to layer illicit funds', logic: 'Graph analysis reveals > 3 layers of rapid fund pass-through', active: true, freq: [5, 7, 6, 9, 8, 11, 10] },
    { name: 'Layering', desc: 'Complex series of transactions to obscure the source of funds', logic: 'Circular transfers with > 50% value retention across 4+ hops', active: false, freq: [3, 5, 4, 6, 7, 5, 8] },
    { name: 'Geographic Risk', desc: 'Transactions involving high-risk jurisdictions flagged by FATF', logic: 'Wire transfers originating from or destined to FATF grey/blacklist countries', active: true, freq: [9, 12, 8, 14, 11, 15, 13] },
];

const TypologyPage = () => {
    const [items, setItems] = useState(typologies);

    const toggleActive = (idx) => {
        const next = [...items];
        next[idx] = { ...next[idx], active: !next[idx].active };
        setItems(next);
    };

    return (
        <>
            <PageHeader title="Typology Intelligence" subtitle="AI-powered suspicious activity pattern detection and monitoring" />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                {items.map((t, i) => (
                    <div key={i} style={{ background: 'white', padding: '28px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', borderLeft: `4px solid ${t.active ? '#0c4a6e' : '#e2e8f0'}` }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <ScanEye size={20} color={t.active ? '#0c4a6e' : '#94a3b8'} />
                                <span style={{ fontSize: '16px', fontWeight: '700', color: t.active ? '#0c4a6e' : '#94a3b8' }}>{t.name}</span>
                            </div>
                            <button
                                onClick={() => toggleActive(i)}
                                style={{
                                    width: '44px', height: '24px', borderRadius: '12px', border: 'none', cursor: 'pointer',
                                    background: t.active ? '#0c4a6e' : '#e2e8f0', position: 'relative', transition: 'background 0.2s'
                                }}
                            >
                                <div style={{
                                    width: '18px', height: '18px', borderRadius: '50%', background: 'white',
                                    position: 'absolute', top: '3px', transition: 'left 0.2s',
                                    left: t.active ? '23px' : '3px', boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
                                }} />
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
        </>
    );
};

export default TypologyPage;
