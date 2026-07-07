import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import PageHeader from '../components/PageHeader';
import { getRiskDistribution, getModelStats } from '../services/mlService';

/* ─── Risk Aggregation Formula Weights ─── */
const defaultWeights = [
    { name: 'Rule Engine Influence', symbol: 'α', desc: 'Weight from the rule-based detection system (transaction rules, thresholds, pattern matching)', weight: 30, color: '#0369a1' },
    { name: 'ML Prediction Strength', symbol: 'β', desc: 'Contribution from the Cost-Sensitive XGBoost supervised model (F2-Score optimised)', weight: 30, color: '#7c3aed' },
    { name: 'Anomaly Detection Signal', symbol: 'γ', desc: 'Isolation Forest unsupervised anomaly confidence for zero-day threats', weight: 25, color: '#ea580c' },
    { name: 'Network Risk Factor', symbol: 'δ', desc: 'Graph centrality score (PageRank + Betweenness) for hidden relationships & mule networks', weight: 15, color: '#16a34a' },
];

const formulaComponents = [
    { symbol: 'α', label: 'Rule_Score' },
    { symbol: 'β', label: 'XGBoost_Prob' },
    { symbol: 'γ', label: 'Anomaly_Score' },
    { symbol: 'δ', label: 'Graph_Weight' },
];

const fallbackDistribution = [
    { range: '0-20', count: 120 }, { range: '21-40', count: 245 }, { range: '41-60', count: 380 },
    { range: '61-80', count: 210 }, { range: '81-100', count: 89 },
];

const RiskScoringPage = () => {
    const [weights, setWeights] = useState(defaultWeights);
    const [distribution, setDistribution] = useState(fallbackDistribution);
    const [mlLive, setMlLive] = useState(false);
    const [modelInfo, setModelInfo] = useState(null);

    useEffect(() => {
        async function loadML() {
            const [dist, stats] = await Promise.all([getRiskDistribution(), getModelStats()]);
            if (dist && Array.isArray(dist) && dist.length > 0) {
                setDistribution(dist);
                setMlLive(true);
            }
            if (stats) setModelInfo(stats);
        }
        loadML();
    }, []);
    const [threshold, setThreshold] = useState(70);

    const totalWeight = weights.reduce((sum, w) => sum + w.weight, 0);

    const updateWeight = (idx, val) => {
        const next = [...weights];
        next[idx] = { ...next[idx], weight: parseInt(val) || 0 };
        setWeights(next);
    };

    return (
        <>
            <PageHeader title="Risk Scoring Engine" subtitle={mlLive ? 'Live Isolation Forest model connected · Real-time risk distribution' : 'ML-powered risk assessment with configurable weights and dynamic thresholds'} />

            {/* Risk Aggregation Formula Card */}
            <div style={{ background: 'linear-gradient(135deg, #0f172a, #1e293b)', padding: '32px', borderRadius: '16px', boxShadow: '0 4px 24px rgba(0,0,0,0.15)', marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(139,92,246,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>⚡</div>
                    <div style={{ fontSize: '16px', fontWeight: '700', color: 'white' }}>Risk Aggregation Formula</div>
                    <span style={{ marginLeft: 'auto', padding: '4px 12px', borderRadius: '6px', fontSize: '11px', fontWeight: '700', background: 'rgba(139,92,246,0.15)', color: '#a78bfa' }}>Ensemble Scoring</span>
                </div>

                {/* Formula Display */}
                <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '24px', borderRadius: '12px', marginBottom: '20px' }}>
                    <div style={{ textAlign: 'center', marginBottom: '12px' }}>
                        <span style={{ fontSize: '13px', fontWeight: '600', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Final Risk Score</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '18px', fontWeight: '800', color: '#e2e8f0', fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>Final Risk</span>
                        <span style={{ fontSize: '18px', color: '#64748b', fontWeight: '300' }}>=</span>
                        {formulaComponents.map((fc, i) => (
                            <React.Fragment key={i}>
                                {i > 0 && <span style={{ fontSize: '16px', color: '#64748b', fontWeight: '300', margin: '0 2px' }}>+</span>}
                                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '6px 12px', borderRadius: '8px', background: `${weights[i].color}20`, border: `1px solid ${weights[i].color}40` }}>
                                    <span style={{ fontSize: '16px', fontWeight: '700', color: weights[i].color, fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>{fc.symbol}</span>
                                    <span style={{ fontSize: '13px', color: '#94a3b8' }}>·</span>
                                    <span style={{ fontSize: '13px', fontWeight: '600', color: '#e2e8f0' }}>{fc.label}</span>
                                </span>
                            </React.Fragment>
                        ))}
                    </div>
                    <div style={{ textAlign: 'center', marginTop: '16px', display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
                        {weights.map((w, i) => (
                            <span key={i} style={{ fontSize: '12px', color: '#94a3b8' }}>
                                <span style={{ color: w.color, fontWeight: '700', fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>{w.symbol}</span>
                                <span style={{ color: '#64748b' }}> = </span>
                                <span style={{ color: '#e2e8f0', fontWeight: '600' }}>{w.weight}%</span>
                            </span>
                        ))}
                    </div>
                </div>

                <div style={{ textAlign: 'center' }}>
                    <span style={{ fontSize: '13px', color: totalWeight === 100 ? '#4ade80' : '#f87171', fontWeight: '600' }}>
                        Total Weight: {totalWeight}% {totalWeight === 100 ? '✓ Balanced' : '⚠ Must equal 100%'}
                    </span>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
                {/* Weight Cards */}
                <div style={{ background: 'white', padding: '28px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                    <div style={{ fontSize: '16px', fontWeight: '700', color: '#0c4a6e', marginBottom: '24px' }}>Model Weight Configuration</div>
                    {weights.map((w, i) => (
                        <div key={i} style={{ marginBottom: '24px', padding: '16px', borderRadius: '10px', background: '#f8fafc', border: '1px solid #f1f5f9' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: `${w.color}15`, border: `1px solid ${w.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <span style={{ fontSize: '18px', fontWeight: '700', color: w.color, fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>{w.symbol}</span>
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b' }}>{w.name}</div>
                                        <div style={{ fontSize: '11px', color: '#64748b', maxWidth: '300px', lineHeight: '1.4' }}>{w.desc}</div>
                                    </div>
                                </div>
                                <span style={{ fontSize: '22px', fontWeight: '800', color: w.color, minWidth: '50px', textAlign: 'right' }}>{w.weight}%</span>
                            </div>
                            <input
                                type="range" min="0" max="50" value={w.weight}
                                onChange={e => updateWeight(i, e.target.value)}
                                style={{ width: '100%', accentColor: w.color, height: '6px' }}
                            />
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#94a3b8', marginTop: '4px' }}>
                                <span>0%</span><span>25%</span><span>50%</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Threshold + Live Preview */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <div style={{ background: 'white', padding: '28px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                        <div style={{ fontSize: '16px', fontWeight: '700', color: '#0c4a6e', marginBottom: '16px' }}>Alert Threshold</div>
                        <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                            <span style={{ fontSize: '48px', fontWeight: '800', color: threshold >= 80 ? '#dc2626' : threshold >= 60 ? '#ea580c' : '#16a34a' }}>{threshold}</span>
                            <span style={{ fontSize: '16px', color: '#64748b', marginLeft: '4px' }}>/ 100</span>
                        </div>
                        <input
                            type="range" min="30" max="95" value={threshold}
                            onChange={e => setThreshold(parseInt(e.target.value))}
                            style={{ width: '100%', accentColor: '#0c4a6e' }}
                        />
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#94a3b8', marginTop: '8px' }}>
                            <span>Low (30)</span><span>Medium (60)</span><span>High (95)</span>
                        </div>
                    </div>

                    <div style={{ background: 'white', padding: '28px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', flex: 1 }}>
                        <div style={{ fontSize: '16px', fontWeight: '700', color: '#0c4a6e', marginBottom: '16px' }}>Live Recalculation Preview</div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                            {[
                                { label: 'Cases Above Threshold', value: distribution.filter(d => parseInt(d.range.split('-')[0]) >= threshold).reduce((s, d) => s + d.count, 0), color: '#dc2626' },
                                { label: 'Cases Below Threshold', value: distribution.filter(d => parseInt(d.range.split('-')[1]) < threshold).reduce((s, d) => s + d.count, 0), color: '#16a34a' },
                                { label: 'Expected Alerts / Week', value: Math.round(distribution.filter(d => parseInt(d.range.split('-')[0]) >= threshold).reduce((s, d) => s + d.count, 0) * 0.3), color: '#ea580c' },
                                { label: 'Estimated Reduction', value: `${Math.round((100 - threshold) * 0.5)}%`, color: '#0369a1' },
                            ].map((m, i) => (
                                <div key={i} style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', textAlign: 'center' }}>
                                    <div style={{ fontSize: '11px', color: '#64748b', marginBottom: '4px' }}>{m.label}</div>
                                    <div style={{ fontSize: '24px', fontWeight: '800', color: m.color }}>{m.value}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Distribution Chart */}
            <div style={{ background: 'white', padding: '28px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                <div style={{ fontSize: '16px', fontWeight: '700', color: '#0c4a6e', marginBottom: '24px' }}>Risk Score Distribution</div>
                <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={distribution}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                        <XAxis dataKey="range" stroke="#64748b" style={{ fontSize: '12px' }} />
                        <YAxis stroke="#64748b" style={{ fontSize: '12px' }} />
                        <Tooltip />
                        <Bar dataKey="count" radius={[6, 6, 0, 0]} fill="#0c4a6e" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </>
    );
};

export default RiskScoringPage;
