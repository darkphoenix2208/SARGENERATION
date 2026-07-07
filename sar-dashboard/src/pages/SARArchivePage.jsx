import React from 'react';
import PageHeader from '../components/PageHeader';
import DataTable from '../components/DataTable';
import FilterBar from '../components/FilterBar';
import { Download, FileDown } from 'lucide-react';

const filedSARs = [
    { id: 'SAR-1847', customer: 'Mikhail Petrov', risk: 94, typology: 'Layering + Structuring', filedDate: '2026-02-10', regulator: 'NCA', status: 'Filed' },
    { id: 'SAR-1846', customer: 'Bella Trading LLC', risk: 88, typology: 'Structuring', filedDate: '2026-02-09', regulator: 'NCA', status: 'Filed' },
    { id: 'SAR-1845', customer: 'Global Ventures SA', risk: 82, typology: 'Layering', filedDate: '2026-02-08', regulator: 'AUSTRAC', status: 'Filed' },
    { id: 'SAR-1844', customer: 'Desert Holdings FZE', risk: 91, typology: 'Geo-Risk', filedDate: '2026-02-07', regulator: 'NCA', status: 'Filed' },
    { id: 'SAR-1843', customer: 'Chen Wei Import Co.', risk: 76, typology: 'Mule Network', filedDate: '2026-02-06', regulator: 'NCA (UK)', status: 'Filed' },
    { id: 'SAR-1842', customer: 'James Worthington', risk: 71, typology: 'Behavioral', filedDate: '2026-02-05', regulator: 'NCA', status: 'Filed' },
    { id: 'SAR-1841', customer: 'Horizon Payments Ltd', risk: 85, typology: 'Funnel Accounts', filedDate: '2026-02-04', regulator: 'NCA', status: 'Filed' },
    { id: 'SAR-1840', customer: 'Sarah Mitchell', risk: 65, typology: 'Structuring', filedDate: '2026-02-03', regulator: 'AUSTRAC', status: 'Filed' },
];

const SARArchivePage = () => {
    const columns = [
        { key: 'id', header: 'SAR ID', render: (v) => <span style={{ fontWeight: '600', color: '#0369a1' }}>{v}</span> },
        { key: 'customer', header: 'Customer' },
        { key: 'risk', header: 'Risk Score', render: (v) => <span style={{ fontWeight: '700', color: v >= 80 ? '#dc2626' : '#ea580c' }}>{v}</span> },
        { key: 'typology', header: 'Typology', render: (v) => <span style={{ padding: '4px 8px', background: '#f0f9ff', color: '#0369a1', borderRadius: '4px', fontSize: '12px', fontWeight: '600' }}>{v}</span> },
        { key: 'filedDate', header: 'Filing Date' },
        { key: 'regulator', header: 'Regulator', render: (v) => <span style={{ padding: '4px 8px', background: '#f1f5f9', color: '#475569', borderRadius: '4px', fontSize: '12px', fontWeight: '600' }}>{v}</span> },
        {
            key: 'actions', header: 'Actions', render: (_, row) => (
                <div style={{ display: 'flex', gap: '8px' }}>
                    <button style={{ padding: '6px 10px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#475569' }}>
                        <Download size={12} />PDF
                    </button>
                    <button style={{ padding: '6px 10px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#475569' }}>
                        <FileDown size={12} />XML
                    </button>
                </div>
            )
        }
    ];

    return (
        <>
            <PageHeader
                title="SAR Archive"
                subtitle="Access and download all filed Suspicious Activity Reports"
                actions={
                    <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', background: 'white', border: '1px solid #e2e8f0', borderRadius: '8px', cursor: 'pointer', color: '#475569', fontSize: '13px', fontWeight: '600' }}>
                        <FileDown size={16} />Export CSV
                    </button>
                }
            />
            <FilterBar
                searchPlaceholder="Search by SAR ID, customer, or typology..."
                onSearch={() => { }}
                filters={[
                    { label: 'Regulator', options: ['NCA', 'AUSTRAC', 'NCA (UK)'] },
                    { label: 'Date Range', options: ['Last 7 Days', 'Last 30 Days', 'Last 90 Days', 'This Year'] },
                    { label: 'Typology', options: ['Funnel Accounts', 'Structuring', 'Mule Network', 'Geo-Risk', 'Layering'] },
                ]}
            />
            <DataTable columns={columns} data={filedSARs} />
        </>
    );
};

export default SARArchivePage;
