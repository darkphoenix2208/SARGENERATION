import React, { useState } from 'react';
import { Shield, Cpu, Globe, Hash, AlertOctagon, UserCheck, Clock, ChevronDown, ChevronUp, Lock, FileCode, Sparkles } from 'lucide-react';

/* ─── Governance Metadata ─── */
const governanceData = {
    promptVersion: 'v3.2.1',
    modelVersion: 'GPT-4-AML-Tuned (2026.01)',
    externalDataAccess: false,
    outputTokenLimit: 2048,
    hallucinationRisk: 'Low',
    humanReviewStatus: 'Pending',
    versionLog: [
        { version: 'v3.2.1', date: '2026-02-10 14:32', change: 'Updated FATF jurisdiction list to 2026 grey-list', author: 'System' },
        { version: 'v3.2.0', date: '2026-02-01 09:15', change: 'Refined structuring detection prompt to reduce false positives', author: 'Dr. A. Singh' },
        { version: 'v3.1.8', date: '2026-01-20 11:45', change: 'Added velocity anomaly baseline comparison module', author: 'System' },
        { version: 'v3.1.7', date: '2026-01-10 16:20', change: 'Compliance review: removed speculative language patterns', author: 'J. Davidson' },
    ],
};

const hallucinationConfig = {
    Low: { color: '#16a34a', bg: '#f0fdf4', border: '#bbf7d0', percent: 15 },
    Medium: { color: '#ea580c', bg: '#fff7ed', border: '#fed7aa', percent: 50 },
    High: { color: '#dc2626', bg: '#fef2f2', border: '#fecaca', percent: 85 },
};

const reviewConfig = {
    Pending: { color: '#ea580c', bg: '#fff7ed', border: '#fed7aa' },
    Approved: { color: '#16a34a', bg: '#f0fdf4', border: '#bbf7d0' },
    Rejected: { color: '#dc2626', bg: '#fef2f2', border: '#fecaca' },
};

const GovernancePanel = () => {
    const [showVersionLog, setShowVersionLog] = useState(false);
    const d = governanceData;
    const hallCfg = hallucinationConfig[d.hallucinationRisk];
    const revCfg = reviewConfig[d.humanReviewStatus];

    return (
        <div style={{
            background: 'white', padding: '20px', borderRadius: '12px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.08)'
        }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
                <div style={{
                    width: '28px', height: '28px', borderRadius: '7px',
                    background: 'linear-gradient(135deg, #7c3aed, #6366f1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                    <Shield size={14} color="white" />
                </div>
                <div>
                    <div style={{ fontSize: '14px', fontWeight: '700', color: '#0c4a6e' }}>LLM Governance & Audit</div>
                    <div style={{ fontSize: '10px', color: '#94a3b8' }}>Responsible AI controls & version tracking</div>
                </div>
            </div>

            {/* Key–Value Rows */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                {/* Prompt Version */}
                <div style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '9px 0', borderBottom: '1px solid #f1f5f9'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <FileCode size={13} color="#64748b" />
                        <span style={{ fontSize: '12px', color: '#64748b' }}>Prompt Version</span>
                    </div>
                    <span style={{
                        padding: '2px 8px', borderRadius: '4px', fontSize: '11px',
                        fontWeight: '700', background: '#f5f3ff', color: '#7c3aed',
                        fontFamily: "'Inter', monospace"
                    }}>{d.promptVersion}</span>
                </div>

                {/* Model Version */}
                <div style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '9px 0', borderBottom: '1px solid #f1f5f9'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Cpu size={13} color="#64748b" />
                        <span style={{ fontSize: '12px', color: '#64748b' }}>Model Version</span>
                    </div>
                    <span style={{ fontSize: '11px', fontWeight: '600', color: '#1e293b', maxWidth: '180px', textAlign: 'right' }}>
                        {d.modelVersion}
                    </span>
                </div>

                {/* External Data Access */}
                <div style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '9px 0', borderBottom: '1px solid #f1f5f9'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Globe size={13} color="#64748b" />
                        <span style={{ fontSize: '12px', color: '#64748b' }}>External Data Access</span>
                    </div>
                    <div style={{
                        display: 'flex', alignItems: 'center', gap: '5px',
                        padding: '2px 8px', borderRadius: '4px',
                        background: '#f0fdf4', border: '1px solid #bbf7d0'
                    }}>
                        <Lock size={10} color="#16a34a" />
                        <span style={{ fontSize: '10px', fontWeight: '700', color: '#16a34a' }}>DISABLED</span>
                    </div>
                </div>

                {/* Token Limit */}
                <div style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '9px 0', borderBottom: '1px solid #f1f5f9'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Hash size={13} color="#64748b" />
                        <span style={{ fontSize: '12px', color: '#64748b' }}>Output Token Limit</span>
                    </div>
                    <span style={{ fontSize: '11px', fontWeight: '700', color: '#1e293b', fontFamily: "'Inter', monospace" }}>
                        {d.outputTokenLimit.toLocaleString()}
                    </span>
                </div>

                {/* Hallucination Risk */}
                <div style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '9px 0', borderBottom: '1px solid #f1f5f9'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <AlertOctagon size={13} color="#64748b" />
                        <span style={{ fontSize: '12px', color: '#64748b' }}>Hallucination Risk</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{
                            width: '50px', height: '5px', borderRadius: '3px',
                            background: '#e2e8f0', overflow: 'hidden'
                        }}>
                            <div style={{
                                width: `${hallCfg.percent}%`, height: '100%',
                                borderRadius: '3px', background: hallCfg.color,
                                transition: 'width 0.3s'
                            }} />
                        </div>
                        <span style={{
                            padding: '2px 8px', borderRadius: '4px',
                            fontSize: '10px', fontWeight: '800',
                            background: hallCfg.bg, color: hallCfg.color,
                            border: `1px solid ${hallCfg.border}`,
                            letterSpacing: '0.03em'
                        }}>{d.hallucinationRisk.toUpperCase()}</span>
                    </div>
                </div>

                {/* Human Review Status */}
                <div style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '9px 0', borderBottom: '1px solid #f1f5f9'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <UserCheck size={13} color="#64748b" />
                        <span style={{ fontSize: '12px', color: '#64748b' }}>Human Review</span>
                    </div>
                    <span style={{
                        padding: '2px 10px', borderRadius: '4px',
                        fontSize: '10px', fontWeight: '700',
                        background: revCfg.bg, color: revCfg.color,
                        border: `1px solid ${revCfg.border}`
                    }}>{d.humanReviewStatus.toUpperCase()}</span>
                </div>
            </div>

            {/* Version Log Toggle */}
            <button
                onClick={() => setShowVersionLog(!showVersionLog)}
                style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    width: '100%', padding: '10px 0', marginTop: '6px',
                    background: 'none', border: 'none', cursor: 'pointer'
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Clock size={13} color="#0369a1" />
                    <span style={{ fontSize: '12px', fontWeight: '600', color: '#0369a1' }}>
                        Version Change Log
                    </span>
                </div>
                {showVersionLog ? <ChevronUp size={14} color="#94a3b8" /> : <ChevronDown size={14} color="#94a3b8" />}
            </button>

            {/* Version Log Entries */}
            {showVersionLog && (
                <div style={{
                    borderTop: '1px solid #f1f5f9', paddingTop: '10px',
                    animation: 'fadeIn 0.2s ease forwards'
                }}>
                    {d.versionLog.map((entry, i) => (
                        <div key={i} style={{
                            display: 'flex', gap: '10px', padding: '8px 0',
                            borderBottom: i < d.versionLog.length - 1 ? '1px solid #f8fafc' : 'none'
                        }}>
                            <div style={{
                                display: 'flex', flexDirection: 'column', alignItems: 'center',
                                flexShrink: 0, paddingTop: '2px'
                            }}>
                                <div style={{
                                    width: '8px', height: '8px', borderRadius: '50%',
                                    background: i === 0 ? '#7c3aed' : '#cbd5e1',
                                    border: i === 0 ? '2px solid #ddd6fe' : 'none'
                                }} />
                                {i < d.versionLog.length - 1 && (
                                    <div style={{ width: '1px', flex: 1, background: '#e2e8f0', marginTop: '4px' }} />
                                )}
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                                    <span style={{
                                        fontSize: '10px', fontWeight: '700', color: '#7c3aed',
                                        fontFamily: "'Inter', monospace"
                                    }}>{entry.version}</span>
                                    <span style={{ fontSize: '10px', color: '#94a3b8' }}>•</span>
                                    <span style={{ fontSize: '10px', color: '#94a3b8' }}>{entry.date}</span>
                                </div>
                                <div style={{ fontSize: '11px', color: '#475569', lineHeight: '1.5' }}>{entry.change}</div>
                                <div style={{ fontSize: '10px', color: '#94a3b8', marginTop: '2px' }}>by {entry.author}</div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default GovernancePanel;
