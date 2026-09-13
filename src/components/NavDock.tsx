import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

function NavDockIcon({ 
  mouseX, 
  href, 
  children,
  magnification = 50,
  distance = 120
}: { 
  mouseX: any; 
  href: string; 
  children: React.ReactNode;
  magnification?: number;
  distance?: number;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  
  const distanceCalc = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });
  
  const widthSync = useTransform(distanceCalc, [-distance, 0, distance], [36, magnification, 36]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      ref={ref}
      style={{ width, height: width }}
      className="flex items-center justify-center rounded-full bg-[#1e3a5f]/40 border border-[#3b82f6]/30 hover:bg-[#3b82f6]/40 hover:border-[#3b82f6]/70 transition-colors shadow-lg pointer-events-auto"
    >
      {children}
    </motion.a>
  );
}

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" className="w-[50%] h-[50%] fill-current text-white drop-shadow-md"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
);

const DriveIcon = () => (
  <svg viewBox="0 0 24 24" className="w-[50%] h-[50%] fill-current text-white drop-shadow-md"><path d="M7.71 3.5L1.15 15l3.43 6L11.14 9.5h11.71l-3.43-6H7.71zM9.73 15L6.3 21h12.84l3.43-6H9.73z"/></svg>
);

const NotionIcon = () => (
  <svg viewBox="0 0 24 24" className="w-[50%] h-[50%] fill-current text-white drop-shadow-md"><path d="M4.459 4.208c-.746.286-1.144.595-1.19 1.147L3 21.053c0 .546.545.986 1.64.986h11.085c.67 0 1.018-.326 1.042-.986l.248-7.915h.273l5.313 7.828c.447.625 1.092.936 1.936 1.015.348 0 .546-.352.546-.86V2.735c0-.623-.522-1.026-1.514-1.026h-3.4c-.645 0-1.018.337-1.018.998l-.223 7.237h-.273L11.455 2.19c-.447-.6-1.117-.962-1.936-1.027a4.912 4.912 0 0 0-.645-.027H4.46z"/></svg>
);

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" className="w-[50%] h-[50%] fill-current text-white drop-shadow-md"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a5.22 5.22 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
);

export default function NavDock() {
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className="hidden md:flex items-center gap-3 px-4 py-2 rounded-2xl bg-[#0a1120]/60 backdrop-blur-md border border-[#1e3a5f]/40 shadow-lg pointer-events-auto h-[50px]"
    >
      <NavDockIcon mouseX={mouseX} href="https://github.com">
        <GithubIcon />
      </NavDockIcon>
      
      <div className="w-[1px] h-6 bg-[#1e3a5f]/50 mx-1" /> {/* Separator */}
      
      <NavDockIcon mouseX={mouseX} href="https://drive.google.com">
        <DriveIcon />
      </NavDockIcon>
      
      <NavDockIcon mouseX={mouseX} href="https://notion.so">
        <NotionIcon />
      </NavDockIcon>
      
      <NavDockIcon mouseX={mouseX} href="https://whatsapp.com">
        <WhatsAppIcon />
      </NavDockIcon>
    </motion.div>
  );
}

