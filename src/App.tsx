/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import Hero from './components/Hero.tsx';
import WeaponSection from './components/WeaponSection.tsx';
import SkillHub from './components/SkillHub.tsx';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function App() {
  const cursorRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    gsap.to(window, {
      duration: 1.5,
      scrollTo: { y: id, autoKill: false },
      ease: "power4.inOut"
    });
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      
      document.documentElement.style.setProperty('--mouse-x', `${clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${clientY}px`);

      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          x: clientX,
          y: clientY,
          duration: 0.15,
          ease: 'power2.out'
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    gsap.fromTo('body', 
      { opacity: 0 }, 
      { opacity: 1, duration: 2, ease: 'power3.inOut' }
    );
  }, []);

  return (
    <main className="bg-dark text-white font-sans selection:bg-gold selection:text-dark md:cursor-none">
      <div className="grain-overlay" />
      <div ref={cursorRef} className="custom-cursor hidden md:block" />
      <div className="spotlight-overlay" />
      <div className="cinematic-vignette" />
      
      <nav className="fixed top-0 left-0 w-full z-40 px-6 py-8 md:px-16 md:py-12 flex justify-between items-center pointer-events-none">
        <div className="flex items-center gap-4 pointer-events-auto cursor-pointer">
          <div className="w-8 h-8 border border-white flex items-center justify-center">
            <div className="w-1 h-1 bg-white" />
          </div>
          <span className="text-2xl font-black tracking-[-0.08em] uppercase">Stringtune</span>
        </div>
        <div className="flex gap-8 md:gap-16 text-[10px] uppercase tracking-[0.6em] font-medium opacity-40 pointer-events-auto">
          <a 
            href="#katana" 
            onClick={(e) => scrollToSection(e, '#katana')}
            className="hover:opacity-100 transition-all hover:tracking-[0.8em]"
          >
            Catalog
          </a>
          <a 
            href="#archives" 
            onClick={(e) => scrollToSection(e, '#archives')}
            className="hover:opacity-100 transition-all hover:tracking-[0.8em]"
          >
            Archive
          </a>
        </div>
      </nav>

      <Hero />
      
      <WeaponSection 
        id="katana"
        title="Artifact 0471-B"
        description="Forged from celestial iron, this blade exists as a bridge between intent and consequence. A weapon of absolute stillness."
        imageUrl="https://images.unsplash.com/photo-1589834241682-1dd77b5a1f2f?q=80&w=2000&auto=format&fit=crop"
      />

      <WeaponSection 
        id="sheath"
        title="Saya Zero"
        description="A vessel of peace constructed from charred mahogany. Designed to dampen the lethal resonance of the divine edge."
        isReversed
        imageUrl="https://images.unsplash.com/photo-1510414695029-79d12d46e3e1?q=80&w=2000&auto=format&fit=crop"
      />

      <SkillHub />

      <footer className="relative min-h-screen w-full flex flex-col justify-center bg-dark px-8 md:px-24 overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-gradient-to-t from-gold/5 to-transparent opacity-50" />
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center opacity-[0.015] pointer-events-none">
          <h2 className="text-[25vw] font-black leading-none tracking-tighter italic">FINIS</h2>
        </div>

        <div className="z-10 max-w-5xl space-y-20">
          <header>
            <p className="text-[11px] uppercase tracking-[1em] text-accent-red font-bold mb-8">End of Journey</p>
            <h2 className="text-7xl md:text-[clamp(100px,15vw,220px)] font-display font-black uppercase leading-[0.8] tracking-tighter">
              Legacy of <br/>
              <span className="text-stroke italic">Silence</span>
            </h2>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 pt-12">
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.5em] opacity-30 mb-6">Origins</h4>
              <p className="text-sm font-light leading-relaxed text-white/40 max-w-xs">
                Founded in the shadow of tradition, refined by the friction of progress. We are the architects of the unseen edge.
              </p>
            </div>
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.5em] opacity-30 mb-6">Archives</h4>
              <ul className="space-y-4">
                {['Dossier', 'Forge Logs', 'Protocols'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-xs uppercase tracking-[0.4em] text-white/50 hover:text-gold hover:opacity-100 transition-all">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col justify-end">
              <div className="text-[40px] font-black tracking-tighter opacity-10 leading-none mb-4 italic">STRINGTUNE</div>
              <div className="text-[10px] uppercase tracking-[0.4em] opacity-20 font-mono">© 2026 Eternal Collective</div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

