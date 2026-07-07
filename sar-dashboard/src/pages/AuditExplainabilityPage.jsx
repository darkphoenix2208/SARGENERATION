import React from 'react';
import PageHeader from '../components/PageHeader';
import TabPage from '../components/TabPage';
import { Shield, Brain, PenLine, Send, FileCheck, AlertCircle, Clock, ShieldCheck, FileSearch, ScrollText, GitBranch } from 'lucide-react';

const timeline = [
    { time: '14:32:18', action: 'SAR submitted to NCA', actor: 'Jane Davidson', type: 'submit', icon: Send },
    { time: '14:28:05', action: 'SAR approved by reviewer', actor: 'Sarah Kim', type: 'approve', icon: FileCheck },
    { time: '13:45:22', action: 'Paragraph 2 edited', actor: 'Jane Davidson', type: 'edit', icon: PenLine },
    { time: '13:12:10', action: 'AI narrative generated (v3)', actor: 'ML Engine v2.4', type: 'ai', icon: Brain },
    { time: '12:58:33', action: 'Risk score recalculated: 94/100', actor: 'Scoring Engine', type: 'ai', icon: Brain },
    { time: '12:45:00', action: 'Structuring rule triggered', actor: 'Rule Engine', type: 'rule', icon: AlertCircle },
    { time: '12:44:55', action: 'Funnel Account rule triggered', actor: 'Rule Engine', type: 'rule', icon: AlertCircle },
    { time: '12:30:00', action: 'Case CSE-4521 opened', actor: 'Auto-assign', type: 'system', icon: Clock },
];
const col = { submit: '#16a34a', approve: '#0369a1', edit: '#ea580c', ai: '#8b5cf6', rule: '#dc2626', system: '#64748b' };

const AuditTrailTab = () => (
    <div style={{ background: 'white', padding: '28px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
            <div style={{ fontSize: '16px', fontWeight: '700', color: '#0c4a6e' }}>Action Timeline — SAR #1847</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '4px 10px', background: '#f0fdf4', borderRadius: '6px' }}>
                <Shield size={12} color="#16a34a" /><span style={{ fontSize: '11px', fontWeight: '600', color: '#16a34a' }}>Immutable</span>
            </div>
        </div>
        {timeline.map((e, i) => {
            const Icon = e.icon; return (
                <div key={i} style={{ display: 'flex', gap: '16px', marginBottom: '20px', position: 'relative' }}>
                    {i < timeline.length - 1 && <div style={{ position: 'absolute', left: '15px', top: '32px', bottom: '-8px', width: '2px', background: '#f1f5f9' }} />}
                    <div style={{ width: '32px', height: '32px', minWidth: '32px', borderRadius: '50%', background: `${col[e.type]}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon size={14} color={col[e.type]} /></div>
                    <div><div style={{ fontSize: '13px', fontWeight: '600', color: '#1e293b' }}>{e.action}</div><div style={{ fontSize: '12px', color: '#64748b' }}>{e.actor} • {e.time}</div></div>
                </div>
            );
        })}
    </div>
);

const ExplainabilityTab = () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        <div style={{ background: 'white', padding: '28px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
            <div style={{ fontSize: '16px', fontWeight: '700', color: '#0c4a6e', marginBottom: '20px' }}>Decision Rationale</div>
            {[{ d: 'Case flagged', r: 'Risk score 94 > threshold 70', c: '96%' }, { d: 'SAR auto-generated', r: '4 rules triggered with evidence', c: '92%' }, { d: 'Typology: Funnel+Structuring', r: '23 txns from 8 counterparties', c: '89%' }, { d: 'Escalation recommended', r: 'FATF grey-list jurisdiction', c: '94%' }].map((x, i) => (
                <div key={i} style={{ padding: '16px', background: '#f8fafc', borderRadius: '8px', marginBottom: '12px', borderLeft: '3px solid #8b5cf6' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}><span style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b' }}>{x.d}</span><span style={{ fontSize: '12px', fontWeight: '600', color: '#8b5cf6' }}>{x.c}</span></div>
                    <div style={{ fontSize: '13px', color: '#64748b' }}>{x.r}</div>
                </div>
            ))}
        </div>
        <div style={{ background: 'white', padding: '28px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
            <div style={{ fontSize: '16px', fontWeight: '700', color: '#0c4a6e', marginBottom: '20px' }}>Feature Importance</div>
            {[{ f: 'Transaction Volume', v: 92 }, { f: 'Counterparty Diversity', v: 88 }, { f: 'Geographic Risk', v: 85 }, { f: 'Velocity Acceleration', v: 78 }, { f: 'KYC Match Score', v: 45 }, { f: 'Account Age', v: 32 }].map((x, i) => (
                <div key={i} style={{ marginBottom: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}><span style={{ fontSize: '13px', fontWeight: '600', color: '#1e293b' }}>{x.f}</span><span style={{ fontSize: '13px', fontWeight: '700', color: '#0c4a6e' }}>{x.v}%</span></div>
                    <div style={{ height: '6px', background: '#e2e8f0', borderRadius: '3px', overflow: 'hidden' }}><div style={{ height: '100%', width: `${x.v}%`, background: x.v > 80 ? '#0c4a6e' : '#94a3b8', borderRadius: '3px' }} /></div>
                </div>
            ))}
        </div>
    </div>
);

const ruleLogs = [
    { rule: 'Funnel Account', ver: 'v3.2', fired: true, conf: '96%', detail: '8 senders → single account in 7 days' },
    { rule: 'Structuring Pattern', ver: 'v2.8', fired: true, conf: '92%', detail: '7 deposits £8.5K–£9.8K in 14 days' },
    { rule: 'FATF Jurisdiction', ver: 'v4.1', fired: true, conf: '89%', detail: '2 grey-list jurisdictions' },
    { rule: 'Velocity Anomaly', ver: 'v2.5', fired: true, conf: '94%', detail: '340% increase vs average' },
    { rule: 'Circular Transfer', ver: 'v1.3', fired: false, conf: '—', detail: 'No circular patterns' },
    { rule: 'KYC Mismatch', ver: 'v1.9', fired: false, conf: '—', detail: 'KYC data consistent' },
];

const RuleLogsTab = () => (
    <div style={{ background: 'white', padding: '28px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
        <div style={{ fontSize: '16px', fontWeight: '700', color: '#0c4a6e', marginBottom: '20px' }}>Rule Trigger Analysis — CSE-4521</div>
        {ruleLogs.map((r, i) => (
            <div key={i} style={{ padding: '14px', background: '#f8fafc', borderRadius: '8px', marginBottom: '12px', borderLeft: `3px solid ${r.fired ? '#dc2626' : '#16a34a'}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b' }}>{r.rule}</span>
                    <span style={{ fontSize: '12px', fontWeight: '600', color: r.fired ? '#dc2626' : '#16a34a' }}>{r.fired ? '⚠ Triggered' : '✓ Clear'}</span>
                </div>
                <div style={{ fontSize: '12px', color: '#64748b' }}>{r.detail}</div>
                <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '4px' }}>Engine: {r.ver} {r.conf !== '—' && `• Confidence: ${r.conf}`}</div>
            </div>
        ))}
    </div>
);

const ModelVersionsTab = () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        <div style={{ background: 'white', padding: '28px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
            <div style={{ fontSize: '16px', fontWeight: '700', color: '#0c4a6e', marginBottom: '20px' }}>Active Models</div>
            {[{ n: 'SAR Generator', m: 'GPT-SAR v2.4', s: 'Prod', a: '94.2%' }, { n: 'Risk Scoring', m: 'XGBoost v3.1.2', s: 'Prod', a: '91.8%' }, { n: 'Typology Classifier', m: 'BERT-AML v1.8', s: 'Prod', a: '89.5%' }, { n: 'Network Detector', m: 'GNN-Link v1.2', s: 'Beta', a: '86.3%' }].map((x, i) => (
                <div key={i} style={{ padding: '16px', background: '#f8fafc', borderRadius: '8px', marginBottom: '12px', borderLeft: `3px solid ${x.s === 'Prod' ? '#0c4a6e' : '#eab308'}` }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}><span style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b' }}>{x.n}</span><span style={{ padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: '600', background: x.s === 'Prod' ? '#f0fdf4' : '#fef9c3', color: x.s === 'Prod' ? '#16a34a' : '#a16207' }}>{x.s}</span></div>
                    <div style={{ fontSize: '13px', color: '#0c4a6e', fontWeight: '600' }}>{x.m}</div>
                    <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>Accuracy: {x.a}</div>
                </div>
            ))}
        </div>
        <div style={{ background: 'white', padding: '28px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
            <div style={{ fontSize: '16px', fontWeight: '700', color: '#0c4a6e', marginBottom: '20px' }}>Training Info</div>
            {[{ l: 'Dataset Size', v: '142K cases' }, { l: 'Last Retrain', v: '2026-01-28' }, { l: 'Updates', v: 'Daily batch' }, { l: 'False Positive', v: '12.4%' }, { l: 'False Negative', v: '2.1%' }, { l: 'Inference Time', v: '145ms' }].map((x, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f1f5f9' }}>
                    <span style={{ fontSize: '13px', color: '#64748b' }}>{x.l}</span><span style={{ fontSize: '13px', fontWeight: '600', color: '#1e293b' }}>{x.v}</span>
                </div>
            ))}
        </div>
    </div>
);

/* ─── Embeddable content (no PageHeader) ─── */
export const AuditExplainabilityContent = () => (
    <TabPage tabs={[
        { label: 'Audit Trail', icon: ShieldCheck, content: <AuditTrailTab /> },
        { label: 'Explainability', icon: FileSearch, content: <ExplainabilityTab /> },
        { label: 'Rule Logs', icon: ScrollText, content: <RuleLogsTab /> },
        { label: 'Model Versions', icon: GitBranch, content: <ModelVersionsTab /> },
    ]} />
);

const AuditExplainabilityPage = () => (
    <>
        <PageHeader title="Audit & Explainability" subtitle="Audit trail, AI transparency, and compliance logging" icon={Shield} actions={
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px', background: '#f0fdf4', borderRadius: '6px' }}>
                <Shield size={14} color="#16a34a" /><span style={{ fontSize: '12px', fontWeight: '600', color: '#16a34a' }}>Immutable Logs</span>
            </div>
        } />
        <AuditExplainabilityContent />
    </>
);

export default AuditExplainabilityPage;
