import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';
import { CheckCircle, XCircle, MessageSquare, History, AlertCircle } from 'lucide-react';

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

const HumanReviewPage = () => {
    const [activeVersion, setActiveVersion] = useState(0);
    const [hoveredParagraph, setHoveredParagraph] = useState(null);
    const [newComment, setNewComment] = useState('');

    return (
        <>
            <PageHeader title="SAR Review & Approval" subtitle="Review AI-generated SAR narratives with paragraph-level explainability" />

            <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr 320px', gap: '24px' }}>
                {/* Version History Sidebar */}
                <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: '700', color: '#0c4a6e', marginBottom: '16px' }}>
                        <History size={16} />Version History
                    </div>
                    {versions.map((v, i) => (
                        <div
                            key={i}
                            onClick={() => setActiveVersion(i)}
                            style={{
                                padding: '12px', borderRadius: '8px', marginBottom: '8px', cursor: 'pointer',
                                background: activeVersion === i ? '#f0f9ff' : 'transparent',
                                border: activeVersion === i ? '1px solid #bae6fd' : '1px solid transparent'
                            }}
                        >
                            <div style={{ fontSize: '13px', fontWeight: '600', color: '#1e293b' }}>{v.v}</div>
                            <div style={{ fontSize: '11px', color: '#64748b' }}>{v.author} • {v.time}</div>
                        </div>
                    ))}
                </div>

                {/* SAR Narrative with Explainability */}
                <div style={{ background: 'white', padding: '28px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                    <div style={{ fontSize: '16px', fontWeight: '700', color: '#0c4a6e', marginBottom: '8px' }}>SAR Narrative — {versions[activeVersion].v}</div>
                    <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '24px' }}>Hover over paragraphs to see AI explainability</div>

                    <div style={{ fontSize: '14px', fontWeight: '700', color: '#0c4a6e', marginBottom: '16px' }}>
                        SAR #1847 — Mikhail Petrov
                    </div>

                    {paragraphs.map((p, i) => (
                        <div
                            key={i}
                            onMouseEnter={() => setHoveredParagraph(i)}
                            onMouseLeave={() => setHoveredParagraph(null)}
                            style={{
                                position: 'relative', padding: p.isHeader ? '8px 16px' : '12px 16px',
                                marginBottom: p.isHeader ? '4px' : '12px',
                                marginTop: p.isHeader && i > 0 ? '16px' : '0',
                                borderRadius: '8px',
                                borderLeft: p.edited ? '3px solid #ea580c' : '3px solid transparent',
                                background: hoveredParagraph === i ? '#f8fafc' : 'transparent',
                                transition: 'background 0.15s', cursor: 'pointer'
                            }}
                        >
                            <p style={{ fontSize: p.isHeader ? '14px' : '13px', lineHeight: '1.8', color: '#1e293b', margin: 0, fontWeight: p.isHeader ? '700' : '400', whiteSpace: 'pre-line' }}>
                                {p.text}
                                {p.edited && <span style={{ marginLeft: '8px', fontSize: '10px', padding: '2px 6px', background: '#fef2f2', color: '#dc2626', borderRadius: '4px', fontWeight: '600' }}>EDITED</span>}
                            </p>

                            {hoveredParagraph === i && (
                                <div style={{
                                    position: 'absolute', left: '100%', top: 0, marginLeft: '12px', width: '280px',
                                    background: '#0f172a', color: 'white', padding: '16px', borderRadius: '8px',
                                    boxShadow: '0 8px 24px rgba(0,0,0,0.2)', zIndex: 100
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                                        <AlertCircle size={14} color="#8b5cf6" />
                                        <span style={{ fontSize: '11px', fontWeight: '700', color: '#8b5cf6' }}>AI EXPLAINABILITY</span>
                                    </div>
                                    <p style={{ fontSize: '12px', lineHeight: '1.6', color: '#cbd5e1', margin: 0 }}>{p.explain}</p>
                                </div>
                            )}
                        </div>
                    ))}

                    {/* Approve / Reject */}
                    <div style={{ display: 'flex', gap: '12px', marginTop: '32px', paddingTop: '20px', borderTop: '1px solid #f1f5f9' }}>
                        <button style={{
                            flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                            padding: '14px', background: 'linear-gradient(135deg, #16a34a, #15803d)', color: 'white',
                            border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '700', cursor: 'pointer'
                        }}>
                            <CheckCircle size={18} />Approve SAR
                        </button>
                        <button style={{
                            flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                            padding: '14px', background: '#fef2f2', border: '1px solid #fecaca',
                            borderRadius: '8px', fontSize: '14px', fontWeight: '700', color: '#dc2626', cursor: 'pointer'
                        }}>
                            <XCircle size={18} />Reject
                        </button>
                    </div>
                </div>

                {/* Comments Panel */}
                <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: '700', color: '#0c4a6e', marginBottom: '16px' }}>
                        <MessageSquare size={16} />Comments
                    </div>
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
                        <input
                            type="text" value={newComment} onChange={e => setNewComment(e.target.value)}
                            placeholder="Add a comment..."
                            style={{ flex: 1, padding: '10px 12px', borderRadius: '6px', border: '1px solid #e2e8f0', fontSize: '13px' }}
                        />
                        <button style={{ padding: '10px 14px', background: '#0c4a6e', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                            <MessageSquare size={14} />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HumanReviewPage;
