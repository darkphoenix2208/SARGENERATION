import React from 'react';
import { AlertTriangle, Clock, Repeat, TrendingUp, DollarSign, ChevronRight } from 'lucide-react';

/* ─── Risk Factor Data ─── */
const riskFactors = [
    {
        id: 'filing-delay',
        name: 'Detection-to-Filing Delay',
        icon: Clock,
        score: 40, // 0-100
        weight: 30, // percentage of total
        detail: '12 days elapsed (30-day deadline)',
        status: 'moderate',
    },
    {
        id: 'typology-severity',
        name: 'Typology Severity',
        icon: AlertTriangle,
        score: 92,
        weight: 30,
        detail: 'Multi-typology: Funnel + Structuring + Geo-Risk',
        status: 'critical',
    },
    {
        id: 'repeat-customer',
        name: 'Repeat Customer History',
        icon: Repeat,
        score: 25,
        weight: 15,
        detail: 'No prior SARs on this subject',
        status: 'low',
    },
    {
        id: 'aggregate-value',
        name: 'Aggregate Transaction Value',
        icon: DollarSign,
        score: 78,
        weight: 25,
        detail: '£245,300 over 26-day window',
        status: 'high',
    },
];

// Calculate weighted overall risk
const calculateOverallRisk = () => {
    const weightedSum = riskFactors.reduce((sum, f) => sum + (f.score * f.weight / 100), 0);
    return Math.round(weightedSum);
};

const overallScore = calculateOverallRisk();
const overallLevel = overallScore >= 70 ? 'High' : overallScore >= 40 ? 'Medium' : 'Low';
const overallConfig = {
    High: { color: '#dc2626', bg: '#fef2f2', border: '#fecaca', gradient: 'linear-gradient(135deg, #dc2626, #b91c1c)' },
    Medium: { color: '#ea580c', bg: '#fff7ed', border: '#fed7aa', gradient: 'linear-gradient(135deg, #ea580c, #c2410c)' },
    Low: { color: '#16a34a', bg: '#f0fdf4', border: '#bbf7d0', gradient: 'linear-gradient(135deg, #16a34a, #15803d)' },
};
const cfg = overallConfig[overallLevel];

const factorColors = {
    critical: { color: '#dc2626', bg: '#fef2f2' },
    high: { color: '#ea580c', bg: '#fff7ed' },
    moderate: { color: '#eab308', bg: '#fefce8' },
    low: { color: '#16a34a', bg: '#f0fdf4' },
};

const EscalationRiskMeter = () => {
    // SVG gauge parameters
    const cx = 100, cy = 90, r = 70;
    const startAngle = Math.PI;
    const endAngle = 0;
    const scoreAngle = startAngle - (overallScore / 100) * Math.PI;

    const arcPath = (startA, endA) => {
        const x1 = cx + r * Math.cos(startA);
        const y1 = cy - r * Math.sin(startA);
        const x2 = cx + r * Math.cos(endA);
        const y2 = cy - r * Math.sin(endA);
        const largeArc = startA - endA > Math.PI ? 1 : 0;
        return `M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}`;
    };

    // Needle endpoint
    const needleAngle = startAngle - (overallScore / 100) * Math.PI;
    const needleLen = r - 12;
    const nx = cx + needleLen * Math.cos(needleAngle);
    const ny = cy - needleLen * Math.sin(needleAngle);

    return (
        <div style={{
            background: 'white', padding: '20px', borderRadius: '12px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.08)'
        }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                <div style={{
                    width: '28px', height: '28px', borderRadius: '7px',
                    background: cfg.gradient,
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                    <TrendingUp size={14} color="white" />
                </div>
                <div>
                    <div style={{ fontSize: '14px', fontWeight: '700', color: '#0c4a6e' }}>Regulatory Exposure Risk</div>
                    <div style={{ fontSize: '10px', color: '#94a3b8' }}>Enforcement exposure assessment</div>
                </div>
            </div>

            {/* Semicircular Gauge */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '6px' }}>
                <svg width="200" height="110" viewBox="0 0 200 110">
                    {/* Background arc */}
                    <path
                        d={arcPath(startAngle, endAngle)}
                        fill="none"
                        stroke="#e2e8f0"
                        strokeWidth="14"
                        strokeLinecap="round"
                    />
                    {/* Green zone (0-40) */}
                    <path
                        d={arcPath(startAngle, startAngle - 0.4 * Math.PI)}
                        fill="none"
                        stroke="#16a34a"
                        strokeWidth="14"
                        strokeLinecap="round"
                        opacity="0.25"
                    />
                    {/* Orange zone (40-70) */}
                    <path
                        d={arcPath(startAngle - 0.4 * Math.PI, startAngle - 0.7 * Math.PI)}
                        fill="none"
                        stroke="#ea580c"
                        strokeWidth="14"
                        strokeLinecap="round"
                        opacity="0.25"
                    />
                    {/* Red zone (70-100) */}
                    <path
                        d={arcPath(startAngle - 0.7 * Math.PI, endAngle)}
                        fill="none"
                        stroke="#dc2626"
                        strokeWidth="14"
                        strokeLinecap="round"
                        opacity="0.25"
                    />
                    {/* Active arc */}
                    <path
                        d={arcPath(startAngle, scoreAngle)}
                        fill="none"
                        stroke={cfg.color}
                        strokeWidth="14"
                        strokeLinecap="round"
                    />
                    {/* Needle */}
                    <line
                        x1={cx} y1={cy}
                        x2={nx} y2={ny}
                        stroke={cfg.color}
                        strokeWidth="2.5"
                        strokeLinecap="round"
                    />
                    <circle cx={cx} cy={cy} r="5" fill={cfg.color} />
                    <circle cx={cx} cy={cy} r="2.5" fill="white" />
                    {/* Score text */}
                    <text x={cx} y={cy + 2} textAnchor="middle" fontSize="24" fontWeight="800" fill={cfg.color} fontFamily="'Inter', sans-serif">
                        {overallScore}
                    </text>
                    {/* Labels */}
                    <text x="18" y="105" fontSize="9" fill="#94a3b8" fontFamily="'Inter', sans-serif" fontWeight="600">LOW</text>
                    <text x="88" y="22" fontSize="9" fill="#94a3b8" fontFamily="'Inter', sans-serif" fontWeight="600">MED</text>
                    <text x="170" y="105" fontSize="9" fill="#94a3b8" fontFamily="'Inter', sans-serif" fontWeight="600">HIGH</text>
                </svg>
            </div>

            {/* Overall Level Badge */}
            <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                <span style={{
                    padding: '4px 16px', borderRadius: '6px',
                    fontSize: '11px', fontWeight: '800',
                    background: cfg.bg, color: cfg.color,
                    border: `1px solid ${cfg.border}`,
                    letterSpacing: '0.05em'
                }}>
                    {overallLevel.toUpperCase()} RISK
                </span>
            </div>

            {/* Contributing Factors */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {riskFactors.map((factor) => {
                    const fCfg = factorColors[factor.status];
                    const FactorIcon = factor.icon;

                    return (
                        <div key={factor.id} style={{
                            padding: '10px 12px', borderRadius: '8px',
                            background: '#f8fafc', border: '1px solid #f1f5f9'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                                <FactorIcon size={13} color={fCfg.color} />
                                <span style={{ fontSize: '12px', fontWeight: '600', color: '#475569', flex: 1 }}>{factor.name}</span>
                                <span style={{ fontSize: '10px', fontWeight: '700', color: '#94a3b8' }}>w:{factor.weight}%</span>
                            </div>
                            <div style={{
                                height: '5px', borderRadius: '3px',
                                background: '#e2e8f0', overflow: 'hidden', marginBottom: '4px'
                            }}>
                                <div style={{
                                    width: `${factor.score}%`, height: '100%',
                                    borderRadius: '3px',
                                    background: fCfg.color,
                                    transition: 'width 0.5s ease'
                                }} />
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: '10px', color: '#94a3b8' }}>{factor.detail}</span>
                                <span style={{ fontSize: '10px', fontWeight: '700', color: fCfg.color }}>{factor.score}/100</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default EscalationRiskMeter;
