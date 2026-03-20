import { useState, useCallback } from 'react'
import Onboarding from './components/Onboarding'
import RiskScore from './components/RiskScore'
import PlanSelection from './components/PlanSelection'
import Payment from './components/Payment'
import Dashboard from './components/Dashboard'

const STEPS = ['onboarding', 'risk', 'plan', 'payment', 'dashboard']

function App() {
  const [currentStep, setCurrentStep] = useState('onboarding')
  const [userData, setUserData] = useState(null)
  const [riskData, setRiskData] = useState(null)
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [toast, setToast] = useState(null)

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }, [])

  const handleOnboardingComplete = (data) => {
    setUserData(data)
    setCurrentStep('risk')
  }

  const handleRiskComplete = (data) => {
    setRiskData(data)
    setCurrentStep('plan')
  }

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan)
    setCurrentStep('payment')
  }

  const handlePaymentComplete = () => {
    showToast('✅ Policy activated! You are now protected')
    setCurrentStep('dashboard')
  }

  const stepIndex = STEPS.indexOf(currentStep)

  return (
    <>
      <div className="bg-glow" />

      <div className="app-wrapper">
        <div className="phone-frame">
          {/* Header */}
          <header className="app-header">
            <div className="app-logo">
              <span className="shield">🛡️</span>
              <span>
                <span className="text-gradient-orange">Gig</span>Guard
              </span>
            </div>
            {currentStep !== 'dashboard' && (
              <span className="badge badge-orange">Phase 1</span>
            )}
            {currentStep === 'dashboard' && (
              <span className="badge badge-cyan">● Active</span>
            )}
          </header>

          {/* Step Indicator (not on dashboard) */}
          {currentStep !== 'dashboard' && (
            <div className="step-indicator">
              {STEPS.slice(0, 4).map((step, i) => (
                <div
                  key={step}
                  className={`step-dot ${i === stepIndex ? 'active' : ''} ${i < stepIndex ? 'completed' : ''}`}
                />
              ))}
            </div>
          )}

          {/* Screens */}
          {currentStep === 'onboarding' && (
            <Onboarding onComplete={handleOnboardingComplete} showToast={showToast} />
          )}
          {currentStep === 'risk' && (
            <RiskScore userData={userData} onComplete={handleRiskComplete} />
          )}
          {currentStep === 'plan' && (
            <PlanSelection riskData={riskData} onSelect={handlePlanSelect} />
          )}
          {currentStep === 'payment' && (
            <Payment plan={selectedPlan} onComplete={handlePaymentComplete} />
          )}
          {currentStep === 'dashboard' && (
            <Dashboard
              userData={userData}
              riskData={riskData}
              plan={selectedPlan}
              showToast={showToast}
            />
          )}
        </div>
      </div>

      {/* Toast Notification */}
      {toast && (
        <div className={`toast toast-${toast.type}`}>
          {toast.message}
        </div>
      )}
    </>
  )
}

export default App
