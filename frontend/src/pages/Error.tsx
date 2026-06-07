import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";

export default function Error() {
  const navigate = useNavigate();

  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const digit4aRef = useRef<HTMLSpanElement>(null);
  const digit0Ref = useRef<HTMLSpanElement>(null);
  const digit4bRef = useRef<HTMLSpanElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const bodyTextRef = useRef<HTMLParagraphElement>(null);
  const btnRowRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const dotRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

     
      gsap.fromTo(
        glowRef.current,
        { opacity: 0, scale: 0.6 },
        { opacity: 1, scale: 1, duration: 1.4, ease: "power2.out" }
      );

    
      tl.fromTo(
        digit4aRef.current,
        { x: -120, opacity: 0, rotateZ: -12 },
        { x: 0, opacity: 1, rotateZ: 0, duration: 0.8 }
      )
        .fromTo(
          digit0Ref.current,
          { y: -80, opacity: 0, scale: 0.5 },
          { y: 0, opacity: 1, scale: 1, duration: 0.7 },
          "-=0.5"
        )
        .fromTo(
          digit4bRef.current,
          { x: 120, opacity: 0, rotateZ: 12 },
          { x: 0, opacity: 1, rotateZ: 0, duration: 0.8 },
          "-=0.55"
        )
        
        .fromTo(
          lineRef.current,
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 1, duration: 0.5, ease: "power2.inOut" },
          "-=0.2"
        )
       
        .fromTo(
          taglineRef.current,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.55 },
          "-=0.1"
        )
        .fromTo(
          bodyTextRef.current,
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5 },
          "-=0.3"
        )
        .fromTo(
          btnRowRef.current,
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5 },
          "-=0.25"
        );

      
      gsap.to(digit0Ref.current, {
        skewX: 4,
        opacity: 0.85,
        duration: 0.08,
        yoyo: true,
        repeat: -1,
        repeatDelay: 3.5,
        ease: "none",
      });

      
      if (orbitRef.current) {
        gsap.to(orbitRef.current, {
          rotation: 360,
          duration: 14,
          repeat: -1,
          ease: "none",
          transformOrigin: "50% 50%",
        });
      }

      
      dotRefs.current.forEach((dot, i) => {
        if (!dot) return;
        gsap.to(dot, {
          rotation: -360,
          duration: 14,
          repeat: -1,
          ease: "none",
          transformOrigin: "50% 50%",
          delay: i * 0,
        });
        
        gsap.to(dot, {
          scale: 1.6,
          opacity: 1,
          duration: 0.6 + i * 0.2,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
          delay: i * 0.4,
        });
      });

     
      gsap.to(glowRef.current, {
        scale: 1.08,
        opacity: 0.85,
        duration: 3,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  
  const orbitAngles = [0, 72, 144, 216, 288];

  return (
    <div
      ref={containerRef}
      className="relative min-h-dvh bg-[#0a0a0a] flex flex-col items-center justify-center overflow-hidden px-6 font-['DM_Sans',sans-serif]"
    >
      
      <div
        ref={glowRef}
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(124,58,237,0.18) 0%, rgba(124,58,237,0.05) 50%, transparent 70%)",
        }}
      />

      
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "200px 200px",
        }}
      />

      
      <div className="absolute top-6 left-7 flex items-center gap-2 text-[0.82rem] font-semibold tracking-wide text-zinc-300 select-none">
        <span
          className="w-2 h-2 rounded-full bg-violet-600"
          style={{ boxShadow: "0 0 8px rgba(124,58,237,0.9)" }}
        />
        StudyTracker
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-105 h-105 pointer-events-none">
       
        <div className="absolute inset-0 rounded-full border border-violet-900/30" />
        
        <div ref={orbitRef} className="absolute inset-0">
          {orbitAngles.map((angle, i) => {
            const rad = (angle * Math.PI) / 180;
            const r = 210; 
            const x = 50 + (Math.cos(rad) * r * 100) / 420;
            const y = 50 + (Math.sin(rad) * r * 100) / 420;
            return (
              <span
                key={i}
                ref={(el) => { dotRefs.current[i] = el; }}
                className="absolute w-1.5 h-1.5 rounded-full bg-violet-500 opacity-40"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  transform: "translate(-50%, -50%)",
                }}
              />
            );
          })}
        </div>
      </div>

     
      <div className="relative z-10 flex flex-col items-center text-center max-w-lg">

       
        <div className="flex items-baseline gap-2 select-none leading-none mb-6">
          <span
            ref={digit4aRef}
            className="text-[9rem] sm:text-[12rem] font-black text-zinc-800 tracking-tighter"
            style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic" }}
          >
            4
          </span>
          <span
            ref={digit0Ref}
            className="text-[9rem] sm:text-[12rem] font-black tracking-tighter"
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontStyle: "italic",
              background: "linear-gradient(135deg, #7c3aed 0%, #a78bfa 60%, #c4b5fd 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            0
          </span>
          <span
            ref={digit4bRef}
            className="text-[9rem] sm:text-[12rem] font-black text-zinc-800 tracking-tighter"
            style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic" }}
          >
            4
          </span>
        </div>

        
        <div
          ref={lineRef}
          className="w-16 h-px bg-violet-700 mb-6 origin-left"
          style={{ boxShadow: "0 0 8px rgba(124,58,237,0.6)" }}
        />

        
        <p
          ref={taglineRef}
          className="text-xl sm:text-2xl font-semibold text-zinc-100 mb-3 tracking-tight"
        >
          Page not found
        </p>

        
        <p
          ref={bodyTextRef}
          className="text-sm text-zinc-500 leading-relaxed mb-8 max-w-sm"
        >
          The page you're looking for doesn't exist or has been moved.
          Head back home and pick up where you left off.
        </p>

       
        <div ref={btnRowRef} className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2.5 rounded-[10px] bg-violet-700 hover:bg-violet-600 active:scale-[0.97] text-white text-sm font-semibold tracking-wide transition-all duration-150 border border-violet-600"
          >
            Go home
          </button>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2.5 rounded-[10px] bg-[#171717] hover:bg-zinc-800 active:scale-[0.97] text-zinc-300 text-sm font-semibold tracking-wide transition-all duration-150 border border-zinc-700"
          >
            Go back
          </button>
        </div>
      </div>

      
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 text-[0.7rem] text-zinc-600 tracking-widest uppercase select-none">
        <span className="w-1 h-1 rounded-full bg-zinc-700 inline-block" />
        Error 404
        <span className="w-1 h-1 rounded-full bg-zinc-700 inline-block" />
        StudyTracker
        <span className="w-1 h-1 rounded-full bg-zinc-700 inline-block" />
      </div>
    </div>
  );
}