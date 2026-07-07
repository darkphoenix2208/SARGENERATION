import React, { useState, useMemo } from 'react';
import { Shield, CheckCircle, AlertTriangle, XCircle, RefreshCw, ChevronDown, ChevronUp, Clock, FileText, DollarSign, MessageSquare, Ban, Type, Calendar } from 'lucide-react';

/* ─── Validation Engine ─── */
const speculativeWords = ['seems', 'probably', 'maybe', 'might', 'could be', 'possibly', 'appears to', 'likely', 'presumably', 'suggest that maybe'];
const prohibitedWords = ['race', 'ethnicity', 'religion', 'nationality', 'gender', 'sexual orientation', 'political affiliation', 'disability'];

const runValidation = (narrativeText) => {
    const text = narrativeText || '';
    const lower = text.toLowerCase();
    const wordCount = text.split(/\s+/).filter(Boolean).length;

    // 1. Mandatory fields check
    const hasSubject = /subject:/i.test(text) || /customer\s*id/i.test(text);
    const hasPeriod = /period|between|from.*to/i.test(text);
    const hasAmount = /\$[\d,]+/i.test(text);
    const mandatoryFieldsOk = hasSubject && hasPeriod && hasAmount;
    const mandatoryMissing = [];
    if (!hasSubject) mandatoryMissing.push('Subject identification');
    if (!hasPeriod) mandatoryMissing.push('Activity period');
    if (!hasAmount) mandatoryMissing.push('Monetary amounts');

    // 2. Timeline present
    const hasTimeline = /january|february|march|april|may|june|july|august|september|october|november|december|\d{4}-\d{2}-\d{2}|\d{1,2}\/\d{1,2}\/\d{2,4}/i.test(text);

    // 3. Monetary values present
    const monetaryMatches = text.match(/\$[\d,]+(?:\.\d{2})?/g) || [];
    const hasMonetary = monetaryMatches.length >= 2;

    // 4. Speculative language scan
    const foundSpeculative = speculativeWords.filter(w => lower.includes(w));
    const noSpeculative = foundSpeculative.length === 0;

    // 5. Prohibited wording scan
    const foundProhibited = prohibitedWords.filter(w => lower.includes(w));
    const noProhibited = foundProhibited.length === 0;

    // 6. Minimum narrative length
    const minLength = wordCount >= 100;

    // 7. Filing deadline risk
    const daysFromDetection = 12; // Mock: 12 days since detection
    const deadlineOk = daysFromDetection <= 25; // 30-day deadline, warn at 25
    const deadlineWarning = daysFromDetection > 20 && daysFromDetection <= 25;

    return [
        {
            id: 'mandatory-fields',
            name: 'Mandatory SAR Fields',
            icon: FileText,
            status: mandatoryFieldsOk ? 'pass' : 'fail',
            message: mandatoryFieldsOk
                ? 'All required fields present (Subject, Period, Amount)'
                : `Missing: ${mandatoryMissing.join(', ')}`,
            detail: 'The NCA requires Subject ID, Activity Period, and Total Amount in every SAR narrative.'
        },
        {
            id: 'timeline',
            name: 'Timeline & Date References',
            icon: Calendar,
            status: hasTimeline ? 'pass' : 'warning',
            message: hasTimeline
                ? 'Timeline with specific dates detected in narrative'
                : 'No specific dates found — add explicit date references',
            detail: 'Regulators expect a clear chronological account with specific dates.'
        },
        {
            id: 'monetary-values',
            name: 'Monetary Values Documented',
            icon: DollarSign,
            status: hasMonetary ? 'pass' : (monetaryMatches.length === 1 ? 'warning' : 'fail'),
            message: hasMonetary
                ? `${monetaryMatches.length} monetary values referenced in narrative`
                : monetaryMatches.length === 1
                    ? 'Only 1 monetary value found — consider adding individual transaction amounts'
                    : 'No monetary amounts found — required for SAR filing',
            detail: 'SAR narratives must include specific monetary amounts for each suspicious transaction pattern.'
        },
        {
            id: 'speculative-language',
            name: 'No Speculative Language',
            icon: MessageSquare,
            status: noSpeculative ? 'pass' : 'warning',
            message: noSpeculative
                ? 'No speculative terms detected (seems, probably, might, etc.)'
                : `Found speculative terms: "${foundSpeculative.join('", "')}"`,
            detail: 'Words like "seems", "probably", "might" weaken the SAR and may trigger regulator rejection.'
        },
        {
            id: 'prohibited-wording',
            name: 'No Prohibited / Discriminatory Wording',
            icon: Ban,
            status: noProhibited ? 'pass' : 'fail',
            message: noProhibited
                ? 'No prohibited or discriminatory language detected'
                : `Found prohibited terms: "${foundProhibited.join('", "')}"`,
            detail: 'SARs must never reference race, ethnicity, religion, gender, or other protected characteristics.'
        },
        {
            id: 'narrative-length',
            name: 'Minimum Narrative Length',
            icon: Type,
            status: minLength ? 'pass' : 'warning',
            message: minLength
                ? `Narrative contains ${wordCount} words (minimum: 100)`
                : `Only ${wordCount} words — minimum recommended is 100 words`,
            detail: 'Short narratives are frequently returned by regulators for insufficient detail.'
        },
        {
            id: 'filing-deadline',
            name: 'Filing Deadline Compliance',
            icon: Clock,
            status: deadlineOk && !deadlineWarning ? 'pass' : deadlineWarning ? 'warning' : 'fail',
            message: deadlineOk
                ? `${daysFromDetection} days since detection (30-day deadline: ${30 - daysFromDetection} days remaining)`
                : `${daysFromDetection} days since detection — approaching 30-day filing deadline!`,
            detail: 'SARs must be filed within 30 days of initial detection. Late filings may result in enforcement action.'
        },
    ];
};

const statusConfig = {
    pass: { color: '#16a34a', bg: '#f0fdf4', border: '#bbf7d0', icon: CheckCircle, label: 'PASS' },
    warning: { color: '#ea580c', bg: '#fff7ed', border: '#fed7aa', icon: AlertTriangle, label: 'WARN' },
    fail: { color: '#dc2626', bg: '#fef2f2', border: '#fecaca', icon: XCircle, label: 'FAIL' },
};

const ComplianceValidator = ({ narrative }) => {
    const [expandedCheck, setExpandedCheck] = useState(null);
    const [validated, setValidated] = useState(true);

    const checks = useMemo(() => runValidation(narrative), [narrative, validated]);

    const passCount = checks.filter(c => c.status === 'pass').length;
    const warnCount = checks.filter(c => c.status === 'warning').length;
    const failCount = checks.filter(c => c.status === 'fail').length;

    const overallStatus = failCount > 0 ? 'fail' : warnCount > 0 ? 'warning' : 'pass';
    const overallConfig = statusConfig[overallStatus];

    return (
        <div style={{ animation: 'fadeIn 0.3s ease forwards' }}>
            {/* Summary Header */}
            <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '20px 24px',
                background: `linear-gradient(135deg, ${overallConfig.bg}, white)`,
                borderRadius: '12px', border: `1px solid ${overallConfig.border}`,
                marginBottom: '20px'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{
                        width: '48px', height: '48px', borderRadius: '12px',
                        background: `${overallConfig.color}15`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                        <Shield size={24} color={overallConfig.color} />
                    </div>
                    <div>
                        <div style={{ fontSize: '18px', fontWeight: '800', color: '#0c4a6e' }}>
                            Pre-Submission Compliance Check
                        </div>
                        <div style={{ fontSize: '13px', color: '#64748b', marginTop: '2px' }}>
                            {passCount}/{checks.length} checks passed
                            {warnCount > 0 && ` · ${warnCount} warning${warnCount > 1 ? 's' : ''}`}
                            {failCount > 0 && ` · ${failCount} failure${failCount > 1 ? 's' : ''}`}
                        </div>
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {/* Overall Status Badge */}
                    <div style={{
                        padding: '6px 16px', borderRadius: '8px',
                        background: overallConfig.bg, border: `1px solid ${overallConfig.border}`,
                        fontSize: '13px', fontWeight: '700', color: overallConfig.color,
                        display: 'flex', alignItems: 'center', gap: '6px'
                    }}>
                        <overallConfig.icon size={15} />
                        {overallStatus === 'pass' ? 'READY TO FILE' : overallStatus === 'warning' ? 'REVIEW NEEDED' : 'NOT READY'}
                    </div>
                    <button
                        onClick={() => setValidated(v => !v)}
                        style={{
                            display: 'flex', alignItems: 'center', gap: '6px',
                            padding: '8px 16px', borderRadius: '8px',
                            background: 'white', border: '1px solid #e2e8f0',
                            cursor: 'pointer', fontSize: '12px', fontWeight: '600',
                            color: '#475569', transition: 'all 0.15s'
                        }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = '#0369a1'; e.currentTarget.style.color = '#0369a1'; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.color = '#475569'; }}
                    >
                        <RefreshCw size={13} />Re-validate
                    </button>
                </div>
            </div>

            {/* Progress Bar */}
            <div style={{
                display: 'flex', height: '6px', borderRadius: '3px',
                overflow: 'hidden', marginBottom: '20px', background: '#f1f5f9'
            }}>
                {passCount > 0 && <div style={{ width: `${(passCount / checks.length) * 100}%`, background: '#16a34a', transition: 'width 0.3s' }} />}
                {warnCount > 0 && <div style={{ width: `${(warnCount / checks.length) * 100}%`, background: '#ea580c', transition: 'width 0.3s' }} />}
                {failCount > 0 && <div style={{ width: `${(failCount / checks.length) * 100}%`, background: '#dc2626', transition: 'width 0.3s' }} />}
            </div>

            {/* Individual Checks */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {checks.map((check, idx) => {
                    const cfg = statusConfig[check.status];
                    const isExpanded = expandedCheck === idx;
                    const CheckIcon = check.icon;

                    return (
                        <div
                            key={check.id}
                            onClick={() => setExpandedCheck(isExpanded ? null : idx)}
                            style={{
                                padding: '14px 18px',
                                borderRadius: '10px',
                                border: `1px solid ${isExpanded ? cfg.border : '#e2e8f0'}`,
                                background: isExpanded ? cfg.bg : 'white',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease'
                            }}
                            onMouseEnter={e => {
                                if (!isExpanded) {
                                    e.currentTarget.style.borderColor = '#cbd5e1';
                                    e.currentTarget.style.background = '#fafbfc';
                                }
                            }}
                            onMouseLeave={e => {
                                if (!isExpanded) {
                                    e.currentTarget.style.borderColor = '#e2e8f0';
                                    e.currentTarget.style.background = 'white';
                                }
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                {/* Status Icon */}
                                <div style={{
                                    width: '32px', height: '32px', borderRadius: '8px',
                                    background: `${cfg.color}12`,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    flexShrink: 0
                                }}>
                                    <cfg.icon size={16} color={cfg.color} />
                                </div>

                                {/* Check Info */}
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                                        <CheckIcon size={13} color="#64748b" />
                                        <span style={{ fontSize: '13px', fontWeight: '600', color: '#1e293b' }}>{check.name}</span>
                                    </div>
                                    <div style={{ fontSize: '12px', color: '#64748b', lineHeight: '1.5' }}>{check.message}</div>
                                </div>

                                {/* Status Badge */}
                                <span style={{
                                    padding: '3px 10px', borderRadius: '6px',
                                    fontSize: '10px', fontWeight: '800',
                                    background: cfg.bg, color: cfg.color,
                                    border: `1px solid ${cfg.border}`,
                                    letterSpacing: '0.05em', flexShrink: 0
                                }}>{cfg.label}</span>

                                {/* Expand Toggle */}
                                {isExpanded ? <ChevronUp size={14} color="#94a3b8" /> : <ChevronDown size={14} color="#94a3b8" />}
                            </div>

                            {/* Expanded Detail */}
                            {isExpanded && (
                                <div style={{
                                    marginTop: '12px', paddingTop: '12px',
                                    borderTop: `1px solid ${cfg.border}`,
                                    fontSize: '12px', color: '#475569', lineHeight: '1.6',
                                    display: 'flex', alignItems: 'flex-start', gap: '8px'
                                }}>
                                    <Shield size={13} color={cfg.color} style={{ marginTop: '2px', flexShrink: 0 }} />
                                    <span>{check.detail}</span>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ComplianceValidator;
