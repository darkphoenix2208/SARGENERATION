import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import DataTable from '../components/DataTable';
import FilterBar from '../components/FilterBar';
import { RefreshCw, Bell } from 'lucide-react';

const alerts = [
    { id: 'ALT-2847', customer: 'Mikhail Petrov', riskScore: 94, rules: 'Funnel + Velocity', status: 'New', typology: 'Funnel Accounts' },
    { id: 'ALT-2846', customer: 'Bella Trading LLC', riskScore: 88, rules: 'Structuring Pattern', status: 'New', typology: 'Structuring' },
    { id: 'ALT-2845', customer: 'James Worthington', riskScore: 76, rules: 'Geo-Risk + Volume', status: 'Under Review', typology: 'Geo-Risk' },
    { id: 'ALT-2844', customer: 'Chen Wei Import Co.', riskScore: 82, rules: 'Counterparty + KYC', status: 'New', typology: 'Mule Network' },
    { id: 'ALT-2843', customer: 'Global Ventures SA', riskScore: 71, rules: 'Velocity + Volume', status: 'Under Review', typology: 'Layering' },
    { id: 'ALT-2842', customer: 'Sarah Mitchell', riskScore: 65, rules: 'Behavioral Anomaly', status: 'Escalated', typology: 'Behavioral' },
    { id: 'ALT-2841', customer: 'Desert Holdings FZE', riskScore: 91, rules: 'Geo-Risk + Funnel', status: 'New', typology: 'Geo-Risk' },
    { id: 'ALT-2840', customer: 'Robert J. Phillips', riskScore: 58, rules: 'KYC Mismatch', status: 'Under Review', typology: 'Behavioral' },
];

const riskColor = (score) => score >= 80 ? 'var(--color-danger)' : score >= 60 ? 'var(--color-warning)' : '#eab308';
const statusBadge = (status) => {
    const colors = {
        'New': { bg: 'var(--color-danger-light)', color: 'var(--color-danger)' },
        'Under Review': { bg: 'var(--color-warning-light)', color: 'var(--color-warning)' },
        'Escalated': { bg: '#fce7f3', color: '#be185d' }
    };
    const c = colors[status] || { bg: 'var(--color-gray-100)', color: 'var(--color-gray-600)' };
    return <span style={{ padding: '3px 10px', borderRadius: 'var(--radius-full)', fontSize: 'var(--font-sm)', fontWeight: '600', background: c.bg, color: c.color }}>{status}</span>;
};

const LiveAlertsPage = () => {
    const [refreshing, setRefreshing] = useState(false);
    const navigate = useNavigate();

    const columns = [
        { key: 'id', header: 'Alert ID', render: (v) => <span style={{ fontWeight: '600', color: 'var(--color-primary-700)' }}>{v}</span> },
        { key: 'customer', header: 'Customer Name' },
        {
            key: 'riskScore', header: 'Risk Score', render: (v) => (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{
                        width: '36px', height: '6px', borderRadius: 'var(--radius-full)',
                        background: 'var(--color-gray-200)', overflow: 'hidden'
                    }}>
                        <div style={{
                            height: '100%', width: `${v}%`,
                            background: riskColor(v), borderRadius: 'var(--radius-full)',
                            transition: 'width 0.5s ease'
                        }} />
                    </div>
                    <span style={{ fontWeight: '700', color: riskColor(v), fontSize: 'var(--font-base)' }}>{v}</span>
                </div>
            )
        },
        { key: 'rules', header: 'Triggered Rules', render: (v) => <span style={{ fontSize: 'var(--font-base)', color: 'var(--color-gray-500)' }}>{v}</span> },
        { key: 'typology', header: 'Typology', render: (v) => <span className="badge badge-info">{v}</span> },
        { key: 'status', header: 'Status', render: (v) => statusBadge(v) },
        {
            key: 'action', header: 'Action', render: (_, row) => (
                <button className="btn btn-primary" style={{ padding: '5px 12px', fontSize: 'var(--font-sm)' }}
                    onClick={() => navigate('/cases', { state: { openCustomer: row.customer } })}
                >
                    Open Case
                </button>
            )
        }
    ];

    return (
        <>
            <PageHeader
                title="Live Suspicious Alerts"
                subtitle="Real-time monitoring of flagged suspicious activity"
                actions={
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{
                            display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px',
                            background: 'var(--color-success-light)', borderRadius: 'var(--radius-md)',
                            border: '1px solid #bbf7d0'
                        }}>
                            <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--color-success)', animation: 'pulse 2s infinite' }} />
                            <span style={{ fontSize: 'var(--font-sm)', fontWeight: '600', color: 'var(--color-success)' }}>Auto-refresh ON</span>
                        </div>
                        <button
                            onClick={() => { setRefreshing(true); setTimeout(() => setRefreshing(false), 1000); }}
                            className="btn btn-secondary"
                            style={{ padding: '6px 12px' }}
                        >
                            <RefreshCw size={14} style={{ animation: refreshing ? 'spin 1s linear infinite' : 'none' }} />
                            <span style={{ fontSize: 'var(--font-sm)' }}>Refresh</span>
                        </button>
                    </div>
                }
            />
            <FilterBar
                searchPlaceholder="Search alerts by ID or customer..."
                onSearch={() => { }}
                filters={[
                    { label: 'Risk Level', options: ['High (80+)', 'Medium (60-79)', 'Low (<60)'] },
                    { label: 'Date Range', options: ['Today', 'Last 7 Days', 'Last 30 Days'] },
                    { label: 'Typology', options: ['Funnel Accounts', 'Structuring', 'Mule Network', 'Geo-Risk', 'Layering'] }
                ]}
            />
            <DataTable columns={columns} data={alerts} />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </>
    );
};

export default LiveAlertsPage;
