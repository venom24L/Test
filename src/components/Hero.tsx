import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleGroupRef = useRef<HTMLDivElement>(null);
  const bgImageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    tl.fromTo(".hero-reveal", 
      { y: 80, opacity: 0, filter: "blur(10px)" }, 
      { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.5, stagger: 0.2, ease: "power4.out" }
    );

    gsap.to(bgImageRef.current, {
      scale: 1.2,
      y: '5%',
      opacity: 0.2,
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });

    gsap.to(titleGroupRef.current, {
      y: -100,
      opacity: 0,
      scale: 0.95,
      filter: "blur(20px)",
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative h-screen w-full flex flex-col items-center justify-center bg-dark overflow-hidden px-8 md:px-16"
    >
      <figure className="absolute inset-0 z-0 select-none">
        <img 
          ref={bgImageRef}
          src="https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=2000&auto=format&fit=crop" 
          alt="" 
          className="w-full h-full object-cover grayscale brightness-[0.3]"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark via-transparent to-dark" />
      </figure>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center watermark font-black z-1">
        GENESIS
      </div>

      <div ref={titleGroupRef} className="z-10 text-left w-full max-w-7xl">
        <p className="hero-reveal text-[10px] uppercase tracking-[1em] text-gold font-bold mb-8">
          The Art of the Infinite Edge
        </p>
        
        <h1 className="hero-reveal text-[clamp(60px,12vw,160px)] font-display font-black leading-[0.8] tracking-tighter uppercase mb-6">
          Master Your <br />
          <span className="text-stroke italic">Skills</span>
        </h1>

        <div className="hero-reveal flex items-center gap-6 mt-12">
          <div className="h-[1px] w-24 bg-white/30" />
          <span className="text-[11px] font-mono tracking-[0.5em] text-white/40 uppercase">Stringtune Collective</span>
        </div>
      </div>

      <div className="absolute left-8 md:left-16 bottom-16 hidden md:block z-10 hero-reveal">
        <div className="flex items-center gap-6 -rotate-90 origin-left">
          <span className="text-[10px] uppercase tracking-[0.6em] opacity-40 font-mono">Ver. 04.7.1</span>
        </div>
      </div>

      <div className="absolute bottom-12 right-12 flex flex-col items-center gap-4 opacity-30 z-10 hero-reveal">
        <div className="flex flex-col gap-1 items-end">
          <div className="w-1 h-1 bg-white" />
          <div className="w-1 h-12 bg-white/20" />
        </div>
      </div>
    </section>
  );
}
