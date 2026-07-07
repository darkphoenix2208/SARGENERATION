import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';
import DataTable from '../components/DataTable';
import { UserPlus, X } from 'lucide-react';

const usersData = [
    { name: 'Jane Davidson', email: 'jane.d@bank.com', role: 'Analyst', status: 'Active', lastLogin: '5 min ago' },
    { name: 'Mike Roberts', email: 'mike.r@bank.com', role: 'Analyst', status: 'Active', lastLogin: '1 hr ago' },
    { name: 'Sarah Kim', email: 'sarah.k@bank.com', role: 'Reviewer', status: 'Active', lastLogin: '2 hrs ago' },
    { name: 'David Chen', email: 'david.c@bank.com', role: 'Admin', status: 'Active', lastLogin: '30 min ago' },
    { name: 'Emma Wilson', email: 'emma.w@bank.com', role: 'Auditor', status: 'Inactive', lastLogin: '3 days ago' },
    { name: 'James Lee', email: 'james.l@bank.com', role: 'Analyst', status: 'Active', lastLogin: '4 hrs ago' },
];

const roles = ['Analyst', 'Reviewer', 'Admin', 'Auditor'];
const permissions = [
    { action: 'View Cases', Analyst: true, Reviewer: true, Admin: true, Auditor: true },
    { action: 'Create SAR', Analyst: true, Reviewer: true, Admin: true, Auditor: false },
    { action: 'Approve SAR', Analyst: false, Reviewer: true, Admin: true, Auditor: false },
    { action: 'Edit Rules', Analyst: false, Reviewer: false, Admin: true, Auditor: false },
    { action: 'Manage Users', Analyst: false, Reviewer: false, Admin: true, Auditor: false },
    { action: 'View Audit Logs', Analyst: false, Reviewer: true, Admin: true, Auditor: true },
    { action: 'Export Data', Analyst: true, Reviewer: true, Admin: true, Auditor: true },
    { action: 'Delete Records', Analyst: false, Reviewer: false, Admin: true, Auditor: false },
];

const UserManagementPage = () => {
    const [showModal, setShowModal] = useState(false);

    const columns = [
        { key: 'name', header: 'Name', render: (v) => <span style={{ fontWeight: '600', color: '#1e293b' }}>{v}</span> },
        { key: 'email', header: 'Email', render: (v) => <span style={{ color: '#64748b' }}>{v}</span> },
        {
            key: 'role', header: 'Role', render: (v) => (
                <select defaultValue={v} style={{ padding: '4px 8px', borderRadius: '6px', border: '1px solid #e2e8f0', fontSize: '13px', color: '#0c4a6e', fontWeight: '600', cursor: 'pointer' }}>
                    {roles.map(r => <option key={r}>{r}</option>)}
                </select>
            )
        },
        {
            key: 'status', header: 'Status', render: (v) => (
                <span style={{ padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: '600', background: v === 'Active' ? '#f0fdf4' : '#f1f5f9', color: v === 'Active' ? '#16a34a' : '#94a3b8' }}>{v}</span>
            )
        },
        { key: 'lastLogin', header: 'Last Login' },
    ];

    return (
        <>
            <PageHeader
                title="User & Access Control"
                subtitle="Manage users, roles, and permissions for the SAR platform"
                actions={
                    <button onClick={() => setShowModal(true)} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 20px', background: '#0c4a6e', border: 'none', borderRadius: '8px', cursor: 'pointer', color: 'white', fontSize: '13px', fontWeight: '600' }}>
                        <UserPlus size={14} />Add User
                    </button>
                }
            />

            <DataTable columns={columns} data={usersData} />

            {/* Permission Matrix */}
            <div style={{ background: 'white', padding: '28px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', marginTop: '24px' }}>
                <div style={{ fontSize: '16px', fontWeight: '700', color: '#0c4a6e', marginBottom: '20px' }}>Permissions Matrix</div>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
                            <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Action</th>
                            {roles.map(r => <th key={r} style={{ padding: '12px 16px', textAlign: 'center', fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>{r}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {permissions.map((p, i) => (
                            <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                <td style={{ padding: '12px 16px', fontSize: '13px', fontWeight: '500', color: '#1e293b' }}>{p.action}</td>
                                {roles.map(r => (
                                    <td key={r} style={{ padding: '12px 16px', textAlign: 'center' }}>
                                        <div style={{
                                            width: '20px', height: '20px', borderRadius: '4px', margin: '0 auto',
                                            background: p[r] ? '#16a34a' : '#e2e8f0',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            color: 'white', fontSize: '12px'
                                        }}>
                                            {p[r] ? '✓' : ''}
                                        </div>
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Add User Modal */}
            {showModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 3000 }}>
                    <div style={{ background: 'white', padding: '32px', borderRadius: '16px', width: '440px', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
                            <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#0c4a6e' }}>Add New User</h3>
                            <button onClick={() => setShowModal(false)} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}><X size={20} color="#64748b" /></button>
                        </div>
                        {['Full Name', 'Email Address'].map((label, i) => (
                            <div key={i} style={{ marginBottom: '16px' }}>
                                <label style={{ fontSize: '13px', fontWeight: '600', color: '#1e293b', display: 'block', marginBottom: '6px' }}>{label}</label>
                                <input style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '14px' }} />
                            </div>
                        ))}
                        <div style={{ marginBottom: '24px' }}>
                            <label style={{ fontSize: '13px', fontWeight: '600', color: '#1e293b', display: 'block', marginBottom: '6px' }}>Role</label>
                            <select style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '14px' }}>
                                {roles.map(r => <option key={r}>{r}</option>)}
                            </select>
                        </div>
                        <button onClick={() => setShowModal(false)} style={{ width: '100%', padding: '12px', background: '#0c4a6e', color: 'white', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>
                            Add User
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default UserManagementPage;
