import { useState } from 'react';
import { Calculator } from 'lucide-react';

interface ROICalculatorProps {
  onOpenContactWithBudget: (budget: string) => void;
}

export const ROICalculator: React.FC<ROICalculatorProps> = ({ onOpenContactWithBudget }) => {
  const [monthlyBudget, setMonthlyBudget] = useState<number>(15000);

  // Dynamic growth calculations based on budget
  const estimatedImpressions = Math.round(monthlyBudget * 18.5);
  const estimatedLeads = Math.round(monthlyBudget * 0.082);
  const projectedRevenue = Math.round(monthlyBudget * 5.2);

  return (
    <section id="roi-calculator" className="py-20 px-4 sm:px-8 max-w-7xl mx-auto relative z-10">
      <div className="glass-card-obsidian rounded-3xl p-8 sm:p-12 border border-white/20 shadow-2xl relative overflow-hidden lens-reflection">
        
        {/* Glow Halo Background */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Controls */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold border border-purple-500/30">
              <Calculator className="w-3.5 h-3.5" />
              <span>Interactive ROI Predictor</span>
            </div>

            <h2 className="font-geometric text-3xl sm:text-4xl font-extrabold text-white">
              Calculate Your Scale Potential
            </h2>

            <p className="font-body text-slate-300 text-sm leading-relaxed">
              Drag the liquid glass budget slider below to project your organic lead volume, impression growth, and net revenue yield.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex justify-between text-sm font-semibold text-white">
                <span>Monthly Marketing Investment</span>
                <span className="text-purple-300 font-bold">${monthlyBudget.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min={5000}
                max={100000}
                step={2500}
                value={monthlyBudget}
                onChange={(e) => setMonthlyBudget(Number(e.target.value))}
                className="w-full accent-purple-500 cursor-pointer"
              />
            </div>
          </div>

          {/* Right Column: Output Metrics */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="glass-card-subtle p-6 rounded-2xl border border-white/10 text-center space-y-1">
              <p className="text-2xl font-extrabold text-purple-400 font-heading">+{estimatedImpressions.toLocaleString()}</p>
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Est. Monthly Impressions</p>
            </div>

            <div className="glass-card-subtle p-6 rounded-2xl border border-white/10 text-center space-y-1">
              <p className="text-2xl font-extrabold text-emerald-400 font-heading">+{estimatedLeads.toLocaleString()}</p>
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Qualified Leads</p>
            </div>

            <div className="col-span-2 glass-card-obsidian p-6 rounded-2xl border border-purple-500/30 text-center space-y-2">
              <p className="text-xs text-purple-300 uppercase tracking-widest font-bold">Projected Revenue Growth</p>
              <p className="text-4xl font-black text-white font-heading">${projectedRevenue.toLocaleString()}</p>
              <button
                onClick={() => onOpenContactWithBudget(`$${monthlyBudget.toLocaleString()}`)}
                className="mt-2 inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all shadow-lg cursor-pointer"
              >
                Claim This Strategy
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
