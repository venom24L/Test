import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PRINCIPLES = [
  { title: "Precision", desc: "Forged with absolute mathematical certainty." },
  { title: "Fluidity", desc: "Motions that echo the movement of water." },
  { title: "Performance", desc: "Optimized for the speed of light." },
  { title: "Tradition", desc: "A centuries-old craft meet future tech." }
];

export default function SkillHub() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".skill-card", {
        y: 60,
        opacity: 0,
        filter: "blur(10px)",
        stagger: 0.15,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="archives" ref={containerRef} className="py-32 px-8 md:px-24 bg-dark">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
          <div>
            <span className="text-xs uppercase tracking-[0.8em] text-accent-red font-bold block mb-6">Execution Pillars</span>
            <h2 className="text-5xl md:text-[80px] font-display font-black uppercase leading-[0.85] tracking-tighter">
              Performance<br/><span className="text-stroke italic">Oriented</span>
            </h2>
          </div>
          <div className="max-w-xs text-white/40 text-xs uppercase tracking-[0.3em] leading-relaxed">
            Every strike is a calculation of mass, velocity, and divine inspiration.
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-32">
          {PRINCIPLES.map((p, i) => (
            <div key={i} className="skill-card glass-card p-10 h-64 flex flex-col justify-between group hover:border-gold/50 transition-colors duration-500">
              <span className="text-xs opacity-20 font-mono">0{i + 1}</span>
              <div>
                <h3 className="text-2xl font-bold uppercase mb-2 group-hover:text-gold transition-colors">{p.title}</h3>
                <p className="text-xs font-light text-white/50 leading-relaxed">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Cinematic Photo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="skill-card col-span-1 md:col-span-2 h-[400px] overflow-hidden group relative">
            <img 
              src="https://images.unsplash.com/photo-1599839619722-39751411ea63?q=80&w=2000&auto=format&fit=crop" 
              className="w-full h-full object-cover grayscale brightness-[0.4] group-hover:scale-105 transition-transform duration-1000"
              alt="Katana Craft"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent opacity-80" />
            <div className="absolute bottom-6 left-6">
              <span className="text-[10px] font-mono tracking-[0.5em] text-gold/80 block mb-2">ARCHIVE.01</span>
              <h3 className="text-xl uppercase font-bold tracking-widest text-white/90">The Heat of Creation</h3>
            </div>
          </div>
          
          <div className="skill-card col-span-1 h-[400px] overflow-hidden group relative">
            <img 
              src="https://images.unsplash.com/photo-1547847012-70b1353c7c25?q=80&w=2000&auto=format&fit=crop" 
              className="w-full h-full object-cover grayscale contrast-125 brightness-[0.5] group-hover:scale-105 transition-transform duration-1000"
              alt="Steel Texture"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent opacity-80" />
            <div className="absolute bottom-6 left-6">
              <span className="text-[10px] font-mono tracking-[0.5em] text-gold/80 block mb-2">ARCHIVE.02</span>
              <h3 className="text-xl uppercase font-bold tracking-widest text-white/90">Folded Steel</h3>
            </div>
          </div>
          
          <div className="skill-card col-span-1 h-[400px] overflow-hidden group relative">
            <img 
              src="https://images.unsplash.com/photo-1510414695029-79d12d46e3e1?q=80&w=2000&auto=format&fit=crop" 
              className="w-full h-full object-cover grayscale contrast-[130%] brightness-[0.4] group-hover:scale-105 transition-transform duration-1000"
              alt="Hilt Binding"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent opacity-80" />
            <div className="absolute bottom-6 left-6">
              <span className="text-[10px] font-mono tracking-[0.5em] text-gold/80 block mb-2">ARCHIVE.03</span>
              <h3 className="text-xl uppercase font-bold tracking-widest text-white/90">Tsuka-ito</h3>
            </div>
          </div>

          <div className="skill-card col-span-1 md:col-span-2 h-[400px] overflow-hidden group relative flex items-center justify-center bg-zinc-900/50 border border-white/5">
            <img 
              src="https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=2000&auto=format&fit=crop" 
              className="absolute inset-0 w-full h-full object-cover grayscale opacity-20 mix-blend-screen group-hover:scale-105 transition-transform duration-1000"
              alt="Atmosphere"
              referrerPolicy="no-referrer"
            />
            <div className="relative text-center z-10 p-8">
              <h2 className="text-5xl md:text-7xl font-display font-black uppercase tracking-tighter opacity-80 mb-4">
                Seek <span className="text-stroke italic opacity-50">Perfection</span>
              </h2>
              <button className="text-[10px] tracking-[0.3em] uppercase py-3 px-8 bg-white text-dark font-bold hover:bg-gold transition-colors duration-300">
                View Full Dossier
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
