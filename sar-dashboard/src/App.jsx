import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';
import Layout from './Layout';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import LiveAlertsPage from './pages/LiveAlertsPage';
import CaseExplorerPage from './pages/CaseExplorerPage';
import InvestigationPage from './pages/InvestigationPage';
import RiskRuleEnginePage from './pages/RiskRuleEnginePage';

import AnalyticsPage from './pages/AnalyticsPage';
import AdministrationPage from './pages/AdministrationPage';
import AIAssistantPage from './pages/AIAssistantPage';

/* Protected route wrapper — redirects to /login if not authenticated */
const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? children : <Navigate to="/login" replace />;
};

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
                        <Route path="/" element={<DashboardPage />} />
                        <Route path="/alerts" element={<LiveAlertsPage />} />
                        <Route path="/cases" element={<CaseExplorerPage />} />
                        <Route path="/investigation" element={<InvestigationPage />} />
                        <Route path="/risk-engine" element={<RiskRuleEnginePage />} />

                        <Route path="/analytics" element={<AnalyticsPage />} />
                        <Route path="/admin" element={<AdministrationPage />} />
                        <Route path="/ai-assistant" element={<AIAssistantPage />} />
                    </Route>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
