import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';
import KPICard from '../components/KPICard';
import PageHeader from '../components/PageHeader';
import { Clock, FileText, AlertTriangle, TrendingUp, LayoutDashboard, Layers, CheckCircle2, Timer } from 'lucide-react';

const DashboardPage = () => {
    const statusData = [
        { status: 'New', cases: 156, fill: '#0c4a6e' },
        { status: 'Under Review', cases: 342, fill: '#0369a1' },
        { status: 'Escalated', cases: 89, fill: '#ea580c' },
        { status: 'SAR Filed', cases: 156, fill: '#16a34a' }
    ];

    const timeSeriesData = [
        { week: 'Week 1', opened: 245, resolved: 198 },
        { week: 'Week 2', opened: 289, resolved: 234 },
        { week: 'Week 3', opened: 312, resolved: 267 },
        { week: 'Week 4', opened: 298, resolved: 289 },
        { week: 'Week 5', opened: 267, resolved: 256 },
        { week: 'Week 6', opened: 284, resolved: 278 }
    ];

    const typologyData = [
        { name: 'Funnel Accounts', cases: 342, percentage: 85 },
        { name: 'Mule Activity', cases: 278, percentage: 68 },
        { name: 'Structuring', cases: 189, percentage: 47 },
        { name: 'Geo-Risk', cases: 156, percentage: 39 },
        { name: 'Behavioral Anomalies', cases: 124, percentage: 31 }
    ];

    const quickActions = [
        { label: 'Create New SAR', icon: FileText, color: 'var(--color-primary-900)' },
        { label: 'Review Pending', icon: Clock, color: 'var(--color-warning)' },
        { label: 'Escalated Cases', icon: AlertTriangle, color: 'var(--color-danger)' },
        { label: 'View Trends', icon: TrendingUp, color: 'var(--color-success)' },
    ];

    const recentActivity = [
        { action: 'SAR #1847 filed', user: 'Jane D.', time: '5 min ago', type: 'success' },
        { action: 'Case #2341 escalated', user: 'Mike R.', time: '12 min ago', type: 'warning' },
        { action: 'New alert: Funnel pattern', user: 'System', time: '18 min ago', type: 'alert' },
        { action: 'SAR #1845 approved', user: 'Sarah K.', time: '25 min ago', type: 'success' },
        { action: 'Risk score recalculated', user: 'ML Engine', time: '32 min ago', type: 'info' },
        { action: 'Case #2338 assigned', user: 'Admin', time: '45 min ago', type: 'info' },
    ];

    const ChartTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div style={{
                    background: 'var(--color-gray-950)', padding: '12px 16px',
                    borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-lg)'
                }}>
                    <p style={{ color: 'white', fontWeight: '600', marginBottom: '6px', fontSize: 'var(--font-base)' }}>{label}</p>
                    {payload.map((e, i) => (
                        <p key={i} style={{ color: e.color, fontSize: 'var(--font-sm)', margin: '3px 0' }}>{e.name}: <strong>{e.value}</strong></p>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <>
            <PageHeader
                title="Case Statistics & Health"
                subtitle="Real-time overview of suspicious activity monitoring and compliance workflows"
            />

            {/* KPI Cards — with icons and accent colors */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '28px' }}>
                <KPICard label="Avg Open Cases/Day" value="47" change="↓ 12% vs last week" changeType="positive" badge="Optimized" icon={Timer} accentColor="var(--color-primary-700)" />
                <KPICard label="Total Opened Cases" value="1,284" change="↑ 8% vs last month" changeType="negative" badge="Active" icon={Layers} accentColor="var(--color-warning)" />
                <KPICard label="SAR Filed (30 days)" value="156" change="↑ 4% efficiency" changeType="positive" badge="On Track" icon={FileText} accentColor="var(--color-success)" />
                <KPICard label="Avg Resolution Time" value="3.2d" change="↓ 18% improvement" changeType="positive" badge="Excellent" icon={CheckCircle2} accentColor="var(--color-purple)" />
            </div>

            {/* Quick Actions + Recent Activity */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '28px' }}>
                <div className="card" style={{ padding: '24px' }}>
                    <div style={{ fontSize: 'var(--font-lg)', fontWeight: '700', color: 'var(--color-gray-900)', marginBottom: '16px' }}>Quick Actions</div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                        {quickActions.map((a, i) => {
                            const Icon = a.icon;
                            return (
                                <button key={i} style={{
                                    display: 'flex', alignItems: 'center', gap: '10px', padding: '14px',
                                    background: 'var(--surface-inset)', border: '1px solid var(--color-gray-200)',
                                    borderRadius: 'var(--radius-md)', cursor: 'pointer', transition: 'all var(--transition-fast)'
                                }}
                                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-primary-700)'; e.currentTarget.style.background = 'var(--color-primary-50)'; }}
                                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-gray-200)'; e.currentTarget.style.background = 'var(--surface-inset)'; }}
                                >
                                    <div style={{
                                        width: '32px', height: '32px', borderRadius: 'var(--radius-sm)',
                                        background: `${a.color}12`, display: 'flex', alignItems: 'center', justifyContent: 'center'
                                    }}>
                                        <Icon size={16} color={a.color} />
                                    </div>
                                    <span style={{ fontSize: 'var(--font-base)', fontWeight: '600', color: 'var(--color-gray-800)' }}>{a.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="card" style={{ padding: '24px' }}>
                    <div style={{ fontSize: 'var(--font-lg)', fontWeight: '700', color: 'var(--color-gray-900)', marginBottom: '16px' }}>Recent Activity</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                        {recentActivity.map((a, i) => (
                            <div key={i} style={{
                                display: 'flex', alignItems: 'center', gap: '12px',
                                padding: '10px 0',
                                borderBottom: i < recentActivity.length - 1 ? '1px solid var(--color-gray-100)' : 'none'
                            }}>
                                <div style={{
                                    width: '8px', height: '8px', borderRadius: '50%', flexShrink: 0,
                                    background: a.type === 'success' ? 'var(--color-success)' : a.type === 'warning' ? 'var(--color-warning)' : a.type === 'alert' ? 'var(--color-danger)' : 'var(--color-gray-400)'
                                }} />
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <span style={{ fontSize: 'var(--font-base)', fontWeight: '600', color: 'var(--color-gray-800)' }}>{a.action}</span>
                                    <span style={{ fontSize: 'var(--font-sm)', color: 'var(--color-gray-400)', marginLeft: '6px' }}>by {a.user}</span>
                                </div>
                                <span style={{ fontSize: 'var(--font-sm)', color: 'var(--color-gray-400)', whiteSpace: 'nowrap' }}>{a.time}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Charts */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '28px' }}>
                <div className="card" style={{ padding: '24px' }}>
                    <div style={{ fontSize: 'var(--font-lg)', fontWeight: '700', color: 'var(--color-gray-900)', marginBottom: '2px' }}>Open Cases by Status</div>
                    <div style={{ fontSize: 'var(--font-base)', color: 'var(--color-gray-500)', marginBottom: '20px' }}>Current distribution across workflow stages</div>
                    <ResponsiveContainer width="100%" height={260}>
                        <BarChart data={statusData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-gray-100)" />
                            <XAxis type="number" stroke="var(--color-gray-400)" style={{ fontSize: '12px' }} />
                            <YAxis dataKey="status" type="category" stroke="var(--color-gray-400)" style={{ fontSize: '12px', fontWeight: '600' }} width={100} />
                            <Tooltip content={<ChartTooltip />} />
                            <Bar dataKey="cases" radius={[0, 6, 6, 0]} fill="var(--color-primary-900)" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="card" style={{ padding: '24px' }}>
                    <div style={{ fontSize: 'var(--font-lg)', fontWeight: '700', color: 'var(--color-gray-900)', marginBottom: '2px' }}>Case Count Over Time</div>
                    <div style={{ fontSize: 'var(--font-base)', color: 'var(--color-gray-500)', marginBottom: '20px' }}>30-day trend analysis</div>
                    <ResponsiveContainer width="100%" height={260}>
                        <AreaChart data={timeSeriesData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="cO" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#0c4a6e" stopOpacity={0.3} /><stop offset="95%" stopColor="#0c4a6e" stopOpacity={0} /></linearGradient>
                                <linearGradient id="cR" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#16a34a" stopOpacity={0.3} /><stop offset="95%" stopColor="#16a34a" stopOpacity={0} /></linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-gray-100)" />
                            <XAxis dataKey="week" stroke="var(--color-gray-400)" style={{ fontSize: '12px' }} />
                            <YAxis stroke="var(--color-gray-400)" style={{ fontSize: '12px' }} />
                            <Tooltip content={<ChartTooltip />} />
                            <Legend wrapperStyle={{ fontSize: '12px', fontWeight: '600' }} iconType="circle" />
                            <Area type="monotone" dataKey="opened" stroke="#0c4a6e" strokeWidth={2.5} fillOpacity={1} fill="url(#cO)" name="Cases Opened" dot={{ fill: '#0c4a6e', strokeWidth: 2, r: 3.5, stroke: '#fff' }} />
                            <Area type="monotone" dataKey="resolved" stroke="#16a34a" strokeWidth={2.5} fillOpacity={1} fill="url(#cR)" name="Cases Resolved" dot={{ fill: '#16a34a', strokeWidth: 2, r: 3.5, stroke: '#fff' }} />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Typology Breakdown */}
            <div className="card" style={{ padding: '24px' }}>
                <div style={{ fontSize: 'var(--font-lg)', fontWeight: '700', color: 'var(--color-gray-900)', marginBottom: '2px' }}>Case Breakdown by Typology</div>
                <div style={{ fontSize: 'var(--font-base)', color: 'var(--color-gray-500)', marginBottom: '20px' }}>Distribution of suspicious activity patterns</div>
                {typologyData.map((item, i) => (
                    <div key={i} style={{ marginBottom: '16px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                            <span style={{ fontSize: 'var(--font-md)', fontWeight: '600', color: 'var(--color-gray-800)' }}>{item.name}</span>
                            <span style={{ fontSize: 'var(--font-md)', fontWeight: '700', color: 'var(--color-primary-900)' }}>{item.cases} cases</span>
                        </div>
                        <div style={{ height: '8px', background: 'var(--color-gray-200)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                            <div style={{
                                height: '100%', width: `${item.percentage}%`,
                                background: 'linear-gradient(90deg, var(--color-primary-900), var(--color-primary-700))',
                                borderRadius: 'var(--radius-full)', transition: 'width 1s ease-out'
                            }} />
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default DashboardPage;
