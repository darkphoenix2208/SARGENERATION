import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import PageHeader from '../components/PageHeader';
import TabPage from '../components/TabPage';
import KPICard from '../components/KPICard';
import { BrainCircuit, Settings, Sliders, Scale } from 'lucide-react';

/* ─── TAB 1: Risk Scoring ─── */
const formulaComponents = [
    { symbol: 'α', label: 'Rule_Score', color: '#0369a1' },
    { symbol: 'β', label: 'XGBoost_Prob', color: '#7c3aed' },
    { symbol: 'γ', label: 'Anomaly_Score', color: '#ea580c' },
    { symbol: 'δ', label: 'Graph_Weight', color: '#16a34a' },
];

const RiskScoringTab = () => {
    const [weights, setWeights] = useState([
        { name: 'Rule Engine Influence', symbol: 'α', desc: 'Weight from the rule-based detection system (transaction rules, thresholds, pattern matching)', weight: 30, color: '#0369a1' },
        { name: 'ML Prediction Strength', symbol: 'β', desc: 'Contribution from the Cost-Sensitive XGBoost supervised model (F2-Score optimised)', weight: 30, color: '#7c3aed' },
        { name: 'Anomaly Detection Signal', symbol: 'γ', desc: 'Isolation Forest unsupervised anomaly confidence for zero-day threats', weight: 25, color: '#ea580c' },
        { name: 'Network Risk Factor', symbol: 'δ', desc: 'Graph centrality score (PageRank + Betweenness) for hidden relationships & mule networks', weight: 15, color: '#16a34a' },
    ]);
    const [threshold, setThreshold] = useState(70);
    const totalWeight = weights.reduce((s, w) => s + w.weight, 0);
    const dist = [
        { range: '0-20', count: 245 }, { range: '21-40', count: 389 }, { range: '41-60', count: 312 },
        { range: '61-80', count: 189 }, { range: '81-100', count: 89 }
    ];

    return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {/* Risk Aggregation Formula */}
                <div style={{ background: 'white', padding: '28px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
                        <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'rgba(139,92,246,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>⚡</div>
                        <div style={{ fontSize: '14px', fontWeight: '700', color: '#0c4a6e' }}>Risk Aggregation Formula</div>
                        <span style={{ marginLeft: 'auto', padding: '3px 10px', borderRadius: '6px', fontSize: '10px', fontWeight: '700', background: 'rgba(139,92,246,0.1)', color: '#7c3aed' }}>Ensemble Scoring</span>
                    </div>
                    {/* Formula Display */}
                    <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '20px', borderRadius: '10px', marginBottom: '16px' }}>
                        <div style={{ textAlign: 'center', marginBottom: '10px' }}>
                            <span style={{ fontSize: '12px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Final Risk Score</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', flexWrap: 'wrap', fontFamily: 'Georgia, serif', fontSize: '15px', color: '#1e293b' }}>
                            <span style={{ fontWeight: '700', fontStyle: 'italic' }}>Final_Risk</span>
                            <span style={{ color: '#64748b', margin: '0 4px' }}>=</span>
                            {formulaComponents.map((fc, i) => (
                                <React.Fragment key={i}>
                                    {i > 0 && <span style={{ color: '#64748b', margin: '0 4px' }}>+</span>}
                                    <span>(</span>
                                    <span style={{ fontWeight: '700', fontStyle: 'italic' }}>{fc.symbol}</span>
                                    <span style={{ margin: '0 3px', color: '#64748b' }}>×</span>
                                    <span style={{ fontWeight: '600' }}>{fc.label}</span>
                                    <span>)</span>
                                </React.Fragment>
                            ))}
                        </div>
                        <div style={{ textAlign: 'center', marginTop: '14px', display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
                            {weights.map((w, i) => (
                                <span key={i} style={{ fontSize: '12px', color: '#475569' }}>
                                    <span style={{ fontWeight: '700', fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>{w.symbol}</span>
                                    <span style={{ color: '#94a3b8' }}> = </span>
                                    <span style={{ fontWeight: '600' }}>{w.weight}%</span>
                                </span>
                            ))}
                        </div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <span style={{ fontSize: '12px', color: totalWeight === 100 ? '#16a34a' : '#dc2626', fontWeight: '600' }}>
                            Total Weight: {totalWeight}% {totalWeight === 100 ? '✓ Balanced' : '⚠ Must equal 100%'}
                        </span>
                    </div>
                </div>
                {/* Weight Sliders */}
                <div style={{ background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                    <div style={{ fontSize: '14px', fontWeight: '700', color: '#0c4a6e', marginBottom: '20px' }}>Model Weight Configuration</div>
                    {weights.map((w, i) => (
                        <div key={i} style={{ marginBottom: '22px', padding: '14px', borderRadius: '10px', background: '#f8fafc', border: '1px solid #f1f5f9' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: `${w.color}15`, border: `1px solid ${w.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <span style={{ fontSize: '16px', fontWeight: '700', color: w.color, fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>{w.symbol}</span>
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '13px', fontWeight: '600', color: '#1e293b' }}>{w.name}</div>
                                        <div style={{ fontSize: '11px', color: '#64748b', maxWidth: '260px', lineHeight: '1.4' }}>{w.desc}</div>
                                    </div>
                                </div>
                                <span style={{ fontSize: '20px', fontWeight: '800', color: w.color, minWidth: '45px', textAlign: 'right' }}>{w.weight}%</span>
                            </div>
                            <input type="range" min={0} max={50} value={w.weight} onChange={e => { const next = [...weights]; next[i] = { ...next[i], weight: parseInt(e.target.value) }; setWeights(next); }} style={{ width: '100%', accentColor: w.color, height: '5px' }} />
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#94a3b8', marginTop: '4px' }}>
                                <span>0%</span><span>25%</span><span>50%</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {/* Threshold */}
                <div style={{ background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                    <div style={{ fontSize: '14px', fontWeight: '700', color: '#0c4a6e', marginBottom: '16px' }}>Alert Threshold</div>
                    <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                        <span style={{ fontSize: '48px', fontWeight: '800', color: '#ea580c' }}>{threshold}</span>
                        <span style={{ fontSize: '18px', color: '#94a3b8' }}> / 100</span>
                    </div>
                    <input type="range" min={30} max={95} value={threshold} onChange={e => setThreshold(parseInt(e.target.value))} style={{ width: '100%', accentColor: '#0c4a6e' }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#94a3b8', marginTop: '6px' }}><span>Low (30)</span><span>Medium (60)</span><span>High (95)</span></div>
                </div>
                {/* Distribution */}
                <div style={{ background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                    <div style={{ fontSize: '14px', fontWeight: '700', color: '#0c4a6e', marginBottom: '16px' }}>Risk Score Distribution</div>
                    <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={dist}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                            <XAxis dataKey="range" stroke="#64748b" style={{ fontSize: '12px' }} />
                            <YAxis stroke="#64748b" style={{ fontSize: '12px' }} />
                            <Tooltip />
                            <Bar dataKey="count" fill="#0c4a6e" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                {/* Preview */}
                <div style={{ background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                    <div style={{ fontSize: '14px', fontWeight: '700', color: '#0c4a6e', marginBottom: '16px' }}>Live Recalculation Preview</div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        <div style={{ textAlign: 'center', padding: '16px', background: '#fef2f2', borderRadius: '8px' }}>
                            <div style={{ fontSize: '24px', fontWeight: '800', color: '#dc2626' }}>{89 + (threshold > 70 ? 0 : 16)}</div>
                            <div style={{ fontSize: '12px', color: '#64748b' }}>Cases Above Threshold</div>
                        </div>
                        <div style={{ textAlign: 'center', padding: '16px', background: '#f0fdf4', borderRadius: '8px' }}>
                            <div style={{ fontSize: '24px', fontWeight: '800', color: '#16a34a' }}>{745 - (threshold > 70 ? 0 : 16)}</div>
                            <div style={{ fontSize: '12px', color: '#64748b' }}>Cases Below Threshold</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

/* ─── TAB 2: Rule Configuration ─── */
const defaults = { amountThreshold: 10000, counterpartyLimit: 5, velocityPct: 300, funnelDays: 7, structuringRange: 8000 };

const RuleConfigTab = () => {
    const [config, setConfig] = useState(defaults);
    const update = (key, val) => setConfig(prev => ({ ...prev, [key]: val }));

    const sliders = [
        { key: 'amountThreshold', label: 'Amount Threshold ($)', min: 1000, max: 50000, step: 500, format: v => `$${v.toLocaleString()}` },
        { key: 'counterpartyLimit', label: 'Counterparty Limit', min: 2, max: 20, step: 1, format: v => `${v} parties` },
        { key: 'velocityPct', label: 'Velocity Acceleration (%)', min: 50, max: 1000, step: 25, format: v => `${v}%` },
        { key: 'funnelDays', label: 'Funnel Window (days)', min: 3, max: 30, step: 1, format: v => `${v} days` },
        { key: 'structuringRange', label: 'Structuring Floor ($)', min: 5000, max: 9900, step: 100, format: v => `$${v.toLocaleString()}` },
    ];

    return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <div style={{ background: 'white', padding: '28px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <div style={{ fontSize: '16px', fontWeight: '700', color: '#0c4a6e' }}>Detection Thresholds</div>
                    <button onClick={() => setConfig(defaults)} style={{ padding: '6px 12px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '6px', cursor: 'pointer', color: '#64748b', fontSize: '12px' }}>Reset</button>
                </div>
                {sliders.map((s, i) => (
                    <div key={i} style={{ marginBottom: '24px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                            <span style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b' }}>{s.label}</span>
                            <span style={{ fontSize: '14px', fontWeight: '700', color: '#0c4a6e' }}>{s.format(config[s.key])}</span>
                        </div>
                        <input type="range" min={s.min} max={s.max} step={s.step} value={config[s.key]} onChange={e => update(s.key, parseInt(e.target.value))} style={{ width: '100%', accentColor: '#0c4a6e' }} />
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#94a3b8', marginTop: '4px' }}><span>{s.format(s.min)}</span><span>{s.format(s.max)}</span></div>
                    </div>
                ))}
            </div>
            <div style={{ background: 'white', padding: '28px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                <div style={{ fontSize: '16px', fontWeight: '700', color: '#0c4a6e', marginBottom: '24px' }}>Active Rule Summary</div>
                {[
                    { rule: 'Funnel Account Detection', ver: 'v3.2', status: 'Active', triggers: '142 / month' },
                    { rule: 'Structuring Pattern', ver: 'v2.8', status: 'Active', triggers: '98 / month' },
                    { rule: 'FATF Jurisdiction Risk', ver: 'v4.1', status: 'Active', triggers: '67 / month' },
                    { rule: 'Velocity Anomaly', ver: 'v2.5', status: 'Active', triggers: '85 / month' },
                    { rule: 'KYC Mismatch', ver: 'v1.9', status: 'Active', triggers: '34 / month' },
                    { rule: 'Circular Transfer', ver: 'v1.3', status: 'Beta', triggers: '12 / month' },
                ].map((r, i) => (
                    <div key={i} style={{ padding: '14px', background: '#f8fafc', borderRadius: '8px', marginBottom: '12px', borderLeft: `3px solid ${r.status === 'Active' ? '#0c4a6e' : '#eab308'}` }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                            <span style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b' }}>{r.rule}</span>
                            <span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '4px', fontWeight: '600', background: r.status === 'Active' ? '#f0fdf4' : '#fef9c3', color: r.status === 'Active' ? '#16a34a' : '#a16207' }}>{r.status}</span>
                        </div>
                        <div style={{ fontSize: '12px', color: '#64748b' }}>Engine: {r.ver} • Triggers: {r.triggers}</div>
                    </div>
                ))}
                <button style={{ width: '100%', padding: '12px', background: '#0c4a6e', color: 'white', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', marginTop: '12px' }}>Save Configuration</button>
            </div>
        </div>
    );
};

/* ─── TAB 3: Threshold Controls (embedded in Rule Config already, but as dedicated view) ─── */
const ThresholdTab = () => {
    const [thresholds, setThresholds] = useState([
        { name: 'Low Risk', min: 0, max: 40, color: '#16a34a', action: 'Monitor' },
        { name: 'Medium Risk', min: 41, max: 69, color: '#eab308', action: 'Review' },
        { name: 'High Risk', min: 70, max: 89, color: '#ea580c', action: 'Escalate' },
        { name: 'Critical Risk', min: 90, max: 100, color: '#dc2626', action: 'Immediate SAR' },
    ]);

    return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <div style={{ background: 'white', padding: '28px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                <div style={{ fontSize: '16px', fontWeight: '700', color: '#0c4a6e', marginBottom: '24px' }}>Risk Tier Configuration</div>
                {thresholds.map((t, i) => (
                    <div key={i} style={{ padding: '16px', borderLeft: `4px solid ${t.color}`, background: '#f8fafc', borderRadius: '0 8px 8px 0', marginBottom: '12px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                            <span style={{ fontSize: '15px', fontWeight: '700', color: t.color }}>{t.name}</span>
                            <span style={{ padding: '4px 10px', background: `${t.color}15`, color: t.color, borderRadius: '6px', fontSize: '12px', fontWeight: '600' }}>{t.action}</span>
                        </div>
                        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                            <span style={{ fontSize: '13px', color: '#64748b' }}>Range:</span>
                            <input type="number" value={t.min} readOnly style={{ width: '60px', padding: '6px', borderRadius: '6px', border: '1px solid #e2e8f0', textAlign: 'center', fontSize: '14px', fontWeight: '600' }} />
                            <span style={{ color: '#94a3b8' }}>—</span>
                            <input type="number" value={t.max} readOnly style={{ width: '60px', padding: '6px', borderRadius: '6px', border: '1px solid #e2e8f0', textAlign: 'center', fontSize: '14px', fontWeight: '600' }} />
                        </div>
                    </div>
                ))}
            </div>
            <div style={{ background: 'white', padding: '28px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                <div style={{ fontSize: '16px', fontWeight: '700', color: '#0c4a6e', marginBottom: '24px' }}>Threshold Visualization</div>
                <div style={{ height: '24px', borderRadius: '12px', overflow: 'hidden', display: 'flex', marginBottom: '24px' }}>
                    {thresholds.map((t, i) => (
                        <div key={i} style={{ flex: t.max - t.min + 1, background: t.color, position: 'relative' }}>
                            <span style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '10px', fontWeight: '700' }}>{t.min}-{t.max}</span>
                        </div>
                    ))}
                </div>
                <div style={{ fontSize: '14px', fontWeight: '700', color: '#0c4a6e', marginBottom: '16px' }}>Automated Actions</div>
                {[
                    { score: '0-40', action: 'Standard monitoring', frequency: 'Quarterly review' },
                    { score: '41-69', action: 'Enhanced due diligence', frequency: 'Monthly review' },
                    { score: '70-89', action: 'Auto-escalate to senior analyst', frequency: 'Immediate' },
                    { score: '90-100', action: 'Auto-generate SAR draft', frequency: 'Immediate + alert' },
                ].map((a, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f1f5f9' }}>
                        <span style={{ fontSize: '13px', fontWeight: '600', color: '#1e293b' }}>{a.score}</span>
                        <span style={{ fontSize: '13px', color: '#475569' }}>{a.action}</span>
                        <span style={{ fontSize: '12px', color: '#94a3b8' }}>{a.frequency}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

/* ─── TAB 4: Typology Weights ─── */
const TypologyWeightsTab = () => {
    const [tw, setTw] = useState([
        { name: 'Funnel Accounts', weight: 30, sensitivity: 'High' },
        { name: 'Structuring', weight: 25, sensitivity: 'High' },
        { name: 'Mule Network', weight: 20, sensitivity: 'Medium' },
        { name: 'Geographic Risk', weight: 15, sensitivity: 'Medium' },
        { name: 'Layering', weight: 10, sensitivity: 'Low' },
    ]);

    return (
        <div style={{ background: 'white', padding: '28px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
            <div style={{ fontSize: '16px', fontWeight: '700', color: '#0c4a6e', marginBottom: '24px' }}>Typology Weight Assignment</div>
            {tw.map((t, i) => (
                <div key={i} style={{ marginBottom: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <div>
                            <span style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b' }}>{t.name}</span>
                            <span style={{ marginLeft: '8px', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: '600', background: t.sensitivity === 'High' ? '#fef2f2' : t.sensitivity === 'Medium' ? '#fef9c3' : '#f0fdf4', color: t.sensitivity === 'High' ? '#dc2626' : t.sensitivity === 'Medium' ? '#a16207' : '#16a34a' }}>{t.sensitivity}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <input type="number" value={t.weight} min={0} max={100} onChange={e => { const next = [...tw]; next[i].weight = parseInt(e.target.value) || 0; setTw(next); }} style={{ width: '60px', padding: '4px 8px', borderRadius: '6px', border: '1px solid #e2e8f0', textAlign: 'center', fontSize: '14px', fontWeight: '700', color: '#0c4a6e' }} />
                            <span style={{ fontSize: '14px', color: '#64748b' }}>%</span>
                        </div>
                    </div>
                    <div style={{ height: '6px', background: '#e2e8f0', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${t.weight}%`, background: '#0c4a6e', borderRadius: '3px', transition: 'width 0.3s' }} />
                    </div>
                </div>
            ))}
            <div style={{ padding: '12px', background: '#f8fafc', borderRadius: '8px', textAlign: 'center', marginTop: '16px' }}>
                <span style={{ fontSize: '13px', fontWeight: '600', color: tw.reduce((s, t) => s + t.weight, 0) === 100 ? '#16a34a' : '#dc2626' }}>
                    Total: {tw.reduce((s, t) => s + t.weight, 0)}% {tw.reduce((s, t) => s + t.weight, 0) === 100 ? '✓' : '(must equal 100%)'}
                </span>
            </div>
        </div>
    );
};

/* ─── MAIN PAGE ─── */
const RiskRuleEnginePage = () => (
    <>
        <PageHeader title="Risk & Rule Engine" subtitle="Configure risk scoring, detection rules, thresholds, and typology weights" />
        <TabPage tabs={[
            { label: 'Risk Scoring', icon: BrainCircuit, content: <RiskScoringTab /> },
            { label: 'Rule Configuration', icon: Settings, content: <RuleConfigTab /> },
            { label: 'Threshold Controls', icon: Sliders, content: <ThresholdTab /> },
            { label: 'Typology Weights', icon: Scale, content: <TypologyWeightsTab /> },
        ]} />
    </>
);

export default RiskRuleEnginePage;
