import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';
import { Save, RotateCcw } from 'lucide-react';

const defaults = { amountThreshold: 10000, counterpartyLimit: 5, velocityPct: 300, funnelDays: 7, structuringRange: 8000 };

const RuleConfigPage = () => {
    const [config, setConfig] = useState(defaults);
    const [weights, setWeights] = useState([
        { name: 'Aggregate Volume', weight: 25 },
        { name: 'Counterparty Count', weight: 20 },
        { name: 'Geographic Risk', weight: 20 },
        { name: 'Transaction Velocity', weight: 20 },
        { name: 'KYC Mismatch', weight: 15 },
    ]);

    const update = (key, val) => setConfig(prev => ({ ...prev, [key]: val }));

    return (
        <>
            <PageHeader
                title="Rule & Threshold Configuration"
                subtitle="Configure detection rules, thresholds, and scoring weights"
                actions={
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <button onClick={() => { setConfig(defaults); }} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 16px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', cursor: 'pointer', color: '#64748b', fontSize: '13px', fontWeight: '500' }}>
                            <RotateCcw size={14} />Reset to Default
                        </button>
                        <button style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 20px', background: '#0c4a6e', border: 'none', borderRadius: '8px', cursor: 'pointer', color: 'white', fontSize: '13px', fontWeight: '600' }}>
                            <Save size={14} />Save Configuration
                        </button>
                    </div>
                }
            />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                {/* Threshold Sliders */}
                <div style={{ background: 'white', padding: '28px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                    <div style={{ fontSize: '16px', fontWeight: '700', color: '#0c4a6e', marginBottom: '24px' }}>Detection Thresholds</div>

                    {[
                        { key: 'amountThreshold', label: 'Amount Threshold ($)', min: 1000, max: 50000, step: 500, format: v => `$${v.toLocaleString()}` },
                        { key: 'counterpartyLimit', label: 'Counterparty Limit', min: 2, max: 20, step: 1, format: v => `${v} parties` },
                        { key: 'velocityPct', label: 'Velocity Acceleration (%)', min: 50, max: 1000, step: 25, format: v => `${v}%` },
                        { key: 'funnelDays', label: 'Funnel Window (days)', min: 3, max: 30, step: 1, format: v => `${v} days` },
                        { key: 'structuringRange', label: 'Structuring Floor ($)', min: 5000, max: 9900, step: 100, format: v => `$${v.toLocaleString()}` },
                    ].map((s, i) => (
                        <div key={i} style={{ marginBottom: '24px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                <span style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b' }}>{s.label}</span>
                                <span style={{ fontSize: '14px', fontWeight: '700', color: '#0c4a6e' }}>{s.format(config[s.key])}</span>
                            </div>
                            <input
                                type="range" min={s.min} max={s.max} step={s.step} value={config[s.key]}
                                onChange={e => update(s.key, parseInt(e.target.value))}
                                style={{ width: '100%', accentColor: '#0c4a6e' }}
                            />
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#94a3b8', marginTop: '4px' }}>
                                <span>{s.format(s.min)}</span><span>{s.format(s.max)}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Weight Assignment */}
                <div style={{ background: 'white', padding: '28px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                    <div style={{ fontSize: '16px', fontWeight: '700', color: '#0c4a6e', marginBottom: '24px' }}>Scoring Weight Assignment</div>
                    {weights.map((w, i) => (
                        <div key={i} style={{ marginBottom: '20px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                <span style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b' }}>{w.name}</span>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <input
                                        type="number" value={w.weight} min={0} max={100}
                                        onChange={e => { const next = [...weights]; next[i].weight = parseInt(e.target.value) || 0; setWeights(next); }}
                                        style={{ width: '60px', padding: '4px 8px', borderRadius: '6px', border: '1px solid #e2e8f0', textAlign: 'center', fontSize: '14px', fontWeight: '700', color: '#0c4a6e' }}
                                    />
                                    <span style={{ fontSize: '14px', color: '#64748b' }}>%</span>
                                </div>
                            </div>
                            <div style={{ height: '6px', background: '#e2e8f0', borderRadius: '3px', overflow: 'hidden' }}>
                                <div style={{ height: '100%', width: `${w.weight}%`, background: '#0c4a6e', borderRadius: '3px', transition: 'width 0.3s' }} />
                            </div>
                        </div>
                    ))}
                    <div style={{ padding: '12px', background: '#f8fafc', borderRadius: '8px', textAlign: 'center', marginTop: '16px' }}>
                        <span style={{ fontSize: '13px', fontWeight: '600', color: weights.reduce((s, w) => s + w.weight, 0) === 100 ? '#16a34a' : '#dc2626' }}>
                            Total: {weights.reduce((s, w) => s + w.weight, 0)}% {weights.reduce((s, w) => s + w.weight, 0) === 100 ? '✓' : '(must equal 100%)'}
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RuleConfigPage;
