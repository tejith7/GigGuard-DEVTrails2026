import { useState, useEffect } from 'react'

// City risk factors (simulated AI model)
const CITY_RISK = {
    'Delhi': { score: 82, level: 'High', color: '#ef4444', factors: ['AQI 400+', 'Extreme heat', 'Floods'], premiumMod: 1.15 },
    'Kolkata': { score: 75, level: 'High', color: '#ef4444', factors: ['Cyclones', 'AQI 350+', 'Waterlogging'], premiumMod: 1.10 },
    'Mumbai': { score: 70, level: 'Medium-High', color: '#f97316', factors: ['Heavy monsoon', 'Flooding', 'Waterlogging'], premiumMod: 1.08 },
    'Chennai': { score: 65, level: 'Medium', color: '#fbbf24', factors: ['Cyclones', 'Heat waves', 'Heavy rain'], premiumMod: 1.05 },
    'Hyderabad': { score: 55, level: 'Medium', color: '#fbbf24', factors: ['Heavy rain', 'Heat waves', 'AQI spikes'], premiumMod: 1.0 },
    'Bangalore': { score: 45, level: 'Low-Medium', color: '#22d3ee', factors: ['Heavy rain', 'Traffic floods'], premiumMod: 0.95 },
    'Pune': { score: 42, level: 'Low-Medium', color: '#22d3ee', factors: ['Monsoon rain', 'Heat waves'], premiumMod: 0.95 },
    'Jaipur': { score: 60, level: 'Medium', color: '#fbbf24', factors: ['Extreme heat', 'Sandstorms'], premiumMod: 1.02 },
    'Lucknow': { score: 68, level: 'Medium-High', color: '#f97316', factors: ['AQI 500+', 'Heat waves', 'Fog'], premiumMod: 1.06 },
    'Ahmedabad': { score: 62, level: 'Medium', color: '#fbbf24', factors: ['Extreme heat', 'Cyclones'], premiumMod: 1.03 },
}

export default function RiskScore({ userData, onComplete }) {
    const [phase, setPhase] = useState('analyzing') // analyzing, result
    const [progress, setProgress] = useState(0)
    const [currentTask, setCurrentTask] = useState('Initializing AI engine...')
    const [animatedScore, setAnimatedScore] = useState(0)

    const cityRisk = CITY_RISK[userData?.city] || CITY_RISK['Hyderabad']

    // Calculate experience factor
    const months = parseInt(userData?.monthsActive || 12)
    const deliveries = parseInt(userData?.deliveriesPerDay || 25)
    const experienceBonus = months > 24 ? -5 : months > 12 ? -2 : 3
    const volumeBonus = deliveries > 30 ? 3 : deliveries > 20 ? 0 : -2
    const finalScore = Math.min(95, Math.max(20, cityRisk.score + experienceBonus + volumeBonus))

    const tasks = [
        'Fetching weather history for ' + (userData?.city || 'Hyderabad') + '...',
        'Analyzing AQI patterns (last 12 months)...',
        'Scanning flood & cyclone risk zones...',
        'Evaluating delivery volume patterns...',
        'Running Random Forest risk model...',
        'Computing personalized risk score...',
    ]

    useEffect(() => {
        if (phase !== 'analyzing') return

        let taskIndex = 0
        const interval = setInterval(() => {
            taskIndex++
            if (taskIndex < tasks.length) {
                setCurrentTask(tasks[taskIndex])
                setProgress(Math.min(100, (taskIndex / tasks.length) * 100))
            } else {
                setPhase('result')
                clearInterval(interval)
            }
        }, 600)

        return () => clearInterval(interval)
    }, [phase])

    // Animate score counter
    useEffect(() => {
        if (phase !== 'result') return
        let current = 0
        const step = finalScore / 30
        const interval = setInterval(() => {
            current += step
            if (current >= finalScore) {
                setAnimatedScore(finalScore)
                clearInterval(interval)
            } else {
                setAnimatedScore(Math.round(current))
            }
        }, 30)
        return () => clearInterval(interval)
    }, [phase, finalScore])

    const riskLevel = finalScore >= 70 ? 'High' : finalScore >= 50 ? 'Medium' : 'Low'
    const riskColor = finalScore >= 70 ? '#ef4444' : finalScore >= 50 ? '#fbbf24' : '#06d6a0'

    // SVG circle calculations
    const radius = 75
    const circumference = 2 * Math.PI * radius
    const dashOffset = circumference - (animatedScore / 100) * circumference

    if (phase === 'analyzing') {
        return (
            <div className="screen">
                <div className="container" style={{ textAlign: 'center', paddingTop: '60px' }}>
                    <div style={{ fontSize: '64px', marginBottom: '20px' }}>🧠</div>
                    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', marginBottom: '8px' }}>
                        AI Risk Analysis
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '32px' }}>
                        Running ML model on your profile...
                    </p>
                    <div className="spinner" />
                    <div className="progress-bar" style={{ margin: '24px 0' }}>
                        <div className="progress-fill" style={{ width: `${progress}%` }} />
                    </div>
                    <p style={{ color: 'var(--accent-orange)', fontSize: '13px', fontWeight: 600 }}>
                        {currentTask}
                    </p>

                    <div className="glass-card" style={{ marginTop: '32px', textAlign: 'left', padding: '16px' }}>
                        <p style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>
                            Model: Random Forest + Hyper-local Risk Engine
                        </p>
                        <div className="timeline">
                            {tasks.map((task, i) => (
                                <div key={i} className={`timeline-item ${progress > (i / tasks.length) * 100 ? 'completed' : ''}`}>
                                    <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{task}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="screen">
            <div className="container" style={{ textAlign: 'center' }}>
                <h2 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '22px',
                    marginTop: '20px',
                    marginBottom: '4px',
                }}>
                    Your <span className="text-gradient-orange">AI Risk</span> Score
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginBottom: '10px' }}>
                    Based on city, platform data & weather ML model
                </p>

                {/* Risk Circle */}
                <div className="risk-circle-container">
                    <svg width="180" height="180" style={{ transform: 'rotate(-90deg)' }}>
                        <circle className="risk-circle-bg" cx="90" cy="90" r={radius} />
                        <circle
                            className="risk-circle-fill"
                            cx="90" cy="90" r={radius}
                            stroke={riskColor}
                            strokeDasharray={circumference}
                            strokeDashoffset={dashOffset}
                        />
                    </svg>
                    <div className="risk-score-text">
                        <div className="risk-score-number" style={{ color: riskColor }}>
                            {animatedScore}
                        </div>
                        <div className="risk-score-label">Risk Score</div>
                    </div>
                </div>

                <div className="badge" style={{
                    background: `${riskColor}20`,
                    color: riskColor,
                    fontSize: '13px',
                    padding: '6px 16px',
                    margin: '0 auto 20px',
                }}>
                    {riskLevel} Risk Zone
                </div>

                {/* Risk Factors */}
                <div className="glass-card animate-slide-up delay-1" style={{ textAlign: 'left', marginBottom: '12px' }}>
                    <p style={{ fontSize: '12px', fontWeight: 700, color: 'var(--accent-orange)', marginBottom: '10px', textTransform: 'uppercase' }}>
                        📍 {userData?.city} Risk Factors
                    </p>
                    {cityRisk.factors.map((factor, i) => (
                        <div key={i} className="analysis-row">
                            <span className="analysis-label">
                                <span>⚠️</span> {factor}
                            </span>
                            <span className="badge badge-red" style={{ fontSize: '10px' }}>risk factor</span>
                        </div>
                    ))}
                </div>

                {/* Profile Summary */}
                <div className="glass-card animate-slide-up delay-2" style={{ textAlign: 'left', marginBottom: '12px' }}>
                    <p style={{ fontSize: '12px', fontWeight: 700, color: 'var(--accent-cyan)', marginBottom: '10px', textTransform: 'uppercase' }}>
                        📊 Profile Analysis
                    </p>
                    <div className="analysis-row">
                        <span className="analysis-label">Platform</span>
                        <span className="analysis-value">{userData?.platform}</span>
                    </div>
                    <div className="analysis-row">
                        <span className="analysis-label">Daily Deliveries</span>
                        <span className="analysis-value">{userData?.deliveriesPerDay}</span>
                    </div>
                    <div className="analysis-row">
                        <span className="analysis-label">Experience</span>
                        <span className="analysis-value">{userData?.monthsActive} months</span>
                    </div>
                    <div className="analysis-row">
                        <span className="analysis-label">Vehicle</span>
                        <span className="analysis-value" style={{ textTransform: 'capitalize' }}>{userData?.vehicleType}</span>
                    </div>
                    <div className="analysis-row">
                        <span className="analysis-label">Est. Weekly Income</span>
                        <span className="analysis-value" style={{ color: 'var(--accent-cyan)' }}>
                            ₹{(deliveries * 28 * (userData?.vehicleType === 'cycle' ? 0.7 : 1)).toLocaleString('en-IN')}
                        </span>
                    </div>
                </div>

                {/* AI Recommendation */}
                <div className="glass-card animate-slide-up delay-3" style={{
                    borderColor: 'var(--accent-orange)',
                    borderWidth: '1px',
                    textAlign: 'center',
                    marginBottom: '20px',
                }}>
                    <p style={{ fontSize: '11px', color: 'var(--accent-orange)', fontWeight: 700, marginBottom: '6px', textTransform: 'uppercase' }}>
                        🧠 AI Recommendation
                    </p>
                    <p style={{ fontSize: '15px', fontWeight: 700, marginBottom: '4px' }}>
                        {finalScore >= 70
                            ? 'Ultra Plan (₹129/week) recommended'
                            : finalScore >= 50
                                ? 'Pro Plan (₹89/week) recommended'
                                : 'Basic Plan (₹49/week) is sufficient'}
                    </p>
                    <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                        Based on {userData?.city} weather patterns + your delivery volume
                    </p>
                </div>

                <button
                    className="btn btn-primary btn-block btn-lg"
                    onClick={() => onComplete({
                        score: finalScore,
                        level: riskLevel,
                        color: riskColor,
                        cityRisk,
                        weeklyIncome: deliveries * 28 * (userData?.vehicleType === 'cycle' ? 0.7 : 1),
                    })}
                >
                    View Plans → Choose Your Shield
                </button>
            </div>
        </div>
    )
}
