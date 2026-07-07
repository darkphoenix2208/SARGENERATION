import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const DEMO_USER = {
    name: 'Jane Davidson',
    initials: 'JD',
    email: 'jane.davidson@barclays.com',
    role: 'Compliance Analyst',
    team: 'Financial Crime – AML Operations',
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const saved = sessionStorage.getItem('sar_auth_user');
        return saved ? JSON.parse(saved) : null;
    });

    const login = (email, password) => {
        // Mock authentication — accepts any non-empty credentials
        if (email && password) {
            sessionStorage.setItem('sar_auth_user', JSON.stringify(DEMO_USER));
            setUser(DEMO_USER);
            return true;
        }
        return false;
    };

    const logout = () => {
        sessionStorage.removeItem('sar_auth_user');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
