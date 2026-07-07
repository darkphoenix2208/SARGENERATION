import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { Shield, Eye, EyeOff, Lock, Mail, ArrowRight, AlertTriangle } from 'lucide-react';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        if (!email || !password) {
            setError('Please enter both email and password.');
            return;
        }
        setLoading(true);
        setTimeout(() => {
            const success = login(email, password);
            if (success) {
                navigate('/');
            } else {
                setError('Invalid credentials. Please try again.');
            }
            setLoading(false);
        }, 800);
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            background: 'linear-gradient(135deg, #0c2d48 0%, #0a1628 40%, #0f172a 100%)',
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Animated background elements */}
            <div style={{
                position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none'
            }}>
                <div style={{
                    position: 'absolute', width: '600px', height: '600px', borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(0,166,206,0.08) 0%, transparent 70%)',
                    top: '-200px', right: '-100px', animation: 'float 8s ease-in-out infinite'
                }} />
                <div style={{
                    position: 'absolute', width: '400px', height: '400px', borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(0,113,188,0.06) 0%, transparent 70%)',
                    bottom: '-100px', left: '-50px', animation: 'float 10s ease-in-out infinite reverse'
                }} />
                <div style={{
                    position: 'absolute', width: '300px', height: '300px', borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(124,58,237,0.05) 0%, transparent 70%)',
                    top: '40%', left: '30%', animation: 'float 12s ease-in-out infinite'
                }} />
                {/* Grid pattern */}
                <div style={{
                    position: 'absolute', inset: 0, opacity: 0.03,
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                    backgroundSize: '60px 60px'
                }} />
            </div>

            {/* Left panel — Branding */}
            <div style={{
                flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center',
                padding: '60px 80px', position: 'relative', zIndex: 1
            }}>
                <div style={{ marginBottom: '48px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '40px' }}>
                        <div style={{
                            width: '48px', height: '48px',
                            background: 'linear-gradient(135deg, #00a6ce, #0071bc)',
                            borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            boxShadow: '0 8px 32px rgba(0,166,206,0.3)'
                        }}>
                            <Shield size={26} color="white" strokeWidth={2} />
                        </div>
                        <div>
                            <div style={{
                                fontSize: '22px', fontWeight: '800', color: 'white',
                                letterSpacing: '-0.02em', lineHeight: 1.1
                            }}>SAR Platform</div>
                            <div style={{
                                fontSize: '11px', color: 'rgba(255,255,255,0.4)',
                                fontWeight: '500', letterSpacing: '0.1em', textTransform: 'uppercase'
                            }}>AML Compliance Suite</div>
                        </div>
                    </div>

                    <h1 style={{
                        fontSize: '42px', fontWeight: '800', color: 'white',
                        lineHeight: 1.15, letterSpacing: '-0.03em', margin: '0 0 16px 0'
                    }}>
                        Suspicious Activity<br />
                        <span style={{
                            background: 'linear-gradient(135deg, #00a6ce, #0071bc, #8b5cf6)',
                            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
                        }}>Report Automation</span>
                    </h1>
                    <p style={{
                        fontSize: '16px', lineHeight: 1.7, color: 'rgba(255,255,255,0.5)',
                        maxWidth: '440px', margin: 0
                    }}>
                        AI-powered transaction monitoring, automated SAR generation, and
                        regulatory compliance — designed for UK financial institutions
                        filing with the National Crime Agency.
                    </p>
                </div>

                {/* Footer */}
                <div style={{
                    position: 'absolute', bottom: '40px', left: '80px',
                    fontSize: '11px', color: 'rgba(255,255,255,0.25)'
                }}>
                    © 2026 SAR Automation Platform · Barclays Financial Crime Division · All rights reserved
                </div>
            </div>

            {/* Right panel — Login form */}
            <div style={{
                width: '520px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: '40px', position: 'relative', zIndex: 1
            }}>
                <div style={{
                    width: '100%', maxWidth: '400px',
                    background: 'rgba(255,255,255,0.03)',
                    backdropFilter: 'blur(24px)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '20px',
                    padding: '44px 36px',
                    boxShadow: '0 32px 64px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)'
                }}>
                    <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                        <div style={{
                            width: '56px', height: '56px', margin: '0 auto 16px',
                            background: 'linear-gradient(135deg, rgba(0,166,206,0.15), rgba(0,113,188,0.1))',
                            borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            border: '1px solid rgba(0,166,206,0.2)'
                        }}>
                            <Lock size={24} color="#00a6ce" />
                        </div>
                        <h2 style={{
                            fontSize: '22px', fontWeight: '700', color: 'white',
                            margin: '0 0 6px 0', letterSpacing: '-0.02em'
                        }}>Secure Login</h2>
                        <p style={{
                            fontSize: '13px', color: 'rgba(255,255,255,0.4)', margin: 0
                        }}>Enter your credentials to access the platform</p>
                    </div>

                    {error && (
                        <div style={{
                            display: 'flex', alignItems: 'center', gap: '8px',
                            padding: '10px 14px', marginBottom: '20px', borderRadius: '10px',
                            background: 'rgba(220,38,38,0.1)', border: '1px solid rgba(220,38,38,0.2)'
                        }}>
                            <AlertTriangle size={15} color="#ef4444" />
                            <span style={{ fontSize: '13px', color: '#ef4444' }}>{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        {/* Email */}
                        <div style={{ marginBottom: '18px' }}>
                            <label style={{
                                display: 'block', fontSize: '12px', fontWeight: '600',
                                color: 'rgba(255,255,255,0.6)', marginBottom: '8px',
                                letterSpacing: '0.03em'
                            }}>Email Address</label>
                            <div style={{
                                display: 'flex', alignItems: 'center', gap: '10px',
                                padding: '12px 14px', borderRadius: '10px',
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                transition: 'border-color 0.2s ease'
                            }}>
                                <Mail size={16} color="rgba(255,255,255,0.3)" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    placeholder="analyst@barclays.com"
                                    style={{
                                        flex: 1, background: 'transparent', border: 'none', outline: 'none',
                                        fontSize: '14px', color: 'white'
                                    }}
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div style={{ marginBottom: '24px' }}>
                            <label style={{
                                display: 'block', fontSize: '12px', fontWeight: '600',
                                color: 'rgba(255,255,255,0.6)', marginBottom: '8px',
                                letterSpacing: '0.03em'
                            }}>Password</label>
                            <div style={{
                                display: 'flex', alignItems: 'center', gap: '10px',
                                padding: '12px 14px', borderRadius: '10px',
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                transition: 'border-color 0.2s ease'
                            }}>
                                <Lock size={16} color="rgba(255,255,255,0.3)" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    style={{
                                        flex: 1, background: 'transparent', border: 'none', outline: 'none',
                                        fontSize: '14px', color: 'white'
                                    }}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={{
                                        background: 'none', border: 'none', cursor: 'pointer',
                                        padding: '2px', display: 'flex'
                                    }}
                                >
                                    {showPassword
                                        ? <EyeOff size={16} color="rgba(255,255,255,0.3)" />
                                        : <Eye size={16} color="rgba(255,255,255,0.3)" />
                                    }
                                </button>
                            </div>
                        </div>

                        {/* Remember + Forgot */}
                        <div style={{
                            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                            marginBottom: '24px'
                        }}>
                            <label style={{
                                display: 'flex', alignItems: 'center', gap: '8px',
                                fontSize: '12px', color: 'rgba(255,255,255,0.4)', cursor: 'pointer'
                            }}>
                                <input type="checkbox" style={{ accentColor: '#00a6ce' }} />
                                Remember me
                            </label>
                            <span style={{
                                fontSize: '12px', color: '#00a6ce', cursor: 'pointer',
                                fontWeight: '500'
                            }}>Forgot password?</span>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            style={{
                                width: '100%', padding: '13px',
                                background: loading
                                    ? 'rgba(0,166,206,0.5)'
                                    : 'linear-gradient(135deg, #00a6ce, #0071bc)',
                                color: 'white', border: 'none', borderRadius: '10px',
                                fontSize: '14px', fontWeight: '700', cursor: loading ? 'wait' : 'pointer',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                                boxShadow: '0 4px 16px rgba(0,166,206,0.3)',
                                transition: 'all 0.2s ease',
                                letterSpacing: '-0.01em'
                            }}
                        >
                            {loading ? (
                                <div style={{
                                    width: '18px', height: '18px', border: '2px solid rgba(255,255,255,0.3)',
                                    borderTopColor: 'white', borderRadius: '50%',
                                    animation: 'spin 0.8s linear infinite'
                                }} />
                            ) : (
                                <>Sign In <ArrowRight size={16} /></>
                            )}
                        </button>
                    </form>

                    {/* Demo hint */}
                    <div style={{
                        marginTop: '24px', padding: '12px 14px', borderRadius: '10px',
                        background: 'rgba(0,166,206,0.06)',
                        border: '1px solid rgba(0,166,206,0.12)',
                        textAlign: 'center'
                    }}>
                        <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)' }}>
                            Demo: Use any email and password to sign in
                        </span>
                    </div>

                    {/* Security badge */}
                    <div style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                        marginTop: '20px'
                    }}>
                        <Shield size={12} color="rgba(255,255,255,0.2)" />
                        <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.05em' }}>
                            256-bit TLS encrypted · SOC 2 compliant
                        </span>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-20px); }
                }
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
                input::placeholder { color: rgba(255,255,255,0.25) !important; }
            `}</style>
        </div>
    );
};

export default LoginPage;
