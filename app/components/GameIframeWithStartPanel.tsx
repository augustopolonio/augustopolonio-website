'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gamepad2 } from 'lucide-react';

export default function GameIframeWithStartPanel() {
  const [showStartPanel, setShowStartPanel] = useState(true);
  const [iframeSrc, setIframeSrc] = useState('about:blank');
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isMobile] = useState(
    typeof window !== 'undefined' && 
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  );

  const handlePlayGame = () => {
    setShowStartPanel(false);
    // Load the iframe content only when user clicks play
    setIframeSrc('https://augustopolonio.github.io/portfolio-game-2d/');
    // Focus on iframe to start music
    setTimeout(() => {
      if (iframeRef.current) {
        iframeRef.current.focus();
        // Also try to click inside the iframe to ensure it's focused
        iframeRef.current.contentWindow?.focus();
      }
    }, 100);
  };

  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative w-full" style={{ height: '600px' }}>
            {/* Video Preview - visible when start panel is shown */}
            {showStartPanel && (
              <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
                style={{ zIndex: 1 }}
              >
                <source src="/video/AugustoPolonio_PortfolioGame2D_Preview.mp4" type="video/mp4" />
              </video>
            )}
            
            <iframe
              ref={iframeRef}
              src={iframeSrc}
              allow="analytics; performance-observer; autoplay"
              sandbox="allow-scripts allow-same-origin"
              className="w-full h-full"
              style={{ 
                border: 'none', 
                display: 'block',
                pointerEvents: showStartPanel ? 'none' : 'auto',
                opacity: showStartPanel ? 0 : 1,
                transition: 'opacity 0.3s ease'
              }}
              title="Portfolio Game"
            />
            
            {/* Start Game Panel Overlay */}
            <AnimatePresence>
              {showStartPanel && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center"
                  style={{ zIndex: 10 }}
                >
                  <div className="text-center px-8">
                    <Gamepad2 className="w-24 h-24 text-accent mx-auto mb-6 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]" />
                    <h3 className="text-3xl font-bold mb-4 text-white font-['Press_Start_2P',monospace] leading-relaxed drop-shadow-lg">
                      PORTFOLIO<br/>ADVENTURE
                    </h3>
                    <p className="text-gray-300 mb-8 max-w-md mx-auto text-sm leading-relaxed">
                      Play this retro-style mini-game to navigate through my portfolio.
                    </p>
                    <button
                      onClick={handlePlayGame}
                      className="px-10 py-5 bg-accent hover:bg-accent-dark text-white rounded-lg font-['Press_Start_2P',monospace] text-sm transition-all transform hover:scale-105 inline-flex items-center gap-3 shadow-xl hover:shadow-2xl hover:shadow-accent/50"
                    >
                      <Gamepad2 className="w-6 h-6" />
                      PLAY GAME!
                    </button>
                    <div className="mt-8 space-y-2 text-xs text-gray-400 font-mono">
                      {isMobile ? (
                        <>
                          <div>🕹️ Use on-screen controls to move</div>
                          <div>👆 Tap buttons to interact</div>
                        </>
                      ) : (
                        <>
                          <div>🎮 WASD or Arrow Keys to move</div>
                          <div>⌨️ SPACE to interact</div>
                        </>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
