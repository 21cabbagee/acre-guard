import React, { useState } from 'react';
import { 
  CloudRain, Sun, Smartphone, ShieldCheck, ArrowRight, CheckCircle2, 
  AlertTriangle, RefreshCw, Layers, DollarSign, Database, Activity, 
  MapPin, Radio, ChevronRight, X, PhoneCall
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function App() {
  // Simulator State
  const [activeTab, setActiveTab] = useState('trigger'); // 'trigger' | 'ussd' | 'mga' | 'reinsurance'
  const [cluster, setCluster] = useState('KITUI');
  const [rainfallMm, setRainfallMm] = useState(42); // Below 65mm threshold
  const [soilMoisturePct, setSoilMoisturePct] = useState(14);
  const [farmersCount, setFarmersCount] = useState(12500);
  const [isTriggering, setIsTriggering] = useState(false);
  const [payoutResult, setPayoutResult] = useState(null);

  // USSD Simulator State
  const [ussdPhone, setUssdPhone] = useState('+254 712 345 678');
  const [voucherCode, setVoucherCode] = useState('SEED-KEN-9942');
  const [ussdStep, setUssdStep] = useState(1);
  const [ussdSuccess, setUssdSuccess] = useState(false);

  // CAB Modal
  const [cabModalOpen, setCabModalOpen] = useState(false);
  const [cabForm, setCabForm] = useState({ partner: '', email: '', farmerNetworkSize: '10,000 - 50,000' });
  const [cabSubmitted, setCabSubmitted] = useState(false);

  const clusters = [
    { id: 'KITUI', name: 'Kitui East Basin (Kenya)', lat: '-1.37', lon: '38.01', threshold: 65, crop: 'Hybrid Maize Dryland' },
    { id: 'MACHAKOS', name: 'Machakos Yatta Grid (Kenya)', lat: '-1.52', lon: '37.26', threshold: 70, crop: 'Sorghum & Cowpeas' },
    { id: 'KANO', name: 'Kano Valley Cluster (Nigeria)', lat: '12.00', lon: '8.52', threshold: 55, crop: 'Millet & Groundnut' },
    { id: 'TAMALE', name: 'Northern Savannah (Ghana)', lat: '9.40', lon: '-0.84', threshold: 60, crop: 'Soybean & White Corn' }
  ];

  const selectedCluster = clusters.find(c => c.id === cluster) || clusters[0];
  const isDroughtBreached = rainfallMm < selectedCluster.threshold;

  // MGA Unit Economics
  const premiumPerFarmer = 15; // $15 seasonal fee
  const totalGWP = farmersCount * premiumPerFarmer;
  const mgaCommission = totalGWP * 0.22; // 22% MGA administrative fee
  const payoutAmountPerFarmer = 85; // $85 replacement payout
  const totalEstimatedPayout = isDroughtBreached ? farmersCount * payoutAmountPerFarmer : 0;

  const triggerSatelliteEvaluation = () => {
    setIsTriggering(true);
    setPayoutResult(null);

    setTimeout(() => {
      setIsTriggering(false);
      setPayoutResult({
        timestamp: new Date().toLocaleTimeString(),
        status: isDroughtBreached ? 'PARAMETRIC TRIGGER CONFIRMED' : 'NORMAL RAINFALL RANGE',
        breached: isDroughtBreached,
        rainfall: rainfallMm,
        threshold: selectedCluster.threshold,
        totalPayout: totalEstimatedPayout,
        txCount: farmersCount
      });
      if (isDroughtBreached) {
        try {
          confetti({ particleCount: 80, spread: 70, origin: { y: 0.8 } });
        } catch (e) {}
      }
    }, 2200);
  };

  const handleUssdSubmit = (e) => {
    e.preventDefault();
    setUssdSuccess(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-lime-500 selection:text-black">
      {/* Top Banner */}
      <div className="border-b border-lime-500/20 bg-lime-950/40 px-4 py-2 text-center text-xs font-medium text-lime-300">
        🌱 <span className="font-semibold text-lime-200">AcreGuard Parametric MGA:</span> Embedded satellite climate insurance for 33M smallholder farmers. 
        <button onClick={() => setCabModalOpen(true)} className="ml-2 underline hover:text-white">Design Partner Cohort (Agro-Dealers & Cooperatives)</button>
      </div>

      {/* Header */}
      <header className="border-b border-slate-800/80 bg-slate-950/80 sticky top-0 z-40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-lime-500 to-emerald-400 flex items-center justify-center font-black text-black text-lg shadow-lg shadow-lime-500/20">
              AG
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
                AcreGuard
                <span className="text-[10px] uppercase tracking-wider bg-lime-500/10 text-lime-400 border border-lime-500/20 px-2 py-0.5 rounded-full font-semibold">Agri-MGA</span>
              </span>
              <p className="text-[11px] text-slate-400">Balance-Sheet-Light Weather Index Insurance</p>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-6 text-sm font-medium text-slate-300">
            <button onClick={() => setActiveTab('trigger')} className={`hover:text-lime-400 transition ${activeTab === 'trigger' ? 'text-lime-400 border-b-2 border-lime-400 pb-1' : ''}`}>Satellite Trigger</button>
            <button onClick={() => setActiveTab('ussd')} className={`hover:text-lime-400 transition ${activeTab === 'ussd' ? 'text-lime-400 border-b-2 border-lime-400 pb-1' : ''}`}>USSD Scratch-Card</button>
            <button onClick={() => setActiveTab('mga')} className={`hover:text-lime-400 transition ${activeTab === 'mga' ? 'text-lime-400 border-b-2 border-lime-400 pb-1' : ''}`}>MGA Risk Router</button>
            <button onClick={() => setActiveTab('reinsurance')} className={`hover:text-lime-400 transition ${activeTab === 'reinsurance' ? 'text-lime-400 border-b-2 border-lime-400 pb-1' : ''}`}>Reinsurance Underwriting</button>
          </div>

          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setCabModalOpen(true)}
              className="px-4 py-2 rounded-lg bg-lime-500 hover:bg-lime-400 text-slate-950 font-semibold text-xs tracking-wide transition shadow-lg shadow-lime-500/25 flex items-center gap-1.5"
            >
              Agro-Dealer Pilot
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-12 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-700/80 text-xs text-slate-300">
            <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse"></span>
            ECMWF / CHIRPS Satellite Telemetry ➔ Autonomous M-Pesa Payouts
          </div>

          {/* EXACT H1 TAG */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
            Parametric Agri-Insurance MGA: Instant Climate Payouts for Smallholder Farmers
          </h1>

          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto">
            Zero physical adjusters. Farmers activate $15 drought coverage via seed bag scratch-card USSD. When satellite rainfall drops below thresholds, mobile money claims clear in 48 hours.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button 
              onClick={() => { setActiveTab('trigger'); triggerSatelliteEvaluation(); }}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-lime-500 to-emerald-400 text-slate-950 font-bold text-sm hover:from-lime-400 hover:to-emerald-300 transition shadow-xl shadow-lime-500/20 flex items-center gap-2"
            >
              <Radio className="w-4 h-4 fill-current" />
              Simulate Drought Satellite Trigger
            </button>
            <button 
              onClick={() => setActiveTab('ussd')}
              className="px-6 py-3 rounded-xl bg-slate-900 border border-slate-700/80 text-slate-200 font-semibold text-sm hover:bg-slate-800 transition flex items-center gap-2"
            >
              <Smartphone className="w-4 h-4" />
              Test Farmer USSD Activation
            </button>
          </div>

          <div className="pt-6 grid grid-cols-2 md:grid-cols-4 gap-3 text-left max-w-3xl mx-auto">
            <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-xs">
              <span className="text-slate-400 block">Payout Speed</span>
              <span className="text-lg font-bold text-lime-400">&lt; 48 Hours</span>
              <span className="text-[10px] text-slate-500 block">vs. 6 Months Manual</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-xs">
              <span className="text-slate-400 block">Intake Channel</span>
              <span className="text-lg font-bold text-white">USSD / SMS</span>
              <span className="text-[10px] text-slate-500 block">Zero Smartphone Needed</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-xs">
              <span className="text-slate-400 block">Balance-Sheet Risk</span>
              <span className="text-lg font-bold text-emerald-400">0% Retained</span>
              <span className="text-[10px] text-slate-500 block">100% Ceded Reinsurance</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-xs">
              <span className="text-slate-400 block">Disbursement Rail</span>
              <span className="text-lg font-bold text-lime-300">M-Pesa / MTN</span>
              <span className="text-[10px] text-slate-500 block">Direct Mobile Money</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Interactive Workspaces */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-800 mb-8 overflow-x-auto">
          <button 
            onClick={() => setActiveTab('trigger')}
            className={`px-5 py-3 text-sm font-semibold border-b-2 transition whitespace-nowrap flex items-center gap-2 ${activeTab === 'trigger' ? 'border-lime-500 text-lime-400' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
          >
            <CloudRain className="w-4 h-4" />
            Satellite Weather Trigger
          </button>
          <button 
            onClick={() => setActiveTab('ussd')}
            className={`px-5 py-3 text-sm font-semibold border-b-2 transition whitespace-nowrap flex items-center gap-2 ${activeTab === 'ussd' ? 'border-lime-500 text-lime-400' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
          >
            <Smartphone className="w-4 h-4" />
            Farmer USSD Seed-Bag Intake
          </button>
          <button 
            onClick={() => setActiveTab('mga')}
            className={`px-5 py-3 text-sm font-semibold border-b-2 transition whitespace-nowrap flex items-center gap-2 ${activeTab === 'mga' ? 'border-lime-500 text-lime-400' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
          >
            <DollarSign className="w-4 h-4" />
            MGA Portfolio & Economics
          </button>
          <button 
            onClick={() => setActiveTab('reinsurance')}
            className={`px-5 py-3 text-sm font-semibold border-b-2 transition whitespace-nowrap flex items-center gap-2 ${activeTab === 'reinsurance' ? 'border-lime-500 text-lime-400' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
          >
            <ShieldCheck className="w-4 h-4" />
            Reinsurance Treaty Router
          </button>
        </div>

        {/* Tab 1: Satellite Trigger */}
        {activeTab === 'trigger' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 space-y-6">
              <div className="glass-card rounded-2xl p-6 border border-slate-800/80 shadow-2xl">
                <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-lime-400" />
                  Satellite Weather & NDVI Telemetry
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Select 5x5 km Satellite Grid Cluster</label>
                    <select 
                      value={cluster}
                      onChange={(e) => setCluster(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-sm text-slate-200 focus:outline-none focus:border-lime-500"
                    >
                      {clusters.map(c => (
                        <option key={c.id} value={c.id}>{c.name} — {c.crop}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-xs font-semibold text-slate-300">Observed 30-Day Rainfall (CHIRPS Satellite)</label>
                      <span className={`text-xs font-mono font-bold ${rainfallMm < selectedCluster.threshold ? 'text-red-400' : 'text-lime-400'}`}>
                        {rainfallMm} mm (Threshold: {selectedCluster.threshold} mm)
                      </span>
                    </div>
                    <input 
                      type="range" 
                      min="15" 
                      max="140" 
                      value={rainfallMm}
                      onChange={(e) => setRainfallMm(Number(e.target.value))}
                      className="w-full accent-lime-500 bg-slate-800"
                    />
                    <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                      <span className="text-red-400 font-semibold">15mm (Severe Drought)</span>
                      <span>65mm (Trigger)</span>
                      <span className="text-lime-400">140mm (Optimal)</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-xs font-semibold text-slate-300">Soil Moisture Deficit (NASA SMAP)</label>
                      <span className="text-xs font-mono text-slate-200">{soilMoisturePct}% Saturation</span>
                    </div>
                    <input 
                      type="range" 
                      min="5" 
                      max="45" 
                      value={soilMoisturePct}
                      onChange={(e) => setSoilMoisturePct(Number(e.target.value))}
                      className="w-full accent-emerald-500 bg-slate-800"
                    />
                  </div>

                  <div className={`p-4 rounded-xl border text-xs space-y-1.5 transition ${isDroughtBreached ? 'bg-red-950/40 border-red-500/40' : 'bg-lime-950/30 border-lime-500/30'}`}>
                    <div className="flex justify-between font-bold">
                      <span className="text-slate-300">Parametric Trigger Status:</span>
                      <span className={isDroughtBreached ? 'text-red-400' : 'text-lime-400'}>
                        {isDroughtBreached ? '⚠️ DROUGHT TRIGGER BREACHED' : '✅ NORMAL SEASONAL PRECIPITATION'}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      {isDroughtBreached 
                        ? `Satellite reading of ${rainfallMm}mm is below statutory index trigger of ${selectedCluster.threshold}mm. Autonomous payout sequence authorized.`
                        : `Precipitation levels satisfy minimal seed germination requirements. No insurance indemnity triggered.`}
                    </p>
                  </div>

                  <button 
                    disabled={isTriggering}
                    onClick={triggerSatelliteEvaluation}
                    className="w-full py-3 rounded-xl bg-lime-500 hover:bg-lime-400 disabled:opacity-50 text-slate-950 font-bold text-sm tracking-wide transition shadow-lg shadow-lime-500/25 flex items-center justify-center gap-2"
                  >
                    {isTriggering ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        Evaluating Satellite Raster Grids...
                      </>
                    ) : (
                      <>
                        <Radio className="w-4 h-4 fill-current" />
                        Run Spatial Telemetry Scan
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Live Spatial Telemetry Console */}
            <div className="lg:col-span-7 space-y-4">
              <div className="glass-card rounded-2xl p-6 border border-slate-800/80 shadow-2xl">
                <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
                  <h3 className="font-bold text-white text-base flex items-center gap-2">
                    <Activity className="w-4 h-4 text-lime-400" />
                    Autonomous Mobile Money Settlement Engine
                  </h3>
                  <span className="text-xs font-mono text-lime-400 bg-lime-950/60 px-2.5 py-1 rounded-full border border-lime-500/30">
                    Live CHIRPS Satellite Feed
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                    <span className="text-slate-500 block">Insured Smallholders</span>
                    <span className="text-lg font-bold text-white">{farmersCount.toLocaleString()}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                    <span className="text-slate-500 block">Coverage per Bag</span>
                    <span className="text-lg font-bold text-lime-400">$85.00 Payout</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                    <span className="text-slate-500 block">Aggregate Exposure</span>
                    <span className="text-lg font-bold text-emerald-400">${(farmersCount * 85).toLocaleString()}</span>
                  </div>
                </div>

                {/* Spatial Log Console */}
                <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 font-mono text-xs text-slate-300 space-y-2">
                  <div className="flex items-center justify-between text-slate-500 border-b border-slate-800 pb-2">
                    <span>SATELLITE ORACLE ENGINE LOG</span>
                    <span className="text-lime-400">ECMWF / CHIRPS V2.0</span>
                  </div>

                  {payoutResult ? (
                    <div className="space-y-1.5 pt-1 text-[11px]">
                      <div className="text-lime-300">[{payoutResult.timestamp}] Spatial Query: Ingested Sentinel-2 & CHIRPS raster for grid [{selectedCluster.lat}, {selectedCluster.lon}]</div>
                      <div className="text-slate-300">[00:01] 30-day cumulative precipitation: {payoutResult.rainfall} mm vs statutory benchmark {payoutResult.threshold} mm.</div>
                      {payoutResult.breached ? (
                        <>
                          <div className="text-red-400 font-semibold">[00:03] CRITICAL INDEX BREACH: Deficit of {selectedCluster.threshold - payoutResult.rainfall} mm recorded in active germination window.</div>
                          <div className="text-teal-300">[00:04] Reinsurance treaty activated: Africa Specialty Risks / Munich Re liquidity draw signed.</div>
                          <div className="text-lime-400 font-bold border-t border-slate-800 pt-1">
                            [00:05] M-PESA B2C DISPATCH: {payoutResult.txCount.toLocaleString()} payouts queued ($85/farmer). Total Mobile Money payout: ${payoutResult.totalPayout.toLocaleString()}.
                          </div>
                        </>
                      ) : (
                        <div className="text-emerald-400 pt-1 border-t border-slate-800 font-semibold">
                          [00:02] Crop viability benchmark achieved. No drought indemnity required. Next scheduled satellite scan in 7 days.
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-slate-500 py-8 text-center italic">
                      Adjust rainfall slider and click "Run Spatial Telemetry Scan" to test satellite drought trigger logic.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: USSD Intake */}
        {activeTab === 'ussd' && (
          <div className="glass-card rounded-2xl p-8 border border-slate-800/80 max-w-3xl mx-auto shadow-2xl space-y-6">
            <div className="text-center max-w-xl mx-auto">
              <h2 className="text-xl font-bold text-white mb-1">Embedded QR Scratch-Card & USSD Intake</h2>
              <p className="text-xs text-slate-400">Zero smartphone or internet needed. Farmers scratch off a secure alphanumeric code inside certified seed bags (Yara, SeedCo) and dial a free USSD shortcode.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              {/* Seed Bag Mockup */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-lime-950/60 to-slate-900 border border-lime-500/30 text-center space-y-3">
                <div className="w-16 h-16 mx-auto rounded-full bg-lime-500/20 flex items-center justify-center text-lime-400 font-bold text-xl border border-lime-500/30">
                  🌽
                </div>
                <div>
                  <span className="text-xs font-bold text-lime-300 uppercase tracking-wider">Certified Drought-Tolerant Maize</span>
                  <div className="text-sm font-black text-white">SeedCo Premium 2kg Pack</div>
                </div>
                <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 text-xs">
                  <span className="text-slate-400 block text-[10px]">SCRATCH-OFF VOUCHER INSIDE BAG</span>
                  <span className="font-mono text-lime-400 font-bold tracking-widest text-sm">{voucherCode}</span>
                </div>
                <p className="text-[11px] text-slate-400">"Dial *384*40# to activate your free AcreGuard drought insurance."</p>
              </div>

              {/* USSD Mobile Simulator */}
              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                    <PhoneCall className="w-3.5 h-3.5 text-lime-400" />
                    USSD: *384*40#
                  </span>
                  <span className="text-[10px] text-emerald-400 font-semibold">Africa's Talking Gateway</span>
                </div>

                {ussdSuccess ? (
                  <div className="text-center py-4 space-y-2">
                    <CheckCircle2 className="w-10 h-10 text-lime-400 mx-auto" />
                    <span className="text-xs font-bold text-white block">Crop Insurance Activated!</span>
                    <p className="text-[11px] text-slate-400">
                      M-Pesa wallet <strong className="text-slate-200">{ussdPhone}</strong> linked to Kitui Grid. In event of rainfall failure, $85 will be credited automatically.
                    </p>
                    <button 
                      onClick={() => setUssdSuccess(false)}
                      className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200"
                    >
                      Test Another Activation
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleUssdSubmit} className="space-y-3">
                    <div>
                      <label className="text-[11px] font-semibold text-slate-400 block mb-1">Farmer Phone Number (M-Pesa)</label>
                      <input 
                        type="text" 
                        value={ussdPhone}
                        onChange={(e) => setUssdPhone(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-lime-500 font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-slate-400 block mb-1">Enter Bag Scratch-Card Code</label>
                      <input 
                        type="text" 
                        value={voucherCode}
                        onChange={(e) => setVoucherCode(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-lime-500 font-mono"
                      />
                    </div>
                    <button 
                      type="submit"
                      className="w-full py-2.5 rounded-lg bg-lime-500 hover:bg-lime-400 text-slate-950 font-bold text-xs transition shadow-md shadow-lime-500/20"
                    >
                      Dial *384*40# & Register Policy
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: MGA Economics */}
        {activeTab === 'mga' && (
          <div className="glass-card rounded-2xl p-8 border border-slate-800/80 max-w-4xl mx-auto shadow-2xl space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white mb-1">Managing General Agent (MGA) Economics</h2>
              <p className="text-xs text-slate-400">AcreGuard retains zero underwriting balance-sheet risk. The platform operates strictly as a technology MGA generating 22% fee margins on gross written premiums.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-xs text-slate-400">Gross Written Premium (GWP)</span>
                <div className="text-2xl font-black text-white">${totalGWP.toLocaleString()}</div>
                <span className="text-[10px] text-slate-500">{farmersCount.toLocaleString()} farmers × $15 fee</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-xs text-slate-400">AcreGuard MGA Commission (22%)</span>
                <div className="text-2xl font-black text-lime-400">${mgaCommission.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                <span className="text-[10px] text-slate-500">Pure high-margin software fee</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-xs text-slate-400">Reinsurance Capital Ceded</span>
                <div className="text-2xl font-black text-emerald-400">100.0%</div>
                <span className="text-[10px] text-slate-500">Munich Re / Swiss Re Treaty</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Reinsurance */}
        {activeTab === 'reinsurance' && (
          <div className="glass-card rounded-2xl p-8 border border-slate-800/80 max-w-4xl mx-auto shadow-2xl space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white mb-1">Institutional Reinsurance Capital Router</h2>
              <p className="text-xs text-slate-400">Global reinsurers seek emerging-market ESG climate yield but lack last-mile distribution. AcreGuard aggregates smallholder risks into automated capital treaties.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <ShieldCheck className="w-5 h-5 text-lime-400" />
                <h3 className="font-bold text-white text-sm">Underwriting Treaty Partners</h3>
                <p className="text-xs text-slate-400">Underwritten through Africa Specialty Risks (ASR) and Swiss Re parametric syndicates, guaranteeing balance-sheet liquidity for immediate mobile money settlement.</p>
              </div>
              <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <Database className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-white text-sm">Automated Oracle Verification</h3>
                <p className="text-xs text-slate-400">Satellite precipitation triggers are certified cryptographically by independent meteorological oracles, eliminating claims disputes between reinsurers and farmers.</p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Customer Advisory Board (CAB) Modal */}
      {cabModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="glass-card rounded-2xl max-w-lg w-full p-6 border border-lime-500/30 shadow-2xl relative">
            <button 
              onClick={() => setCabModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {cabSubmitted ? (
              <div className="text-center py-8 space-y-4">
                <CheckCircle2 className="w-12 h-12 text-lime-400 mx-auto" />
                <h3 className="text-xl font-bold text-white">Pilot Application Received</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Our Agronomic & Reinsurance team will contact you within 24 hours to review your regional seed/fertilizer distribution footprint and provision custom USSD scratch-card ranges.
                </p>
                <button 
                  onClick={() => { setCabModalOpen(false); setCabSubmitted(false); }}
                  className="px-6 py-2 rounded-lg bg-lime-500 text-slate-950 font-bold text-xs"
                >
                  Return to Dashboard
                </button>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setCabSubmitted(true); }} className="space-y-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-lime-400">Design Partner Cohort</span>
                  <h3 className="text-xl font-bold text-white">Join the AcreGuard 10-Partner Pilot</h3>
                  <p className="text-xs text-slate-400">
                    We are launching a pilot cohort of 10 commercial partners for AcreGuard (Agro-Dealer Networks, Seed Manufacturers, Microfinance Cooperatives). Dedicated integration and preferential locked partner pricing.
                  </p>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Organization / Agro-Dealer Network Name</label>
                    <input 
                      required
                      type="text" 
                      placeholder="e.g. Kenya Seed Company / Yara Agro-Hubs"
                      value={cabForm.partner}
                      onChange={(e) => setCabForm({ ...cabForm, partner: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-sm text-slate-200 focus:outline-none focus:border-lime-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Lead Executive Email</label>
                    <input 
                      required
                      type="email" 
                      placeholder="operations@agridealer.com"
                      value={cabForm.email}
                      onChange={(e) => setCabForm({ ...cabForm, email: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-sm text-slate-200 focus:outline-none focus:border-lime-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Farmer Footprint Size</label>
                    <select 
                      value={cabForm.farmerNetworkSize}
                      onChange={(e) => setCabForm({ ...cabForm, farmerNetworkSize: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-sm text-slate-200 focus:outline-none focus:border-lime-500"
                    >
                      <option value="5,000 - 25,000">5,000 - 25,000 Smallholders</option>
                      <option value="25,000 - 100,000">25,000 - 100,000 Smallholders</option>
                      <option value="100,000+">100,000+ Smallholders</option>
                    </select>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-lime-950/40 border border-lime-500/30 text-[11px] text-lime-300">
                  🎁 <strong>Pilot Cohort Benefit:</strong> Zero platform onboarding fee, free Africa's Talking USSD integration, and locked 70% preferential MGA software margin.
                </div>

                <button 
                  type="submit"
                  className="w-full py-3 rounded-xl bg-lime-500 hover:bg-lime-400 text-slate-950 font-bold text-sm tracking-wide transition shadow-lg shadow-lime-500/25"
                >
                  Apply for Pilot Cohort (4 Spots Remaining)
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-8 px-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 AcreGuard Climate Technologies MGA. All rights reserved.</p>
          <div className="flex gap-4">
            <span className="text-slate-400">Canonical: /solutions/parametric-agri-insurance-africa</span>
            <span className="text-lime-500 font-semibold">ECMWF • CHIRPS • Africa's Talking • M-Pesa Integrated</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
