# GigGuard – AI Parametric Income Shield for Zomato & Swiggy Delivery Partners  
**Guidewire DEVTrails 2026 | Phase 1 Submission**  
**Submitted by:** Tejith Reddy | Hyderabad  
**Date:** 19 March 2026  

## 🎯 Chosen Persona & Requirement
**Sub-category:** Food Delivery Partners (Zomato / Swiggy)  
**Persona:** Rajesh Kumar, 28, Hyderabad, full-time rider  
- Weekly earning: ₹4,200 – ₹5,100 (6 days × ₹700–850 net/day)  
- Real loss on bad day: ₹500 – ₹750 (rain/heat/pollution)  

**Scenarios we solve:**  
1. Heavy rain (82 mm) → only 8 orders instead of 35 → ₹1,800 lost  
2. Extreme heat (>41°C) → orders cancelled by app  
3. Severe Pollution (AQI 720, common in Delhi/Kolkata) → speed drops + fewer incentives  
4. Strikes / Curfews → zone closures → zero deliveries  

**Golden Rules Followed:**  
- ✅ Only **Loss of Income** coverage  
- ❌ No health, life, accident, or vehicle repair coverage  
- ✅ **Weekly pricing** model  

## 📱 Platform: Mobile-First Web App (React + Vite)
**Why?**  
- Riders already live on their phones (Zomato/Swiggy apps)  
- UPI payment in 1 tap  
- Works on any browser — no app store approval needed  
- Push notifications for claim alerts  

## 💰 Weekly Premium Model

| Plan   | Weekly Premium | Payout per Trigger Event | Weekly Max (2-payout cap) | Best For |
|--------|----------------|--------------------------|---------------------------|----------|
| Basic  | ₹49            | ₹699                     | ₹1,398                    | New / part-time riders |
| Pro    | ₹89            | ₹1,199                   | ₹2,398                    | Most full-time riders (Recommended) |
| Ultra  | ₹129           | ₹1,699                   | ₹3,398                    | High-risk zones (Delhi/Kolkata) |

- Auto-renews every Monday via UPI  
- AI dynamically recommends plan based on city + risk score  
- Premium feels like "one extra order fee" – very affordable  

## 🌩️ Parametric Triggers

| # | Trigger | Source API | Threshold | Impact |
|---|---------|-----------|-----------|--------|
| 1 | Heavy Rain | OpenWeather API | >40mm/hr | Deliveries halted |
| 2 | Extreme Heat | OpenWeather API | >41°C + humidity | App cancels orders |
| 3 | Severe Pollution | AQI API (mock) | AQI ≥350 | Speed drops, fewer trips |
| 4 | Strike/Curfew | Admin trigger | Official order | Zone closure |

**Weekly Cap:** Max 2 payouts per week (anti-abuse + sustainability)  

## 🧠 AI/ML Integration Plan

| Feature | Technique | Status |
|---------|-----------|--------|
| Dynamic Premium | Random Forest + hyper-local risk | Phase 1 (mock) |
| Risk Profiling | City + weather forecast + pincode | ✅ Implemented |
| Fraud Detection | Isolation Forest + GPS + order validation | Phase 3 |
| Claim Auto-Approval | Rule engine + API trigger verification | ✅ Implemented |

## 🔄 Complete User Workflow
1. **60-sec Onboarding** — Name, phone, city, platform, vehicle  
2. **AI Risk Score** — Animated ML analysis with city-specific factors  
3. **Choose Plan** — ₹49/₹89/₹129 with AI recommendation  
4. **UPI Payment** — GPay/PhonePe/Paytm → instant activation  
5. **Dashboard** — Active policy, earnings protected, coverage details  
6. **Disruption** → Auto trigger → Instant payout (under 60 sec)  

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19 + Vite 8 |
| Styling | Vanilla CSS (glassmorphism, dark theme) |
| Design | Mobile-first (420px), responsive |
| Fonts | Inter + Outfit (Google Fonts) |
| APIs (planned) | OpenWeather, AQI, Razorpay Test |
| Backend (Phase 2) | Node.js + Firebase |
| AI Mock (Phase 2) | Python Flask |

## 🚀 How to Run

```bash
# Clone the repo
git clone https://github.com/tejithreddy/GigGuard-DEVTrails2026.git
cd GigGuard-DEVTrails2026

# Install dependencies
npm install

# Start dev server
npm run dev

# Open http://localhost:5173
```

## 📱 Prototype Screens

| Screen | Description |
|--------|-------------|
| Onboarding (Step 1) | Personal info — name, phone, city |
| Onboarding (Step 2) | Delivery profile — platform, deliveries/day, vehicle |
| AI Risk Score | Animated analysis → SVG circle score → risk factors |
| Plan Selection | 3 plans with AI recommendation badge |
| UPI Payment | Payment processing → success confirmation |
| Dashboard | Active policy, metrics grid, coverage list |
| Disruption Simulator | 4 triggers with weather overlays |
| Payout Modal | Verification → auto-approval → instant UPI payout |
| Claims Log | History with timestamps + anti-fraud section |

## 📍 Deliverables Status (Phase 1)
- ✅ Detailed README (this file)  
- ✅ Persona scenarios + workflow  
- ✅ Weekly model + parametric triggers + platform justification  
- ✅ AI/ML + fraud detection plan  
- ✅ Tech stack + development plan  
- ✅ GitHub repository  
- ✅ Working prototype (9 screens)  
- ⬜ 2-minute video (record from prototype)  

## 📹 2-Minute Video
**Link:** [YouTube unlisted – paste your link here]  
Content: Persona → Rules → 9 screens demo → Rain + Pollution trigger → Payout → Weekly cap → "Ready for Phase 2"

---

**Ready for Phase 2: Automation & Protection** 🚀  
**GitHub Repo:** https://github.com/tejithreddy/GigGuard-DEVTrails2026  
**Submitted:** 19 March 2026  
