'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gamepad2, Maximize2, Minimize2 } from 'lucide-react';
import { trackGameInteraction } from '../utils/analytics';

export default function GameIframeWithStartPanel() {
  const [showStartPanel, setShowStartPanel] = useState(true);
  const [iframeSrc, setIframeSrc] = useState('about:blank');
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const gameContainerRef = useRef<HTMLDivElement>(null);
  const [isMobile] = useState(
    typeof window !== 'undefined' &&
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  );
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      const activeElement = document.fullscreenElement;
      setIsFullscreen(Boolean(activeElement) && activeElement === gameContainerRef.current);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const toggleFullscreen = async () => {
    try {
      const container = gameContainerRef.current;
      if (!container) return;

      if (document.fullscreenElement) {
        await document.exitFullscreen();
        return;
      }

      await container.requestFullscreen();
    } catch {
      // ignore
    }
  };

  const handlePlayGame = () => {
    // Track game start in Google Analytics
    trackGameInteraction('Portfolio Adventure', 'play_game');
    
    setShowStartPanel(false);

    // On mobile, try to enter fullscreen for a true "maximized" experience.
    // If unsupported/blocked, the container still uses full viewport height.
    if (isMobile) {
      try {
        gameContainerRef.current?.requestFullscreen?.();
      } catch {
        // ignore
      }
    }

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
          <h2 className="text-4xl font-bold mb-4 text-center flex items-center justify-center gap-3">
            Explore playing a game
          </h2>

          <p className="text-muted text-center mb-8">
            Navigate through my portfolio game and interact with objects to discover my work.
          </p>

          <div className="flex justify-center">
            <div className="w-full md:w-4/5">
              <div className="flex items-center justify-end mb-2">
                <button
                  type="button"
                  onClick={toggleFullscreen}
                  disabled={showStartPanel}
                  aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-accent hover:bg-accent-dark disabled:opacity-50 disabled:cursor-not-allowed text-white transition-colors"
                >
                  {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                  <span className="text-sm">{isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}</span>
                </button>
              </div>

              <div
                ref={gameContainerRef}
                className="relative w-full h-svh md:h-150 overflow-hidden bg-black"
              >
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
              allow="analytics; performance-observer; autoplay; fullscreen"
              sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
              className="absolute inset-0 h-full w-[calc(100%+20px)]"
              allowFullScreen
              style={{ 
                border: 'none', 
                display: 'block',
                outline: 'none',
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
                  className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center"
                  style={{ zIndex: 10 }}
                >
                  <div className="text-center px-8">
                    <Gamepad2 className="w-24 h-24 text-accent mx-auto mb-6 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]" />
                    <h3 className="text-3xl font-bold mb-8 text-white font-['Press_Start_2P',monospace] leading-relaxed drop-shadow-lg">
                      PORTFOLIO<br/>ADVENTURE
                    </h3>
                    <button
                      onClick={handlePlayGame}
                      className="px-10 py-5 bg-accent hover:bg-accent-dark text-white rounded-lg font-['Press_Start_2P',monospace] text-sm transition-all transform hover:scale-105 inline-flex items-center gap-3 shadow-xl hover:shadow-2xl hover:shadow-accent/50"
                    >
                      <Gamepad2 className="w-6 h-6" />
                      PLAY NOW!
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
