import React from 'react';
import PageHeader from '../components/PageHeader';
import { Shield, Brain, PenLine, Send, FileCheck, AlertCircle, Clock } from 'lucide-react';

const timeline = [
    { time: '14:32:18', action: 'SAR submitted to NCA', actor: 'Jane Davidson', type: 'submit', icon: Send },
    { time: '14:28:05', action: 'SAR approved by reviewer', actor: 'Sarah Kim', type: 'approve', icon: FileCheck },
    { time: '13:45:22', action: 'Paragraph 2 edited: counterparty count updated', actor: 'Jane Davidson', type: 'edit', icon: PenLine },
    { time: '13:12:10', action: 'AI narrative generated (v3)', actor: 'ML Engine v2.4', type: 'ai', icon: Brain },
    { time: '12:58:33', action: 'Risk score recalculated: 94/100', actor: 'Scoring Engine', type: 'ai', icon: Brain },
    { time: '12:45:00', action: 'Structuring rule triggered: 7 deposits near reporting threshold', actor: 'Rule Engine', type: 'rule', icon: AlertCircle },
    { time: '12:44:55', action: 'Funnel Account rule triggered: 8 counterparties', actor: 'Rule Engine', type: 'rule', icon: AlertCircle },
    { time: '12:30:00', action: 'Case CSE-4521 opened', actor: 'Auto-assign', type: 'system', icon: Clock },
];

const colors = { submit: '#16a34a', approve: '#0369a1', edit: '#ea580c', ai: '#8b5cf6', rule: '#dc2626', system: '#64748b' };

const ruleLogs = [
    { rule: 'Funnel Account Detection', version: 'v3.2', fired: 'Yes', confidence: '96%', details: '8 distinct senders → single account within 7 days' },
    { rule: 'Structuring Pattern', version: 'v2.8', fired: 'Yes', confidence: '92%', details: '7 deposits £8.5K–£9.8K in 14-day window' },
    { rule: 'FATF Jurisdiction Risk', version: 'v4.1', fired: 'Yes', confidence: '89%', details: 'Outbound wires to 2 grey-list jurisdictions' },
    { rule: 'Velocity Anomaly', version: 'v2.5', fired: 'Yes', confidence: '94%', details: '340% increase vs 12-month average' },
];

const AuditTrailPage = () => (
    <>
        <PageHeader title="Audit & Explainability" subtitle="Complete audit trail with immutable logging and decision transparency" />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
            {/* Timeline */}
            <div style={{ background: 'white', padding: '28px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                    <div style={{ fontSize: '16px', fontWeight: '700', color: '#0c4a6e' }}>Action Timeline — SAR #1847</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '4px 10px', background: '#f0fdf4', borderRadius: '6px' }}>
                        <Shield size={12} color="#16a34a" />
                        <span style={{ fontSize: '11px', fontWeight: '600', color: '#16a34a' }}>Immutable Log</span>
                    </div>
                </div>
                {timeline.map((e, i) => {
                    const Icon = e.icon;
                    return (
                        <div key={i} style={{ display: 'flex', gap: '16px', marginBottom: '20px', position: 'relative' }}>
                            {i < timeline.length - 1 && (
                                <div style={{ position: 'absolute', left: '15px', top: '32px', bottom: '-8px', width: '2px', background: '#f1f5f9' }} />
                            )}
                            <div style={{
                                width: '32px', height: '32px', minWidth: '32px', borderRadius: '50%',
                                background: `${colors[e.type]}15`, display: 'flex', alignItems: 'center', justifyContent: 'center'
                            }}>
                                <Icon size={14} color={colors[e.type]} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: '13px', fontWeight: '600', color: '#1e293b' }}>{e.action}</div>
                                <div style={{ fontSize: '12px', color: '#64748b' }}>{e.actor} • {e.time}</div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Rule Trigger Logs + Model Metadata */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div style={{ background: 'white', padding: '28px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                    <div style={{ fontSize: '16px', fontWeight: '700', color: '#0c4a6e', marginBottom: '20px' }}>Rule Trigger Logs</div>
                    {ruleLogs.map((r, i) => (
                        <div key={i} style={{ padding: '14px', background: '#f8fafc', borderRadius: '8px', marginBottom: '12px', borderLeft: '3px solid #0c4a6e' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                                <span style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b' }}>{r.rule}</span>
                                <span style={{ fontSize: '12px', fontWeight: '600', color: '#16a34a' }}>{r.confidence}</span>
                            </div>
                            <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>{r.details}</div>
                            <span style={{ fontSize: '11px', color: '#94a3b8' }}>Engine: {r.version}</span>
                        </div>
                    ))}
                </div>

                <div style={{ background: 'white', padding: '28px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                    <div style={{ fontSize: '16px', fontWeight: '700', color: '#0c4a6e', marginBottom: '20px' }}>Model Version Metadata</div>
                    {[
                        { label: 'SAR Generator Model', value: 'GPT-SAR v2.4' },
                        { label: 'Risk Scoring Engine', value: 'XGBoost v3.1.2' },
                        { label: 'Typology Classifier', value: 'BERT-AML v1.8' },
                        { label: 'Last Retrained', value: '2026-01-28' },
                        { label: 'Training Dataset', value: '142K labeled cases' },
                    ].map((m, i) => (
                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f1f5f9' }}>
                            <span style={{ fontSize: '13px', color: '#64748b' }}>{m.label}</span>
                            <span style={{ fontSize: '13px', fontWeight: '600', color: '#1e293b' }}>{m.value}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </>
);

export default AuditTrailPage;
