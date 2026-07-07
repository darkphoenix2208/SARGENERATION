import React from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import PageHeader from '../components/PageHeader';
import KPICard from '../components/KPICard';
import { BarChart3 } from 'lucide-react';

const filingTrends = [
    { month: 'Sep', filed: 112, drafted: 145 },
    { month: 'Oct', filed: 128, drafted: 168 },
    { month: 'Nov', filed: 134, drafted: 172 },
    { month: 'Dec', filed: 148, drafted: 185 },
    { month: 'Jan', filed: 156, drafted: 198 },
    { month: 'Feb', filed: 142, drafted: 178 },
];

const resolutionTime = [
    { month: 'Sep', days: 5.2 }, { month: 'Oct', days: 4.8 }, { month: 'Nov', days: 4.3 },
    { month: 'Dec', days: 3.9 }, { month: 'Jan', days: 3.5 }, { month: 'Feb', days: 3.2 },
];

const topTypologies = [
    { name: 'Funnel', value: 342 }, { name: 'Structuring', value: 278 },
    { name: 'Mule Network', value: 189 }, { name: 'Geo-Risk', value: 156 },
    { name: 'Behavioral', value: 124 },
];
const COLORS = ['#0c4a6e', '#0369a1', '#0ea5e9', '#38bdf8', '#7dd3fc'];

const geoRisk = [
    { country: 'Russia', score: 92, cases: 47 },
    { country: 'Iran', score: 89, cases: 31 },
    { country: 'North Korea', score: 95, cases: 12 },
    { country: 'Myanmar', score: 78, cases: 23 },
    { country: 'UAE', score: 65, cases: 89 },
    { country: 'Panama', score: 72, cases: 56 },
    { country: 'Cayman Islands', score: 68, cases: 42 },
];

const AnalyticsPage = () => (
    <>
        <PageHeader title="Operational Intelligence" subtitle="Comprehensive analytics and performance metrics for AML operations" />

        {/* KPIs */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '32px' }}>
            <KPICard label="SARs Filed (6mo)" value="820" change="↑ 12% vs prior period" changeType="positive" />
            <KPICard label="Avg Resolution" value="3.2d" change="↓ 38% improvement" changeType="positive" />
            <KPICard label="AI Draft Accept Rate" value="87%" change="↑ 5% vs last month" changeType="positive" />
            <KPICard label="False Positive Rate" value="12%" change="↓ 3% reduction" changeType="positive" />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
            {/* SAR Filing Trends */}
            <div style={{ background: 'white', padding: '28px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                <div style={{ fontSize: '16px', fontWeight: '700', color: '#0c4a6e', marginBottom: '24px' }}>SAR Filing Trends</div>
                <ResponsiveContainer width="100%" height={280}>
                    <BarChart data={filingTrends}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                        <XAxis dataKey="month" stroke="#64748b" style={{ fontSize: '12px' }} />
                        <YAxis stroke="#64748b" style={{ fontSize: '12px' }} />
                        <Tooltip />
                        <Legend wrapperStyle={{ fontSize: '12px' }} iconType="circle" />
                        <Bar dataKey="drafted" fill="#bae6fd" name="Drafted" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="filed" fill="#0c4a6e" name="Filed" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Avg Resolution Time */}
            <div style={{ background: 'white', padding: '28px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                <div style={{ fontSize: '16px', fontWeight: '700', color: '#0c4a6e', marginBottom: '24px' }}>Average Resolution Time (Days)</div>
                <ResponsiveContainer width="100%" height={280}>
                    <LineChart data={resolutionTime}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                        <XAxis dataKey="month" stroke="#64748b" style={{ fontSize: '12px' }} />
                        <YAxis stroke="#64748b" style={{ fontSize: '12px' }} />
                        <Tooltip />
                        <Line type="monotone" dataKey="days" stroke="#16a34a" strokeWidth={3} dot={{ fill: '#16a34a', r: 5, stroke: '#fff', strokeWidth: 2 }} name="Days" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            {/* Top Typologies */}
            <div style={{ background: 'white', padding: '28px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                <div style={{ fontSize: '16px', fontWeight: '700', color: '#0c4a6e', marginBottom: '24px' }}>Top Typologies</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
                    <ResponsiveContainer width="50%" height={220}>
                        <PieChart>
                            <Pie data={topTypologies} cx="50%" cy="50%" innerRadius={55} outerRadius={90} paddingAngle={3} dataKey="value">
                                {topTypologies.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                    <div>
                        {topTypologies.map((t, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                                <div style={{ width: '10px', height: '10px', borderRadius: '2px', background: COLORS[i] }} />
                                <span style={{ fontSize: '13px', color: '#1e293b' }}>{t.name}</span>
                                <span style={{ fontSize: '13px', fontWeight: '700', color: '#0c4a6e', marginLeft: 'auto' }}>{t.value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Geographic Risk Map (table representation) */}
            <div style={{ background: 'white', padding: '28px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                <div style={{ fontSize: '16px', fontWeight: '700', color: '#0c4a6e', marginBottom: '24px' }}>Geographic Risk Overview</div>
                {geoRisk.map((g, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 0', borderBottom: '1px solid #f1f5f9' }}>
                        <span style={{ fontSize: '13px', fontWeight: '600', color: '#1e293b', width: '120px' }}>{g.country}</span>
                        <div style={{ flex: 1, height: '8px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                            <div style={{ height: '100%', width: `${g.score}%`, background: g.score >= 85 ? '#dc2626' : g.score >= 70 ? '#ea580c' : '#eab308', borderRadius: '4px' }} />
                        </div>
                        <span style={{ fontSize: '13px', fontWeight: '700', color: g.score >= 85 ? '#dc2626' : '#ea580c', width: '40px', textAlign: 'right' }}>{g.score}</span>
                        <span style={{ fontSize: '12px', color: '#64748b', width: '60px', textAlign: 'right' }}>{g.cases} cases</span>
                    </div>
                ))}
            </div>
        </div>
    </>
);

export default AnalyticsPage;
