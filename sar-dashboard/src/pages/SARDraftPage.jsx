import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';
import { Sparkles, RefreshCw, CheckCircle, Send } from 'lucide-react';

const SARDraftPage = () => {
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

The institution has placed enhanced monitoring on the customer's accounts and is submitting this report to the National Crime Agency for consideration. The customer's accounts remain active under enhanced due diligence. No funds have been frozen at this time pending regulatory guidance. An internal investigation is ongoing and additional findings will be reported as appropriate.`
    );

    return (
        <>
            <PageHeader
                title="AI SAR Draft Generator"
                subtitle="Generate, review, and submit SAR narratives powered by AI"
                actions={
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 12px', background: 'linear-gradient(135deg, #8b5cf6, #6366f1)', color: 'white', borderRadius: '6px', fontSize: '12px', fontWeight: '700' }}>
                        <Sparkles size={14} />AI Powered
                    </span>
                }
            />

            <div style={{ display: 'grid', gridTemplateColumns: '380px 1fr', gap: '24px' }}>
                {/* Left Panel: Case Summary */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div style={{ background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                        <div style={{ fontSize: '14px', fontWeight: '700', color: '#0c4a6e', marginBottom: '16px' }}>Case Summary</div>
                        {[
                            { label: 'Case ID', value: 'CSE-4521' },
                            { label: 'Subject', value: 'Mikhail Petrov' },
                            { label: 'Risk Score', value: '94 / 100' },
                            { label: 'Typology', value: 'Layering + Structuring' },
                            { label: 'Period', value: '15 Jan – 10 Feb 2026' },
                            { label: 'Total Amount', value: '£245,300.00' },
                        ].map((item, i) => (
                            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f1f5f9' }}>
                                <span style={{ fontSize: '13px', color: '#64748b' }}>{item.label}</span>
                                <span style={{ fontSize: '13px', fontWeight: '600', color: '#1e293b' }}>{item.value}</span>
                            </div>
                        ))}
                    </div>

                    <div style={{ background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                        <div style={{ fontSize: '14px', fontWeight: '700', color: '#0c4a6e', marginBottom: '16px' }}>Triggered Rules</div>
                        {['Layering Pattern', 'Structuring Detection', 'FATF High-Risk Jurisdiction', 'Velocity Anomaly (340%)'].map((r, i) => (
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
                </div>

                {/* Right Panel: SAR Editor */}
                <div style={{ background: 'white', padding: '28px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <div style={{ fontSize: '16px', fontWeight: '700', color: '#0c4a6e' }}>SAR Narrative</div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <select value={format} onChange={e => setFormat(e.target.value)} style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #e2e8f0', fontSize: '13px', color: '#475569', cursor: 'pointer' }}>
                                <option>UK SAR (NCA)</option>
                            </select>
                            <select value={tone} onChange={e => setTone(e.target.value)} style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #e2e8f0', fontSize: '13px', color: '#475569', cursor: 'pointer' }}>
                                <option>Formal</option>
                                <option>Detailed</option>
                                <option>Concise</option>
                            </select>
                        </div>
                    </div>

                    <textarea
                        value={narrative}
                        onChange={e => setNarrative(e.target.value)}
                        style={{
                            flex: 1, minHeight: '400px', padding: '20px', borderRadius: '8px',
                            border: '1px solid #e2e8f0', fontSize: '13px', lineHeight: '1.8',
                            color: '#1e293b', resize: 'vertical', fontFamily: "'Inter', sans-serif"
                        }}
                    />

                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                        <button style={{
                            display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 20px',
                            background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px',
                            fontSize: '13px', fontWeight: '600', color: '#64748b', cursor: 'pointer'
                        }}>
                            <RefreshCw size={16} />Regenerate
                        </button>
                        <div style={{ display: 'flex', gap: '12px' }}>
                            <button style={{
                                padding: '12px 24px', background: '#f0f9ff', border: '1px solid #bae6fd',
                                borderRadius: '8px', fontSize: '13px', fontWeight: '600', color: '#0369a1', cursor: 'pointer'
                            }}>Save Draft</button>
                            <button style={{
                                display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px',
                                background: 'linear-gradient(135deg, #0c4a6e, #0369a1)', border: 'none',
                                borderRadius: '8px', fontSize: '13px', fontWeight: '600', color: 'white', cursor: 'pointer'
                            }}>
                                <Send size={16} />Send to Review
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SARDraftPage;
