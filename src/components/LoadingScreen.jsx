import React, { useState, useEffect } from 'react';

export function LoadingScreen({ onComplete }) {
  const [fading, setFading] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    // Dignified, non-blocking entrance reveal (fades out within 1s)
    const fadeTimer = setTimeout(() => {
      setFading(true);
    }, 750);

    const doneTimer = setTimeout(() => {
      setHidden(true);
      if (onComplete) onComplete();
    }, 1150);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, [onComplete]);

  if (hidden) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0a0a0c] transition-opacity duration-400 pointer-events-none ${
        fading ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center gap-4 text-center px-4">
        <div className="w-10 h-10 rounded-xl bg-[#141418] border border-white/10 p-1.5 flex items-center justify-center">
          <img
            src="/assets/logo.png"
            alt="Logo"
            className="w-full h-full object-contain"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </div>

        <div className="space-y-1">
          <h1 className="text-xl sm:text-2xl font-medium font-editorial tracking-wider text-[#f7f7f4]">
            AR VR <span className="font-serif-accent italic font-normal text-[#c8b9db]">hub</span>
          </h1>
          <p className="text-[10px] font-mono tracking-widest uppercase text-[#7a7a82]">
            BMS INSTITUTE OF TECHNOLOGY & MANAGEMENT
          </p>
        </div>

        {/* Refined subtle line indicator */}
        <div className="w-40 h-[1.5px] bg-white/[0.08] rounded-full overflow-hidden mt-2 relative">
          <div className="h-full bg-gradient-to-r from-transparent via-[#9d85b5] to-transparent rounded-full animate-line-fade w-full" />
        </div>
      </div>
    </div>
  );
}
