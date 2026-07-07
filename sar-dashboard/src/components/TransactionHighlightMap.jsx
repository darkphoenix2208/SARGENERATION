import React, { useState } from 'react';
import { Link2, Hash, Zap, ChevronDown, ChevronUp, ArrowRight, Eye, EyeOff } from 'lucide-react';

/* ─── Mock Data: Sentence → Transaction + Rule Mappings ─── */
const sentenceMappings = [
    {
        sentence: "The institution identified activity giving rise to suspicion of potential money laundering involving the above-referenced customer through its automated transaction monitoring system.",
        rules: [
            { id: 'RULE-001', name: 'Automated Alert Trigger', weight: 0.95 },
        ],
        typologies: ['System-Generated Alert'],
        transactions: [
            { id: 'TXN-1001', date: '2026-01-15', amount: '£12,400', counterparty: 'Incoming Wire — System Flag', type: 'Alert Trigger', confidence: 95 },
        ],
    },
    {
        sentence: "Between 15 January 2026 and 10 February 2026, the customer's account received 23 incoming wire transfers totalling £245,300.00 from 8 distinct counterparties.",
        rules: [
            { id: 'RULE-012', name: 'Layering Pattern', weight: 0.92 },
            { id: 'RULE-018', name: 'Volume Threshold Breach', weight: 0.88 },
        ],
        typologies: ['Layering', 'High Volume'],
        transactions: [
            { id: 'TXN-1002', date: '2026-01-15', amount: '£18,200', counterparty: 'Bella Trading LLC', type: 'Wire In', confidence: 94 },
            { id: 'TXN-1003', date: '2026-01-18', amount: '£9,800', counterparty: 'Global Ventures SA', type: 'Wire In', confidence: 91 },
            { id: 'TXN-1004', date: '2026-01-22', amount: '£14,500', counterparty: 'Desert Holdings FZE', type: 'Wire In', confidence: 93 },
            { id: 'TXN-1005', date: '2026-01-25', amount: '£22,100', counterparty: 'Chen Wei Import Co.', type: 'Wire In', confidence: 88 },
            { id: 'TXN-1006', date: '2026-01-28', amount: '£31,400', counterparty: 'Shell Corp A (BVI)', type: 'Wire In', confidence: 96 },
            { id: 'TXN-1007', date: '2026-02-01', amount: '£15,800', counterparty: 'Meridian Partners', type: 'Wire In', confidence: 85 },
        ],
    },
    {
        sentence: "Multiple incoming transfers from eight distinct counterparties with no identifiable commercial relationship to the customer based on available KYC information were consolidated and rapidly disbursed to two offshore accounts within 24-48 hours of receipt.",
        rules: [
            { id: 'RULE-012', name: 'Layering Pattern', weight: 0.92 },
            { id: 'RULE-025', name: 'Rapid Disbursement Detection', weight: 0.89 },
        ],
        typologies: ['Layering'],
        transactions: [
            { id: 'TXN-1008', date: '2026-01-16', amount: '£17,800', counterparty: 'Offshore Bank 1 (Cayman)', type: 'Wire Out', confidence: 94 },
            { id: 'TXN-1009', date: '2026-01-23', amount: '£14,200', counterparty: 'Offshore Bank 2 (Dubai)', type: 'Wire Out', confidence: 91 },
            { id: 'TXN-1010', date: '2026-02-02', amount: '£28,500', counterparty: 'Offshore Bank 1 (Cayman)', type: 'Wire Out', confidence: 96 },
        ],
    },
    {
        sentence: "Seven cash deposits were made in amounts ranging from £8,500 to £9,800, consistent with possible structuring to avoid reporting thresholds.",
        rules: [
            { id: 'RULE-007', name: 'Structuring Detection', weight: 0.97 },
            { id: 'RULE-008', name: 'Threshold Avoidance Pattern', weight: 0.94 },
        ],
        typologies: ['Structuring'],
        transactions: [
            { id: 'TXN-1011', date: '2026-01-20', amount: '£9,800', counterparty: 'Cash Deposit — Branch #42', type: 'Cash In', confidence: 97 },
            { id: 'TXN-1012', date: '2026-01-21', amount: '£9,500', counterparty: 'Cash Deposit — Branch #42', type: 'Cash In', confidence: 96 },
            { id: 'TXN-1013', date: '2026-01-24', amount: '£8,900', counterparty: 'Cash Deposit — Branch #18', type: 'Cash In', confidence: 95 },
            { id: 'TXN-1014', date: '2026-01-26', amount: '£9,200', counterparty: 'Cash Deposit — Branch #42', type: 'Cash In', confidence: 97 },
            { id: 'TXN-1015', date: '2026-01-29', amount: '£8,500', counterparty: 'Cash Deposit — ATM #7', type: 'Cash In', confidence: 93 },
            { id: 'TXN-1016', date: '2026-02-03', amount: '£9,700', counterparty: 'Cash Deposit — Branch #18', type: 'Cash In', confidence: 96 },
            { id: 'TXN-1017', date: '2026-02-05', amount: '£9,100', counterparty: 'Cash Deposit — Branch #42', type: 'Cash In', confidence: 94 },
        ],
    },
    {
        sentence: "Outbound wire transfers were directed to entities in jurisdictions identified as high-risk by FATF, including two beneficiary entities incorporated in jurisdictions recognised as high-risk or non-cooperative by FATF.",
        rules: [
            { id: 'RULE-031', name: 'FATF High-Risk Jurisdiction', weight: 0.91 },
            { id: 'RULE-033', name: 'Cross-Border Wire Alert', weight: 0.85 },
        ],
        typologies: ['Geographic Risk'],
        transactions: [
            { id: 'TXN-1018', date: '2026-02-06', amount: '£42,000', counterparty: 'Dubai Holdings FZE (UAE)', type: 'Wire Out', confidence: 92 },
            { id: 'TXN-1019', date: '2026-02-08', amount: '£38,500', counterparty: 'Vanuatu Trading Corp', type: 'Wire Out', confidence: 89 },
        ],
    },
    {
        sentence: "The transaction velocity increased by 340% compared to the customer's 12-month historical average.",
        rules: [
            { id: 'RULE-041', name: 'Velocity Anomaly Detection', weight: 0.93 },
        ],
        typologies: ['Behavioral Anomaly'],
        transactions: [
            { id: 'TXN-1020', date: '2026-01-15', amount: '—', counterparty: 'Velocity baseline: 4 txn/month → 23 txn/month', type: 'Analytics', confidence: 93 },
        ],
    },
];

const confidenceColor = (val) => {
    if (val >= 90) return '#16a34a';
    if (val >= 75) return '#ea580c';
    return '#dc2626';
};

const TransactionHighlightMap = ({ narrative, onNarrativeChange }) => {
    const [selectedSentence, setSelectedSentence] = useState(null);
    const [showTransactions, setShowTransactions] = useState(true);
    const [isEditing, setIsEditing] = useState(false);

    const handleSentenceClick = (index) => {
        setSelectedSentence(selectedSentence === index ? null : index);
    };

    const mapping = selectedSentence !== null ? sentenceMappings[selectedSentence] : null;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                        width: '32px', height: '32px', borderRadius: '8px',
                        background: 'linear-gradient(135deg, #7c3aed, #6366f1)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                        <Link2 size={16} color="white" />
                    </div>
                    <div>
                        <div style={{ fontSize: '15px', fontWeight: '700', color: '#0c4a6e' }}>Narrative ↔ Data Traceability</div>
                        <div style={{ fontSize: '11px', color: '#94a3b8' }}>Click any statement to trace supporting evidence</div>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                        onClick={() => setIsEditing(!isEditing)}
                        style={{
                            display: 'flex', alignItems: 'center', gap: '6px',
                            padding: '6px 14px', borderRadius: '6px', border: '1px solid #e2e8f0',
                            background: isEditing ? '#fef2f2' : '#f8fafc', cursor: 'pointer',
                            fontSize: '12px', fontWeight: '600',
                            color: isEditing ? '#dc2626' : '#64748b'
                        }}
                    >
                        {isEditing ? <EyeOff size={13} /> : <Eye size={13} />}
                        {isEditing ? 'Exit Edit' : 'Edit Mode'}
                    </button>
                </div>
            </div>

            {/* Narrative Sentences - Clickable */}
            {isEditing ? (
                <textarea
                    value={narrative}
                    onChange={e => onNarrativeChange(e.target.value)}
                    style={{
                        flex: 1, minHeight: '280px', padding: '20px', borderRadius: '8px',
                        border: '1px solid #e2e8f0', fontSize: '13px', lineHeight: '1.8',
                        color: '#1e293b', resize: 'vertical', fontFamily: "'Inter', sans-serif"
                    }}
                />
            ) : (
                <div style={{
                    flex: 1, minHeight: '280px', padding: '20px', borderRadius: '8px',
                    border: '1px solid #e2e8f0', background: '#fafbfc', overflowY: 'auto'
                }}>
                    {narrative.split('\n\n').map((paragraph, idx) => {
                        const trimmed = paragraph.trim();
                        if (!trimmed) return null;

                        /* Check if this paragraph matches any sentenceMapping */
                        const mappingIndex = sentenceMappings.findIndex(m => trimmed.includes(m.sentence) || m.sentence.includes(trimmed));
                        const isClickable = mappingIndex !== -1;
                        const isHeader = trimmed === trimmed.toUpperCase() || trimmed.endsWith(':');

                        return (
                            <div
                                key={idx}
                                onClick={() => isClickable && handleSentenceClick(mappingIndex)}
                                style={{
                                    padding: '10px 14px',
                                    marginBottom: isHeader ? '4px' : '8px',
                                    marginTop: isHeader && idx > 0 ? '12px' : '0',
                                    borderRadius: '8px',
                                    borderLeft: isClickable && selectedSentence === mappingIndex ? '3px solid #7c3aed' : '3px solid transparent',
                                    background: isClickable && selectedSentence === mappingIndex
                                        ? 'linear-gradient(135deg, rgba(124,58,237,0.06), rgba(99,102,241,0.04))'
                                        : 'transparent',
                                    cursor: isClickable ? 'pointer' : 'default',
                                    transition: 'all 0.2s ease',
                                    position: 'relative'
                                }}
                                onMouseEnter={e => {
                                    if (isClickable && selectedSentence !== mappingIndex) {
                                        e.currentTarget.style.background = 'rgba(124,58,237,0.03)';
                                        e.currentTarget.style.borderLeftColor = '#c4b5fd';
                                    }
                                }}
                                onMouseLeave={e => {
                                    if (isClickable && selectedSentence !== mappingIndex) {
                                        e.currentTarget.style.background = 'transparent';
                                        e.currentTarget.style.borderLeftColor = 'transparent';
                                    }
                                }}
                            >
                                <p style={{
                                    fontSize: isHeader ? '14px' : '13px', lineHeight: '1.8',
                                    color: '#1e293b', margin: 0,
                                    fontWeight: isHeader ? '700' : '400',
                                    whiteSpace: 'pre-line',
                                    textTransform: trimmed === trimmed.toUpperCase() ? 'uppercase' : 'none',
                                    letterSpacing: trimmed === trimmed.toUpperCase() ? '0.05em' : 'normal'
                                }}>
                                    {trimmed}
                                </p>
                                {isClickable && selectedSentence === mappingIndex && (
                                    <div style={{ display: 'flex', gap: '6px', marginTop: '8px', flexWrap: 'wrap' }}>
                                        {sentenceMappings[mappingIndex].typologies.map((t, i) => (
                                            <span key={i} style={{
                                                padding: '2px 8px', borderRadius: '4px',
                                                fontSize: '10px', fontWeight: '700',
                                                background: '#f5f3ff', color: '#7c3aed',
                                                letterSpacing: '0.02em'
                                            }}>{t}</span>
                                        ))}
                                        <span style={{
                                            padding: '2px 8px', borderRadius: '4px',
                                            fontSize: '10px', fontWeight: '600',
                                            background: '#f0f9ff', color: '#0369a1'
                                        }}>
                                            {sentenceMappings[mappingIndex].transactions.length} transaction{sentenceMappings[mappingIndex].transactions.length > 1 ? 's' : ''}
                                        </span>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Transaction Evidence Panel */}
            {mapping && (
                <div style={{
                    marginTop: '16px',
                    animation: 'fadeIn 0.25s ease forwards'
                }}>
                    {/* Rules & Confidence */}
                    <div style={{
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        marginBottom: '12px'
                    }}>
                        <button
                            onClick={() => setShowTransactions(!showTransactions)}
                            style={{
                                display: 'flex', alignItems: 'center', gap: '8px',
                                background: 'none', border: 'none', cursor: 'pointer',
                                fontSize: '13px', fontWeight: '700', color: '#0c4a6e', padding: 0
                            }}
                        >
                            {showTransactions ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                            Traceability Evidence ({mapping.transactions.length} transactions, {mapping.rules.length} rules)
                        </button>
                    </div>

                    {showTransactions && (
                        <>
                            {/* Rule Details */}
                            <div style={{
                                display: 'flex', gap: '10px', marginBottom: '12px', flexWrap: 'wrap'
                            }}>
                                {mapping.rules.map((rule, i) => (
                                    <div key={i} style={{
                                        display: 'flex', alignItems: 'center', gap: '8px',
                                        padding: '8px 14px', borderRadius: '8px',
                                        background: '#f8fafc', border: '1px solid #e2e8f0'
                                    }}>
                                        <Hash size={13} color="#7c3aed" />
                                        <span style={{ fontSize: '12px', fontWeight: '600', color: '#475569' }}>{rule.id}</span>
                                        <span style={{ fontSize: '11px', color: '#94a3b8' }}>|</span>
                                        <span style={{ fontSize: '12px', color: '#64748b' }}>{rule.name}</span>
                                        <span style={{ fontSize: '11px', color: '#94a3b8' }}>|</span>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            <Zap size={11} color="#ea580c" />
                                            <span style={{ fontSize: '11px', fontWeight: '700', color: '#ea580c' }}>
                                                {Math.round(rule.weight * 100)}%
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Transaction Table */}
                            <div style={{
                                borderRadius: '8px', border: '1px solid #e2e8f0',
                                overflow: 'hidden'
                            }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                    <thead>
                                        <tr style={{ background: '#f8fafc' }}>
                                            {['ID', 'Date', 'Amount', 'Counterparty', 'Type', 'Confidence'].map(h => (
                                                <th key={h} style={{
                                                    padding: '10px 14px', textAlign: 'left',
                                                    fontSize: '11px', fontWeight: '700',
                                                    color: '#94a3b8', textTransform: 'uppercase',
                                                    letterSpacing: '0.05em',
                                                    borderBottom: '1px solid #e2e8f0'
                                                }}>{h}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {mapping.transactions.map((txn, i) => (
                                            <tr key={i} style={{
                                                background: i % 2 === 0 ? 'white' : '#fafbfc',
                                                transition: 'background 0.15s'
                                            }}
                                                onMouseEnter={e => e.currentTarget.style.background = 'rgba(124,58,237,0.04)'}
                                                onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? 'white' : '#fafbfc'}
                                            >
                                                <td style={{ padding: '10px 14px', fontSize: '12px', fontWeight: '600', color: '#7c3aed' }}>{txn.id}</td>
                                                <td style={{ padding: '10px 14px', fontSize: '12px', color: '#475569' }}>{txn.date}</td>
                                                <td style={{ padding: '10px 14px', fontSize: '12px', fontWeight: '700', color: '#1e293b' }}>{txn.amount}</td>
                                                <td style={{ padding: '10px 14px', fontSize: '12px', color: '#475569' }}>{txn.counterparty}</td>
                                                <td style={{ padding: '10px 14px' }}>
                                                    <span style={{
                                                        padding: '2px 8px', borderRadius: '4px',
                                                        fontSize: '11px', fontWeight: '600',
                                                        background: txn.type.includes('Out') ? '#fef2f2' :
                                                            txn.type.includes('Cash') ? '#fff7ed' : '#f0f9ff',
                                                        color: txn.type.includes('Out') ? '#dc2626' :
                                                            txn.type.includes('Cash') ? '#ea580c' : '#0369a1'
                                                    }}>{txn.type}</span>
                                                </td>
                                                <td style={{ padding: '10px 14px' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                        <div style={{
                                                            width: '40px', height: '4px', borderRadius: '2px',
                                                            background: '#e2e8f0', overflow: 'hidden'
                                                        }}>
                                                            <div style={{
                                                                width: `${txn.confidence}%`, height: '100%',
                                                                borderRadius: '2px',
                                                                background: confidenceColor(txn.confidence)
                                                            }} />
                                                        </div>
                                                        <span style={{
                                                            fontSize: '11px', fontWeight: '700',
                                                            color: confidenceColor(txn.confidence)
                                                        }}>{txn.confidence}%</span>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Traceability Chain */}
                            <div style={{
                                display: 'flex', alignItems: 'center', gap: '8px',
                                marginTop: '12px', padding: '10px 14px',
                                background: 'linear-gradient(135deg, rgba(124,58,237,0.04), rgba(99,102,241,0.03))',
                                borderRadius: '8px', border: '1px solid rgba(124,58,237,0.1)'
                            }}>
                                <span style={{ fontSize: '11px', fontWeight: '700', color: '#7c3aed' }}>TRACEABILITY CHAIN:</span>
                                <span style={{ fontSize: '11px', color: '#475569' }}>Narrative Statement</span>
                                <ArrowRight size={12} color="#94a3b8" />
                                <span style={{ fontSize: '11px', color: '#475569' }}>{mapping.rules.map(r => r.id).join(', ')}</span>
                                <ArrowRight size={12} color="#94a3b8" />
                                <span style={{ fontSize: '11px', color: '#475569' }}>{mapping.transactions.length} Supporting Transactions</span>
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default TransactionHighlightMap;
