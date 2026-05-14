import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface WeaponSectionProps {
  id: string;
  title: string;
  description: string;
  isReversed?: boolean;
  imageUrl: string;
}

export default function WeaponSection({ id, title, description, isReversed, imageUrl }: WeaponSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Simple parallax on the image
    gsap.to(imageRef.current, {
      y: '20%',
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });

    // Reveal text
    gsap.fromTo(textContainerRef.current, 
      { opacity: 0, y: 50, filter: 'blur(10px)' },
      { 
        opacity: 1, 
        y: 0, 
        filter: 'blur(0px)', 
        duration: 1, 
        ease: 'power3.out',
        scrollTrigger: {
          trigger: textContainerRef.current,
          start: 'top 80%',
        }
      }
    );

  }, []);

  return (
    <section 
      ref={sectionRef}
      id={id}
      className="relative min-h-[90vh] w-full bg-dark overflow-hidden flex items-center justify-center border-b border-white/5 py-24"
    >
      <div className={`relative w-full max-w-7xl mx-auto flex flex-col ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 px-8 md:px-16 z-10`}>
        
        {/* Photo Container */}
        <div className="w-full md:w-3/5 h-[400px] md:h-[600px] overflow-hidden relative">
          <figure className="w-full h-full relative group">
            <img 
              ref={imageRef}
              src={imageUrl} 
              alt={title}
              className="absolute inset-0 w-full h-[120%] -top-[10%] object-cover grayscale contrast-[120%] transition-transform duration-1000 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            {/* Dark gradient fade for mood */}
            <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent opacity-80 md:hidden" />
          </figure>
          
          {/* Accent decoration */}
          <div className={`absolute top-0 ${isReversed ? 'right-0' : 'left-0'} w-24 h-24 border-t-2 ${isReversed ? 'border-r-2' : 'border-l-2'} border-gold/50 opacity-50 pointer-events-none`} />
          <div className={`absolute bottom-0 ${isReversed ? 'left-0' : 'right-0'} w-24 h-24 border-b-2 ${isReversed ? 'border-l-2' : 'border-r-2'} border-gold/50 opacity-50 pointer-events-none`} />
        </div>

        {/* Text Container */}
        <div ref={textContainerRef} className="w-full md:w-2/5 flex flex-col justify-center">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-[10px] font-mono tracking-[0.5em] text-gold uppercase">Protocol {id}</span>
            <div className="h-[1px] w-12 bg-gold/50" />
          </div>
          
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-black uppercase tracking-tighter leading-[0.9] mb-8">
            <span className="text-stroke italic block opacity-50">{title.split(' ')[0]}</span>
            <span>{title.split(' ').slice(1).join(' ') || title}</span>
          </h2>
          
          <p className="text-sm md:text-base font-light text-white/50 leading-relaxed max-w-md">
            {description}
          </p>
          
          <div className="mt-12">
            <button className="text-[10px] tracking-[0.3em] uppercase py-4 px-8 border border-white/20 hover:border-gold hover:text-gold transition-colors duration-300">
              Inspect Asset
            </button>
          </div>
        </div>
      </div>

      {/* Background Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-black z-0 uppercase italic text-white/[0.02] pointer-events-none whitespace-nowrap">
        {id}
      </div>
      
      {/* Volumetric atmosphere */}
      <div className={`absolute top-1/2 ${isReversed ? 'right-0' : 'left-0'} -translate-y-1/2 w-[50vw] h-[50vw] bg-gold/[0.03] rounded-full blur-[150px] pointer-events-none`} />
    </section>
  );
}

