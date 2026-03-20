import { useState } from 'react'

const PLANS = [
    {
        id: 'basic',
        name: 'Basic',
        emoji: '🥉',
        price: 49,
        payout: 699,
        maxWeekly: 1398,
        maxClaims: 2,
        features: ['Rain coverage', 'Heat coverage', '2 payouts/week', 'UPI instant payout'],
        bestFor: 'New / part-time riders',
    },
    {
        id: 'pro',
        name: 'Pro',
        emoji: '🥈',
        price: 89,
        payout: 1199,
        maxWeekly: 2398,
        maxClaims: 2,
        features: ['All Basic features', 'Pollution coverage', 'Strike/curfew coverage', 'Priority payout', '₹150 loyalty bonus'],
        bestFor: 'Full-time riders',
        recommended: true,
    },
    {
        id: 'ultra',
        name: 'Ultra',
        emoji: '🥇',
        price: 129,
        payout: 1699,
        maxWeekly: 3398,
        maxClaims: 2,
        features: ['All Pro features', 'Flood coverage', 'Multi-city coverage', 'Fastest payout', '₹200 loyalty bonus', 'Weekly risk report'],
        bestFor: 'High-risk zone riders',
    },
]

export default function PlanSelection({ riskData, onSelect }) {
    const [selected, setSelected] = useState('pro')
    const [expanded, setExpanded] = useState(null)

    const recommendedPlan = riskData?.score >= 70 ? 'ultra' : riskData?.score >= 50 ? 'pro' : 'basic'

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
                        Choose Your <span className="text-gradient-orange">Shield</span>
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>
                        Weekly pricing → Pay like one extra delivery order
                    </p>
                </div>

                {/* AI suggestion banner */}
                <div className="glass-card" style={{
                    padding: '12px 16px',
                    marginBottom: '16px',
                    borderColor: 'var(--accent-cyan)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                }}>
                    <span style={{ fontSize: '20px' }}>🧠</span>
                    <div style={{ flex: 1 }}>
                        <p style={{ fontSize: '12px', fontWeight: 700, color: 'var(--accent-cyan)' }}>
                            AI Recommendation
                        </p>
                        <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                            Based on risk score {riskData?.score}/100, we suggest the <strong style={{ color: 'var(--text-primary)' }}>{recommendedPlan.charAt(0).toUpperCase() + recommendedPlan.slice(1)}</strong> plan
                        </p>
                    </div>
                </div>

                {/* Plan Cards */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {PLANS.map((plan) => (
                        <div
                            key={plan.id}
                            className={`plan-card ${selected === plan.id ? 'selected' : ''} ${plan.id === recommendedPlan ? 'recommended' : ''}`}
                            onClick={() => {
                                setSelected(plan.id)
                                setExpanded(expanded === plan.id ? null : plan.id)
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                                <div style={{ fontSize: '36px' }}>{plan.emoji}</div>
                                <div style={{ flex: 1, textAlign: 'left' }}>
                                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                                        <span style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 800 }}>
                                            {plan.name}
                                        </span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginTop: '2px' }}>
                                        <span style={{
                                            fontFamily: 'var(--font-display)',
                                            fontSize: '28px',
                                            fontWeight: 900,
                                            color: 'var(--accent-orange)',
                                        }}>₹{plan.price}</span>
                                        <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>/week</span>
                                    </div>
                                    <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                                        {plan.bestFor}
                                    </p>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Payout</div>
                                    <div style={{
                                        fontFamily: 'var(--font-display)',
                                        fontSize: '20px',
                                        fontWeight: 800,
                                        color: 'var(--accent-cyan)',
                                    }}>₹{plan.payout.toLocaleString('en-IN')}</div>
                                    <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>per trigger</div>
                                </div>
                            </div>

                            {/* Expanded features */}
                            {(expanded === plan.id || selected === plan.id) && (
                                <div style={{
                                    marginTop: '14px',
                                    paddingTop: '14px',
                                    borderTop: '1px solid rgba(255,255,255,0.08)',
                                }}>
                                    {plan.features.map((f, i) => (
                                        <div key={i} style={{
                                            fontSize: '13px',
                                            color: 'var(--text-secondary)',
                                            padding: '3px 0',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '6px',
                                        }}>
                                            <span style={{ color: 'var(--accent-cyan)' }}>✓</span> {f}
                                        </div>
                                    ))}
                                    <div style={{
                                        marginTop: '10px',
                                        padding: '8px 12px',
                                        background: 'rgba(255,255,255,0.04)',
                                        borderRadius: 'var(--radius-sm)',
                                        fontSize: '12px',
                                        color: 'var(--text-secondary)',
                                    }}>
                                        Max weekly: <strong style={{ color: 'var(--text-primary)' }}>₹{plan.maxWeekly.toLocaleString('en-IN')}</strong> ({plan.maxClaims} payouts × ₹{plan.payout.toLocaleString('en-IN')})
                                    </div>
                                </div>
                            )}

                            {selected === plan.id && (
                                <div style={{
                                    position: 'absolute',
                                    top: '12px',
                                    left: '12px',
                                    width: '20px',
                                    height: '20px',
                                    background: 'var(--accent-orange)',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '12px',
                                }}>✓</div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Comparison callout */}
                <div style={{ textAlign: 'center', margin: '16px 0', fontSize: '12px', color: 'var(--text-muted)' }}>
                    ₹{PLANS.find(p => p.id === selected)?.price}/week = just {Math.ceil(PLANS.find(p => p.id === selected)?.price / 28)} extra delivery
                    {Math.ceil(PLANS.find(p => p.id === selected)?.price / 28) > 1 ? ' orders' : ' order'} 💪
                </div>

                <button
                    className="btn btn-primary btn-block btn-lg"
                    onClick={() => onSelect(PLANS.find(p => p.id === selected))}
                >
                    Select {PLANS.find(p => p.id === selected)?.name} → Pay ₹{PLANS.find(p => p.id === selected)?.price}
                </button>

                <p style={{
                    textAlign: 'center',
                    fontSize: '11px',
                    color: 'var(--text-muted)',
                    marginTop: '12px',
                    paddingBottom: '20px',
                }}>
                    🔒 Auto-renews every Monday via UPI • Cancel anytime
                </p>
            </div>
        </div>
    )
}
