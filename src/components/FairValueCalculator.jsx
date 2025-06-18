import React, { useState } from "react";

export default function FairValueCalculator() {
  const [eps, setEps] = useState(0.84);
  const [growthRate, setGrowthRate] = useState(0.05);
  const [terminalGrowth, setTerminalGrowth] = useState(0.02);
  const [discountRate, setDiscountRate] = useState(0.1);
  const [currentPrice, setCurrentPrice] = useState(6.96);
  const mos = 0.3;

  const epsForecast = Array.from({ length: 10 }, (_, i) => eps * Math.pow(1 + growthRate, i + 1));
  const barValues = epsForecast.map((val, i) => val / Math.pow(1 + discountRate, i + 1));
  const terminalValue = (epsForecast[9] * (1 + terminalGrowth)) / (discountRate - terminalGrowth);
  const discountedTV = terminalValue / Math.pow(1 + discountRate, 10);
  const fairValue = barValues.reduce((a, b) => a + b, 0) + discountedTV;
  const mosPrice = fairValue * (1 - mos);

  return (
    <div className="max-w-xl mx-auto p-4 rounded-xl shadow-xl bg-white">
      <h1 className="text-2xl font-bold mb-4">Fair Value DCF Rechner</h1>
      {/* Eingabefelder */}
      <div className="grid grid-cols-2 gap-4">
        <label>EPS (Jahresbasis)</label>
        <input type="number" step="0.01" value={eps} onChange={e => setEps(parseFloat(e.target.value))} />
        <label>Wachstumsrate</label>
        <input type="number" step="0.01" value={growthRate} onChange={e => setGrowthRate(parseFloat(e.target.value))} />
        <label>Terminal-Wachstum</label>
        <input type="number" step="0.01" value={terminalGrowth} onChange={e => setTerminalGrowth(parseFloat(e.target.value))} />
        <label>Diskontsatz</label>
        <input type="number" step="0.01" value={discountRate} onChange={e => setDiscountRate(parseFloat(e.target.value))} />
        <label>Aktueller Kurs</label>
        <input type="number" step="0.01" value={currentPrice} onChange={e => setCurrentPrice(parseFloat(e.target.value))} />
      </div>
      {/* Ergebnisse */}
      <div className="mt-6 p-4 border-t">
        <p><strong>Fairer Wert (heute):</strong> {fairValue.toFixed(2)} €</p>
        <p><strong>Kaufpreis mit MOS (30 %):</strong> {mosPrice.toFixed(2)} €</p>
        <p><strong>Aktueller Kurs:</strong> {currentPrice.toFixed(2)} €</p>
        <p className="mt-2 font-semibold">
          {currentPrice < mosPrice ? "🟢 Aktie ist unterbewertet (Kauf möglich)" : "🔴 Keine ausreichende Sicherheitsmarge"}
        </p>
      </div>
    </div>
  );
}
