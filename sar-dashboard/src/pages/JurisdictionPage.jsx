import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';
import { Save, Globe, Building, FileText } from 'lucide-react';

const countries = ['United States', 'United Kingdom', 'Australia', 'Canada', 'Singapore', 'India'];
const banks = ['First National Bank', 'Pacific Trust Corp', 'Global Commerce Bank', 'Atlantic Financial Group'];
const formats = ['NCA SAR (UK)', 'FinCEN SAR (US)', 'AUSTRAC IFTI (AU)', 'FINTRAC STR (CA)'];

const requiredFields = [
    { field: 'Subject Name', required: true },
    { field: 'Subject NI Number/ID', required: true },
    { field: 'Account Number', required: true },
    { field: 'Transaction Amount', required: true },
    { field: 'Date Range of Activity', required: true },
    { field: 'Filing Institution', required: true },
    { field: 'Suspicious Activity Description', required: true },
    { field: 'Counterparty Information', required: false },
    { field: 'Law Enforcement Contact', required: false },
];

const JurisdictionPage = () => {
    const [selectedCountry, setSelectedCountry] = useState('United Kingdom');
    const [selectedBank, setSelectedBank] = useState('Barclays');
    const [selectedFormat, setSelectedFormat] = useState('NCA SAR (UK)');
    const [template, setTemplate] = useState(
        `SECTION A — SUBJECT INFORMATION
[SUBJECT_NAME]
[SUBJECT_ID]
[ACCOUNT_NUMBERS]

SECTION B — SUSPICIOUS ACTIVITY INFORMATION
Activity Date Range: [START_DATE] to [END_DATE]
Total Amount: [TOTAL_AMOUNT]
Type of Suspicious Activity: [TYPOLOGY]

SECTION C — NARRATIVE
[AI_GENERATED_NARRATIVE]

SECTION D — FILING INSTITUTION
[INSTITUTION_NAME]
[INSTITUTION_ID]
Filing Date: [FILING_DATE]`
    );

    return (
        <>
            <PageHeader
                title="Template & Regulatory Settings"
                subtitle="Configure jurisdiction-specific SAR templates and regulatory requirements"
                actions={
                    <button style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 20px', background: '#0c4a6e', border: 'none', borderRadius: '8px', cursor: 'pointer', color: 'white', fontSize: '13px', fontWeight: '600' }}>
                        <Save size={14} />Save Settings
                    </button>
                }
            />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
                {/* Selectors */}
                <div style={{ background: 'white', padding: '28px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                    <div style={{ fontSize: '16px', fontWeight: '700', color: '#0c4a6e', marginBottom: '24px' }}>Regulatory Configuration</div>

                    {[
                        { label: 'Institution', icon: Building, options: banks, value: selectedBank, onChange: setSelectedBank },
                        { label: 'Jurisdiction', icon: Globe, options: countries, value: selectedCountry, onChange: setSelectedCountry },
                        { label: 'SAR Format', icon: FileText, options: formats, value: selectedFormat, onChange: setSelectedFormat },
                    ].map((s, i) => {
                        const Icon = s.icon;
                        return (
                            <div key={i} style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: '600', color: '#1e293b', marginBottom: '8px' }}>
                                    <Icon size={16} color="#0c4a6e" />{s.label}
                                </label>
                                <select value={s.value} onChange={e => s.onChange(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '14px', color: '#1e293b', cursor: 'pointer' }}>
                                    {s.options.map((o, j) => <option key={j}>{o}</option>)}
                                </select>
                            </div>
                        );
                    })}
                </div>

                {/* Required Fields */}
                <div style={{ background: 'white', padding: '28px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                    <div style={{ fontSize: '16px', fontWeight: '700', color: '#0c4a6e', marginBottom: '24px' }}>Required Field Checklist</div>
                    {requiredFields.map((f, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f1f5f9' }}>
                            <span style={{ fontSize: '14px', color: '#1e293b' }}>{f.field}</span>
                            <span style={{
                                padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: '600',
                                background: f.required ? '#fef2f2' : '#f0fdf4',
                                color: f.required ? '#dc2626' : '#16a34a'
                            }}>
                                {f.required ? 'Required' : 'Optional'}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Template Editor */}
            <div style={{ background: 'white', padding: '28px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                <div style={{ fontSize: '16px', fontWeight: '700', color: '#0c4a6e', marginBottom: '8px' }}>SAR Template Editor</div>
                <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '16px' }}>Template for: {selectedFormat}</div>
                <textarea
                    value={template}
                    onChange={e => setTemplate(e.target.value)}
                    style={{
                        width: '100%', minHeight: '300px', padding: '16px', borderRadius: '8px',
                        border: '1px solid #e2e8f0', fontFamily: 'monospace', fontSize: '13px',
                        lineHeight: '1.7', color: '#1e293b', resize: 'vertical'
                    }}
                />
            </div>
        </>
    );
};

export default JurisdictionPage;
