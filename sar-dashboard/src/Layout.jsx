import React, { useState, createContext, useContext } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar, { navigation } from './Sidebar';
import { Bell, Search, ChevronRight } from 'lucide-react';

// Shared context for sidebar state
export const SidebarContext = createContext();
export const useSidebar = () => useContext(SidebarContext);

const Layout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();

    // Determine current page name for breadcrumb
    const currentPage = navigation.find(n => {
        if (n.path === '/') return location.pathname === '/';
        return location.pathname.startsWith(n.path);
    });
    const pageName = currentPage?.name || 'Dashboard';

    return (
        <SidebarContext.Provider value={{ collapsed, setCollapsed }}>
            <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--surface-page)' }}>
                <Sidebar />
                <div style={{
                    flex: 1,
                    marginLeft: collapsed ? 'var(--sidebar-collapsed)' : 'var(--sidebar-width)',
                    transition: 'margin-left var(--transition-slow)',
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '100vh'
                }}>
                    {/* Top Header */}
                    <header style={{
                        height: 'var(--header-height)',
                        background: 'var(--surface-header)',
                        backdropFilter: 'blur(12px)',
                        borderBottom: '1px solid var(--color-gray-200)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0 32px',
                        position: 'sticky',
                        top: 0,
                        zIndex: 900
                    }}>
                        {/* Left: Breadcrumb + Search */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                            {/* Breadcrumb */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: 'var(--font-sm)', color: 'var(--color-gray-400)' }}>
                                <span style={{ cursor: 'pointer' }} onClick={() => window.location.href = '/'}>Home</span>
                                <ChevronRight size={12} />
                                <span style={{ color: 'var(--color-gray-800)', fontWeight: '600' }}>{pageName}</span>
                            </div>

                            {/* Search */}
                            <div style={{
                                display: 'flex', alignItems: 'center', gap: '8px',
                                background: 'var(--surface-inset)', padding: '7px 14px',
                                borderRadius: 'var(--radius-md)', border: '1px solid var(--color-gray-200)',
                                width: '300px', transition: 'border-color var(--transition-fast)'
                            }}>
                                <Search size={15} color="var(--color-gray-400)" />
                                <input
                                    type="text"
                                    placeholder="Search cases, SARs, alerts..."
                                    style={{
                                        background: 'transparent', border: 'none', outline: 'none',
                                        fontSize: 'var(--font-base)', width: '100%', color: 'var(--color-gray-800)'
                                    }}
                                />
                            </div>
                        </div>

                        {/* Right: Actions */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <button style={{
                                position: 'relative', background: 'transparent', border: 'none',
                                cursor: 'pointer', padding: '6px', borderRadius: 'var(--radius-sm)',
                                transition: 'background var(--transition-fast)'
                            }}
                                onMouseEnter={e => e.currentTarget.style.background = 'var(--color-gray-100)'}
                                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                            >
                                <Bell size={18} color="var(--color-gray-500)" />
                                <span style={{
                                    position: 'absolute', top: '2px', right: '2px',
                                    width: '7px', height: '7px', background: 'var(--color-danger)',
                                    borderRadius: '50%', border: '2px solid white'
                                }} />
                            </button>
                            <div style={{
                                height: '24px', width: '1px', background: 'var(--color-gray-200)'
                            }} />
                            <span style={{
                                padding: '5px 12px', borderRadius: 'var(--radius-sm)',
                                fontSize: 'var(--font-sm)', fontWeight: '600',
                                background: 'var(--color-primary-50)', color: 'var(--color-primary-700)',
                                border: '1px solid var(--color-primary-100)'
                            }}>Compliance Team</span>
                        </div>
                    </header>

                    {/* Page Content */}
                    <main style={{
                        padding: '32px',
                        maxWidth: 'var(--content-max-width)',
                        width: '100%',
                        margin: '0 auto',
                        flex: 1
                    }}>
                        <div className="page-enter">
                            <Outlet />
                        </div>
                    </main>
                </div>
            </div>
        </SidebarContext.Provider>
    );
};

export default Layout;
