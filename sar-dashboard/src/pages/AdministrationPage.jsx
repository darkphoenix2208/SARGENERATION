import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';
import TabPage from '../components/TabPage';
import DataTable from '../components/DataTable';
import FilterBar from '../components/FilterBar';
import { Users, ShieldCheck, ScrollText, Settings, Plus, X } from 'lucide-react';

/* ─── TAB 1: Users ─── */
const users = [
    { name: 'Jane Davidson', email: 'jane.d@bank.com', role: 'Senior Analyst', dept: 'AML Compliance', status: 'Active', last: '2 min ago' },
    { name: 'Mike Reynolds', email: 'mike.r@bank.com', role: 'Analyst', dept: 'AML Compliance', status: 'Active', last: '15 min ago' },
    { name: 'Sarah Kim', email: 'sarah.k@bank.com', role: 'Compliance Officer', dept: 'Legal', status: 'Active', last: '1 hr ago' },
    { name: 'David Chen', email: 'david.c@bank.com', role: 'ML Engineer', dept: 'AI/ML', status: 'Active', last: '3 hrs ago' },
    { name: 'Lisa Park', email: 'lisa.p@bank.com', role: 'Auditor', dept: 'Internal Audit', status: 'Inactive', last: '2 days ago' },
];

const UsersTab = () => {
    const [showModal, setShowModal] = useState(false);
    const columns = [
        {
            key: 'name', header: 'Name', render: (v, row) => (
                <div><div style={{ fontWeight: '600', color: '#1e293b' }}>{v}</div><div style={{ fontSize: '12px', color: '#94a3b8' }}>{row.email}</div></div>
            )
        },
        { key: 'role', header: 'Role', render: (v) => <span style={{ padding: '4px 10px', background: '#f0f9ff', color: '#0369a1', borderRadius: '6px', fontSize: '12px', fontWeight: '600' }}>{v}</span> },
        { key: 'dept', header: 'Department' },
        { key: 'status', header: 'Status', render: (v) => <span style={{ padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: '600', background: v === 'Active' ? '#f0fdf4' : '#f1f5f9', color: v === 'Active' ? '#16a34a' : '#94a3b8' }}>{v}</span> },
        { key: 'last', header: 'Last Active' },
    ];

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
                <button onClick={() => setShowModal(true)} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', background: '#0c4a6e', color: 'white', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}><Plus size={16} />Add User</button>
            </div>
            <DataTable columns={columns} data={users} />
            {showModal && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
                    <div style={{ background: 'white', borderRadius: '16px', padding: '32px', width: '450px', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
                            <span style={{ fontSize: '18px', fontWeight: '700', color: '#0c4a6e' }}>Add New User</span>
                            <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}><X size={20} /></button>
                        </div>
                        {['Full Name', 'Email', 'Department'].map((f, i) => (
                            <div key={i} style={{ marginBottom: '16px' }}>
                                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '6px' }}>{f}</label>
                                <input style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '14px', boxSizing: 'border-box' }} />
                            </div>
                        ))}
                        <div style={{ marginBottom: '24px' }}>
                            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '6px' }}>Role</label>
                            <select style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '14px' }}>
                                <option>Analyst</option><option>Senior Analyst</option><option>Compliance Officer</option><option>ML Engineer</option><option>Auditor</option><option>Admin</option>
                            </select>
                        </div>
                        <button style={{ width: '100%', padding: '12px', background: '#0c4a6e', color: 'white', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>Create User</button>
                    </div>
                </div>
            )}
        </>
    );
};

/* ─── TAB 2: Roles & Permissions ─── */
const roles = ['Analyst', 'Senior Analyst', 'Compliance Officer', 'Admin'];
const perms = [
    { name: 'View Cases', vals: [true, true, true, true] },
    { name: 'Edit Cases', vals: [true, true, true, true] },
    { name: 'Approve SARs', vals: [false, true, true, true] },
    { name: 'File SARs', vals: [false, false, true, true] },
    { name: 'Configure Rules', vals: [false, false, true, true] },
    { name: 'Manage Users', vals: [false, false, false, true] },
    { name: 'View Audit Logs', vals: [false, true, true, true] },
    { name: 'Model Management', vals: [false, false, false, true] },
];

const RolesTab = () => (
    <div style={{ background: 'white', padding: '28px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
        <div style={{ fontSize: '16px', fontWeight: '700', color: '#0c4a6e', marginBottom: '24px' }}>Permission Matrix</div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
                <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
                    <th style={{ textAlign: 'left', padding: '12px', fontSize: '13px', fontWeight: '700', color: '#475569' }}>Permission</th>
                    {roles.map(r => <th key={r} style={{ textAlign: 'center', padding: '12px', fontSize: '13px', fontWeight: '700', color: '#0c4a6e' }}>{r}</th>)}
                </tr>
            </thead>
            <tbody>
                {perms.map((p, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '12px', fontSize: '13px', fontWeight: '600', color: '#1e293b' }}>{p.name}</td>
                        {p.vals.map((v, j) => (
                            <td key={j} style={{ textAlign: 'center', padding: '12px' }}>
                                <span style={{ fontSize: '16px', color: v ? '#16a34a' : '#e2e8f0' }}>{v ? '✓' : '✕'}</span>
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

/* ─── TAB 3: Access Logs ─── */
const accessLogs = [
    { user: 'Jane Davidson', action: 'Viewed case CSE-4521', ip: '192.168.1.45', time: '14:32:18', risk: 'Low' },
    { user: 'Mike Reynolds', action: 'Exported SAR archive CSV', ip: '192.168.1.67', time: '14:28:05', risk: 'Medium' },
    { user: 'Sarah Kim', action: 'Approved SAR-1847', ip: '10.0.0.23', time: '13:45:22', risk: 'Low' },
    { user: 'David Chen', action: 'Updated ML model weights', ip: '10.0.0.88', time: '13:12:10', risk: 'High' },
    { user: 'Lisa Park', action: 'Failed login attempt (3rd)', ip: '203.45.67.89', time: '12:58:33', risk: 'Critical' },
    { user: 'Jane Davidson', action: 'Modified rule threshold', ip: '192.168.1.45', time: '12:45:00', risk: 'Medium' },
];
const riskC = { Low: '#16a34a', Medium: '#eab308', High: '#ea580c', Critical: '#dc2626' };

const AccessLogsTab = () => (
    <div style={{ background: 'white', padding: '28px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
        <div style={{ fontSize: '16px', fontWeight: '700', color: '#0c4a6e', marginBottom: '20px' }}>Recent Access Activity</div>
        {accessLogs.map((l, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px', borderBottom: '1px solid #f1f5f9' }}>
                <div><div style={{ fontSize: '13px', fontWeight: '600', color: '#1e293b' }}>{l.user}</div><div style={{ fontSize: '12px', color: '#64748b' }}>{l.action}</div></div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <span style={{ fontSize: '12px', color: '#94a3b8', fontFamily: 'monospace' }}>{l.ip}</span>
                    <span style={{ fontSize: '12px', color: '#64748b' }}>{l.time}</span>
                    <span style={{ padding: '3px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: '700', background: `${riskC[l.risk]}15`, color: riskC[l.risk] }}>{l.risk}</span>
                </div>
            </div>
        ))}
    </div>
);

/* ─── TAB 4: System Settings ─── */
const SettingsTab = () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        <div style={{ background: 'white', padding: '28px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
            <div style={{ fontSize: '16px', fontWeight: '700', color: '#0c4a6e', marginBottom: '24px' }}>Jurisdiction Settings</div>
            {[{ l: 'Bank Name', v: 'Barclays' }, { l: 'Country', v: 'United Kingdom' }, { l: 'Regulator', v: 'NCA' }, { l: 'SAR Format', v: 'UK SAR Filing' }].map((s, i) => (
                <div key={i} style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '6px' }}>{s.l}</label>
                    <input defaultValue={s.v} style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '14px', boxSizing: 'border-box' }} />
                </div>
            ))}
        </div>
        <div style={{ background: 'white', padding: '28px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
            <div style={{ fontSize: '16px', fontWeight: '700', color: '#0c4a6e', marginBottom: '24px' }}>System Preferences</div>
            {[{ l: 'Auto-assign cases', v: true }, { l: 'Email notifications', v: true }, { l: 'AI narrative generation', v: true }, { l: 'Dark mode', v: false }, { l: 'Two-factor authentication', v: true }].map((s, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #f1f5f9' }}>
                    <span style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b' }}>{s.l}</span>
                    <div style={{ width: '44px', height: '24px', borderRadius: '12px', background: s.v ? '#0c4a6e' : '#e2e8f0', position: 'relative', cursor: 'pointer' }}>
                        <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: 'white', position: 'absolute', top: '3px', left: s.v ? '23px' : '3px', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
                    </div>
                </div>
            ))}
            <button style={{ width: '100%', padding: '12px', background: '#0c4a6e', color: 'white', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', marginTop: '20px' }}>Save Settings</button>
        </div>
    </div>
);

const AdministrationPage = () => (
    <>
        <PageHeader title="Administration" subtitle="User management, roles, access control, and system configuration" />
        <TabPage tabs={[
            { label: 'Users', icon: Users, content: <UsersTab /> },
            { label: 'Roles & Permissions', icon: ShieldCheck, content: <RolesTab /> },
            { label: 'Access Logs', icon: ScrollText, content: <AccessLogsTab /> },
            { label: 'System Settings', icon: Settings, content: <SettingsTab /> },
        ]} />
    </>
);

export default AdministrationPage;
