import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    LayoutDashboard, Bell, Search, ScanEye, BrainCircuit, FileText, ShieldCheck,
    BarChart3, Settings, Bot, ChevronLeft, Moon, MessageSquare, Plus, LogOut
} from 'lucide-react';
import { useSidebar } from './Layout';
import { useAuth } from './AuthContext';

const navigation = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { name: 'Live Alerts', icon: Bell, path: '/alerts', badge: '3' },
    { name: 'Case Explorer', icon: Search, path: '/cases' },
    { name: 'Investigation Intelligence', icon: ScanEye, path: '/investigation', ai: true },
    { name: 'Risk & Rule Engine', icon: BrainCircuit, path: '/risk-engine' },

    { name: 'Analytics', icon: BarChart3, path: '/analytics' },
    { name: 'Administration', icon: Settings, path: '/admin' },
];

const NavItem = ({ item, collapsed, active, onClick }) => {
    const Icon = item.icon;
    return (
        <button
            onClick={onClick}
            title={collapsed ? item.name : ''}
            style={{
                display: 'flex', alignItems: 'center', gap: '12px', width: '100%',
                padding: collapsed ? '10px 0' : '9px 16px 9px 20px',
                justifyContent: collapsed ? 'center' : 'flex-start',
                background: active ? 'var(--color-primary-50)' : 'transparent',
                border: 'none',
                borderLeft: active ? '3px solid var(--color-primary-700)' : '3px solid transparent',
                cursor: 'pointer',
                color: active ? 'var(--color-primary-900)' : 'var(--color-gray-500)',
                transition: 'all var(--transition-fast)',
                borderRadius: collapsed ? '0' : '0',
                position: 'relative'
            }}
            onMouseEnter={e => {
                if (!active) {
                    e.currentTarget.style.background = 'var(--color-gray-50)';
                    e.currentTarget.style.color = 'var(--color-gray-700)';
                }
            }}
            onMouseLeave={e => {
                if (!active) {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = 'var(--color-gray-500)';
                }
            }}
        >
            <div style={{ position: 'relative', minWidth: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon size={19} strokeWidth={active ? 2.2 : 1.8} />
                {item.ai && (
                    <span style={{
                        position: 'absolute', top: '-3px', right: '-4px', width: '7px', height: '7px',
                        background: 'var(--color-purple)', borderRadius: '50%', border: '1.5px solid white'
                    }} />
                )}
            </div>
            {!collapsed && (
                <span style={{ fontSize: 'var(--font-base)', fontWeight: active ? '600' : '500', whiteSpace: 'nowrap', letterSpacing: '-0.01em' }}>
                    {item.name}
                </span>
            )}
            {!collapsed && item.badge && (
                <span style={{
                    marginLeft: 'auto', background: 'var(--color-danger)', color: 'white',
                    fontSize: '10px', fontWeight: '700', padding: '1px 6px', borderRadius: 'var(--radius-full)',
                    minWidth: '18px', textAlign: 'center', lineHeight: '16px'
                }}>{item.badge}</span>
            )}
        </button>
    );
};

const Sidebar = () => {
    const { collapsed, setCollapsed } = useSidebar();
    const navigate = useNavigate();
    const location = useLocation();
    const { logout } = useAuth();

    const isActive = (path) => {
        if (path === '/') return location.pathname === '/';
        return location.pathname.startsWith(path);
    };

    return (
        <aside style={{
            width: collapsed ? 'var(--sidebar-collapsed)' : 'var(--sidebar-width)',
            background: 'var(--surface-sidebar)',
            borderRight: '1px solid var(--color-gray-200)',
            display: 'flex',
            flexDirection: 'column',
            position: 'fixed',
            height: '100vh',
            transition: 'width var(--transition-slow)',
            zIndex: 1000,
            overflowX: 'hidden'
        }}>
            {/* Header */}
            <div style={{
                height: 'var(--header-height)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: collapsed ? 'center' : 'space-between',
                padding: collapsed ? '0' : '0 20px',
                borderBottom: '1px solid var(--color-gray-100)',
                flexShrink: 0
            }}>
                <div
                    style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
                    onClick={() => navigate('/')}
                >
                    <div style={{
                        width: '32px', height: '32px', minWidth: '32px',
                        background: 'linear-gradient(135deg, var(--color-primary-900) 0%, var(--color-primary-700) 100%)',
                        borderRadius: 'var(--radius-md)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: 'white', fontWeight: '800', fontSize: '15px',
                        boxShadow: '0 2px 8px rgba(12,74,110,0.3)'
                    }}>S</div>
                    {!collapsed && (
                        <div>
                            <div style={{ fontSize: '16px', fontWeight: '800', color: 'var(--color-primary-900)', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                                SAR Platform
                            </div>
                            <div style={{ fontSize: '10px', color: 'var(--color-gray-400)', fontWeight: '500', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                                AML Compliance
                            </div>
                        </div>
                    )}
                </div>
                {!collapsed && (
                    <button
                        onClick={() => setCollapsed(true)}
                        style={{
                            background: 'var(--color-gray-50)', border: '1px solid var(--color-gray-200)',
                            borderRadius: 'var(--radius-sm)', padding: '5px', cursor: 'pointer',
                            color: 'var(--color-gray-400)', display: 'flex', alignItems: 'center',
                            justifyContent: 'center', transition: 'all var(--transition-fast)'
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'var(--color-gray-100)'; e.currentTarget.style.color = 'var(--color-gray-600)'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'var(--color-gray-50)'; e.currentTarget.style.color = 'var(--color-gray-400)'; }}
                    >
                        <ChevronLeft size={14} />
                    </button>
                )}
            </div>

            {/* Nav Items */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '12px 0' }}>
                {!collapsed && (
                    <div style={{
                        padding: '0 20px', marginBottom: '6px', fontSize: '10px', fontWeight: '700',
                        color: 'var(--color-gray-400)', textTransform: 'uppercase', letterSpacing: '0.08em'
                    }}>Main</div>
                )}
                {navigation.slice(0, 3).map((item, i) => (
                    <NavItem key={i} item={item} collapsed={collapsed} active={isActive(item.path)} onClick={() => navigate(item.path)} />
                ))}

                {/* Separator */}
                <div style={{ height: '1px', background: 'var(--color-gray-100)', margin: '12px 16px' }} />
                {!collapsed && (
                    <div style={{
                        padding: '0 20px', marginBottom: '6px', fontSize: '10px', fontWeight: '700',
                        color: 'var(--color-gray-400)', textTransform: 'uppercase', letterSpacing: '0.08em'
                    }}>Modules</div>
                )}
                {navigation.slice(3).map((item, i) => (
                    <NavItem key={i} item={item} collapsed={collapsed} active={isActive(item.path)} onClick={() => navigate(item.path)} />
                ))}

                {/* AI Assistant */}
                <div style={{ height: '1px', background: 'var(--color-gray-100)', margin: '12px 16px' }} />
                <button
                    onClick={() => navigate('/ai-assistant')}
                    title={collapsed ? 'AI Assistant' : ''}
                    style={{
                        display: 'flex', alignItems: 'center', gap: '12px', width: '100%',
                        padding: collapsed ? '10px 0' : '9px 16px 9px 20px',
                        justifyContent: collapsed ? 'center' : 'flex-start',
                        background: location.pathname === '/ai-assistant' ? 'var(--color-primary-50)' : 'transparent',
                        border: 'none',
                        borderLeft: location.pathname === '/ai-assistant' ? '3px solid var(--color-primary-700)' : '3px solid transparent',
                        cursor: 'pointer',
                        color: location.pathname === '/ai-assistant' ? 'var(--color-primary-900)' : 'var(--color-gray-500)',
                        transition: 'all var(--transition-fast)'
                    }}
                    onMouseEnter={e => {
                        if (location.pathname !== '/ai-assistant') {
                            e.currentTarget.style.background = 'var(--color-gray-50)';
                            e.currentTarget.style.color = 'var(--color-gray-700)';
                        }
                    }}
                    onMouseLeave={e => {
                        if (location.pathname !== '/ai-assistant') {
                            e.currentTarget.style.background = 'transparent';
                            e.currentTarget.style.color = 'var(--color-gray-500)';
                        }
                    }}
                >
                    <Bot size={19} strokeWidth={1.8} />
                    {!collapsed && <span style={{ fontSize: 'var(--font-base)', fontWeight: '500' }}>AI Assistant</span>}

                </button>
            </div>

            {/* Footer */}
            <div style={{
                padding: collapsed ? '12px 8px' : '12px 16px',
                borderTop: '1px solid var(--color-gray-100)',
                background: 'var(--surface-inset)',
                flexShrink: 0
            }}>
                {!collapsed ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <button
                            onClick={() => navigate('/cases')}
                            className="btn-accent"
                            style={{
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                                width: '100%', background: 'linear-gradient(135deg, var(--color-primary-900), var(--color-primary-700))',
                                color: 'white', border: 'none', padding: '9px', borderRadius: 'var(--radius-sm)',
                                fontSize: 'var(--font-base)', fontWeight: '600', cursor: 'pointer',
                                boxShadow: '0 2px 8px rgba(12,74,110,0.25)',
                                transition: 'all var(--transition-fast)'
                            }}
                            onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 14px rgba(12,74,110,0.35)'}
                            onMouseLeave={e => e.currentTarget.style.boxShadow = '0 2px 8px rgba(12,74,110,0.25)'}
                        >
                            <Search size={15} /><span>Open Cases</span>
                        </button>
                        <div style={{ display: 'flex', gap: '6px' }}>
                            <button style={{
                                flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px',
                                background: 'white', border: '1px solid var(--color-gray-200)', padding: '7px',
                                borderRadius: 'var(--radius-sm)', cursor: 'pointer', color: 'var(--color-gray-500)',
                                fontSize: 'var(--font-sm)', transition: 'all var(--transition-fast)'
                            }}
                                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-gray-300)'; e.currentTarget.style.color = 'var(--color-gray-700)'; }}
                                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-gray-200)'; e.currentTarget.style.color = 'var(--color-gray-500)'; }}
                            >
                                <Moon size={13} />Dark
                            </button>
                            <button
                                onClick={() => navigate('/ai-assistant')}
                                style={{
                                    flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px',
                                    background: 'white', border: '1px solid var(--color-gray-200)', padding: '7px',
                                    borderRadius: 'var(--radius-sm)', cursor: 'pointer', color: 'var(--color-gray-500)',
                                    fontSize: 'var(--font-sm)', transition: 'all var(--transition-fast)'
                                }}
                                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-gray-300)'; e.currentTarget.style.color = 'var(--color-gray-700)'; }}
                                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-gray-200)'; e.currentTarget.style.color = 'var(--color-gray-500)'; }}
                            >
                                <MessageSquare size={13} />Chat
                            </button>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '4px' }}>
                            <div style={{
                                width: '30px', height: '30px', minWidth: '30px',
                                background: 'linear-gradient(135deg, var(--color-primary-900), var(--color-primary-700))',
                                borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                color: 'white', fontWeight: '700', fontSize: '11px'
                            }}>JD</div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ fontSize: 'var(--font-base)', fontWeight: '700', color: 'var(--color-gray-950)' }}>Jane Davidson</div>
                                <div style={{ fontSize: 'var(--font-xs)', color: 'var(--color-gray-400)' }}>Compliance Analyst</div>
                            </div>
                            <LogOut size={15} color="var(--color-gray-400)" style={{ cursor: 'pointer' }} onClick={() => { logout(); navigate('/login'); }} />
                        </div>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                        <button
                            onClick={() => setCollapsed(false)}
                            style={{
                                width: '32px', height: '32px', background: 'var(--color-gray-100)',
                                border: '1px solid var(--color-gray-200)', borderRadius: 'var(--radius-sm)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                cursor: 'pointer', color: 'var(--color-gray-500)', transition: 'all var(--transition-fast)'
                            }}
                            title="Expand sidebar"
                        >
                            <ChevronLeft size={14} style={{ transform: 'rotate(180deg)' }} />
                        </button>
                        <div style={{
                            width: '30px', height: '30px',
                            background: 'linear-gradient(135deg, var(--color-primary-900), var(--color-primary-700))',
                            borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: 'white', fontWeight: '700', fontSize: '11px', cursor: 'pointer'
                        }}>JD</div>
                    </div>
                )}
            </div>
        </aside>
    );
};

export { navigation };
export default Sidebar;
