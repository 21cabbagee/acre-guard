# AcreGuard — Smallholder Parametric Climate Agri-Insurance MGA

[![License: MIT](https://img.shields.io/badge/License-MIT-lime.svg)](https://opensource.org/licenses/MIT)
[![Deploy to GitHub Pages](https://github.com/21cabbagee/acre-guard/actions/workflows/deploy.yml/badge.svg)](https://github.com/21cabbagee/acre-guard/actions/workflows/deploy.yml)

> **Balance-sheet-light parametric weather-index insurance engine bundled into agro-dealer inputs and cooperative off-take contracts.**

---

## 1. Executive Summary & Problem Thesis
- **System Name:** AcreGuard
- **Market Sizing (TAM):** 30,000,000 smallholder farmer households across East & West Africa × $15 seasonal embedded fee = **$450 Million TAM** (scalable to $1.2B with reinsurance MGA commission pools).
- **The Problem:** Over 33 million smallholder farmers in Sub-Saharan Africa face climate catastrophe with zero insurance safety net. Traditional indemnity insurance requires physical claims adjusters whose travel and assessment costs exceed the farmer's net seasonal income. When iProcure entered administration, input distribution fractured, leaving smallholders exposed to total capital loss upon drought.
- **The Solution:** Satellite weather-index triggers (ECMWF, CHIRPS, Sentinel-2) mapped to 5x5 km grid clusters automatically disburse mobile money (M-Pesa, MTN) within 48 hours of rainfall failure. Farmers activate coverage via SMS/USSD scratch-cards inside certified seed bags. 100% of underwriting risk is ceded to institutional reinsurance syndicates (Munich Re, Swiss Re, Africa Specialty Risks).

---

## 2. Technical Architecture & Agent Build Stack
- **Frontend:** React 18, Vite, TailwindCSS, Lucide Icons.
- **Engine Architecture:**
  1. **Spatial Telemetry:** ECMWF and CHIRPS precipitation raster ingest with automated drought deficit threshold detection.
  2. **USSD / SMS Intake:** Africa's Talking gateway integrating dial shortcodes (`*384*40#`) and alphanumeric scratch-card voucher registration.
  3. **MGA Reinsurance Router:** Algorithmic risk aggregation treaty engine ceding 100% underwriting exposure to institutional syndicates.
  4. **Mobile Money Disbursement:** Automated Safaricom Daraja (M-Pesa B2C) and MTN Mobile Money API webhook workers.

---

## 3. SEO & Canonical Setup
- **H1:** `Parametric Agri-Insurance MGA: Instant Climate Payouts for Smallholder Farmers`
- **Canonical Slug:** `/solutions/parametric-agri-insurance-africa`
- **Keywords:** `parametric agri insurance smallholder africa`, `satellite weather index insurance mga`, `embedded crop insurance ussd mpesa`, `climate risk insurance for african farmers`

---

## 4. Local Development
```bash
npm install
npm run dev
# Or preview production bundle:
npm run build
python3 -m http.server 8121 --directory dist
```
Navigate to `http://localhost:8121`.
