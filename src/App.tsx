/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldAlert, 
  Terminal, 
  UserPlus, 
  DollarSign, 
  Globe, 
  Lock, 
  AlertTriangle,
  Cpu,
  Fingerprint
} from 'lucide-react';

export default function App() {
  const [userId, setUserId] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const [showLoginError, setShowLoginError] = useState(false);

  const exchangeRateMultiplier = 100;
  const takaPerDollar = 150;
  const costUsd = 120;

  const addTerminalLine = (line: string) => {
    setTerminalLines((prev) => [...prev.slice(-10), `> ${line}`]);
  };

  const generateUserId = () => {
    setIsGenerating(true);
    setTerminalLines([]);
    addTerminalLine("INITIALIZING NODE IDENTITY...");
    
    const steps = [
      "ENCRYPTING PUBLIC KEY...",
      "BROADCASTING TO ONION NETWORK...",
      "VERIFYING NODE INTEGRITY...",
      "IDENTITY REGISTERED."
    ];

    steps.forEach((step, index) => {
      setTimeout(() => {
        addTerminalLine(step);
        if (index === steps.length - 1) {
          const randomId = 'ONION-' + Math.random().toString(36).substring(2, 10).toUpperCase();
          setUserId(randomId);
          setIsGenerating(false);
        }
      }, (index + 1) * 800);
    });
  };

  const handleLoginAttempt = () => {
    setShowLoginError(true);
    setTimeout(() => setShowLoginError(false), 5000);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#E0E0E0] font-sans flex flex-col overflow-x-hidden selection:bg-white selection:text-black">
      {/* Background scanline effect - keeping it subtle */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]"></div>

      {/* Header Bar */}
      <nav className="h-16 border-b border-emerald-900/30 flex items-center justify-between px-6 md:px-10 bg-[#0A0A0A] shrink-0 z-40">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
          <span className="text-[10px] sm:text-[11px] tracking-[0.3em] font-bold text-emerald-500 uppercase">Cryptic Gate Protocol</span>
        </div>
        <div className="text-[9px] sm:text-[10px] text-white/40 tracking-widest uppercase hidden sm:flex items-center gap-2">
          Terminal Node: <span className="text-emerald-500/60 font-mono">onion-v3-secure-path-alpha</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded border border-emerald-900/50 text-[9px] uppercase tracking-widest text-emerald-500/80 bg-emerald-950/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            NODE_ACTIVE
          </div>
        </div>
      </nav>

      <main className="flex-1 flex flex-col lg:flex-row p-6 md:p-10 gap-6 md:gap-10 overflow-auto relative">
        {/* Large Background Text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.02] whitespace-nowrap">
           <span className="text-[30vw] font-black tracking-tighter text-emerald-500 leading-none select-none">DARK WEB</span>
        </div>

        {/* Left Column: Security Status */}
        <div className="w-full lg:w-1/3 flex flex-col gap-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-8 bg-[#0D0D0D] border border-emerald-900/20 rounded-sm shadow-[0_0_30px_rgba(0,0,0,0.5)]"
          >
            <div className="mb-4">
              <span className="text-[10px] uppercase tracking-[0.4em] text-emerald-500/50 font-bold">Encrypted Portal</span>
            </div>
            <h1 className="text-6xl font-black font-sans text-white mb-2 leading-tight tracking-tighter uppercase">Dark <br />Web</h1>
            <h2 className="text-xl font-light font-serif text-emerald-500/80 mb-6 italic">Identity Verification</h2>
            
            <p className="text-sm text-white/50 leading-relaxed mb-8">
              Access to this terminal is strictly restricted. All traffic must be routed through the <span className="text-emerald-400 font-medium">Onion Router (Tor)</span> network in Dark Mode. 
            </p>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center text-[10px] uppercase tracking-widest">
                <span className="text-white/30">Protocol Integrity</span>
                <span className="text-red-500 font-bold animate-pulse">UNVERIFIED_NODE</span>
              </div>
              <div className="w-full h-1 bg-white/5 overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "25%" }}
                  className="h-full bg-emerald-500/50 shadow-[0_0_8px_rgba(16,185,129,0.5)]"
                ></motion.div>
              </div>
            </div>
          </motion.div>

          <div className="p-6 border border-emerald-900/10 bg-white/[0.01]">
            <h3 className="text-[10px] uppercase tracking-[0.2em] text-emerald-500/60 mb-4 font-bold">Market Intelligence</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center font-mono py-1">
                <span className="text-white/30 text-xs uppercase tracking-tighter font-bold">Index Multiplier</span>
                <span className="text-emerald-500 text-xs">{exchangeRateMultiplier.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center font-mono py-1 border-t border-white/5">
                <span className="text-white/30 text-xs uppercase tracking-tighter font-bold">USD / BDT Rate</span>
                <span className="text-emerald-500 text-xs">{takaPerDollar.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center font-mono py-1 border-t border-white/5">
                <span className="text-white/30 text-xs uppercase tracking-tighter font-bold">Node Latency</span>
                <span className="text-emerald-500 text-xs tracking-widest">4.2ms</span>
              </div>
              <div className="pt-2 italic">
                <span className="text-[9px] text-emerald-500/30 font-bold">*Rates updated via decentralized oracle cycle_0x89</span>
              </div>
            </div>
          </div>


          <AnimatePresence>
            {showLoginError && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="p-4 bg-red-950/20 border border-red-900/50 rounded flex gap-3 items-start"
              >
                <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <p className="text-[10px] text-red-200 uppercase font-bold leading-relaxed tracking-wider">
                  Access Denied: Non-Tor Connection Detected. Submissions require Dark Web Mode.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Column: Action Area */}
        <div className="flex-1 flex flex-col gap-6">
          
          {/* Entry Fee Card - Stark Contrast */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white text-black p-8 md:p-10 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6"
          >
            <div>
              <h2 className="text-[10px] uppercase font-bold tracking-[0.3em] mb-2 opacity-60">Access Voucher Fee</h2>
              <p className="text-4xl md:text-5xl font-serif italic mb-1">One Hundred Twenty Dollars</p>
              <p className="text-[10px] uppercase tracking-widest opacity-40">equivalent to {(costUsd * takaPerDollar).toLocaleString()} BDT</p>
            </div>
            <div className="text-left sm:text-right w-full sm:w-auto mt-2 sm:mt-0">
              <p className="text-4xl md:text-5xl font-mono tracking-tighter font-bold">${costUsd}.00</p>
              <p className="text-[10px] opacity-60 uppercase tracking-widest font-bold mt-1">Payable in XMR / BTC</p>
            </div>
          </motion.div>

          {/* Form Area / Terminal */}
          <div className="flex-1 border border-emerald-900/20 p-6 md:p-10 flex flex-col bg-[#080808] relative group">
            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-emerald-500/50"></div>
            <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-emerald-500/50"></div>
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-emerald-500/50"></div>
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-emerald-500/50"></div>

            <div className="mb-10">
              <label className="text-[10px] uppercase tracking-[0.3em] text-emerald-500/40 block mb-6 font-bold">Assigned User Identifier</label>
              
              <div className="relative">
                <div className="min-h-[80px] text-2xl md:text-3xl font-mono text-emerald-400 tracking-[0.2em] p-6 border border-emerald-900/30 bg-black flex justify-between items-center group shadow-[inset_0_0_20px_rgba(16,185,129,0.05)]">
                  <AnimatePresence mode="wait">
                    {userId ? (
                      <motion.span 
                        key="id"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="truncate text-shadow-emerald"
                      >
                        {userId}
                      </motion.span>
                    ) : (
                      <motion.span 
                        key="status"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-emerald-500/20 text-sm uppercase tracking-widest italic"
                      >
                        {isGenerating ? "Encrypting Node..." : "Awaiting Handshake"}
                      </motion.span>
                    )}
                  </AnimatePresence>
                  <span className="text-[9px] text-emerald-500/20 tracking-normal hidden sm:block">SYSCALL_ID</span>
                </div>
                
                {/* Secondary verification labels */}
                {userId && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-3 flex gap-4 text-[9px] uppercase tracking-widest text-emerald-500/30 italic"
                  >
                    <span className="flex items-center gap-1.5"><Fingerprint className="w-3 h-3" /> Biometric: Authenticated</span>
                    <span className="flex items-center gap-1.5"><Lock className="w-3 h-3" /> State: PGP_SECURE</span>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Terminal Lines - Integrated subtly below ID */}
            <div className="flex-1 flex flex-col gap-2 font-mono text-[10px] text-emerald-500/30 mb-10 overflow-hidden">
              {terminalLines.map((line, i) => (
                <div key={i} className="flex gap-2">
                  <span className="text-emerald-500/10 shrink-0">[{new Date().toLocaleTimeString([], { hour12: false })}]</span>
                  <span className="truncate">{line}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-auto">
              <button 
                onClick={generateUserId}
                disabled={isGenerating}
                className="border border-emerald-900/30 py-5 text-[10px] uppercase tracking-[0.3em] font-bold text-emerald-500/80 hover:bg-emerald-500/10 hover:border-emerald-500/50 transition-all active:scale-[0.98] disabled:opacity-20"
                id="btn-refresh"
              >
                {userId ? "Recalculate Hash" : "Begin Handshake"}
              </button>
              <button 
                 onClick={handleLoginAttempt}
                className="bg-emerald-500 text-black py-5 text-[10px] uppercase font-bold tracking-[0.3em] hover:bg-emerald-400 transition-all active:scale-[0.98] shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                id="btn-confirm"
              >
                Authorize Link
              </button>
            </div>
          </div>

        </div>
      </main>

      {/* Status Footer */}
      <footer className="h-12 border-t border-white/10 px-6 md:px-10 flex items-center justify-between text-[9px] text-white/30 uppercase tracking-[0.2em] bg-[#0A0A0A] shrink-0 z-40">
        <div className="hidden sm:block">Session: 0x{Math.random().toString(16).substring(2, 10)}...{Math.random().toString(16).substring(2, 6)}</div>
        <div className="mx-auto sm:mx-0">Tor Browser Routing Protocol Required</div>
        <div className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Cpu className="w-3 h-3 opacity-50" />
            <span>MESH: v4.1-ALPHA</span>
          </div>
          <span className="text-white/60">Encryption: RSA-4096 / AES-256</span>
        </div>
      </footer>
    </div>
  );
}

