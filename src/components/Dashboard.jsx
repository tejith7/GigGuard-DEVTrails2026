import { useState, useEffect, useCallback, useMemo } from 'react'

const TRIGGERS = [
    { id: 'rain', icon: '🌧️', name: 'Heavy Rainstorm', desc: '82mm rainfall detected', api: 'OpenWeather API', threshold: '>40mm/hr', color: '#3b82f6' },
    { id: 'heat', icon: '🔥', name: 'Extreme Heat Wave', desc: '44°C + 78% humidity', api: 'OpenWeather API', threshold: '>41°C', color: '#ef4444' },
    { id: 'pollution', icon: '🌫️', name: 'Severe Pollution', desc: 'AQI 720 — hazardous', api: 'AQI API (mock)', threshold: 'AQI ≥350', color: '#a3a328' },
    { id: 'strike', icon: '🚧', name: 'Zone Closure / Strike', desc: 'Market area shut down', api: 'Admin trigger', threshold: 'Official order', color: '#f97316' },
]

function RainOverlay() {
    const drops = useMemo(() => Array.from({ length: 60 }, (_, i) => ({
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 0.8}s`,
        duration: `${0.5 + Math.random() * 0.5}s`,
    })), [])

    return (
        <div className="weather-overlay">
            {drops.map((d, i) => (
                <div
                    key={i}
                    className="rain-drop"
                    style={{
                        left: d.left,
                        animationDelay: d.delay,
                        animationDuration: d.duration,
                    }}
                />
            ))}
        </div>
    )
}

function PayoutModal({ trigger, plan, claimsUsed, onClose }) {
    const [phase, setPhase] = useState('verifying')
    const [seconds, setSeconds] = useState(0)

    const isCapReached = claimsUsed >= 2

    useEffect(() => {
        if (isCapReached) {
            setPhase('cap_reached')
            return
        }

        const timer1 = setTimeout(() => setPhase('approved'), 1500)
        const timer2 = setTimeout(() => setPhase('paid'), 3000)
        return () => { clearTimeout(timer1); clearTimeout(timer2) }
    }, [isCapReached])

    useEffect(() => {
        if (phase === 'verifying' || phase === 'approved') {
            const interval = setInterval(() => {
                setSeconds(prev => prev + 1)
            }, 1000)
            return () => clearInterval(interval)
        }
    }, [phase])

    return (
        <div className="payout-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
            <div className="payout-card">
                {isCapReached ? (
                    <>
                        <div style={{ fontSize: '48px', marginBottom: '12px' }}>⚡</div>
                        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', marginBottom: '8px' }}>
                            Weekly Cap Reached
                        </h3>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '16px' }}>
                            You've used <strong style={{ color: 'var(--accent-orange)' }}>2/2</strong> payouts this week
                        </p>
                        <div className="glass-card" style={{ padding: '14px', marginBottom: '16px' }}>
                            <p style={{ fontSize: '24px', fontFamily: 'var(--font-display)', fontWeight: 900, color: 'var(--accent-cyan)' }}>
                                ₹{(plan?.payout * 2).toLocaleString('en-IN')}
                            </p>
                            <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                                already protected this week ✅
                            </p>
                        </div>
                        <div style={{ fontSize: '13px', color: 'var(--accent-cyan)', fontWeight: 600, marginBottom: '16px' }}>
                            🎁 ₹150 loyalty bonus next Monday!
                        </div>
                        <button className="btn btn-secondary btn-block" onClick={onClose}>
                            Got it 👍
                        </button>
                    </>
                ) : (
                    <>
                        {phase === 'verifying' && (
                            <>
                                <div className="spinner" style={{ margin: '0 auto 16px' }} />
                                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', marginBottom: '8px' }}>
                                    Verifying Disruption...
                                </h3>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>
                                    {trigger.icon} {trigger.api} confirmed: {trigger.desc}
                                </p>
                                <div className="progress-bar" style={{ marginTop: '16px' }}>
                                    <div className="progress-fill" style={{ width: '60%' }} />
                                </div>
                            </>
                        )}

                        {phase === 'approved' && (
                            <>
                                <div style={{ fontSize: '48px', marginBottom: '12px', animation: 'pulse 1s ease-in-out infinite' }}>✅</div>
                                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', color: 'var(--accent-cyan)', marginBottom: '8px' }}>
                                    Claim Auto-Approved!
                                </h3>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>
                                    Processing UPI payout...
                                </p>
                                <div className="spinner" style={{ margin: '12px auto' }} />
                            </>
                        )}

                        {phase === 'paid' && (
                            <>
                                <div style={{ fontSize: '48px', marginBottom: '8px' }}>🎉</div>
                                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', marginBottom: '4px' }}>
                                    Payout Complete!
                                </h3>
                                <div className="payout-amount text-gradient-cyan">
                                    ₹{plan?.payout?.toLocaleString('en-IN')}
                                </div>
                                <p className="payout-timer">
                                    Credited to UPI in <strong style={{ color: 'var(--accent-cyan)' }}>{seconds} seconds</strong> 🚀
                                </p>
                                <div className="glass-card" style={{ padding: '12px', marginBottom: '16px', textAlign: 'left' }}>
                                    <div className="analysis-row" style={{ padding: '6px 0' }}>
                                        <span className="analysis-label" style={{ fontSize: '12px' }}>Trigger</span>
                                        <span style={{ fontSize: '12px', fontWeight: 600 }}>{trigger.icon} {trigger.name}</span>
                                    </div>
                                    <div className="analysis-row" style={{ padding: '6px 0' }}>
                                        <span className="analysis-label" style={{ fontSize: '12px' }}>Verified via</span>
                                        <span style={{ fontSize: '12px', fontWeight: 600 }}>{trigger.api}</span>
                                    </div>
                                    <div className="analysis-row" style={{ padding: '6px 0' }}>
                                        <span className="analysis-label" style={{ fontSize: '12px' }}>Threshold</span>
                                        <span style={{ fontSize: '12px', fontWeight: 600 }}>{trigger.threshold}</span>
                                    </div>
                                    <div className="analysis-row" style={{ padding: '6px 0' }}>
                                        <span className="analysis-label" style={{ fontSize: '12px' }}>Status</span>
                                        <span className="badge badge-cyan">paid</span>
                                    </div>
                                </div>
                                <button className="btn btn-primary btn-block" onClick={onClose}>
                                    Back to Dashboard
                                </button>
                            </>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}

export default function Dashboard({ userData, riskData, plan, showToast }) {
    const [activeTab, setActiveTab] = useState('dashboard')
    const [claims, setClaims] = useState([])
    const [activeTrigger, setActiveTrigger] = useState(null)
    const [weatherEffect, setWeatherEffect] = useState(null)

    const claimsThisWeek = claims.length
    const totalProtected = claims.reduce((sum, c) => sum + c.amount, 0)

    const handleTrigger = useCallback((trigger) => {
        // Show weather effect
        setWeatherEffect(trigger.id)
        setActiveTrigger(trigger)
    }, [])

    const handleCloseModal = useCallback(() => {
        if (claimsThisWeek < 2 && activeTrigger) {
            const newClaim = {
                id: Date.now(),
                type: activeTrigger.name,
                icon: activeTrigger.icon,
                amount: plan?.payout || 1199,
                time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
                status: 'approved',
            }
            setClaims(prev => [newClaim, ...prev])
            showToast(`💰 ₹${plan?.payout?.toLocaleString('en-IN')} credited to UPI!`)
        }
        setActiveTrigger(null)
        setTimeout(() => setWeatherEffect(null), 500)
    }, [claimsThisWeek, activeTrigger, plan, showToast])

    const daysLeft = 7 - new Date().getDay()

    return (
        <div className="screen">
            {/* Weather Effects */}
            {weatherEffect === 'rain' && <RainOverlay />}
            {weatherEffect === 'heat' && <div className="heat-overlay" />}
            {weatherEffect === 'pollution' && <div className="smog-overlay" />}
            {weatherEffect === 'strike' && <div className="smog-overlay" style={{ background: 'rgba(249,115,22,0.1)' }} />}

            {/* Payout Modal */}
            {activeTrigger && (
                <PayoutModal
                    trigger={activeTrigger}
                    plan={plan}
                    claimsUsed={claimsThisWeek}
                    onClose={handleCloseModal}
                />
            )}

            <div className="container">
                {/* Welcome */}
                <div style={{ padding: '16px 0 8px' }}>
                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Welcome back</p>
                    <h2 style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '24px',
                        fontWeight: 800,
                    }}>
                        {userData?.name || 'Rajesh'} 👋
                    </h2>
                </div>

                {/* Active Policy Banner */}
                <div className="glass-card" style={{
                    borderColor: 'var(--accent-cyan)',
                    padding: '16px',
                    marginBottom: '16px',
                    position: 'relative',
                    overflow: 'hidden',
                }}>
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        width: '100px',
                        height: '100px',
                        background: 'radial-gradient(circle, rgba(6,214,160,0.15), transparent)',
                        borderRadius: '50%',
                    }} />
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div>
                            <span className="badge badge-cyan" style={{ marginBottom: '6px', display: 'inline-block' }}>
                                ● Policy Active
                            </span>
                            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 800 }}>
                                {plan?.emoji} {plan?.name} Shield
                            </h3>
                            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                                ₹{plan?.price}/week • {daysLeft} days left
                            </p>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Payout/event</div>
                            <div style={{
                                fontFamily: 'var(--font-display)',
                                fontSize: '24px',
                                fontWeight: 900,
                                color: 'var(--accent-cyan)',
                            }}>₹{plan?.payout?.toLocaleString('en-IN')}</div>
                        </div>
                    </div>
                    <div className="progress-bar" style={{ marginTop: '12px', marginBottom: '4px' }}>
                        <div className="progress-fill" style={{
                            width: `${(claimsThisWeek / 2) * 100}%`,
                            background: claimsThisWeek >= 2 ? 'var(--accent-red)' : 'var(--gradient-cyan)',
                        }} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-muted)' }}>
                        <span>Claims used: {claimsThisWeek}/2</span>
                        <span>Max: ₹{plan?.maxWeekly?.toLocaleString('en-IN')}</span>
                    </div>
                </div>

                {/* Tabs */}
                <div className="tab-bar">
                    <button className={`tab-btn ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>
                        Dashboard
                    </button>
                    <button className={`tab-btn ${activeTab === 'simulate' ? 'active' : ''}`} onClick={() => setActiveTab('simulate')}>
                        Simulate ⚡
                    </button>
                    <button className={`tab-btn ${activeTab === 'claims' ? 'active' : ''}`} onClick={() => setActiveTab('claims')}>
                        Claims
                    </button>
                </div>

                {/* Dashboard Tab */}
                {activeTab === 'dashboard' && (
                    <div className="animate-slide-up">
                        {/* Metrics */}
                        <div className="metrics-grid">
                            <div className="metric-card">
                                <div className="metric-value text-gradient-cyan">₹{totalProtected.toLocaleString('en-IN')}</div>
                                <div className="metric-label">Protected</div>
                            </div>
                            <div className="metric-card">
                                <div className="metric-value text-gradient-orange">{claimsThisWeek}/2</div>
                                <div className="metric-label">Claims Used</div>
                            </div>
                            <div className="metric-card">
                                <div className="metric-value" style={{ color: riskData?.color || '#fbbf24' }}>{riskData?.score || 55}</div>
                                <div className="metric-label">Risk Score</div>
                            </div>
                            <div className="metric-card">
                                <div className="metric-value" style={{ color: 'var(--accent-blue)' }}>{daysLeft}d</div>
                                <div className="metric-label">Days Left</div>
                            </div>
                        </div>

                        {/* Weekly Summary */}
                        <div className="glass-card" style={{ marginBottom: '12px' }}>
                            <p style={{ fontSize: '12px', fontWeight: 700, color: 'var(--accent-orange)', marginBottom: '10px', textTransform: 'uppercase' }}>
                                📊 This Week
                            </p>
                            <div className="analysis-row">
                                <span className="analysis-label">Plan</span>
                                <span className="analysis-value">{plan?.name} (₹{plan?.price}/wk)</span>
                            </div>
                            <div className="analysis-row">
                                <span className="analysis-label">Coverage Period</span>
                                <span className="analysis-value">Mon → Sun</span>
                            </div>
                            <div className="analysis-row">
                                <span className="analysis-label">City Risk</span>
                                <span className="analysis-value" style={{ color: riskData?.color }}>{riskData?.level}</span>
                            </div>
                            <div className="analysis-row">
                                <span className="analysis-label">Est. Weekly Income</span>
                                <span className="analysis-value" style={{ color: 'var(--accent-cyan)' }}>
                                    ₹{riskData?.weeklyIncome?.toLocaleString('en-IN') || '4,200'}
                                </span>
                            </div>
                            <div className="analysis-row">
                                <span className="analysis-label">Earnings Protected</span>
                                <span className="analysis-value" style={{ color: 'var(--accent-cyan)' }}>
                                    ₹{totalProtected.toLocaleString('en-IN')}
                                </span>
                            </div>
                        </div>

                        {/* Disruption coverage */}
                        <div className="glass-card">
                            <p style={{ fontSize: '12px', fontWeight: 700, color: 'var(--accent-cyan)', marginBottom: '10px', textTransform: 'uppercase' }}>
                                🛡️ Your Coverage
                            </p>
                            {TRIGGERS.map(t => (
                                <div key={t.id} style={{
                                    display: 'flex', alignItems: 'center', gap: '10px',
                                    padding: '8px 0',
                                    borderBottom: '1px solid rgba(255,255,255,0.04)',
                                }}>
                                    <span style={{ fontSize: '20px' }}>{t.icon}</span>
                                    <span style={{ fontSize: '13px', flex: 1 }}>{t.name}</span>
                                    <span className="badge badge-cyan" style={{ fontSize: '9px' }}>covered</span>
                                </div>
                            ))}
                            <p style={{ fontSize: '11px', color: 'var(--accent-red)', marginTop: '10px', fontWeight: 600 }}>
                                ❌ Health, accident, life & vehicle: NOT covered
                            </p>
                        </div>
                    </div>
                )}

                {/* Simulate Tab */}
                {activeTab === 'simulate' && (
                    <div className="animate-slide-up">
                        <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                            <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                                Tap a disruption to trigger an <strong style={{ color: 'var(--accent-orange)' }}>automated claim</strong>
                            </p>
                        </div>

                        {TRIGGERS.map(trigger => (
                            <div
                                key={trigger.id}
                                className="trigger-card"
                                onClick={() => handleTrigger(trigger)}
                                style={{ borderColor: `${trigger.color}30` }}
                            >
                                <div className="trigger-icon" style={{ background: `${trigger.color}15` }}>
                                    {trigger.icon}
                                </div>
                                <div className="trigger-info">
                                    <div className="trigger-name">{trigger.name}</div>
                                    <div className="trigger-desc">{trigger.desc}</div>
                                    <div style={{ fontSize: '10px', color: trigger.color, marginTop: '2px', fontWeight: 600 }}>
                                        Source: {trigger.api} • {trigger.threshold}
                                    </div>
                                </div>
                                <div style={{
                                    padding: '8px 12px',
                                    background: `${trigger.color}20`,
                                    borderRadius: 'var(--radius-full)',
                                    fontSize: '11px',
                                    fontWeight: 700,
                                    color: trigger.color,
                                }}>
                                    TEST
                                </div>
                            </div>
                        ))}

                        <div className="glass-card" style={{ marginTop: '12px', textAlign: 'center' }}>
                            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                                ⚡ <strong style={{ color: 'var(--text-primary)' }}>Zero-touch claims:</strong> When a real disruption is detected, GigGuard automatically triggers the claim — no manual filing needed.
                            </p>
                        </div>
                    </div>
                )}

                {/* Claims Tab */}
                {activeTab === 'claims' && (
                    <div className="animate-slide-up">
                        {claims.length === 0 ? (
                            <div style={{ textAlign: 'center', padding: '40px 0' }}>
                                <div style={{ fontSize: '48px', marginBottom: '12px', opacity: 0.5 }}>📋</div>
                                <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>No claims yet</p>
                                <p style={{ color: 'var(--text-muted)', fontSize: '12px', marginTop: '4px' }}>
                                    Go to <strong style={{ color: 'var(--accent-orange)' }}>Simulate</strong> tab to test triggers
                                </p>
                            </div>
                        ) : (
                            <>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    marginBottom: '12px',
                                    alignItems: 'center',
                                }}>
                                    <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                                        This Week ({claims.length} claim{claims.length !== 1 ? 's' : ''})
                                    </span>
                                    <span style={{
                                        fontFamily: 'var(--font-display)',
                                        fontWeight: 800,
                                        color: 'var(--accent-cyan)',
                                    }}>
                                        ₹{totalProtected.toLocaleString('en-IN')}
                                    </span>
                                </div>
                                <div className="claim-log">
                                    {claims.map((claim) => (
                                        <div key={claim.id} className="claim-item">
                                            <div className="claim-status approved" />
                                            <div className="claim-details">
                                                <div className="claim-type">{claim.icon} {claim.type}</div>
                                                <div className="claim-time">Today at {claim.time} • Auto-approved ✅</div>
                                            </div>
                                            <div className="claim-amount">+₹{claim.amount.toLocaleString('en-IN')}</div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}

                        {/* Fraud Prevention Note */}
                        <div className="glass-card" style={{ marginTop: '16px', padding: '14px' }}>
                            <p style={{ fontSize: '12px', fontWeight: 700, color: 'var(--accent-purple)', marginBottom: '8px', textTransform: 'uppercase' }}>
                                🔒 Anti-Fraud Measures
                            </p>
                            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                                <div>• GPS location verified at time of disruption</div>
                                <div>• API data cross-referenced (OpenWeather + AQI)</div>
                                <div>• Duplicate claim prevention (2/week cap)</div>
                                <div>• Isolation Forest anomaly detection (Phase 3)</div>
                            </div>
                        </div>
                    </div>
                )}

                <div style={{ height: '40px' }} />
            </div>
        </div>
    )
}
