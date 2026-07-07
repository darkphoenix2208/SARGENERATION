import React from 'react';
import { Brain, BarChart3, Database, UserX, Zap, TrendingUp } from 'lucide-react';

/* ─── Mock Confidence Data ─── */
const confidenceData = {
    narrativeCertainty: 'High',
    typologyMatchScore: 92,
    dataCompleteness: 87,
    missingKYCFields: ['Secondary ID Verification', 'Source of Wealth Declaration'],
    ruleWeights: [
        { rule: 'Funnel Account', weight: 32, color: '#0369a1' },
        { rule: 'Structuring', weight: 28, color: '#7c3aed' },
        { rule: 'Geo-Risk (FATF)', weight: 22, color: '#ea580c' },
        { rule: 'Velocity Anomaly', weight: 18, color: '#16a34a' },
    ],
};

const certaintyConfig = {
    High: { color: '#16a34a', bg: '#f0fdf4', border: '#bbf7d0', label: 'HIGH' },
    Medium: { color: '#ea580c', bg: '#fff7ed', border: '#fed7aa', label: 'MEDIUM' },
    Low: { color: '#dc2626', bg: '#fef2f2', border: '#fecaca', label: 'LOW' },
};

const ConfidencePanel = () => {
    const data = confidenceData;
    const certCfg = certaintyConfig[data.narrativeCertainty];

    return (
        <div style={{
            background: 'white', padding: '20px', borderRadius: '12px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.08)'
        }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
                <div style={{
                    width: '28px', height: '28px', borderRadius: '7px',
                    background: 'linear-gradient(135deg, #0ea5e9, #0369a1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                    <Brain size={14} color="white" />
                </div>
                <div>
                    <div style={{ fontSize: '14px', fontWeight: '700', color: '#0c4a6e' }}>Confidence & Uncertainty</div>
                    <div style={{ fontSize: '10px', color: '#94a3b8' }}>Structured AI transparency disclosure</div>
                </div>
            </div>

            {/* Narrative Certainty */}
            <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '10px 12px', borderRadius: '8px',
                background: certCfg.bg, border: `1px solid ${certCfg.border}`,
                marginBottom: '14px'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <TrendingUp size={14} color={certCfg.color} />
                    <span style={{ fontSize: '12px', fontWeight: '600', color: '#475569' }}>Narrative Certainty</span>
                </div>
                <span style={{
                    padding: '2px 10px', borderRadius: '4px',
                    fontSize: '10px', fontWeight: '800',
                    background: `${certCfg.color}18`, color: certCfg.color,
                    letterSpacing: '0.05em'
                }}>{certCfg.label}</span>
            </div>

            {/* Typology Match Score */}
            <div style={{ marginBottom: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <BarChart3 size={13} color="#64748b" />
                        <span style={{ fontSize: '12px', fontWeight: '600', color: '#475569' }}>Typology Match</span>
                    </div>
                    <span style={{ fontSize: '12px', fontWeight: '700', color: '#0c4a6e' }}>{data.typologyMatchScore}%</span>
                </div>
                <div style={{
                    height: '6px', borderRadius: '3px', background: '#e2e8f0', overflow: 'hidden'
                }}>
                    <div style={{
                        width: `${data.typologyMatchScore}%`, height: '100%',
                        borderRadius: '3px',
                        background: 'linear-gradient(90deg, #0369a1, #0ea5e9)',
                        transition: 'width 0.5s ease'
                    }} />
                </div>
            </div>

            {/* Data Completeness */}
            <div style={{ marginBottom: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Database size={13} color="#64748b" />
                        <span style={{ fontSize: '12px', fontWeight: '600', color: '#475569' }}>Data Completeness</span>
                    </div>
                    <span style={{ fontSize: '12px', fontWeight: '700', color: data.dataCompleteness >= 90 ? '#16a34a' : '#ea580c' }}>
                        {data.dataCompleteness}%
                    </span>
                </div>
                <div style={{
                    height: '6px', borderRadius: '3px', background: '#e2e8f0', overflow: 'hidden'
                }}>
                    <div style={{
                        width: `${data.dataCompleteness}%`, height: '100%',
                        borderRadius: '3px',
                        background: data.dataCompleteness >= 90
                            ? 'linear-gradient(90deg, #16a34a, #22c55e)'
                            : 'linear-gradient(90deg, #ea580c, #f97316)',
                        transition: 'width 0.5s ease'
                    }} />
                </div>
            </div>

            {/* Missing KYC Fields */}
            {data.missingKYCFields.length > 0 && (
                <div style={{
                    padding: '10px 12px', borderRadius: '8px',
                    background: '#fef2f2', border: '1px solid #fecaca',
                    marginBottom: '14px'
                }}>
                    <div style={{
                        display: 'flex', alignItems: 'center', gap: '6px',
                        marginBottom: '8px'
                    }}>
                        <UserX size={13} color="#dc2626" />
                        <span style={{ fontSize: '11px', fontWeight: '700', color: '#dc2626' }}>
                            Missing KYC ({data.missingKYCFields.length})
                        </span>
                    </div>
                    {data.missingKYCFields.map((field, i) => (
                        <div key={i} style={{
                            display: 'flex', alignItems: 'center', gap: '6px',
                            padding: '4px 0',
                            borderBottom: i < data.missingKYCFields.length - 1 ? '1px solid rgba(220,38,38,0.1)' : 'none'
                        }}>
                            <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#dc2626' }} />
                            <span style={{ fontSize: '11px', color: '#991b1b' }}>{field}</span>
                        </div>
                    ))}
                </div>
            )}

            {/* Rule Weight Distribution */}
            <div>
                <div style={{
                    display: 'flex', alignItems: 'center', gap: '6px',
                    marginBottom: '10px'
                }}>
                    <Zap size={13} color="#64748b" />
                    <span style={{ fontSize: '12px', fontWeight: '600', color: '#475569' }}>Rule Dependency Weights</span>
                </div>

                {/* Stacked Bar */}
                <div style={{
                    display: 'flex', height: '10px', borderRadius: '5px',
                    overflow: 'hidden', marginBottom: '10px'
                }}>
                    {data.ruleWeights.map((r, i) => (
                        <div key={i} style={{
                            width: `${r.weight}%`, height: '100%',
                            background: r.color,
                            transition: 'width 0.5s ease'
                        }} />
                    ))}
                </div>

                {/* Legend */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {data.ruleWeights.map((r, i) => (
                        <div key={i} style={{
                            display: 'flex', alignItems: 'center', gap: '5px',
                            padding: '3px 8px', borderRadius: '4px',
                            background: '#f8fafc', border: '1px solid #f1f5f9'
                        }}>
                            <div style={{
                                width: '6px', height: '6px', borderRadius: '2px',
                                background: r.color
                            }} />
                            <span style={{ fontSize: '10px', color: '#475569' }}>{r.rule}</span>
                            <span style={{ fontSize: '10px', fontWeight: '700', color: r.color }}>{r.weight}%</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ConfidencePanel;
