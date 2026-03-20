import { useState } from 'react'

const CITIES = [
    'Hyderabad', 'Delhi', 'Mumbai', 'Bangalore', 'Chennai',
    'Kolkata', 'Pune', 'Lucknow', 'Jaipur', 'Ahmedabad'
]

const PLATFORMS = ['Zomato', 'Swiggy', 'Both (Zomato + Swiggy)']

export default function Onboarding({ onComplete, showToast }) {
    const [form, setForm] = useState({
        name: '',
        phone: '',
        city: 'Hyderabad',
        platform: 'Zomato',
        deliveriesPerDay: '25',
        monthsActive: '12',
        vehicleType: 'bike',
    })

    const [step, setStep] = useState(1)

    const updateField = (field, value) => {
        setForm(prev => ({ ...prev, [field]: value }))
    }

    const handleNext = () => {
        if (step === 1) {
            if (!form.name || !form.phone) {
                showToast('Please fill all fields', 'warning')
                return
            }
            if (form.phone.length !== 10) {
                showToast('Enter valid 10-digit phone number', 'warning')
                return
            }
            setStep(2)
        } else {
            onComplete(form)
        }
    }

    return (
        <div className="screen">
            <div className="container">
                {/* Hero Section */}
                <div style={{ textAlign: 'center', padding: '20px 0 24px' }}>
                    <div style={{ fontSize: '52px', marginBottom: '12px' }}>
                        {step === 1 ? '👋' : '🛵'}
                    </div>
                    <h1 style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '26px',
                        fontWeight: 800,
                        marginBottom: '8px',
                        lineHeight: 1.2,
                    }}>
                        {step === 1 ? (
                            <>
                                Protect Your <span className="text-gradient-orange">Income</span>
                            </>
                        ) : (
                            <>
                                Your <span className="text-gradient-orange">Delivery</span> Profile
                            </>
                        )}
                    </h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.5 }}>
                        {step === 1
                            ? 'Income shield for weather & disruption losses. No health/accident/vehicle coverage.'
                            : 'Help our AI recommend the best plan for you'
                        }
                    </p>
                </div>

                {/* Progress */}
                <div className="progress-bar">
                    <div className="progress-fill" style={{ width: step === 1 ? '50%' : '100%' }} />
                </div>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)', textAlign: 'right', marginBottom: '20px' }}>
                    Step {step} of 2
                </p>

                {step === 1 ? (
                    /* Step 1: Personal Info */
                    <div className="animate-slide-up">
                        <div className="glass-card" style={{ marginBottom: '16px' }}>
                            <div className="form-group">
                                <label className="form-label">Full Name</label>
                                <input
                                    className="form-input"
                                    type="text"
                                    placeholder="e.g. Rajesh Kumar"
                                    value={form.name}
                                    onChange={e => updateField('name', e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Mobile Number</label>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <div style={{
                                        padding: '14px 12px',
                                        background: 'var(--bg-glass)',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        borderRadius: 'var(--radius-md)',
                                        color: 'var(--text-secondary)',
                                        fontSize: '15px',
                                        flexShrink: 0,
                                    }}>+91</div>
                                    <input
                                        className="form-input"
                                        type="tel"
                                        placeholder="98765 43210"
                                        maxLength="10"
                                        value={form.phone}
                                        onChange={e => updateField('phone', e.target.value.replace(/\D/g, ''))}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="form-label">City</label>
                                <select
                                    className="form-select"
                                    value={form.city}
                                    onChange={e => updateField('city', e.target.value)}
                                >
                                    {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>
                        </div>

                        {/* Trust badges */}
                        <div className="features-grid">
                            <div className="feature-item animate-slide-up delay-1">
                                <div className="feature-icon">🔒</div>
                                <div className="feature-name">Data encrypted</div>
                            </div>
                            <div className="feature-item animate-slide-up delay-2">
                                <div className="feature-icon">⚡</div>
                                <div className="feature-name">60-sec signup</div>
                            </div>
                            <div className="feature-item animate-slide-up delay-3">
                                <div className="feature-icon">🚫</div>
                                <div className="feature-name">No health/accident</div>
                            </div>
                            <div className="feature-item animate-slide-up delay-4">
                                <div className="feature-icon">💰</div>
                                <div className="feature-name">Income only</div>
                            </div>
                        </div>
                    </div>
                ) : (
                    /* Step 2: Delivery Profile */
                    <div className="animate-slide-up">
                        <div className="glass-card" style={{ marginBottom: '16px' }}>
                            <div className="form-group">
                                <label className="form-label">Delivery Platform</label>
                                <select
                                    className="form-select"
                                    value={form.platform}
                                    onChange={e => updateField('platform', e.target.value)}
                                >
                                    {PLATFORMS.map(p => <option key={p} value={p}>{p}</option>)}
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Avg. Deliveries per Day</label>
                                <input
                                    className="form-input"
                                    type="number"
                                    min="5"
                                    max="60"
                                    value={form.deliveriesPerDay}
                                    onChange={e => updateField('deliveriesPerDay', e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Months on Platform</label>
                                <input
                                    className="form-input"
                                    type="number"
                                    min="1"
                                    max="120"
                                    value={form.monthsActive}
                                    onChange={e => updateField('monthsActive', e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Vehicle Type</label>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    {[
                                        { value: 'bike', icon: '🏍️', label: 'Bike' },
                                        { value: 'scooter', icon: '🛵', label: 'Scooter' },
                                        { value: 'cycle', icon: '🚲', label: 'Cycle' },
                                    ].map(v => (
                                        <button
                                            key={v.value}
                                            className={`upi-chip ${form.vehicleType === v.value ? 'selected' : ''}`}
                                            onClick={() => updateField('vehicleType', v.value)}
                                            style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', padding: '12px 8px' }}
                                        >
                                            <span style={{ fontSize: '24px' }}>{v.icon}</span>
                                            <span style={{ fontSize: '12px' }}>{v.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* What we cover */}
                        <div className="glass-card" style={{ padding: '16px' }}>
                            <p style={{ fontSize: '12px', fontWeight: 700, color: 'var(--accent-cyan)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                ✅ What GigGuard Covers
                            </p>
                            <div style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                                <div>🌧️ Heavy Rain → Lost orders → Income protected</div>
                                <div>🔥 Extreme Heat → App halts → Income protected</div>
                                <div>🌫️ Severe Pollution → Fewer trips → Income protected</div>
                                <div>🚧 Strikes/Curfews → Zone closed → Income protected</div>
                            </div>
                            <p style={{ fontSize: '11px', color: 'var(--accent-red)', marginTop: '8px', fontWeight: 600 }}>
                                ❌ NO health, accident, life, or vehicle repair coverage
                            </p>
                        </div>
                    </div>
                )}

                {/* Action Buttons */}
                <div style={{ marginTop: '24px', paddingBottom: '20px' }}>
                    <button className="btn btn-primary btn-block btn-lg" onClick={handleNext}>
                        {step === 1 ? 'Next → Delivery Profile' : '🧠 Generate AI Risk Score'}
                    </button>
                    {step === 2 && (
                        <button
                            className="btn btn-secondary btn-block"
                            style={{ marginTop: '10px' }}
                            onClick={() => setStep(1)}
                        >
                            ← Back
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}
