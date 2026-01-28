'use client';

import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import React from 'react';
import { trackTerminalCommand } from '../utils/analytics';

interface CommandOutput {
  command: string;
  output: string | React.ReactNode;
}

export default function InteractiveTerminal() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<CommandOutput[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const fileSystem: Record<string, any> = {
    'about_me.txt': {
      type: 'file',
      content: `Name: Augusto Polonio
Role: Game Developer & Software Engineer
Location: Remote

I'm a Senior Software Developer transitioning into Game Development,
combining 10+ years of web/mobile experience with a passion for
creating interactive experiences.

Skills:
- Game Development: Unity, Godot, C#
- Web/Mobile: JavaScript, TypeScript, React, Node.js, .NET
- Focus: Performance optimization, system design, gameplay mechanics`
    },
    'projects': {
      type: 'directory',
      contents: {
        'oliver_the_octopus.game': { type: 'file', content: 'A platform game based on crates with different mechanics.\nEngine: Unity\nStatus: Released\nLink: https://mastercatgames.itch.io/oliver-the-octopus' },
        'tinturaria.game': { type: 'file', content: 'A color matching puzzle game about delivering colored boxes.\nEngine: Unity\nStatus: Released on Google Play\nLink: https://play.google.com/store/apps/details?id=com.mastercat.tinturaria' },
        'flappy_black_cat.game': { type: 'file', content: 'Classic Flappy Bird style game featuring a black cat.\nEngine: Unity\nStatus: Released on Google Play' },
        'crazy_stack_blocks.game': { type: 'file', content: 'A puzzle stacking game with addictive gameplay.\nEngine: Unity\nStatus: Released on itch.io' },
        'running_food.game': { type: 'file', content: 'An endless runner where Lucy fights the Blubbers organization.\nEngine: Unity\nStatus: Released on Google Play' },
        'README.md': { type: 'file', content: 'Visit https://mastercatgames.vercel.app/ for more projects!' }
      }
    },
    'unreleased_projects': {
      type: 'directory',
      contents: {
        'alone_at_the_fast_food.game': { type: 'file', content: 'A horror survival game set in an abandoned fast food restaurant.\nEngine: Godot\nStatus: In Development\nFeatures: Dark atmosphere, puzzles, survival mechanics' },
        'README.md': { type: 'file', content: 'These are my current projects in development. Stay tuned!' }
      }
    },
    'experience.txt': {
      type: 'file',
      content: `PROFESSIONAL EXPERIENCE

Software Development: 10+ years
- JavaScript, TypeScript, Node.js, React
- .NET, C#
- Mobile development
- Web applications
- Performance optimization

Game Development: 9+ years (hobby → career transition)
- Unity, Godot
- Mobile games
- 2D/3D gameplay mechanics
- Published titles on Google Play and itch.io

Notable: Master Cat Games indie studio founder`
    },
    'contact.txt': {
      type: 'file',
      content: `CONTACT INFORMATION

LinkedIn: https://www.linkedin.com/in/augustopolonio/
Twitter/X: https://x.com/augustopolonio
Instagram: https://www.instagram.com/gutopolonio
YouTube: https://www.youtube.com/@gutopolonio
Linktree: https://linktree.com/augustopolonio

Email: Check LinkedIn for contact details
Portfolio: You're here! 🎮

Feel free to reach out for collaborations or opportunities!`
    },
    'resume.pdf': {
      type: 'file',
      content: 'Opening resume... Redirecting to PDF file.',
      action: () => window.open('/Augusto Polonio - Resume.pdf', '_blank')
    },
    'skills.json': {
      type: 'file',
      content: `{
  "gameEngines": ["Unity", "Godot"],
  "languages": ["C#", "JavaScript", "TypeScript", "GDScript"],
  "webTech": ["React", "Node.js", "Next.js", ".NET"],
  "mobile": ["Android", "iOS", "React Native"],
  "tools": ["Git", "VS Code", "Visual Studio"],
  "focus": ["Game Design", "Performance", "System Architecture"]
}`
    }
  };

  const commands: Record<string, (args: string[]) => string | React.ReactNode> = {
    help: () => (
      <div className="space-y-2">
        <div className="text-yellow-400 font-bold">Available commands:</div>
        <div className="ml-4 space-y-1">
          <div><span className="text-cyan-400">ls [directory]</span> - List files and directories</div>
          <div><span className="text-cyan-400">cat &lt;file&gt;</span> - Display file contents</div>
          <div><span className="text-cyan-400">cd &lt;directory&gt;</span> - Change directory</div>
          <div><span className="text-cyan-400">pwd</span> - Print working directory</div>
          <div><span className="text-cyan-400">clear</span> - Clear terminal</div>
          <div><span className="text-cyan-400">whoami</span> - Display user info</div>
          <div><span className="text-cyan-400">skills</span> - Show technical skills</div>
          <div><span className="text-cyan-400">social</span> - Show social media links</div>
          <div><span className="text-cyan-400">easter-egg</span> - Try to find hidden commands 🥚</div>
          <div><span className="text-cyan-400">help</span> - Show this help message</div>
        </div>
        <div className="text-yellow-400 font-bold mt-3">Navigation shortcuts:</div>
        <div className="ml-4 space-y-1">
          <div><span className="text-green-400">Tab</span> - Autocomplete</div>
          <div><span className="text-green-400">↑/↓</span> - Command history</div>
        </div>
        <div className="mt-3 text-gray-400">
          💡 Tip: Try 'cat resume.pdf' or explore with 'ls'!
        </div>
      </div>
    ),

    ls: (args) => {
      const path = args[0] || '';
      let target = fileSystem;

      if (path) {
        if (fileSystem[path] && fileSystem[path].type === 'directory') {
          target = fileSystem[path].contents;
        } else {
          return `ls: cannot access '${path}': No such directory`;
        }
      }

      const entries = Object.keys(target).map(key => {
        const item = path ? target[key] : fileSystem[key];
        const isDir = item.type === 'directory';
        return (
          <div key={key} className="flex items-center gap-2">
            <span className={isDir ? 'text-blue-400 font-bold' : 'text-green-400'}>
              {isDir ? '📁' : '📄'}
            </span>
            <span className={isDir ? 'text-blue-400' : 'text-white'}>
              {key}
            </span>
          </div>
        );
      });

      return <div className="flex flex-col gap-1">{entries}</div>;
    },

    cat: (args) => {
      if (args.length === 0) return 'cat: missing file operand\nTry \'help\' for more information.';
      
      const fileName = args[0];
      const file = fileSystem[fileName];

      if (!file) {
        return `cat: ${fileName}: No such file`;
      }

      if (file.type === 'directory') {
        return `cat: ${fileName}: Is a directory`;
      }

      if (file.action) {
        file.action();
        return file.content;
      }

      return <pre className="whitespace-pre-wrap text-gray-300 font-mono text-sm leading-relaxed">{file.content}</pre>;
    },

    pwd: () => '/home/augustopolonio',

    whoami: () => `augustopolonio

🎮 Game Developer | 💻 Software Engineer

"Turning code into experiences, one line at a time."

Type 'cat about_me.txt' to learn more!`,

    skills: () => {
      return (
        <div className="space-y-2">
          <div className="text-cyan-400">🎮 Game Development:</div>
          <div className="ml-4 text-gray-300">Unity • Godot • C# • GDScript • Game Design</div>
          
          <div className="text-cyan-400 mt-3">💻 Software Development:</div>
          <div className="ml-4 text-gray-300">JavaScript • TypeScript • React • Node.js • .NET • C#</div>
          
          <div className="text-cyan-400 mt-3">📱 Mobile Development:</div>
          <div className="ml-4 text-gray-300">Android • iOS • React Native</div>
          
          <div className="text-cyan-400 mt-3">🛠️ Tools & Practices:</div>
          <div className="ml-4 text-gray-300">Git • CI/CD • Performance Optimization • System Design</div>
        </div>
      );
    },

    social: () => {
      return (
        <div className="space-y-2">
          <div className="text-purple-400">🔗 Connect with me:</div>
          <div className="ml-4 space-y-1 text-gray-300">
            <div>💼 LinkedIn: <a href="https://www.linkedin.com/in/augustopolonio/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">linkedin.com/in/augustopolonio</a></div>
            <div>🐦 Twitter: <a href="https://x.com/augustopolonio" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">@augustopolonio</a></div>
            <div>📺 YouTube: <a href="https://www.youtube.com/@gutopolonio" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">@gutopolonio</a></div>
            <div>📷 Instagram: <a href="https://www.instagram.com/gutopolonio" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">@gutopolonio</a></div>
            <div>🔗 Linktree: <a href="https://linktree.com/augustopolonio" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">linktree.com/augustopolonio</a></div>
          </div>
        </div>
      );
    },

    clear: () => {
      setHistory([]);
      return '';
    },

    cls: () => {
      setHistory([]);
      return '';
    },

    'easter-egg': () => (
      <div className="space-y-2">
        <div className="text-yellow-400 font-bold">🥚 You found the easter egg!</div>
        <div className="mt-3 text-purple-400 font-bold">Fun facts about me:</div>
        <div className="ml-4 space-y-1">
          <div>• I've been making games since 2015</div>
          <div>• My indie studio is called Master Cat Games 🐱</div>
          <div>• I love combining technical depth with creative vision</div>
          <div>• Coffee-powered developer ☕</div>
        </div>
        <div className="mt-3 text-gray-400">
          💡 Try: 'sudo make-me-a-sandwich' or 'cat projects/oliver_the_octopus.game'
        </div>
      </div>
    ),

    'sudo': (args) => {
      if (args.join(' ') === 'make-me-a-sandwich') {
        return '🥪 Okay, here\'s your sandwich! (You must be hungry from all that coding)';
      }
      return 'Nice try! But you don\'t need sudo here. 😉';
    },

    cd: (args) => {
      if (args.length === 0) return 'cd: missing directory operand';
      const dir = args[0];
      if (fileSystem[dir] && fileSystem[dir].type === 'directory') {
        return `Changed directory to ${dir}. (Note: This is a simplified terminal - use 'ls ${dir}' to see contents)`;
      }
      return `cd: ${dir}: No such directory`;
    }
  };

  const executeCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim();
    if (!trimmedCmd) return;

    const [command, ...args] = trimmedCmd.split(' ');
    const commandFn = commands[command.toLowerCase()];

    // Track the command in Google Analytics
    trackTerminalCommand(trimmedCmd);

    let output: string | React.ReactNode;
    if (commandFn) {
      const result = commandFn(args);
      if (command.toLowerCase() === 'clear' || command.toLowerCase() === 'cls') {
        return;
      }
      output = result;
    } else if (command) {
      output = `Command not found: ${command}. Type 'help' for available commands.`;
    } else {
      output = '';
    }

    setHistory([...history, { command: trimmedCmd, output }]);
    setCommandHistory([...commandHistory, trimmedCmd]);
    setHistoryIndex(-1);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setInput('');
        } else {
          setHistoryIndex(newIndex);
          setInput(commandHistory[newIndex]);
        }
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const availableCommands = Object.keys(commands);
      const matches = availableCommands.filter(cmd => cmd.startsWith(input.toLowerCase()));
      if (matches.length === 1) {
        setInput(matches[0]);
      }
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
          <h2 className="text-4xl font-bold mb-4 text-center">Interactive Terminal</h2>
          <p className="text-muted text-center mb-8">
            Explore my portfolio the developer way. Type <code className="px-2 py-1 bg-accent/10 text-accent rounded">help</code> to get started.
          </p>

          <div 
            className="bg-gray-900 rounded-lg shadow-2xl overflow-hidden border-2 border-gray-700 font-mono"
            onClick={() => inputRef.current?.focus()}
          >
            {/* Terminal Header */}
            <div className="bg-gray-800 px-4 py-2 flex items-center gap-2 border-b border-gray-700">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <span className="ml-2 text-sm text-gray-400">augustopolonio@portfolio:~</span>
            </div>

            {/* Terminal Content */}
            <div 
              ref={terminalRef}
              className="p-4 h-96 overflow-y-auto text-sm custom-scrollbar"
            >
              {/* Welcome Message */}
              <div className="mb-4 text-green-400">
                <div>Welcome to Augusto Polonio's Portfolio Terminal v1.0</div>
                <div className="text-gray-400 mt-1">Type 'help' for available commands.</div>
              </div>

              {/* Command History */}
              {history.map((item, index) => (
                <div key={index} className="mb-3">
                  <div className="flex items-center gap-2 text-green-400">
                    <span className="text-purple-400">$</span>
                    <span className="text-cyan-400">augustopolonio</span>
                    <span className="text-gray-500">~</span>
                    <span className="text-white">{item.command}</span>
                  </div>
                  <div className="mt-1 ml-4 text-gray-300">{item.output}</div>
                </div>
              ))}

              {/* Current Input Line */}
              <div className="flex items-center gap-2">
                <span className="text-purple-400">$</span>
                <span className="text-cyan-400">augustopolonio</span>
                <span className="text-gray-500">~</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent outline-none text-white caret-green-400"
                  spellCheck="false"
                  autoComplete="off"
                />
              </div>
            </div>
          </div>

          <p className="text-center text-sm text-muted mt-4">
            💡 Tip: Try commands like <code className="px-1.5 py-0.5 bg-accent/10 text-accent rounded text-xs">ls</code>, <code className="px-1.5 py-0.5 bg-accent/10 text-accent rounded text-xs">cat about_me.txt</code>, or <code className="px-1.5 py-0.5 bg-accent/10 text-accent rounded text-xs">skills</code>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
