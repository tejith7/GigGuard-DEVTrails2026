import { useState, useEffect } from 'react'

export default function Payment({ plan, onComplete }) {
    const [selectedUpi, setSelectedUpi] = useState('gpay')
    const [phase, setPhase] = useState('select') // select, processing, success
    const [progress, setProgress] = useState(0)

    const upiMethods = [
        { id: 'gpay', name: 'GPay', icon: '💳' },
        { id: 'phonepe', name: 'PhonePe', icon: '📱' },
        { id: 'paytm', name: 'Paytm', icon: '💰' },
    ]

    const handlePay = () => {
        setPhase('processing')
    }

    useEffect(() => {
        if (phase !== 'processing') return
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval)
                    setPhase('success')
                    return 100
                }
                return prev + 5
            })
        }, 80)
        return () => clearInterval(interval)
    }, [phase])

    useEffect(() => {
        if (phase === 'success') {
            const timer = setTimeout(() => onComplete(), 2000)
            return () => clearTimeout(timer)
        }
    }, [phase, onComplete])

    if (phase === 'processing') {
        return (
            <div className="screen">
                <div className="container" style={{ textAlign: 'center', paddingTop: '80px' }}>
                    <div style={{ fontSize: '64px', marginBottom: '20px' }}>💳</div>
                    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', marginBottom: '8px' }}>
                        Processing Payment...
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '24px' }}>
                        Connecting to UPI gateway
                    </p>
                    <div className="spinner" />
                    <div className="progress-bar" style={{ marginTop: '32px' }}>
                        <div className="progress-fill" style={{ width: `${progress}%` }} />
                    </div>
                    <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '8px' }}>
                        {progress < 40 ? 'Initiating UPI request...' : progress < 70 ? 'Verifying payment...' : 'Activating policy...'}
                    </p>
                </div>
            </div>
        )
    }

    if (phase === 'success') {
        return (
            <div className="screen">
                <div className="container" style={{ textAlign: 'center', paddingTop: '60px' }}>
                    <div style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        background: 'var(--gradient-cyan)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 20px',
                        fontSize: '40px',
                        animation: 'pulse 1s ease-in-out infinite',
                    }}>
                        ✅
                    </div>
                    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', marginBottom: '8px' }}>
                        Payment <span className="text-gradient-cyan">Successful!</span>
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '8px' }}>
                        ₹{plan?.price} debited via UPI
                    </p>
                    <p style={{
                        color: 'var(--accent-cyan)',
                        fontSize: '16px',
                        fontWeight: 700,
                        marginBottom: '20px',
                    }}>
                        Your {plan?.name} policy is now ACTIVE 🛡️
                    </p>

                    <div className="glass-card" style={{ textAlign: 'left' }}>
                        <div className="analysis-row">
                            <span className="analysis-label">Policy ID</span>
                            <span className="analysis-value" style={{ fontSize: '12px', fontFamily: 'monospace' }}>GG-2026-{Math.random().toString(36).substr(2, 6).toUpperCase()}</span>
                        </div>
                        <div className="analysis-row">
                            <span className="analysis-label">Plan</span>
                            <span className="analysis-value">{plan?.name} (₹{plan?.price}/week)</span>
                        </div>
                        <div className="analysis-row">
                            <span className="analysis-label">Coverage</span>
                            <span className="analysis-value" style={{ color: 'var(--accent-cyan)' }}>Monday → Sunday</span>
                        </div>
                        <div className="analysis-row">
                            <span className="analysis-label">Payout per event</span>
                            <span className="analysis-value" style={{ color: 'var(--accent-orange)' }}>₹{plan?.payout?.toLocaleString('en-IN')}</span>
                        </div>
                    </div>

                    <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '16px' }}>
                        Redirecting to dashboard...
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className="screen">
            <div className="container">
                <div style={{ textAlign: 'center', padding: '20px 0 16px' }}>
                    <h2 style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '22px',
                        fontWeight: 800,
                        marginBottom: '6px',
                    }}>
                        Secure <span className="text-gradient-orange">Payment</span>
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>
                        Pay via UPI — instant activation
                    </p>
                </div>

                {/* Order Summary */}
                <div className="glass-card animate-slide-up" style={{ marginBottom: '16px' }}>
                    <p style={{ fontSize: '12px', fontWeight: 700, color: 'var(--accent-orange)', marginBottom: '12px', textTransform: 'uppercase' }}>
                        Order Summary
                    </p>
                    <div className="analysis-row">
                        <span className="analysis-label">{plan?.emoji} {plan?.name} Plan (Weekly)</span>
                        <span className="analysis-value">₹{plan?.price}</span>
                    </div>
                    <div className="analysis-row">
                        <span className="analysis-label">Coverage per event</span>
                        <span className="analysis-value" style={{ color: 'var(--accent-cyan)' }}>₹{plan?.payout?.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="analysis-row">
                        <span className="analysis-label">Max weekly protection</span>
                        <span className="analysis-value" style={{ color: 'var(--accent-cyan)' }}>₹{plan?.maxWeekly?.toLocaleString('en-IN')}</span>
                    </div>
                    <div style={{
                        marginTop: '12px',
                        paddingTop: '12px',
                        borderTop: '2px solid rgba(255,255,255,0.1)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                        <span style={{ fontSize: '16px', fontWeight: 700 }}>Total Due</span>
                        <span style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: '32px',
                            fontWeight: 900,
                            color: 'var(--accent-orange)',
                        }}>₹{plan?.price}</span>
                    </div>
                </div>

                {/* UPI Selection */}
                <div className="glass-card animate-slide-up delay-1" style={{ marginBottom: '16px' }}>
                    <p style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '12px', textTransform: 'uppercase' }}>
                        Pay With UPI
                    </p>
                    <div className="upi-methods">
                        {upiMethods.map(m => (
                            <button
                                key={m.id}
                                className={`upi-chip ${selectedUpi === m.id ? 'selected' : ''}`}
                                onClick={() => setSelectedUpi(m.id)}
                                style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', padding: '14px 8px' }}
                            >
                                <span style={{ fontSize: '24px' }}>{m.icon}</span>
                                <span style={{ fontSize: '12px' }}>{m.name}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Coverage note */}
                <div className="glass-card animate-slide-up delay-2" style={{ padding: '14px 16px', marginBottom: '20px' }}>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                        <span style={{ fontSize: '16px' }}>ℹ️</span>
                        <div style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                            <strong style={{ color: 'var(--text-primary)' }}>Coverage starts this Monday.</strong> Auto-renews weekly. Cancel anytime from your dashboard. Only covers income loss — no health/vehicle claims.
                        </div>
                    </div>
                </div>

                <button className="btn btn-success btn-block btn-lg" onClick={handlePay}>
                    🔒 Pay ₹{plan?.price} via {upiMethods.find(m => m.id === selectedUpi)?.name}
                </button>

                <p style={{
                    textAlign: 'center',
                    fontSize: '11px',
                    color: 'var(--text-muted)',
                    marginTop: '12px',
                    paddingBottom: '20px',
                }}>
                    💡 That's just {Math.ceil(plan?.price / 28)} delivery order{Math.ceil(plan?.price / 28) > 1 ? 's' : ''} worth of protection!
                </p>
            </div>
        </div>
    )
}
