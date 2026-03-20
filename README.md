# GigGuard – AI-Powered Parametric Insurance for India's Gig Economy

**Guidewire DEVTrails 2026 | Phase 1: Ideation & Foundation**

---

## Table of Contents

1. [Overview](#overview)
2. [Persona & Scenarios](#persona--scenarios)
3. [Application Workflow](#application-workflow)
4. [Weekly Premium Model](#weekly-premium-model)
5. [Parametric Triggers](#parametric-triggers)
6. [AI/ML Integration](#aiml-integration)
7. [Fraud Detection Strategy](#fraud-detection-strategy)
8. [Adversarial Defense & Anti-Spoofing Strategy](#adversarial-defense--anti-spoofing-strategy)
9. [Platform Choice & Justification](#platform-choice--justification)
10. [Tech Stack](#tech-stack)
11. [Development Plan](#development-plan)

---

## Overview

GigGuard is a parametric insurance platform built specifically for food delivery partners working with platforms like Zomato and Swiggy. The product addresses a critical gap: gig workers currently have **zero income protection** when external disruptions — heavy rain, extreme heat, hazardous pollution, or sudden zone closures — force them off the road.

Unlike traditional insurance that requires manual claims and lengthy processing, GigGuard uses **parametric triggers** tied to real-time external data. When a qualifying disruption occurs, the system automatically initiates a claim and processes the payout — no paperwork, no waiting.

**What GigGuard covers:** Loss of income due to external disruptions only.  
**What GigGuard does NOT cover:** Health, life, accidents, vehicle repairs, or any medical expenses.

---

## Persona & Scenarios

**Chosen Sub-category:** Food Delivery Partners (Zomato / Swiggy)

### Target Persona

| Attribute | Detail |
|-----------|--------|
| Name | Rajesh Kumar |
| Age | 28 |
| City | Hyderabad |
| Role | Full-time delivery partner (Zomato) |
| Vehicle | Motorcycle |
| Avg. Daily Deliveries | 25–35 orders |
| Weekly Earnings | Rs.4,200 – Rs.5,100 (6 days x Rs.700–850/day) |
| Loss on a disrupted day | Rs.500 – Rs.750 |

### Scenario Walkthroughs

**Scenario 1: Heavy Rainfall**  
Rajesh logs in for his evening shift. A heavy rainstorm (82mm) hits Hyderabad. Order volume drops from 35 to 8. He loses approximately Rs.1,800 in potential earnings. GigGuard detects the rainfall via OpenWeather API, auto-approves his claim, and credits Rs.1,199 to his UPI account within 60 seconds.

**Scenario 2: Extreme Heat Wave**  
Temperature crosses 44°C with high humidity. Zomato restricts deliveries in his zone. Rajesh cannot work for 5+ hours. GigGuard's temperature trigger activates, and his lost income is partially covered through an automatic payout.

**Scenario 3: Severe Air Pollution**  
AQI reaches 720 in Delhi (a common occurrence during winter). Delivery speed drops, fewer orders come through, and platform incentives decrease. GigGuard's pollution trigger activates once AQI crosses the 350 threshold.

**Scenario 4: Zone Closure / Strike**  
A sudden market shutdown or local strike prevents Rajesh from accessing his usual pickup zone. The admin-triggered closure event initiates an automatic claim.

---

## Application Workflow

```
Registration (60 sec)
    |
    v
AI Risk Assessment
    |-- City-level weather history
    |-- Platform experience
    |-- Delivery volume analysis
    |-- Vehicle type factor
    |
    v
Risk Score Generated (0-100)
    |
    v
Plan Recommendation (AI-driven)
    |
    v
Plan Selection (Basic / Pro / Ultra)
    |
    v
UPI Payment (Weekly auto-renew)
    |
    v
Policy Active (Monday - Sunday)
    |
    v
Real-time Monitoring
    |-- Weather API polling
    |-- AQI data feeds
    |-- Admin trigger checks
    |
    v
Disruption Detected?
    |-- YES --> Auto Claim --> Verification --> Instant UPI Payout
    |-- NO  --> Continue monitoring
```

The entire onboarding process takes under 60 seconds. Workers provide basic details (name, phone, city, platform, delivery stats), receive an AI-generated risk score, select a plan, and pay via UPI. After activation, the system monitors for disruptions and handles claims automatically.

---

## Weekly Premium Model

The pricing is structured on a **weekly basis** to match the typical payout cycle of gig workers. Premiums are priced to feel like "one extra delivery order" — affordable and predictable.

| Plan | Weekly Premium | Payout per Event | Max Weekly Payout | Cap | Target Segment |
|------|---------------|-------------------|-------------------|-----|----------------|
| Basic | Rs.49 | Rs.699 | Rs.1,398 | 2 claims/week | Part-time / new riders |
| Pro | Rs.89 | Rs.1,199 | Rs.2,398 | 2 claims/week | Full-time riders |
| Ultra | Rs.129 | Rs.1,699 | Rs.3,398 | 2 claims/week | High-risk zone riders (Delhi, Kolkata) |

**Key design decisions:**
- **2 payouts per week cap** prevents abuse while remaining sustainable for the insurer.
- **Auto-renewal every Monday** via UPI ensures uninterrupted coverage.
- The AI engine recommends a plan based on the worker's city risk profile and delivery pattern.
- Workers in historically safe zones receive lower effective premiums in Phase 2 through dynamic pricing adjustments.

---

## Parametric Triggers

Each trigger is tied to an external, independently verifiable data source. This removes subjectivity from claim processing.

| Trigger | Data Source | Activation Threshold | Rationale |
|---------|------------|---------------------|-----------|
| Heavy Rain | OpenWeather API | >40mm/hr precipitation | Delivery platforms reduce/halt orders; roads become unsafe |
| Extreme Heat | OpenWeather API | >41°C + high humidity index | Platform-initiated delivery restrictions; health risk for riders |
| Severe Pollution | AQI API | AQI >= 350 | Reduced delivery speed, fewer orders, lower platform incentives |
| Zone Closure / Strike | Admin Manual Trigger | Official government/police order | Complete inability to access pickup/drop locations |

**How triggers work in the prototype:**  
The Simulate tab on the dashboard lets evaluators trigger any of the four disruption types. Each trigger shows the data source verification, auto-approval flow, and instant payout animation — demonstrating the zero-touch claim experience.

---

## AI/ML Integration

### 1. Dynamic Premium Calculation (Phase 1: Rule-based | Phase 2: ML)

The risk score engine evaluates each worker across multiple dimensions:

- **City Risk Factor:** Historical weather data, flood-prone zones, AQI patterns (Delhi scores 82/100 vs Bangalore at 45/100).
- **Experience Modifier:** Workers with 24+ months on-platform receive lower risk adjustments, reflecting their ability to navigate disruptions.
- **Volume Factor:** High-volume riders (30+ deliveries/day) face marginally higher exposure.
- **Vehicle Type:** Bicycle riders have different risk profiles compared to motorcycle riders.

In Phase 2, this transitions from the current rule-based scoring to a **Random Forest model** trained on historical city weather data, platform order volume correlations, and rider-specific patterns.

### 2. Predictive Risk Modeling

The system generates hyper-local risk forecasts:
- 7-day weather prediction for the worker's operating pincode
- Historical AQI trend analysis (seasonal patterns — Delhi winter, Mumbai monsoon)
- Flood zone mapping based on past waterlogging data

### 3. Claim Auto-Approval Engine

When a parametric trigger fires:
1. External data is fetched and verified against the threshold
2. Worker's active policy and remaining claim count are validated
3. GPS location is cross-referenced with the affected zone (Phase 3)
4. If all checks pass, the claim is auto-approved and payout is initiated

---

## Fraud Detection Strategy

Fraud detection is critical for parametric insurance sustainability. Our approach is layered:

| Layer | Mechanism | Phase |
|-------|-----------|-------|
| Duplicate Prevention | Max 2 claims per week per policy; same-trigger cooldown period | Phase 1 (Implemented) |
| Location Validation | GPS coordinates cross-referenced with disruption zone at time of trigger | Phase 3 |
| Activity Verification | Platform order attempt data to confirm the worker was active/attempting to work | Phase 3 |
| Anomaly Detection | Isolation Forest algorithm to flag statistical outliers in claim patterns | Phase 3 |
| Historical Cross-Check | Weather claims validated against actual historical data from the same location | Phase 3 |

The Phase 1 prototype implements the weekly claim cap (2 payouts max) as the foundational anti-abuse mechanism. Advanced ML-based detection rolls out in Phase 3.

---

## Adversarial Defense & Anti-Spoofing Strategy

### Executive Summary

This system assumes GPS is already compromised and shifts focus from proving a location to proving real behaviour over time and across many users. Fraud gets caught through multiple signals — device checks, physics rules, and behaviour patterns — then gets exposed through cluster analysis. Instead of banning users immediately, the system holds or slows payouts to stop money loss while evidence is collected. Genuine riders stay safe with step-by-step checks and a clear recovery path. The result: fraud becomes slow, visible, and economically unviable for attackers.

### Threat Model

A coordinated group of approximately 500 fake or compromised delivery partners uses widespread GPS spoofing (Mock Location apps, emulators, rooted devices, signal injection) to fake pickups and deliveries, farm surge zones, and drain the insurance and payout liquidity pool with fabricated completed orders or stranded worker claims.

The core challenge is distinguishing these organised fraudsters from actual riders who are stuck because of traffic jams, bike breakdown, heavy rain, low battery, or poor network.

**Target:** Near-zero tolerance for fraud rings with under 1.5% false positives on honest partners.

### Core Philosophy

The system does not attempt to prove location is real. It proves behaviour is real over time and across users. Simple GPS checks are no longer reliable. Defence must be multi-layered, zero-trust on anything the device reports, and maintain a human safety net for genuine problems.

### 1. Hard Integrity and Spoofing Detection Layer

These signals trigger immediate escalation or block. Most spoofing tools cannot consistently replicate them at scale.

- **Mock / developer flags:** Android `Settings.Secure.ALLOW_MOCK_LOCATION`, `Location.isFromMockProvider`, `isMock` extra present — immediate high-risk score (95+).
- **Provider and accuracy mismatch:** Provider reports `gps` but shows unrealistically perfect accuracy (consistently under 3-5m for extended periods) or fused provider with mock flags.
- **Sensor fusion contradiction:** GPS claims movement above 5 km/h but accelerometer and gyroscope remain nearly flat for 3+ minutes (device is stationary).
- **Impossible velocity / teleport:** Consecutive pings show over 150 km/h in city or over 400 km/h anywhere, or jumps exceeding 10 km in under 60 seconds.
- **Impossible timing:** At restaurant to at customer in under 90 seconds with negligible actual route movement.
- **Raw GNSS integrity (planned):** Signal-to-noise ratio anomalies or satellite count irregularities indicating signal injection.

### 2. Behavioral and Contextual Differentiation

| Signal Category | Fraud Ring / Spoofer Pattern | Genuine Rider Pattern | Risk Impact |
|----------------|------------------------------|----------------------|-------------|
| Movement Profile | Perfect straight lines, identical routes on repeat, zero variation | Erratic moves, long stops, slow recovery | High — needs challenge |
| Speed and Route | Teleports or no movement while claiming progress | Follows real traffic congestion patterns | Low if matches |
| Order Cadence | 8-15 orders per hour from one small zone | Normal 2-5 per hour with natural gaps | Ring alert if over 7 |
| Device and Network | Same device on many accounts, battery always full | Normal battery drain and charging cycles | Trust boost |
| Time and Environment | Working in impossible conditions (2am in monsoon) | Matches actual weather or traffic reports | Low score |
| Customer Signals | Sudden perfect 5-star ratings or complete absence | Normal ratings with occasional traffic notes | Decay on repeat |
| Consistency Over Time | Identical behaviour every session | Day-to-day variation in routes and delays | High |

### 3. Fraud-Ring and Multi-Account Cluster Detection

At this scale, fraud is never solo. The system focuses on connections between accounts rather than individual ones.

**Behavioral Fingerprinting (Pattern Signature Layer)**

Every delivery run is converted into a pattern vector: route shape + timing + stops. When the same signature repeats across multiple accounts, it strongly indicates automation.

Example: exactly the same 3 routes executed with identical timing by 40 accounts = clear fraud ring. This catches coordination even when device IDs and IPs are masked.

**Additional Cluster Signals:**
- **Device and Identity Footprint:** Shared device IDs, emulator or root flags across accounts.
- **Temporal Synchronization:** Actions occurring within tight windows (under 120 seconds apart).
- **Zone Concentration:** 65% or more of earnings originating from just a few locations.
- **Network Footprint:** Multiple accounts behind the same proxy or datacenter IPs.
- **Graph Propagation:** If two accounts share strong fraud signals, the entire connected group gets escalated.

### 3.5. Payout Control Layer (Primary Economic Defense)

Fraud rings depend on extracting payouts before detection occurs. The system treats payouts as the primary control point:

- **Adaptive payout latency:** Low risk gets instant payout, medium risk gets 15-30 minute batch processing, high risk goes to escrow hold.
- **Cluster-level throttling:** Any linked group sees slower payouts across the board.
- **Randomized settlement windows:** Prevents coordinated withdrawal timing.

**Impact:** Even if early detection misses something, fraudsters still cannot cash out at scale. The system ensures fraud cannot grow economically.

### 4. Graduated Response and Honest-Worker Protection

**Risk-Based Actions:**

| Risk Score | Action |
|-----------|--------|
| 0–35 | Normal operation, no intervention |
| 36–65 | Soft challenge (selfie + package photo with timestamp, or OTP verification) |
| 66–100 | Payout hold, manual review, full cluster analysis |

**Trust Reinforcement:**
- Riders with 250+ completed orders and 4.3+ rating receive trusted status automatically.
- Successful appeals with supporting evidence get instant release and trust restoration.

**Appeal and Feedback Loop:**
- Every challenged rider receives a clear, plain-language explanation of why they were flagged.
- One-tap option to report genuine issues (breakdown + photo or voice note).
- All feedback is fed back into the model to reduce future false positives.

**KPI tracked weekly:** False-positive rate must stay under 1.5%.

### Why This Architecture Works

- Identifies advanced fraud rings through cluster analysis and behavioural signatures.
- Prevents actual money loss through payout timing controls.
- Protects genuine riders with explainable, graduated intervention steps.
- Handles 500+ coordinated attackers without resorting to blanket bans.

The system turns spoofing from a fast, scalable exploit into something slow, visible, and economically unviable.

---

## Platform Choice & Justification

**Decision: Mobile-first Web Application (React + Vite)**

| Factor | Justification |
|--------|--------------|
| User Behavior | Delivery partners already operate primarily on their phones running Zomato/Swiggy apps |
| Accessibility | Web app works on any device with a browser — no Play Store/App Store dependency |
| UPI Integration | Direct UPI payment links work seamlessly in mobile browsers |
| Development Speed | Single codebase serves all devices; faster iteration for the hackathon timeline |
| Offline Capability | Service workers can cache the app for offline access to policy details (Phase 2) |

The interface is designed at 420px width (standard mobile viewport) with a phone-frame presentation for desktop viewers.

---

## Tech Stack

| Component | Technology | Justification |
|-----------|-----------|---------------|
| Frontend | React 19 + Vite 8 | Fast HMR, modern JSX, component-based architecture |
| Styling | Vanilla CSS | Full control over design; no framework bloat |
| Design System | Custom (glassmorphism, dark theme) | Premium feel; high contrast for outdoor readability |
| Typography | Inter + Outfit (Google Fonts) | Clean, modern, highly readable on mobile |
| Deployment | Vercel | Zero-config for Vite; instant deploys from GitHub |
| Weather API (Phase 2) | OpenWeather (free tier) | Reliable, well-documented, supports Indian cities |
| AQI Data (Phase 2) | WAQI / IQAir API | Real-time AQI data for Indian metros |
| Payment (Phase 2) | Razorpay Test Mode | UPI-native; sandbox available for simulation |
| Backend (Phase 2) | Node.js + Firebase | Serverless functions; free tier sufficient for prototype |
| ML Pipeline (Phase 2) | Python (scikit-learn) | Random Forest for premium calculation; Isolation Forest for fraud |

---

## Development Plan

### Phase 1 (Weeks 1–2) — Ideation & Foundation [Current]
- Problem research and persona definition
- Weekly premium model design
- Parametric trigger identification
- Prototype development (9 screens)
- README documentation

### Phase 2 (Weeks 3–4) — Automation & Protection
- Backend API (Node.js + Firebase)
- Real OpenWeather and AQI API integration
- User registration with persistence
- Dynamic premium calculation using ML model
- 3–5 automated triggers with real data feeds
- Razorpay test mode integration for UPI payments
- Policy management (create, renew, cancel)

### Phase 3 (Weeks 5–6) — Scale & Optimize
- Isolation Forest fraud detection model
- GPS-based location validation
- Admin dashboard (loss ratios, predictive analytics)
- Worker dashboard (earnings protected, coverage history)
- Instant payout via Razorpay/UPI sandbox
- 5-minute demo video and final pitch deck

---

**Demo Video:** https://youtu.be/S-DJFSaWEcI?si=6aAj9nsYX5x7T8EQ  
**Prototype Link:** https://gig-guard-dev-trails2026.vercel.app/  
**Repository:** https://github.com/tejith7/GigGuard-DEVTrails2026

