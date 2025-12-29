'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Gamepad2, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Room {
  id: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  description: string;
  link?: string;
  action?: () => void;
}

interface DialogData {
  room: Room;
  x: number;
  y: number;
}

export default function PortfolioGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [dialogData, setDialogData] = useState<DialogData | null>(null);
  const [isMaximized, setIsMaximized] = useState(false);
  const router = useRouter();
  const gameLoopRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (!isPlaying || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Game state
    const player = {
      x: 250,
      y: 250,
      width: 24,
      height: 24,
      speed: 2,
      color: '#f8f8f8'
    };

    const keys: { [key: string]: boolean } = {};

    // Define rooms with descriptions
    const rooms: Room[] = [
      { 
        id: 'projects', 
        name: 'PROJECTS', 
        x: 100, 
        y: 50, 
        width: 120, 
        height: 100, 
        color: '#22c55e',
        description: 'Explore my game projects from Master Cat Games including Oliver the Octopus and more!',
        link: '#projects' 
      },
      { 
        id: 'experience', 
        name: 'EXPERIENCE', 
        x: 280, 
        y: 50, 
        width: 120, 
        height: 100, 
        color: '#f59e0b',
        description: '10+ years in software development and game creation. See my professional journey.',
        link: '/work-experience' 
      },
      { 
        id: 'about', 
        name: 'ABOUT ME', 
        x: 100, 
        y: 200, 
        width: 120, 
        height: 100, 
        color: '#3b82f6',
        description: 'Learn about my transition from software engineering to game development.',
        link: '#about' 
      },
      { 
        id: 'contact', 
        name: 'CONTACT', 
        x: 280, 
        y: 200, 
        width: 120, 
        height: 100, 
        color: '#ec4899',
        description: 'Connect with me on LinkedIn, Twitter, or other social platforms!',
        link: '#contact' 
      },
      { 
        id: 'terminal', 
        name: 'TERMINAL', 
        x: 190, 
        y: 350, 
        width: 120, 
        height: 80, 
        color: '#14b8a6',
        description: 'Navigate my portfolio using a retro terminal interface. Type commands!',
        action: () => {
          const terminalSection = document.getElementById('terminal-section');
          if (terminalSection) {
            terminalSection.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
    ];

    // Input handlers
    const handleKeyDown = (e: KeyboardEvent) => {
      keys[e.key.toLowerCase()] = true;
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
        e.preventDefault();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keys[e.key.toLowerCase()] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // Collision detection with rooms
    const checkRoomCollision = (x: number, y: number, width: number, height: number) => {
      for (const room of rooms) {
        // Check if player overlaps with room
        if (
          x < room.x + room.width &&
          x + width > room.x &&
          y < room.y + room.height &&
          y + height > room.y
        ) {
          return room;
        }
      }
      return null;
    };

    // Check collision with canvas boundaries
    const checkBoundaryCollision = (x: number, y: number, width: number, height: number) => {
      return x < 10 || x + width > canvas.width - 10 || y < 10 || y + height > canvas.height - 10;
    };

    // Check if player is near a room entrance (door)
    const checkNearDoor = () => {
      for (const room of rooms) {
        const doorX = room.x + room.width / 2 - 15;
        const doorY = room.y + room.height;
        const distance = Math.sqrt(
          Math.pow(player.x + player.width / 2 - (doorX + 15), 2) + 
          Math.pow(player.y + player.height / 2 - doorY, 2)
        );
        if (distance < 25) {
          return room;
        }
      }
      return null;
    };

    let nearRoom: Room | null = null;

    // Game loop
    const gameLoop = () => {
      // Clear canvas
      ctx.fillStyle = '#1e1e2e';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw dotted grid floor (like Baba is You)
      ctx.fillStyle = '#2a2a3e';
      for (let y = 0; y < canvas.height; y += 16) {
        for (let x = 0; x < canvas.width; x += 16) {
          if ((x / 16 + y / 16) % 2 === 0) {
            ctx.fillRect(x, y, 1, 1);
          }
        }
      }

      // Draw rooms
      rooms.forEach(room => {
        // Room border (thicker, pixel art style)
        ctx.fillStyle = room.color;
        ctx.fillRect(room.x - 2, room.y - 2, room.width + 4, room.height + 4);
        
        // Room interior
        ctx.fillStyle = '#2d2d44';
        ctx.fillRect(room.x, room.y, room.width, room.height);

        // Room name
        ctx.fillStyle = room.color;
        ctx.font = 'bold 14px monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(room.name, room.x + room.width / 2, room.y + room.height / 2);

        // Door indicator (pixel art style)
        const doorX = room.x + room.width / 2 - 15;
        const doorY = room.y + room.height;
        ctx.fillStyle = '#1e1e2e';
        ctx.fillRect(doorX, doorY - 8, 30, 8);
        ctx.fillStyle = room.color;
        ctx.fillRect(doorX, doorY - 7, 30, 2);
        ctx.fillRect(doorX, doorY - 3, 30, 2);
      });

      // Update player position
      let newX = player.x;
      let newY = player.y;

      if (keys['arrowup'] || keys['w']) newY -= player.speed;
      if (keys['arrowdown'] || keys['s']) newY += player.speed;
      if (keys['arrowleft'] || keys['a']) newX -= player.speed;
      if (keys['arrowright'] || keys['d']) newX += player.speed;

      // Check collisions before moving
      let canMoveX = true;
      let canMoveY = true;

      if (checkBoundaryCollision(newX, player.y, player.width, player.height)) {
        canMoveX = false;
      }
      if (checkRoomCollision(newX, player.y, player.width, player.height)) {
        canMoveX = false;
      }

      if (checkBoundaryCollision(player.x, newY, player.width, player.height)) {
        canMoveY = false;
      }
      if (checkRoomCollision(player.x, newY, player.width, player.height)) {
        canMoveY = false;
      }

      if (canMoveX) player.x = newX;
      if (canMoveY) player.y = newY;

      // Draw player (pixel art style character)
      ctx.fillStyle = player.color;
      // Body
      ctx.fillRect(player.x + 6, player.y + 6, 12, 12);
      // Head
      ctx.fillRect(player.x + 6, player.y, 12, 6);
      // Eyes
      ctx.fillStyle = '#1e1e2e';
      ctx.fillRect(player.x + 8, player.y + 2, 3, 3);
      ctx.fillRect(player.x + 13, player.y + 2, 3, 3);
      // Legs
      ctx.fillStyle = player.color;
      ctx.fillRect(player.x + 6, player.y + 18, 5, 6);
      ctx.fillRect(player.x + 13, player.y + 18, 5, 6);

      // Check interaction
      nearRoom = checkNearDoor();
      if (nearRoom) {
        // Draw "PRESS SPACE" text above player
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 16px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('PRESS SPACE', player.x + player.width / 2, player.y - 20);
        
        // Enter room on space
        if (keys[' ']) {
          keys[' '] = false; // Prevent multiple triggers
          setDialogData({
            room: nearRoom,
            x: nearRoom.x + nearRoom.width / 2,
            y: nearRoom.y + nearRoom.height / 2
          });
        }
      }

      gameLoopRef.current = requestAnimationFrame(gameLoop);
    };

    gameLoop();

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [isPlaying, router]);

  const handleDialogAction = () => {
    if (!dialogData) return;

    const room = dialogData.room;
    setDialogData(null);
    setIsPlaying(false);

    if (room.link) {
      if (room.link.startsWith('#')) {
        setTimeout(() => {
          document.querySelector(room.link!)?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        router.push(room.link);
      }
    } else if (room.action) {
      room.action();
    }
  };

  return (
    <section className="py-24 px-6 bg-zinc-50 dark:bg-zinc-900/30">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold mb-4 text-center flex items-center justify-center gap-3">
            <Gamepad2 className="w-10 h-10 text-accent" />
            Explore My Portfolio
          </h2>
          <p className="text-muted text-center mb-8">
            Play this retro-style mini-game to navigate through my portfolio. Walk around and enter different rooms!
          </p>

          {!isPlaying ? (
            <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 border-2 border-accent/30 rounded-lg p-8 text-center">
              <Gamepad2 className="w-20 h-20 text-accent mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">Portfolio Adventure</h3>
              <p className="text-muted mb-6 max-w-2xl mx-auto">
                Navigate through different rooms to explore my portfolio sections. 
                Each room represents a different area - Projects, Experience, About Me, and more!
              </p>
              <button
                onClick={() => {
                  setIsPlaying(true);
                  setShowInstructions(true);
                }}
                className="px-8 py-4 bg-accent hover:bg-accent-dark text-white rounded-lg font-medium transition-colors inline-flex items-center gap-2"
              >
                <Gamepad2 className="w-5 h-5" />
                Start Game
              </button>
              <div className="mt-8 space-y-2 text-sm text-muted">
                <div>🎮 Controls: WASD or Arrow Keys to move</div>
                <div>⌨️ Press SPACE near doors to interact</div>
                <div>🚪 Each room links to a portfolio section</div>
              </div>
            </div>
          ) : (
            <div className="relative">
              <div 
                className={`bg-gray-900 rounded-lg shadow-2xl overflow-hidden border-4 border-accent transition-all ${
                  isMaximized ? 'fixed inset-4 z-50' : ''
                }`}
                style={{ imageRendering: 'pixelated' }}
              >
                <div className="bg-gray-800 px-4 py-2 flex items-center justify-between border-b-4 border-gray-700">
                  <div className="flex items-center gap-3">
                    <Gamepad2 className="w-5 h-5 text-accent" />
                    <span className="text-sm text-gray-300 font-['Press_Start_2P',_monospace] text-[10px]">PORTFOLIO ADVENTURE</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsMaximized(!isMaximized)}
                      className="text-gray-400 hover:text-white transition-colors px-2"
                      title={isMaximized ? "Minimize" : "Maximize"}
                    >
                      <span className="text-xl font-bold">{isMaximized ? '□' : '▢'}</span>
                    </button>
                    <button
                      onClick={() => {
                        setIsPlaying(false);
                        setDialogData(null);
                        setIsMaximized(false);
                      }}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="relative">
                  <canvas
                    ref={canvasRef}
                    width={500}
                    height={500}
                    className={`mx-auto bg-gray-950 ${isMaximized ? 'w-full h-[calc(100vh-120px)]' : 'w-full max-w-[500px]'}`}
                    style={{ imageRendering: 'pixelated' }}
                  />
                  
                  {/* Dialog overlay */}
                  <AnimatePresence>
                    {dialogData && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="absolute inset-0 flex items-center justify-center bg-black/70 p-8"
                      >
                        <div className="bg-[#2d2d44] border-4 border-accent rounded-lg p-6 max-w-md w-full">
                          <h3 
                            className="font-['Press_Start_2P',_monospace] text-accent mb-4 text-sm leading-relaxed"
                            style={{ lineHeight: '1.8' }}
                          >
                            {dialogData.room.name}
                          </h3>
                          <p 
                            className="text-white text-sm mb-6 leading-relaxed font-mono"
                          >
                            {dialogData.room.description}
                          </p>
                          <div className="flex gap-3 justify-end">
                            <button
                              onClick={() => setDialogData(null)}
                              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded font-['Press_Start_2P',_monospace] text-[8px] transition-colors"
                              style={{ lineHeight: '2' }}
                            >
                              CANCEL
                            </button>
                            <button
                              onClick={handleDialogAction}
                              className="px-4 py-2 bg-accent hover:bg-accent-dark text-white rounded font-['Press_Start_2P',_monospace] text-[8px] transition-colors inline-flex items-center gap-2"
                              style={{ lineHeight: '2' }}
                            >
                              LEARN MORE
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <AnimatePresence>
                {showInstructions && !dialogData && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="mt-4 p-4 bg-accent/10 border-2 border-accent/30 rounded-lg"
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 text-sm">
                        <div className="font-bold text-accent font-['Press_Start_2P',_monospace] text-[10px] mb-3">HOW TO PLAY:</div>
                        <div>• Move with <kbd className="px-2 py-1 bg-gray-800 rounded text-xs font-['Press_Start_2P',_monospace]">WASD</kbd> or <kbd className="px-2 py-1 bg-gray-800 rounded text-xs font-['Press_Start_2P',_monospace]">ARROWS</kbd></div>
                        <div>• Walk to the colored rooms</div>
                        <div>• Press <kbd className="px-2 py-1 bg-gray-800 rounded text-xs font-['Press_Start_2P',_monospace]">SPACE</kbd> near doors</div>
                      </div>
                      <button
                        onClick={() => setShowInstructions(false)}
                        className="text-muted hover:text-white"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
