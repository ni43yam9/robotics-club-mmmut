import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { EncryptedText } from "../../components/ui/EncryptedText";
import ShaderWaves from "../../components/ui/ShaderWaves";

export default function EmbedxPage() {
  const bannerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState('About');
  const tabs = ['About', 'Structure', 'Timeline', 'Rules', 'Contact'];

  const handleContainerScroll = () => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const containerTop = container.getBoundingClientRect().top;
    
    let current = 'About';
    for (const tab of tabs) {
      const el = document.getElementById(`section-${tab}`);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top - containerTop <= 100) {
          current = tab;
        }
      }
    }

    // If we've hit the absolute bottom of the scroll container, force the last tab to be active
    const isAtBottom = container.scrollHeight - container.scrollTop <= container.clientHeight + 10;
    if (isAtBottom) {
      current = tabs[tabs.length - 1]; // 'Contact'
    }

    setActiveTab(current);
  };

  const scrollToSection = (tab: string) => {
    const el = document.getElementById(`section-${tab}`);
    const container = containerRef.current;
    if (el && container) {
      const containerTop = container.getBoundingClientRect().top;
      const elTop = el.getBoundingClientRect().top;
      const currentScroll = container.scrollTop;
      container.scrollTo({ top: currentScroll + (elTop - containerTop) - 20, behavior: 'smooth' });
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!bannerRef.current) return;
    const rect = bannerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    bannerRef.current.style.setProperty("--mouse-x", `${x}px`);
    bannerRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <div className="min-h-screen w-full bg-[#050810] text-white relative flex flex-col font-['Inter']">
      
      {/* WebGL Animated Waves Background (Base) */}
      <ShaderWaves />
      
      {/* Blended Background Layer */}
      <div 
        className="fixed inset-0 z-[1] pointer-events-none bg-cover bg-center bg-no-repeat mix-blend-screen opacity-20"
        style={{ 
          backgroundImage: `url('/embedx-chip-bg.jpg')`,
          WebkitMaskImage: 'radial-gradient(ellipse at center 40%, black 10%, transparent 70%)',
          maskImage: 'radial-gradient(ellipse at center 40%, black 10%, transparent 70%)'
        }}
      />

      <div className="fixed inset-0 bg-gradient-to-b from-[#050810]/90 via-[#050810]/40 to-[#050810] pointer-events-none z-[2]" />
      
      <Link to="/" className="fixed top-4 left-4 md:top-8 md:left-8 text-neutral-400 hover:text-white flex items-center gap-2 transition-colors z-50 uppercase tracking-widest text-[10px] md:text-xs font-bold font-mono bg-black/40 px-3 py-1.5 md:px-4 md:py-2 rounded-lg backdrop-blur-md border border-white/10">
        &larr; Back
      </Link>

      <div className="z-10 w-full flex flex-col">
        {/* Full Width Hero Banner with Spotlight Hover */}
        <div 
          ref={bannerRef}
          onMouseMove={handleMouseMove}
          className="relative w-full h-[100px] md:h-[125px] lg:h-[150px] mt-0 overflow-hidden group cursor-crosshair bg-[#050505]"
        >
          {/* Base Layer: Dark and muted */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat w-full h-full opacity-20 grayscale-[50%] transition-transform duration-1000 ease-out group-hover:scale-105"
            style={{ backgroundImage: `url('/embedx-robot-panoramic.jpg')` }}
          />
          
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050810] pointer-events-none" />
          
          {/* Spotlight Layer */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat w-full h-full opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out group-hover:scale-105"
            style={{ 
              backgroundImage: `url('/embedx-robot-panoramic.jpg')`,
              WebkitMaskImage: `radial-gradient(circle 250px at var(--mouse-x, 50%) var(--mouse-y, 50%), black 0%, transparent 100%)`,
              maskImage: `radial-gradient(circle 250px at var(--mouse-x, 50%) var(--mouse-y, 50%), black 0%, transparent 100%)`
            }}
          />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-5xl mx-auto flex flex-col items-center justify-center pt-6 md:pt-8 pb-4 md:pb-6 px-4"
        >
            <div className="flex flex-col items-center justify-start text-center w-full self-start">
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter drop-shadow-2xl">
                <EncryptedText text="EMBEDX" revealedClass="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500" />
              </h1>
              
              <div className="mt-4 md:mt-6 flex flex-col items-center gap-4 w-full">
                <div className="flex items-center justify-center gap-2 md:gap-4 text-[10px] sm:text-xs md:text-sm font-bold tracking-widest md:tracking-[0.3em] text-blue-500 uppercase font-mono w-full">
                  <span className="w-6 sm:w-8 md:w-12 h-[1px] bg-gradient-to-r from-transparent to-blue-500"></span>
                  <span className="text-center">INNOVATE • BUILD • DEPLOY</span>
                  <span className="w-6 sm:w-8 md:w-12 h-[1px] bg-gradient-to-l from-transparent to-blue-500"></span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 md:mt-10 flex flex-col sm:flex-row gap-3 md:gap-4 w-full sm:w-auto justify-center px-2">
                <button className="relative overflow-hidden group bg-[#3b82f6] hover:bg-[#2563eb] text-white w-full sm:w-auto px-6 md:px-8 py-3.5 rounded-lg font-bold tracking-widest uppercase text-[11px] md:text-[12px] transition-all duration-300 shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:shadow-[0_0_25px_rgba(59,130,246,0.5)]">
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Register Now <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                  </span>
                </button>
                
                <button className="relative overflow-hidden group bg-transparent border border-neutral-600 hover:border-white text-neutral-300 hover:text-white w-full sm:w-auto px-6 md:px-8 py-3.5 rounded-lg font-bold tracking-widest uppercase text-[11px] md:text-[12px] transition-all duration-300 hover:bg-white/5">
                  <span className="relative z-10 flex items-center justify-center">
                    Problem Statements
                  </span>
                </button>
              </div>
            </div>
        </motion.div>
      </div>

      {/* Tabbed / Scrollable Content Section */}
      <div className="w-full max-w-4xl mx-auto z-10 px-4 md:px-6 mt-2 md:mt-6 pb-24">
        {/* OUTER WRAPPER: Handles border, background, and rounded corners */}
        <div className="bg-[#0a1120]/80 backdrop-blur-md rounded-2xl border border-blue-900/30 overflow-hidden relative shadow-2xl">
          
          {/* STATIC TABS HEADER */}
          <div className="flex overflow-x-auto no-scrollbar border-b border-blue-900/50 bg-[#050810]/95 relative z-10">
            {tabs.map((tab) => (
              <button 
                key={tab}
                onClick={() => scrollToSection(tab)}
                className={`px-4 py-3 md:px-6 md:py-4 text-[11px] md:text-[13px] font-medium tracking-wide whitespace-nowrap transition-all duration-300 flex-1 min-w-[80px] md:min-w-[100px] text-center ${
                  activeTab === tab 
                    ? 'text-white border-b-2 border-blue-500 bg-blue-500/10' 
                    : 'text-neutral-500 hover:text-neutral-300 hover:bg-white/5'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* INNER SCROLLABLE CONTENT AREA */}
          <div 
            ref={containerRef}
            onScroll={handleContainerScroll}
            className="h-[350px] md:h-[450px] lg:h-[500px] overflow-y-auto custom-scrollbar relative p-5 md:p-8 space-y-10 md:space-y-12 pb-32"
          >
            
            {/* ABOUT */}
            <div id="section-About">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-1.5 h-6 bg-blue-500 rounded-sm"></span>
                About
              </h2>
              <div className="text-neutral-300 space-y-4 text-sm leading-relaxed flex gap-3">
                <span className="text-blue-500 font-bold mt-0.5">{'>'}</span>
                <div className="space-y-4">
                  <p>
                    The Robotics Club proposes to organize a three-phase, hands-on embedded systems event designed to take participants from a blank problem statement to a working hardware prototype. Unlike a typical one-day hackathon, this event is structured so that participants first receive real components and a challenge, are then trained on the exact hardware they are expected to use, and finally present their completed builds to the faculty panel. This approach ensures that even participants with limited prior exposure to microcontrollers can meaningfully complete, learn practical skills, and produce a working demonstration by the end of the event.
                  </p>
                </div>
              </div>
            </div>

            {/* STRUCTURE */}
            <div id="section-Structure">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-1.5 h-6 bg-blue-500 rounded-sm"></span>
                Structure
              </h2>
              <div className="space-y-8">
                
                {/* Phase 1 */}
                <div className="flex gap-3 text-neutral-300 text-sm leading-relaxed">
                  <span className="text-blue-500 font-bold mt-0.5">{'>'}</span>
                  <div>
                    <strong className="text-white block mb-2 text-base">Phase 1 — Hands-on Workshop on ESP32 / Arduino Uno</strong>
                    <p className="mb-3">A structured workshop will be conducted by club members covering:</p>
                    <ul className="list-disc pl-5 space-y-1.5 mb-3 text-neutral-400">
                      <li>Introduction to ESP32 / Arduino Uno architecture, pinout, and specifications.</li>
                      <li>Setting up the Arduino IDE and uploading a first program.</li>
                      <li>Interfacing common sensors and actuators (digital I/O, analog input, PWM, serial communication).</li>
                      <li>Basic Wi-Fi/Bluetooth functionality on ESP32 (where applicable to the problem statements).</li>
                      <li>Debugging techniques and best practices for wiring and code.</li>
                    </ul>
                    <p>This session ensures participants have the exact technical knowledge needed to build their assigned problem statement, rather than a generic tutorial disconnected from their task.</p>
                  </div>
                </div>

                {/* Phase 2 */}
                <div className="flex gap-3 text-neutral-300 text-sm leading-relaxed">
                  <span className="text-blue-500 font-bold mt-0.5">{'>'}</span>
                  <div>
                    <strong className="text-white block mb-2 text-base">Phase 2 — Component Distribution & Problem Statement Release</strong>
                    <p>
                      Participating teams will be given a fixed kit of electronic components (microcontroller board, sensors, actuators, jumper wires, breadboard, and other basic parts) along with a problem statement relevant to real-world. Teams will use this phase to brainstorm their approach, plan their circuit, and identify what they need to learn before building.
                    </p>
                  </div>
                </div>

                {/* Phase 3 */}
                <div className="flex gap-3 text-neutral-300 text-sm leading-relaxed">
                  <span className="text-blue-500 font-bold mt-0.5">{'>'}</span>
                  <div>
                    <strong className="text-white block mb-2 text-base">Phase 3 — Prototype Presentation & Judging (Day 3)</strong>
                    <p>
                      Each team will demonstrate their working hardware prototype live, supported by a short PowerPoint presentation covering their problem statement, approach, circuit/system design, challenges faced, and results. A faculty judging panel will evaluate the teams on functionality, innovation, technical understanding, and quality of presentation. The event will conclude with results and a felicitation of the top-performing teams.
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* TIMELINE */}
            <div id="section-Timeline">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-1.5 h-6 bg-blue-500 rounded-sm"></span>
                Timeline
              </h2>
              <div className="space-y-6 max-w-lg">
                <div className="flex gap-3 text-neutral-300 text-sm leading-relaxed">
                  <span className="text-blue-500 font-bold mt-0.5">{'>'}</span>
                  <div className="w-full flex justify-between border-b border-white/5 pb-2">
                    <span className="text-white">Registration Closes</span>
                    <span className="text-blue-400 font-mono">Oct 15</span>
                  </div>
                </div>
                <div className="flex gap-3 text-neutral-300 text-sm leading-relaxed">
                  <span className="text-blue-500 font-bold mt-0.5">{'>'}</span>
                  <div className="w-full flex justify-between border-b border-white/5 pb-2">
                    <span className="text-white">Problem Release</span>
                    <span className="text-blue-400 font-mono">Oct 16</span>
                  </div>
                </div>
                <div className="flex gap-3 text-neutral-300 text-sm leading-relaxed">
                  <span className="text-blue-500 font-bold mt-0.5">{'>'}</span>
                  <div className="w-full flex justify-between pb-2">
                    <span className="text-white">Hackathon Day</span>
                    <span className="text-blue-400 font-mono">Oct 20-21</span>
                  </div>
                </div>
              </div>
            </div>

            {/* RULES */}
            <div id="section-Rules">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-1.5 h-6 bg-blue-500 rounded-sm"></span>
                Rules
              </h2>
              <div className="space-y-4">
                <div className="flex gap-3 text-neutral-300 text-sm leading-relaxed">
                  <span className="text-blue-500 font-bold mt-0.5">{'>'}</span>
                  <div>Team size must be strictly between 2 to 4 members.</div>
                </div>
                <div className="flex gap-3 text-neutral-300 text-sm leading-relaxed">
                  <span className="text-blue-500 font-bold mt-0.5">{'>'}</span>
                  <div>All hardware prototypes must be built during the hackathon.</div>
                </div>
                <div className="flex gap-3 text-neutral-300 text-sm leading-relaxed">
                  <span className="text-blue-500 font-bold mt-0.5">{'>'}</span>
                  <div>Use of pre-built modules is allowed if properly disclosed.</div>
                </div>
                <div className="flex gap-3 text-neutral-300 text-sm leading-relaxed">
                  <span className="text-blue-500 font-bold mt-0.5">{'>'}</span>
                  <div>Plagiarism or using previous projects leads to disqualification.</div>
                </div>
              </div>
            </div>

            {/* CONTACT */}
            <div id="section-Contact">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-1.5 h-6 bg-blue-500 rounded-sm"></span>
                Contact
              </h2>
              <div className="space-y-6">
                <div className="flex gap-3 text-neutral-300 text-sm leading-relaxed">
                  <span className="text-blue-500 font-bold mt-0.5">{'>'}</span>
                  <div>
                    <strong className="text-white block mb-1">Event Coordinator</strong>
                    <a href="tel:+919876543210" className="hover:text-blue-400 font-mono">+91 98765 43210</a>
                  </div>
                </div>
                <div className="flex gap-3 text-neutral-300 text-sm leading-relaxed">
                  <span className="text-blue-500 font-bold mt-0.5">{'>'}</span>
                  <div>
                    <strong className="text-white block mb-1">Technical Support</strong>
                    <a href="mailto:support@embedx.com" className="hover:text-blue-400">support@embedx.com</a>
                  </div>
                </div>
              </div>
            </div>

            {/* SPACER for smooth scroll of the last item */}
            <div className="h-32 md:h-48"></div>
          </div>
        </div>
      </div>
    </div>
  );
}



