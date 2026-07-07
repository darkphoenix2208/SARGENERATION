import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';
import TabPage from '../components/TabPage';
import TransactionHighlightMap from '../components/TransactionHighlightMap';
import ComplianceValidator from '../components/ComplianceValidator';
import ConfidencePanel from '../components/ConfidencePanel';
import GovernancePanel from '../components/GovernancePanel';
import EscalationRiskMeter from '../components/EscalationRiskMeter';
import { FileText, Users, CheckCircle, Archive, Sparkles, RefreshCw, Send, XCircle, History, AlertCircle, MessageSquare, Download, Shield } from 'lucide-react';

/* ─── TAB 1: Draft SAR Generator ─── */
const DraftTab = () => {
    const [tone, setTone] = useState('Formal');
    const [format, setFormat] = useState('UK SAR (NCA)');
    const [narrative, setNarrative] = useState(
        `SUSPICIOUS ACTIVITY REPORT — NARRATIVE

Subject: Mikhail Petrov
Customer ID: MP-229847
Reporting Period: 15 January 2026 – 10 February 2026
Total Value of Suspicious Activity: £245,300.00

Summary of Suspicion:

The institution identified activity giving rise to suspicion of potential money laundering involving the above-referenced customer through its automated transaction monitoring system. The transaction pattern is consistent with known layering typologies commonly associated with money laundering, combined with potential structuring behaviour.

Detailed Description of Activity:

Between 15 January 2026 and 10 February 2026, the customer's account received 23 incoming wire transfers totalling £245,300.00 from 8 distinct counterparties. Analysis reveals the following concerning patterns:

Multiple incoming transfers from eight distinct counterparties with no identifiable commercial relationship to the customer based on available KYC information were consolidated and rapidly disbursed to two offshore accounts within 24–48 hours of receipt.

Seven cash deposits were made in amounts ranging from £8,500 to £9,800, consistent with possible structuring to avoid reporting thresholds.

Outbound wire transfers were directed to entities in jurisdictions identified as high-risk by FATF, including two beneficiary entities incorporated in jurisdictions recognised as high-risk or non-cooperative by FATF.

The transaction velocity increased by 340% compared to the customer's 12-month historical average.

Risk Indicators Identified:

Layering pattern with rapid fund movement through multiple accounts. Potential structuring of cash deposits below reporting thresholds. Transactions involving FATF-identified high-risk jurisdictions. Significant velocity anomaly relative to established baseline.

Action Taken by the Institution:

The institution has placed enhanced monitoring on the customer's accounts and is submitting this report to the National Crime Agency for consideration. The customer's accounts remain active under enhanced due diligence. No funds have been frozen at this time pending regulatory guidance. An internal investigation is ongoing and additional findings will be reported as appropriate.`);

    return (
        <div style={{ display: 'grid', gridTemplateColumns: '380px 1fr', gap: '24px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {/* Escalation Risk Meter */}
                <EscalationRiskMeter />

                <div style={{ background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                    <div style={{ fontSize: '14px', fontWeight: '700', color: '#0c4a6e', marginBottom: '16px' }}>Case Summary</div>
                    {[{ label: 'Case ID', value: 'CSE-4521' }, { label: 'Subject', value: 'Mikhail Petrov' }, { label: 'Risk Score', value: '94 / 100' }, { label: 'Typology', value: 'Layering + Structuring' }, { label: 'Period', value: '15 Jan – 10 Feb 2026' }, { label: 'Total Amount', value: '£245,300.00' }].map((item, i) => (
                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f1f5f9' }}>
                            <span style={{ fontSize: '13px', color: '#64748b' }}>{item.label}</span>
                            <span style={{ fontSize: '13px', fontWeight: '600', color: '#1e293b' }}>{item.value}</span>
                        </div>
                    ))}
                </div>
                <div style={{ background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                    <div style={{ fontSize: '14px', fontWeight: '700', color: '#0c4a6e', marginBottom: '16px' }}>Triggered Rules</div>
                    {['Funnel Account Pattern', 'Structuring Detection', 'FATF High-Risk Jurisdiction', 'Velocity Anomaly (340%)'].map((r, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 0', borderBottom: '1px solid #f1f5f9' }}>
                            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ea580c' }} />
                            <span style={{ fontSize: '13px', color: '#1e293b' }}>{r}</span>
                        </div>
                    ))}
                </div>
                <div style={{ background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                    <div style={{ fontSize: '14px', fontWeight: '700', color: '#0c4a6e', marginBottom: '16px' }}>Evidence Points</div>
                    {['23 wire transfers from 8 counterparties', '7 cash deposits below reporting threshold', '2 transfers to FATF high-risk jurisdictions', '£245K total over 26 days'].map((e, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 0', borderBottom: '1px solid #f1f5f9' }}>
                            <CheckCircle size={14} color="#16a34a" />
                            <span style={{ fontSize: '13px', color: '#1e293b' }}>{e}</span>
                        </div>
                    ))}
                </div>

                {/* Confidence & Uncertainty Panel */}
                <ConfidencePanel />

                {/* LLM Governance & Audit Panel */}
                <GovernancePanel />
            </div>
            <div style={{ background: 'white', padding: '28px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <div style={{ fontSize: '16px', fontWeight: '700', color: '#0c4a6e' }}>SAR Narrative</div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <select value={format} onChange={e => setFormat(e.target.value)} style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #e2e8f0', fontSize: '13px', color: '#475569', cursor: 'pointer' }}>
                            <option>UK SAR (NCA)</option>
                        </select>
                        <select value={tone} onChange={e => setTone(e.target.value)} style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #e2e8f0', fontSize: '13px', color: '#475569', cursor: 'pointer' }}>
                            <option>Formal</option><option>Detailed</option><option>Concise</option>
                        </select>
                    </div>
                </div>
                {/* Transaction Highlight Map — replaces plain textarea */}
                <TransactionHighlightMap narrative={narrative} onNarrativeChange={setNarrative} />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                    <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 20px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '13px', fontWeight: '600', color: '#64748b', cursor: 'pointer' }}><RefreshCw size={16} />Regenerate</button>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <button style={{ padding: '12px 24px', background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: '8px', fontSize: '13px', fontWeight: '600', color: '#0369a1', cursor: 'pointer' }}>Save Draft</button>
                        <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', background: 'linear-gradient(135deg, #0c4a6e, #0369a1)', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: '600', color: 'white', cursor: 'pointer' }}><Send size={16} />Send to Review</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

/* ─── TAB 2: Review ─── */
const versions = [
    { v: 'v3 (Current)', time: '10 min ago', author: 'AI Engine', status: 'pending' },
    { v: 'v2', time: '1 hr ago', author: 'Jane D.', status: 'edited' },
    { v: 'v1', time: '3 hrs ago', author: 'AI Engine', status: 'draft' },
];
const paragraphs = [
    { text: 'SUSPICIOUS ACTIVITY REPORT — NARRATIVE', explain: 'Standard header for UK SAR filings to the National Crime Agency under POCA 2002.', edited: false, isHeader: true },
    { text: 'Subject: Mikhail Petrov\nCustomer ID: MP-229847\nReporting Period: 15 January 2026 – 10 February 2026\nTotal Value of Suspicious Activity: £245,300.00', explain: 'Subject identification fields populated from KYC records and transaction aggregation engine.', edited: false },
    { text: 'Summary of Suspicion:', explain: 'Section header — summarises the basis for the SAR filing.', edited: false, isHeader: true },
    { text: 'The institution identified activity giving rise to suspicion of potential money laundering involving the above-referenced customer through its automated transaction monitoring system. The transaction pattern is consistent with known layering typologies commonly associated with money laundering, combined with potential structuring behaviour.', explain: 'Generated based on: Rule triggers for Layering + Structuring patterns. Confidence: 96%', edited: false },
    { text: 'Detailed Description of Activity:', explain: 'Section header — provides chronological detail of suspicious transactions.', edited: false, isHeader: true },
    { text: 'Between 15 January 2026 and 10 February 2026, the customer\'s account received 23 incoming wire transfers totalling £245,300.00 from 8 distinct counterparties. Analysis reveals the following concerning patterns:', explain: 'Data source: Transaction ledger aggregation. 23 verified transfers, 8 unique senders confirmed.', edited: true },
    { text: 'Multiple incoming transfers from eight distinct counterparties with no identifiable commercial relationship to the customer based on available KYC information were consolidated and rapidly disbursed to two offshore accounts within 24–48 hours of receipt.', explain: 'Layering detection rule RULE-012: Rapid disbursement within 48hr of receipt. 2 offshore destinations confirmed. KYC cross-check: no commercial nexus identified.', edited: false },
    { text: 'Seven cash deposits were made in amounts ranging from £8,500 to £9,800, consistent with possible structuring to avoid reporting thresholds.', explain: 'Structuring detection rule RULE-007: Deposits £8K–£9.9K within 48hr window. 7 matching transactions found.', edited: false },
    { text: 'Outbound wire transfers were directed to entities in jurisdictions identified as high-risk by FATF, including two beneficiary entities incorporated in jurisdictions recognised as high-risk or non-cooperative by FATF.', explain: 'Geo-risk module RULE-031: 2 destinations matched FATF grey-list. Country codes: UAE, BVI.', edited: false },
    { text: 'The transaction velocity increased by 340% compared to the customer\'s 12-month historical average.', explain: 'Velocity anomaly rule RULE-041: 340% deviation from 12-month rolling baseline. Confidence: 93%', edited: false },
    { text: 'Risk Indicators Identified:', explain: 'Section header — consolidates key risk indicators for the reviewer.', edited: false, isHeader: true },
    { text: 'Layering pattern with rapid fund movement through multiple accounts. Potential structuring of cash deposits below reporting thresholds. Transactions involving FATF-identified high-risk jurisdictions. Significant velocity anomaly relative to established baseline.', explain: 'Aggregated risk indicators from 4 triggered rules: RULE-012, RULE-007, RULE-031, RULE-041.', edited: false },
    { text: 'Action Taken by the Institution:', explain: 'Section header — documents remedial actions taken.', edited: false, isHeader: true },
    { text: 'The institution has placed enhanced monitoring on the customer\'s accounts and is submitting this report to the National Crime Agency for consideration. The customer\'s accounts remain active under enhanced due diligence. No funds have been frozen at this time pending regulatory guidance. An internal investigation is ongoing and additional findings will be reported as appropriate.', explain: 'Enhanced remedial action clause for UK SAR filings under Proceeds of Crime Act 2002. Includes account status, freeze posture, and investigation status per NCA best practice.', edited: false },
];
const comments = [
    { author: 'Sarah K.', text: 'Please verify the counterparty count — I see 9 in the raw data.', time: '30 min ago' },
    { author: 'Mike R.', text: 'FATF jurisdiction reference looks correct. Approved.', time: '45 min ago' },
];

const ReviewTab = () => {
    const [activeVersion, setActiveVersion] = useState(0);
    const [hoveredParagraph, setHoveredParagraph] = useState(null);
    const [newComment, setNewComment] = useState('');

    return (
        <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr 300px', gap: '24px' }}>
            <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: '700', color: '#0c4a6e', marginBottom: '16px' }}><History size={16} />Version History</div>
                {versions.map((v, i) => (
                    <div key={i} onClick={() => setActiveVersion(i)} style={{ padding: '12px', borderRadius: '8px', marginBottom: '8px', cursor: 'pointer', background: activeVersion === i ? '#f0f9ff' : 'transparent', border: activeVersion === i ? '1px solid #bae6fd' : '1px solid transparent' }}>
                        <div style={{ fontSize: '13px', fontWeight: '600', color: '#1e293b' }}>{v.v}</div>
                        <div style={{ fontSize: '11px', color: '#64748b' }}>{v.author} • {v.time}</div>
                    </div>
                ))}
            </div>
            <div style={{ background: 'white', padding: '28px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                <div style={{ fontSize: '16px', fontWeight: '700', color: '#0c4a6e', marginBottom: '8px' }}>SAR Narrative — {versions[activeVersion].v}</div>
                <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '24px' }}>Hover paragraphs for AI explainability</div>
                <div style={{ fontSize: '14px', fontWeight: '700', color: '#0c4a6e', marginBottom: '16px' }}>SAR #1847 — Mikhail Petrov</div>
                {paragraphs.map((p, i) => (
                    <div key={i} onMouseEnter={() => setHoveredParagraph(i)} onMouseLeave={() => setHoveredParagraph(null)} style={{ position: 'relative', padding: p.isHeader ? '8px 16px' : '12px 16px', marginBottom: p.isHeader ? '4px' : '12px', marginTop: p.isHeader && i > 0 ? '16px' : '0', borderRadius: '8px', borderLeft: p.edited ? '3px solid #ea580c' : '3px solid transparent', background: hoveredParagraph === i ? '#f8fafc' : 'transparent', transition: 'background 0.15s', cursor: 'pointer' }}>
                        <p style={{ fontSize: p.isHeader ? '14px' : '13px', lineHeight: '1.8', color: '#1e293b', margin: 0, fontWeight: p.isHeader ? '700' : '400', whiteSpace: 'pre-line' }}>
                            {p.text}
                            {p.edited && <span style={{ marginLeft: '8px', fontSize: '10px', padding: '2px 6px', background: '#fef2f2', color: '#dc2626', borderRadius: '4px', fontWeight: '600' }}>EDITED</span>}
                        </p>
                        {hoveredParagraph === i && (
                            <div style={{ position: 'absolute', left: '100%', top: 0, marginLeft: '12px', width: '260px', background: '#0f172a', color: 'white', padding: '16px', borderRadius: '8px', boxShadow: '0 8px 24px rgba(0,0,0,0.2)', zIndex: 100 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                                    <AlertCircle size={14} color="#8b5cf6" />
                                    <span style={{ fontSize: '11px', fontWeight: '700', color: '#8b5cf6' }}>AI EXPLAINABILITY</span>
                                </div>
                                <p style={{ fontSize: '12px', lineHeight: '1.6', color: '#cbd5e1', margin: 0 }}>{p.explain}</p>
                            </div>
                        )}
                    </div>
                ))}
                <div style={{ display: 'flex', gap: '12px', marginTop: '32px', paddingTop: '20px', borderTop: '1px solid #f1f5f9' }}>
                    <button style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '14px', background: 'linear-gradient(135deg, #16a34a, #15803d)', color: 'white', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '700', cursor: 'pointer' }}><CheckCircle size={18} />Approve SAR</button>
                    <button style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '14px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', fontSize: '14px', fontWeight: '700', color: '#dc2626', cursor: 'pointer' }}><XCircle size={18} />Reject</button>
                </div>
            </div>
            <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: '700', color: '#0c4a6e', marginBottom: '16px' }}><MessageSquare size={16} />Comments</div>
                <div style={{ flex: 1 }}>
                    {comments.map((c, i) => (
                        <div key={i} style={{ marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid #f1f5f9' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                <span style={{ fontSize: '13px', fontWeight: '600', color: '#1e293b' }}>{c.author}</span>
                                <span style={{ fontSize: '11px', color: '#94a3b8' }}>{c.time}</span>
                            </div>
                            <p style={{ fontSize: '13px', color: '#475569', lineHeight: '1.5', margin: 0 }}>{c.text}</p>
                        </div>
                    ))}
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <input type="text" value={newComment} onChange={e => setNewComment(e.target.value)} placeholder="Add a comment..." style={{ flex: 1, padding: '10px 12px', borderRadius: '6px', border: '1px solid #e2e8f0', fontSize: '13px' }} />
                    <button style={{ padding: '10px 14px', background: '#0c4a6e', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}><MessageSquare size={14} /></button>
                </div>
            </div>
        </div>
    );
};

/* ─── TAB 3: Approval Pipeline (Case-Specific) ─── */
const approvalStages = [
    { stage: 'L1 Analyst Review', reviewer: 'Mike R.', role: 'AML Analyst', status: 'Completed', completedAt: 'Feb 12, 2026 — 09:45 AM', notes: 'Initial draft reviewed. Evidence points verified against transaction ledger.', decision: 'Approved' },
    { stage: 'L2 Senior Review', reviewer: 'Sarah K.', role: 'Senior Investigator', status: 'Completed', completedAt: 'Feb 13, 2026 — 02:15 PM', notes: 'Counterparty count corrected from 8 to 9. Narrative updated to reflect offshore entity linkage.', decision: 'Approved with Edits' },
    { stage: 'MLRO Sign-off', reviewer: 'Jane D.', role: 'MLRO', status: 'In Progress', completedAt: null, notes: null, decision: null },
    { stage: 'Final Regulatory Filing', reviewer: 'David C.', role: 'Compliance Director', status: 'Pending', completedAt: null, notes: null, decision: null },
];
const auditTrail = [
    { action: 'SAR narrative generated by AI Engine', user: 'System', time: 'Feb 12, 2026 — 08:30 AM', icon: '🤖' },
    { action: 'Case assigned to Mike R. for L1 review', user: 'Auto-Assignment', time: 'Feb 12, 2026 — 08:31 AM', icon: '📋' },
    { action: 'L1 review completed — Approved', user: 'Mike R.', time: 'Feb 12, 2026 — 09:45 AM', icon: '✅' },
    { action: 'Escalated to Sarah K. for L2 senior review', user: 'Auto-Assignment', time: 'Feb 12, 2026 — 09:46 AM', icon: '⬆️' },
    { action: 'Narrative edited — Counterparty count corrected to 9', user: 'Sarah K.', time: 'Feb 13, 2026 — 01:50 PM', icon: '✏️' },
    { action: 'L2 review completed — Approved with Edits', user: 'Sarah K.', time: 'Feb 13, 2026 — 02:15 PM', icon: '✅' },
    { action: 'Awaiting MLRO sign-off from Jane D.', user: 'System', time: 'Feb 13, 2026 — 02:16 PM', icon: '⏳' },
];
const stageStatusStyles = {
    'Completed': { bg: '#f0fdf4', color: '#16a34a', border: '#bbf7d0' },
    'In Progress': { bg: '#f0f9ff', color: '#0369a1', border: '#bae6fd' },
    'Pending': { bg: '#f8fafc', color: '#94a3b8', border: '#e2e8f0' },
};
const decisionStyles = {
    'Approved': { bg: '#f0fdf4', color: '#16a34a' },
    'Approved with Edits': { bg: '#fefce8', color: '#a16207' },
};

const ApprovalTab = () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '24px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Case Header */}
            <div style={{ background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <div>
                        <div style={{ fontSize: '16px', fontWeight: '700', color: '#0c4a6e' }}>Approval Pipeline — SAR-1848</div>
                        <div style={{ fontSize: '13px', color: '#64748b', marginTop: '4px' }}>Subject: Mikhail Petrov • Case: CSE-4521 • Risk Score: 94</div>
                    </div>
                    <span style={{ padding: '6px 14px', background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: '8px', fontSize: '12px', fontWeight: '700', color: '#0369a1' }}>Stage 3 of 4</span>
                </div>
                {/* Progress Bar */}
                <div style={{ display: 'flex', gap: '4px', height: '6px', borderRadius: '3px', overflow: 'hidden', background: '#f1f5f9' }}>
                    <div style={{ flex: 1, background: '#16a34a', borderRadius: '3px' }} />
                    <div style={{ flex: 1, background: '#16a34a', borderRadius: '3px' }} />
                    <div style={{ flex: 1, background: 'linear-gradient(90deg, #0369a1, #bae6fd)', borderRadius: '3px', animation: 'pulse 2s ease-in-out infinite' }} />
                    <div style={{ flex: 1, background: '#e2e8f0', borderRadius: '3px' }} />
                </div>
            </div>

            {/* Approval Stages */}
            {approvalStages.map((s, i) => {
                const sty = stageStatusStyles[s.status];
                return (
                    <div key={i} style={{ background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', borderLeft: `4px solid ${sty.border}`, opacity: s.status === 'Pending' ? 0.6 : 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: sty.bg, border: `2px solid ${sty.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: '700', color: sty.color }}>{i + 1}</div>
                                <div>
                                    <div style={{ fontSize: '14px', fontWeight: '700', color: '#1e293b' }}>{s.stage}</div>
                                    <div style={{ fontSize: '12px', color: '#64748b' }}>{s.reviewer} — {s.role}</div>
                                </div>
                            </div>
                            <span style={{ padding: '4px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: '600', background: sty.bg, color: sty.color }}>{s.status}</span>
                        </div>
                        {s.completedAt && <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '8px' }}>Completed: {s.completedAt}</div>}
                        {s.notes && <div style={{ fontSize: '13px', color: '#475569', lineHeight: '1.6', padding: '12px', background: '#f8fafc', borderRadius: '8px', marginBottom: '8px' }}>{s.notes}</div>}
                        {s.decision && (
                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 10px', borderRadius: '6px', background: decisionStyles[s.decision]?.bg || '#f1f5f9', color: decisionStyles[s.decision]?.color || '#64748b', fontSize: '12px', fontWeight: '600' }}>
                                <CheckCircle size={12} /> {s.decision}
                            </div>
                        )}
                        {s.status === 'In Progress' && (
                            <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                                <button style={{ flex: 1, padding: '10px', background: 'linear-gradient(135deg, #16a34a, #15803d)', color: 'white', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}><CheckCircle size={14} /> Approve & Advance</button>
                                <button style={{ flex: 1, padding: '10px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', fontSize: '13px', fontWeight: '600', color: '#dc2626', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}><XCircle size={14} /> Request Revision</button>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>

        {/* Audit Trail Sidebar */}
        <div style={{ background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', height: 'fit-content', position: 'sticky', top: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: '700', color: '#0c4a6e', marginBottom: '20px' }}><History size={16} />Audit Trail</div>
            <div style={{ position: 'relative', paddingLeft: '20px' }}>
                <div style={{ position: 'absolute', left: '6px', top: '8px', bottom: '8px', width: '2px', background: '#e2e8f0' }} />
                {auditTrail.map((a, i) => (
                    <div key={i} style={{ position: 'relative', marginBottom: '20px', paddingBottom: i < auditTrail.length - 1 ? '0' : '0' }}>
                        <div style={{ position: 'absolute', left: '-17px', top: '4px', width: '14px', height: '14px', borderRadius: '50%', background: 'white', border: '2px solid #bae6fd', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '8px' }}>{a.icon}</div>
                        <div style={{ fontSize: '13px', color: '#1e293b', lineHeight: '1.5', marginBottom: '2px' }}>{a.action}</div>
                        <div style={{ fontSize: '11px', color: '#94a3b8' }}>{a.user} • {a.time}</div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

/* ─── TAB 4: Case Archive & Filing History ─── */
const filingHistory = [
    { version: 'v3 (Current)', date: 'Feb 13, 2026', type: 'Narrative Update', author: 'Sarah K.', notes: 'Counterparty count corrected. Offshore entity linkage added.', status: 'Active' },
    { version: 'v2', date: 'Feb 12, 2026', type: 'AI Revision', author: 'AI Engine', notes: 'Enhanced structuring detection details. Added velocity analysis paragraph.', status: 'Superseded' },
    { version: 'v1', date: 'Feb 12, 2026', type: 'Initial Draft', author: 'AI Engine', notes: 'Auto-generated from case CSE-4521 triggers and evidence.', status: 'Superseded' },
];
const caseDocuments = [
    { name: 'SAR Narrative — Mikhail Petrov', format: 'PDF', size: '142 KB', generated: 'Feb 13, 2026' },
    { name: 'Transaction Evidence Packet', format: 'PDF', size: '2.8 MB', generated: 'Feb 12, 2026' },
    { name: 'NCA SAR Filing (XML)', format: 'XML', size: '48 KB', generated: 'Pending' },
    { name: 'Risk Assessment Summary', format: 'PDF', size: '95 KB', generated: 'Feb 12, 2026' },
    { name: 'Entity Relationship Graph', format: 'PNG', size: '310 KB', generated: 'Feb 12, 2026' },
];
const regulatoryInfo = [
    { label: 'Filing Target', value: 'NCA SAR (UK SAR Regime)' },
    { label: 'Filing Deadline', value: 'Mar 14, 2026 (30 days from detection)' },
    { label: 'Days Remaining', value: '27 days' },
    { label: 'Prior SARs on Subject', value: '0 — First filing' },
    { label: 'Filing Category', value: 'Structuring / Layering' },
    { label: 'Regulatory Framework', value: 'Proceeds of Crime Act 2002' },
];

const ArchiveTab = () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        {/* Filing History */}
        <div style={{ background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
            <div style={{ fontSize: '14px', fontWeight: '700', color: '#0c4a6e', marginBottom: '20px' }}>Filing History — SAR-1848</div>
            {filingHistory.map((f, i) => (
                <div key={i} style={{ padding: '16px', borderRadius: '8px', marginBottom: '12px', background: f.status === 'Active' ? '#f0f9ff' : '#f8fafc', borderLeft: f.status === 'Active' ? '3px solid #0369a1' : '3px solid #e2e8f0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '13px', fontWeight: '700', color: '#1e293b' }}>{f.version}</span>
                            <span style={{ padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: '600', background: f.status === 'Active' ? '#dbeafe' : '#f1f5f9', color: f.status === 'Active' ? '#0369a1' : '#94a3b8' }}>{f.status}</span>
                        </div>
                        <span style={{ fontSize: '12px', color: '#94a3b8' }}>{f.date}</span>
                    </div>
                    <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>{f.type} by {f.author}</div>
                    <div style={{ fontSize: '13px', color: '#475569', lineHeight: '1.5' }}>{f.notes}</div>
                </div>
            ))}
        </div>

        {/* Regulatory Filing Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                <div style={{ fontSize: '14px', fontWeight: '700', color: '#0c4a6e', marginBottom: '16px' }}>Regulatory Filing Info</div>
                {regulatoryInfo.map((item, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f1f5f9' }}>
                        <span style={{ fontSize: '13px', color: '#64748b' }}>{item.label}</span>
                        <span style={{ fontSize: '13px', fontWeight: '600', color: '#1e293b', textAlign: 'right', maxWidth: '55%' }}>{item.value}</span>
                    </div>
                ))}
            </div>

            {/* Case Documents */}
            <div style={{ background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                <div style={{ fontSize: '14px', fontWeight: '700', color: '#0c4a6e', marginBottom: '16px' }}>Case Documents</div>
                {caseDocuments.map((d, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #f1f5f9' }}>
                        <div>
                            <div style={{ fontSize: '13px', fontWeight: '600', color: '#1e293b' }}>{d.name}</div>
                            <div style={{ fontSize: '11px', color: '#94a3b8' }}>{d.format} • {d.size} • {d.generated}</div>
                        </div>
                        <button style={{ padding: '6px 10px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#475569' }}><Download size={12} />{d.format}</button>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

/* ─── TAB 5: Compliance Check (Validator) ─── */
const ComplianceTab = () => {
    const narrativeText = `SUSPICIOUS ACTIVITY REPORT — NARRATIVE\n\nSubject: Mikhail Petrov\nCustomer ID: MP-229847\nReporting Period: 15 January 2026 – 10 February 2026\nTotal Value of Suspicious Activity: £245,300.00\n\nSummary of Suspicion:\n\nThe institution identified activity giving rise to suspicion of potential money laundering involving the above-referenced customer through its automated transaction monitoring system. The transaction pattern is consistent with known layering typologies commonly associated with money laundering, combined with potential structuring behaviour.\n\nDetailed Description of Activity:\n\nBetween 15 January 2026 and 10 February 2026, the customer's account received 23 incoming wire transfers totalling £245,300.00 from 8 distinct counterparties. Analysis reveals the following concerning patterns:\n\nMultiple incoming transfers from eight distinct counterparties with no identifiable commercial relationship to the customer based on available KYC information were consolidated and rapidly disbursed to two offshore accounts within 24–48 hours of receipt.\n\nSeven cash deposits were made in amounts ranging from £8,500 to £9,800, consistent with possible structuring to avoid reporting thresholds.\n\nOutbound wire transfers were directed to entities in jurisdictions identified as high-risk by FATF, including two beneficiary entities incorporated in jurisdictions recognised as high-risk or non-cooperative by FATF.\n\nThe transaction velocity increased by 340% compared to the customer's 12-month historical average.\n\nRisk Indicators Identified:\n\nLayering pattern with rapid fund movement through multiple accounts. Potential structuring of cash deposits below reporting thresholds. Transactions involving FATF-identified high-risk jurisdictions. Significant velocity anomaly relative to established baseline.\n\nAction Taken by the Institution:\n\nThe institution has placed enhanced monitoring on the customer's accounts and is submitting this report to the National Crime Agency for consideration. The customer's accounts remain active under enhanced due diligence. No funds have been frozen at this time pending regulatory guidance. An internal investigation is ongoing and additional findings will be reported as appropriate.`;
    return <ComplianceValidator narrative={narrativeText} />;
};

/* ─── Embeddable content (no PageHeader) ─── */
export const SARWorkflowContent = () => (
    <TabPage tabs={[
        { label: 'Draft', icon: FileText, content: <DraftTab /> },
        { label: 'Review', icon: Users, content: <ReviewTab /> },
        { label: 'Compliance Check', icon: Shield, badge: '7', badgeColor: '#16a34a', content: <ComplianceTab /> },
        { label: 'Approval Pipeline', icon: CheckCircle, badge: 'L3', badgeColor: '#0369a1', content: <ApprovalTab /> },
        { label: 'Case Archive', icon: Archive, content: <ArchiveTab /> },
    ]} />
);

/* ─── MAIN PAGE ─── */
const SARWorkflowPage = () => (
    <>
        <PageHeader title="SAR Workflow" subtitle="End-to-end SAR lifecycle: draft, review, approve, and archive" icon={FileText} actions={
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 12px', background: 'linear-gradient(135deg, #8b5cf6, #6366f1)', color: 'white', borderRadius: '6px', fontSize: '12px', fontWeight: '700' }}>
                <Sparkles size={14} />AI Powered
            </span>
        } />
        <SARWorkflowContent />
    </>
);

export default SARWorkflowPage;
