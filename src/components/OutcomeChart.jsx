import React, { useState } from 'react';
import { TrendingUp, ShieldCheck, Zap, DollarSign, CheckCircle2, Radio, CloudRain } from 'lucide-react';

/**
 * OutcomeChart for AcreGuard (Bklit UI + Julien Bek $1:$6 Sequoia Framework + Larry Ellison ROI Engine)
 * Compares legacy 42% loss adjustment expenses (adjusters, manual paperwork, 90-day delays) with Autonomous Satellite Oracle claims.
 */
export default function OutcomeChart({
  serviceName = "Smallholder Crop Protection & Parametric Claims",
  defaultInsuredAcres = 20000,
  onCtaClick
}) {
  const [acres, setAcres] = useState(defaultInsuredAcres);
  const premiumPerAcre = 24; // $24 avg premium
  const totalPool = acres * premiumPerAcre;

  // Financial breakdown
  // Traditional insurance spends ~42% on field agents, physical claims adjusters, and fraud assessment
  const legacyLossAdjustmentCost = Math.round(totalPool * 0.42);
  // AcreGuard parametric automation fee is 8% flat
  const autonomousMGAExpense = Math.round(totalPool * 0.08);
  const capitalSaved = legacyLossAdjustmentCost - autonomousMGAExpense;
  const savingsPercent = Math.round(((legacyLossAdjustmentCost - autonomousMGAExpense) / legacyLossAdjustmentCost) * 100);

  const maxCost = Math.max(legacyLossAdjustmentCost, 1);
  const legacyBarHeight = 100;
  const autoBarHeight = Math.max(Math.round((autonomousMGAExpense / maxCost) * 100), 14);

  return (
    <div className="relative rounded-2xl border border-slate-800 bg-slate-900/80 p-6 md:p-8 backdrop-blur-xl shadow-2xl overflow-hidden">
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-lime-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-2 border bg-slate-950 border-lime-500/30 text-lime-400">
            <span className="w-2 h-2 rounded-full bg-lime-400 animate-ping"></span>
            The Sequoia Equation: Software ($1) vs Claims Adjusters ($6)
          </div>
          <h3 className="text-xl md:text-2xl font-black text-white tracking-tight">
            Parametric Underwriting Economics: <span className="text-lime-400">{savingsPercent}% Loss Adjustment Slash</span>
          </h3>
          <p className="text-sm text-slate-400 mt-1 max-w-xl">
            Legacy crop insurers deploy armies of human inspectors after droughts. We eliminate the entire $6 human claims infrastructure using satellite oracles that pay farmers directly via mobile money.
          </p>
        </div>

        <div className="text-right bg-slate-950/60 border border-slate-800 rounded-xl p-3 px-4 min-w-[190px]">
          <span className="text-[11px] text-slate-400 block font-medium">Claims Expense Reduced</span>
          <span className="text-2xl md:text-3xl font-black text-lime-400">
            ${capitalSaved.toLocaleString()}
          </span>
          <span className="text-[10px] text-lime-400/80 flex items-center justify-end gap-1 font-semibold">
            <TrendingUp className="w-3 h-3" /> 48h M-Pesa Payout
          </span>
        </div>
      </div>

      {/* Interactive Volume Slider */}
      <div className="py-6 border-b border-slate-800">
        <div className="flex items-center justify-between text-sm mb-3">
          <label className="text-slate-300 font-semibold flex items-center gap-2">
            <CloudRain className="w-4 h-4 text-lime-400" />
            Underwritten Farmland Volume:
          </label>
          <span className="text-base font-bold text-white bg-slate-800/80 px-3 py-1 rounded-lg border border-slate-700">
            {acres.toLocaleString()} Acres (${totalPool.toLocaleString()} Gross Premium)
          </span>
        </div>
        <input 
          type="range" 
          min={5000} 
          max={150000} 
          step={5000}
          value={acres}
          onChange={(e) => setAcres(Number(e.target.value))}
          className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-lime-400"
        />
        <div className="flex justify-between text-[11px] text-slate-500 mt-2 font-mono">
          <span>5,000 Acres (District Co-op)</span>
          <span>50,000 Acres (Regional MGA)</span>
          <span>150,000+ Acres (National Syndicate)</span>
        </div>
      </div>

      {/* Bklit UI Visual Comparison Chart & Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-6 items-center">
        {/* SVG Visual Bars */}
        <div className="md:col-span-5 bg-slate-950/70 rounded-xl p-5 border border-slate-800">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 flex items-center justify-between">
            <span>Claims Processing Friction</span>
            <span className="text-[10px] text-slate-500">Telemetry vs Field Trips</span>
          </div>

          <div className="space-y-4">
            {/* Legacy Bar */}
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-rose-400 font-semibold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                  Legacy Field Adjusters & Manual Claims ($6)
                </span>
                <span className="font-mono font-bold text-rose-300">${legacyLossAdjustmentCost.toLocaleString()}</span>
              </div>
              <div className="h-6 w-full bg-slate-900 rounded-lg overflow-hidden border border-rose-950/40">
                <div 
                  className="h-full bg-gradient-to-r from-rose-600 to-rose-400 transition-all duration-300 rounded-lg"
                  style={{ width: `${legacyBarHeight}%` }}
                />
              </div>
            </div>

            {/* Autonomous Bar */}
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-lime-400 font-semibold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-lime-400"></span>
                  AcreGuard Satellite Telemetry Rail ($1)
                </span>
                <span className="font-mono font-bold text-lime-300">${autonomousMGAExpense.toLocaleString()}</span>
              </div>
              <div className="h-6 w-full bg-slate-900 rounded-lg overflow-hidden border border-lime-950/40">
                <div 
                  className="h-full bg-gradient-to-r from-lime-500 to-emerald-400 transition-all duration-300 rounded-lg shadow-lg shadow-lime-500/30"
                  style={{ width: `${autoBarHeight}%` }}
                />
              </div>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
            <span className="text-slate-400">Capital Returned to Farmers / Surplus:</span>
            <span className="text-sm font-bold text-lime-400 font-mono">+${capitalSaved.toLocaleString()}</span>
          </div>
        </div>

        {/* 3 Pillars */}
        <div className="md:col-span-7 space-y-3">
          <div className="p-3.5 rounded-xl bg-slate-950/40 border border-slate-800/80 flex items-start gap-3">
            <div className="w-7 h-7 rounded-lg bg-lime-500/10 border border-lime-500/20 text-lime-400 flex items-center justify-center shrink-0 mt-0.5">
              <Radio className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">CHIRPS & ECMWF Real-Time Oracles</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                No subjective human claims disputes. Automated satellite feeds assess millimeter precipitation thresholds daily across 5km² grid cells.
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/40 border border-slate-800/80 flex items-start gap-3">
            <div className="w-7 h-7 rounded-lg bg-lime-500/10 border border-lime-500/20 text-lime-400 flex items-center justify-center shrink-0 mt-0.5">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Direct-to-Farmer Mobile Money Rails</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Funds disburse instantly via Safaricom M-Pesa, MTN MoMo, or Airtel Money without requiring bank branches or branch paperwork.
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/40 border border-slate-800/80 flex items-start gap-3">
            <div className="w-7 h-7 rounded-lg bg-lime-500/10 border border-lime-500/20 text-lime-400 flex items-center justify-center shrink-0 mt-0.5">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Reinsurance-Ready Loss Modeling</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                100% auditable risk books formatted directly for Munich Re, Swiss Re, and Lloyd's syndicate treaties.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
