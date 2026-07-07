import React, { useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';
import {
    LayoutDashboard,
    Bell,
    Briefcase,
    AlertTriangle,
    Search,
    BrainCircuit,
    Network,
    ScanEye,
    FileText,
    Users,
    CheckCircle,
    Archive,
    History,
    ShieldCheck,
    FileSearch,
    ScrollText,
    GitBranch,
    Settings,
    Sliders,
    Scale,
    LayoutTemplate,
    Globe,
    UserCog,
    Shield,
    Lock,
    BarChart3,
    TrendingUp,
    Map,
    Activity,
    Zap,
    ChevronLeft,
    ChevronRight,
    Moon,
    MessageSquare,
    Plus,
    LogOut
} from 'lucide-react';

const SARDashboard = () => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [activeItem, setActiveItem] = useState('Dashboard');

    // Sidebar Navigation Data
    const navigation = [
        {
            section: 'Dashboard & Overview',
            items: [
                { name: 'Dashboard', icon: <LayoutDashboard size={20} /> },
                { name: 'Live Alerts', icon: <Bell size={20} />, badge: '3' },
                { name: 'Case Queue', icon: <Briefcase size={20} /> },
                { name: 'Escalated Cases', icon: <AlertTriangle size={20} /> },
            ]
        },
        {
            section: 'Investigation & Intelligence',
            items: [
                { name: 'Case Explorer', icon: <Search size={20} /> },
                { name: 'Risk Scoring Engine', icon: <BrainCircuit size={20} />, ai: true },
                { name: 'Typology Detection', icon: <ScanEye size={20} />, ai: true },
                { name: 'Network Analysis', icon: <Network size={20} />, ai: true },
                { name: 'Suspicious Monitor', icon: <Activity size={20} /> },
            ]
        },
        {
            section: 'SAR Workflow',
            items: [
                { name: 'Draft SAR Generator', icon: <FileText size={20} />, ai: true },
                { name: 'Human Review Panel', icon: <Users size={20} /> },
                { name: 'SAR Approval Queue', icon: <CheckCircle size={20} /> },
                { name: 'Filed SAR Archive', icon: <Archive size={20} /> },
                { name: 'SAR History Search', icon: <History size={20} /> },
            ]
        },
        {
            section: 'Explainability & Audit',
            items: [
                { name: 'Audit Trail Viewer', icon: <ShieldCheck size={20} /> },
                { name: 'Explainability', icon: <FileSearch size={20} /> },
                { name: 'Rule Trigger Logs', icon: <ScrollText size={20} /> },
                { name: 'Model Version Logs', icon: <GitBranch size={20} /> },
            ]
        },
        {
            section: 'Configuration',
            items: [
                { name: 'Rule Configuration', icon: <Settings size={20} /> },
                { name: 'Threshold Settings', icon: <Sliders size={20} /> },
                { name: 'Typology Weights', icon: <Scale size={20} /> },
                { name: 'Template Manager', icon: <LayoutTemplate size={20} /> },
                { name: 'Jurisdiction Settings', icon: <Globe size={20} /> },
            ]
        },
        {
            section: 'User & Access Control',
            items: [
                { name: 'User Management', icon: <UserCog size={20} /> },
                { name: 'Role-Based Access', icon: <Shield size={20} /> },
                { name: 'Access Logs', icon: <Lock size={20} /> },
            ]
        },
        {
            section: 'Analytics & Insights',
            items: [
                { name: 'Performance', icon: <BarChart3 size={20} /> },
                { name: 'SAR Trends', icon: <TrendingUp size={20} /> },
                { name: 'Geographic Risk', icon: <Map size={20} /> },
                { name: 'Efficiency Metrics', icon: <Zap size={20} /> },
            ]
        }
    ];

    // Data for status chart
    const statusData = [
        { status: 'New', cases: 156, color: '#0c4a6e' },
        { status: 'Under Review', cases: 342, color: '#0369a1' },
        { status: 'Escalated', cases: 89, color: '#ea580c' },
        { status: 'SAR Filed', cases: 156, color: '#16a34a' }
    ];

    // Data for time series chart
    const timeSeriesData = [
        { week: 'Week 1', opened: 245, resolved: 198 },
        { week: 'Week 2', opened: 289, resolved: 234 },
        { week: 'Week 3', opened: 312, resolved: 267 },
        { week: 'Week 4', opened: 298, resolved: 289 },
        { week: 'Week 5', opened: 267, resolved: 256 },
        { week: 'Week 6', opened: 284, resolved: 278 }
    ];

    // Typology data
    const typologyData = [
        { name: 'Funnel Accounts', cases: 342, percentage: 85 },
        { name: 'Mule Activity', cases: 278, percentage: 68 },
        { name: 'Structuring', cases: 189, percentage: 47 },
        { name: 'Geo-Risk', cases: 156, percentage: 39 },
        { name: 'Behavioral Anomalies', cases: 124, percentage: 31 }
    ];

    // Custom tooltip for charts
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div style={{
                    background: 'rgba(0, 0, 0, 0.9)',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    border: 'none'
                }}>
                    <p style={{ color: 'white', fontWeight: '600', marginBottom: '8px', fontSize: '13px' }}>
                        {label}
                    </p>
                    {payload.map((entry, index) => (
                        <p key={index} style={{ color: entry.color, fontSize: '13px', margin: '4px 0' }}>
                            {entry.name}: <strong>{entry.value}</strong>
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh', fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", background: '#f5f7fa' }}>

            {/* Sidebar Navigation */}
            <aside style={{
                width: isSidebarCollapsed ? '80px' : '280px',
                background: '#ffffff',
                borderRight: '1px solid #e2e8f0',
                display: 'flex',
                flexDirection: 'column',
                position: 'fixed',
                height: '100vh',
                transition: 'width 0.3s ease',
                zIndex: 1000,
                boxShadow: '4px 0 24px rgba(0,0,0,0.02)'
            }}>
                {/* Sidebar Header */}
                <div style={{
                    height: '72px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: isSidebarCollapsed ? 'center' : 'space-between',
                    padding: isSidebarCollapsed ? '0' : '0 24px',
                    borderBottom: '1px solid #f1f5f9'
                }}>
                    {!isSidebarCollapsed && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '18px', fontWeight: '700', color: '#0c4a6e' }}>
                            <div style={{
                                width: '32px',
                                height: '32px',
                                background: 'linear-gradient(135deg, #0c4a6e 0%, #0369a1 100%)',
                                borderRadius: '8px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontWeight: '700',
                                fontSize: '16px'
                            }}>S</div>
                            <span>SAR Platform</span>
                        </div>
                    )}
                    {isSidebarCollapsed && (
                        <div style={{
                            width: '32px',
                            height: '32px',
                            background: 'linear-gradient(135deg, #0c4a6e 0%, #0369a1 100%)',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontWeight: '700',
                            fontSize: '16px'
                        }}>S</div>
                    )}

                    <button
                        onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                        style={{
                            background: '#f8fafc',
                            border: '1px solid #e2e8f0',
                            borderRadius: '6px',
                            padding: '4px',
                            cursor: 'pointer',
                            color: '#64748b',
                            display: isSidebarCollapsed ? 'none' : 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <ChevronLeft size={16} />
                    </button>
                </div>

                {/* Sidebar Content */}
                <div style={{ flex: 1, overflowY: 'auto', padding: '16px 0' }}>
                    {navigation.map((section, idx) => (
                        <div key={idx} style={{ marginBottom: '24px' }}>
                            {!isSidebarCollapsed && (
                                <div style={{
                                    padding: '0 24px',
                                    marginBottom: '8px',
                                    fontSize: '11px',
                                    fontWeight: '700',
                                    color: '#94a3b8',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px'
                                }}>
                                    {section.section}
                                </div>
                            )}
                            {isSidebarCollapsed && (
                                <div style={{
                                    height: '1px',
                                    background: '#f1f5f9',
                                    margin: '16px 24px'
                                }} />
                            )}

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                {section.items.map((item, itemIdx) => (
                                    <button
                                        key={itemIdx}
                                        onClick={() => setActiveItem(item.name)}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '12px',
                                            padding: isSidebarCollapsed ? '12px 0' : '10px 24px',
                                            justifyContent: isSidebarCollapsed ? 'center' : 'flex-start',
                                            width: '100%',
                                            background: activeItem === item.name ? '#f0f9ff' : 'transparent',
                                            border: 'none',
                                            borderRight: activeItem === item.name ? '3px solid #0369a1' : '3px solid transparent',
                                            cursor: 'pointer',
                                            color: activeItem === item.name ? '#0369a1' : '#64748b',
                                            transition: 'all 0.2s',
                                            position: 'relative'
                                        }}
                                        title={isSidebarCollapsed ? item.name : ''}
                                    >
                                        <div style={{ position: 'relative' }}>
                                            {item.icon}
                                            {item.ai && (
                                                <span style={{
                                                    position: 'absolute',
                                                    top: '-4px',
                                                    right: '-4px',
                                                    width: '8px',
                                                    height: '8px',
                                                    background: '#8b5cf6',
                                                    borderRadius: '50%',
                                                    border: '2px solid white'
                                                }} />
                                            )}
                                        </div>

                                        {!isSidebarCollapsed && (
                                            <span style={{ fontSize: '14px', fontWeight: activeItem === item.name ? '600' : '500' }}>
                                                {item.name}
                                            </span>
                                        )}

                                        {!isSidebarCollapsed && item.badge && (
                                            <span style={{
                                                marginLeft: 'auto',
                                                background: '#ef4444',
                                                color: 'white',
                                                fontSize: '10px',
                                                fontWeight: '700',
                                                padding: '2px 6px',
                                                borderRadius: '10px'
                                            }}>
                                                {item.badge}
                                            </span>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Sidebar Footer */}
                <div style={{
                    padding: '16px 24px',
                    borderTop: '1px solid #f1f5f9',
                    background: '#f8fafc'
                }}>
                    {!isSidebarCollapsed ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <button style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                                width: '100%',
                                background: '#0c4a6e',
                                color: 'white',
                                border: 'none',
                                padding: '10px',
                                borderRadius: '6px',
                                fontSize: '13px',
                                fontWeight: '600',
                                cursor: 'pointer'
                            }}>
                                <Plus size={16} />
                                <span>Quick SAR</span>
                            </button>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
                                <button style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '8px', background: 'white', border: '1px solid #e2e8f0', padding: '8px', borderRadius: '6px', cursor: 'pointer', color: '#64748b' }}>
                                    <Moon size={16} />
                                    <span style={{ fontSize: '12px' }}>Dark</span>
                                </button>
                                <button style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '8px', background: 'white', border: '1px solid #e2e8f0', padding: '8px', borderRadius: '6px', cursor: 'pointer', color: '#64748b' }}>
                                    <MessageSquare size={16} />
                                    <span style={{ fontSize: '12px' }}>Chat</span>
                                </button>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '16px' }}>
                                <div style={{
                                    width: '32px',
                                    height: '32px',
                                    background: 'linear-gradient(135deg, #0c4a6e 0%, #0369a1 100%)',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white',
                                    fontWeight: '700',
                                    fontSize: '12px'
                                }}>JD</div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: '13px', fontWeight: '700', color: '#0f172a' }}>Jane Davidson</div>
                                    <div style={{ fontSize: '11px', color: '#64748b' }}>Compliance Analyst</div>
                                </div>
                                <LogOut size={16} color="#94a3b8" style={{ cursor: 'pointer' }} />
                            </div>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                            <button style={{
                                width: '32px',
                                height: '32px',
                                background: '#0c4a6e',
                                color: 'white',
                                border: 'none',
                                borderRadius: '6px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer'
                            }}>
                                <Plus size={16} />
                            </button>
                            <div style={{
                                width: '32px',
                                height: '32px',
                                background: 'linear-gradient(135deg, #0c4a6e 0%, #0369a1 100%)',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontWeight: '700',
                                fontSize: '12px',
                                cursor: 'pointer'
                            }}>JD</div>
                        </div>
                    )}
                </div>
            </aside>

            {/* Main Content Area */}
            <div style={{
                flex: 1,
                marginLeft: isSidebarCollapsed ? '80px' : '280px',
                transition: 'margin-left 0.3s ease',
                width: 'calc(100% - 280px)'
            }}>
                {/* Top Header (replacing old nav) */}
                <header style={{
                    height: '72px',
                    background: 'white',
                    borderBottom: '1px solid #e2e8f0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0 48px',
                    position: 'sticky',
                    top: 0,
                    zIndex: 900
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: '#64748b' }}>
                        {/* Global Search could go here */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#f8fafc', padding: '8px 16px', borderRadius: '8px', border: '1px solid #e2e8f0', width: '300px' }}>
                            <Search size={16} />
                            <input
                                type="text"
                                placeholder="Search cases, SARs, or alerts..."
                                style={{ background: 'transparent', border: 'none', outline: 'none', fontSize: '14px', width: '100%' }}
                            />
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                        <button style={{ position: 'relative', background: 'transparent', border: 'none', cursor: 'pointer' }}>
                            <Bell size={20} color="#64748b" />
                            <span style={{ position: 'absolute', top: '-2px', right: '-2px', width: '8px', height: '8px', background: '#ef4444', borderRadius: '50%', border: '2px solid white' }}></span>
                        </button>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <span style={{
                                padding: '6px 14px',
                                borderRadius: '6px',
                                fontSize: '12px',
                                fontWeight: '600',
                                background: '#f0f9ff',
                                color: '#0369a1',
                                border: '1px solid #bae6fd'
                            }}>Compliance Team</span>
                        </div>
                    </div>
                </header>

                {/* Main Dashboard Content */}
                <main style={{ maxWidth: '1600px', margin: '0 auto', padding: '40px 48px' }}>
                    {/* Dashboard Header */}
                    <div style={{ marginBottom: '32px' }}>
                        <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#0c4a6e', marginBottom: '8px' }}>
                            Case Statistics & Health
                        </h1>
                        <p style={{ color: '#64748b', fontSize: '14px' }}>
                            Real-time overview of suspicious activity monitoring and compliance workflows
                        </p>
                    </div>

                    {/* KPI Cards */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: '24px',
                        marginBottom: '32px'
                    }}>
                        <KPICard
                            label="Avg Open Cases/Day"
                            value="47"
                            change="↓ 12% vs last week"
                            changeType="positive"
                            badge="Optimized"
                        />
                        <KPICard
                            label="Total Opened Cases"
                            value="1,284"
                            change="↑ 8% vs last month"
                            changeType="negative"
                            badge="Active"
                        />
                        <KPICard
                            label="SAR Filed (30 days)"
                            value="156"
                            change="↑ 4% efficiency"
                            changeType="positive"
                            badge="On Track"
                        />
                        <KPICard
                            label="Avg Resolution Time"
                            value="3.2d"
                            change="↓ 18% improvement"
                            changeType="positive"
                            badge="Excellent"
                        />
                    </div>

                    {/* Charts Grid */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '24px',
                        marginBottom: '32px'
                    }}>
                        {/* Status Bar Chart */}
                        <div style={{
                            background: 'white',
                            padding: '28px',
                            borderRadius: '12px',
                            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)'
                        }}>
                            <div style={{ marginBottom: '24px' }}>
                                <div style={{ fontSize: '16px', fontWeight: '700', color: '#0c4a6e', marginBottom: '4px' }}>
                                    Open Cases by Status
                                </div>
                                <div style={{ fontSize: '13px', color: '#64748b' }}>
                                    Current distribution across workflow stages
                                </div>
                            </div>
                            <ResponsiveContainer width="100%" height={320}>
                                <BarChart
                                    data={statusData}
                                    layout="vertical"
                                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                                    <XAxis type="number" stroke="#64748b" style={{ fontSize: '12px' }} />
                                    <YAxis
                                        dataKey="status"
                                        type="category"
                                        stroke="#64748b"
                                        style={{ fontSize: '13px', fontWeight: '600' }}
                                        width={120}
                                    />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Bar
                                        dataKey="cases"
                                        radius={[0, 6, 6, 0]}
                                        fill="#0c4a6e"
                                    >
                                        {statusData.map((entry, index) => (
                                            <rect key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Time Series Chart */}
                        <div style={{
                            background: 'white',
                            padding: '28px',
                            borderRadius: '12px',
                            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)'
                        }}>
                            <div style={{ marginBottom: '24px' }}>
                                <div style={{ fontSize: '16px', fontWeight: '700', color: '#0c4a6e', marginBottom: '4px' }}>
                                    Case Count Over Time
                                </div>
                                <div style={{ fontSize: '13px', color: '#64748b' }}>
                                    30-day trend analysis
                                </div>
                            </div>
                            <ResponsiveContainer width="100%" height={320}>
                                <AreaChart
                                    data={timeSeriesData}
                                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                                >
                                    <defs>
                                        <linearGradient id="colorOpened" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#0c4a6e" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#0c4a6e" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="colorResolved" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#16a34a" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#16a34a" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                                    <XAxis
                                        dataKey="week"
                                        stroke="#64748b"
                                        style={{ fontSize: '12px' }}
                                    />
                                    <YAxis
                                        stroke="#64748b"
                                        style={{ fontSize: '12px' }}
                                    />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Legend
                                        wrapperStyle={{ fontSize: '12px', fontWeight: '600' }}
                                        iconType="circle"
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="opened"
                                        stroke="#0c4a6e"
                                        strokeWidth={3}
                                        fillOpacity={1}
                                        fill="url(#colorOpened)"
                                        name="Cases Opened"
                                        dot={{ fill: '#0c4a6e', strokeWidth: 2, r: 5, stroke: '#fff' }}
                                        activeDot={{ r: 7 }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="resolved"
                                        stroke="#16a34a"
                                        strokeWidth={3}
                                        fillOpacity={1}
                                        fill="url(#colorResolved)"
                                        name="Cases Resolved"
                                        dot={{ fill: '#16a34a', strokeWidth: 2, r: 5, stroke: '#fff' }}
                                        activeDot={{ r: 7 }}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Typology Breakdown */}
                    <div style={{
                        background: 'white',
                        padding: '28px',
                        borderRadius: '12px',
                        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
                        marginBottom: '32px'
                    }}>
                        <div style={{ marginBottom: '24px' }}>
                            <div style={{ fontSize: '16px', fontWeight: '700', color: '#0c4a6e', marginBottom: '4px' }}>
                                Case Breakdown by Typology
                            </div>
                            <div style={{ fontSize: '13px', color: '#64748b' }}>
                                Distribution of suspicious activity patterns
                            </div>
                        </div>

                        {typologyData.map((item, index) => (
                            <TypologyBar key={index} name={item.name} cases={item.cases} percentage={item.percentage} />
                        ))}
                    </div>

                    {/* Feature Labels */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(4, 1fr)',
                        gap: '16px',
                        marginBottom: '32px'
                    }}>
                        <FeatureCard
                            icon="🎯"
                            name="Risk Scoring Engine"
                            description="ML-powered risk assessment with dynamic thresholds"
                        />
                        <FeatureCard
                            icon="📝"
                            name="SAR Draft Generator"
                            description="Auto-generate compliance reports from case data"
                        />
                        <FeatureCard
                            icon="🔍"
                            name="Audit & Explainability"
                            description="Full audit trails and decision transparency"
                        />
                        <FeatureCard
                            icon="👥"
                            name="Human-in-the-Loop"
                            description="Expert review and quality assurance workflow"
                        />
                    </div>
                </main>
            </div>
        </div>
    );
};

// KPI Card Component
const KPICard = ({ label, value, change, changeType, badge }) => {
    return (
        <div style={{
            background: 'white',
            padding: '24px',
            borderRadius: '12px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
            transition: 'transform 0.2s, box-shadow 0.2s',
            cursor: 'pointer'
        }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.08)';
            }}>
            <div style={{
                color: '#64748b',
                fontSize: '13px',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                marginBottom: '12px'
            }}>{label}</div>
            <div style={{
                fontSize: '36px',
                fontWeight: '700',
                color: '#0c4a6e',
                marginBottom: '8px'
            }}>{value}</div>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '13px',
                fontWeight: '600',
                color: changeType === 'positive' ? '#16a34a' : '#dc2626'
            }}>{change}</div>
            <span style={{
                background: '#f1f5f9',
                color: '#475569',
                padding: '4px 10px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: '600',
                display: 'inline-block',
                marginTop: '8px'
            }}>{badge}</span>
        </div>
    );
};

// Typology Bar Component
const TypologyBar = ({ name, cases, percentage }) => {
    return (
        <div style={{ marginBottom: '20px' }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '8px'
            }}>
                <span style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b' }}>{name}</span>
                <span style={{ fontSize: '14px', fontWeight: '700', color: '#0c4a6e' }}>{cases} cases</span>
            </div>
            <div style={{
                height: '10px',
                background: '#e2e8f0',
                borderRadius: '10px',
                overflow: 'hidden'
            }}>
                <div style={{
                    height: '100%',
                    width: `${percentage}%`,
                    background: 'linear-gradient(90deg, #0c4a6e 0%, #0369a1 100%)',
                    borderRadius: '10px',
                    transition: 'width 1s ease-out'
                }}></div>
            </div>
        </div>
    );
};

// Feature Card Component
const FeatureCard = ({ icon, name, description }) => {
    return (
        <div style={{
            background: 'white',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
            borderLeft: '4px solid #ea580c',
            transition: 'transform 0.2s',
            cursor: 'pointer'
        }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateX(4px)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateX(0)';
            }}>
            <div style={{
                width: '40px',
                height: '40px',
                background: 'linear-gradient(135deg, #0c4a6e 0%, #0369a1 100%)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '12px',
                fontSize: '20px'
            }}>{icon}</div>
            <div style={{
                fontSize: '14px',
                fontWeight: '700',
                color: '#0c4a6e',
                marginBottom: '4px'
            }}>{name}</div>
            <div style={{
                fontSize: '12px',
                color: '#64748b',
                lineHeight: '1.5'
            }}>{description}</div>
        </div>
    );
};

export default SARDashboard;
