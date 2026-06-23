import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import {
  LayoutDashboard,
  CalendarDays,
  NotebookPen,
  Sparkles,
  Trophy,
  BarChart3,
} from "lucide-react";
import { Link } from "react-router-dom";

const orbitItems = [
  { Icon: LayoutDashboard, label: "Dashboard", ring: 1, angle: 20 },
  { Icon: CalendarDays, label: "Calendar", ring: 1, angle: 160 },
  { Icon: BarChart3, label: "Analytics", ring: 1, angle: 280 },
  { Icon: NotebookPen, label: "Notes", ring: 2, angle: 70 },
  { Icon: Trophy, label: "Contests", ring: 2, angle: 200 },
  { Icon: Sparkles, label: "AI Assist", ring: 2, angle: 320 },
];

const Hero = () => {
  const ring1Ref = useRef(null);
  const ring2Ref = useRef(null);
  const heroRef = useRef(null);

  useEffect(() => {
    const tl1 = gsap.to(ring1Ref.current, {
      rotation: 360,
      duration: 40,
      repeat: -1,
      ease: "none",
    });
    const tl2 = gsap.to(ring2Ref.current, {
      rotation: -360,
      duration: 55,
      repeat: -1,
      ease: "none",
    });

    gsap.fromTo(
      heroRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: "power2.out" },
    );

    return () => {
      tl1.kill();
      tl2.kill();
    };
  }, []);

  return (
    <section className="relative overflow-hidden bg-void bg-corner-glow">
      <div
        ref={heroRef}
        className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 pt-20 pb-28 md:px-10 lg:grid-cols-2 lg:pt-28">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-violet/30 bg-panel px-4 py-1.5 font-mono text-xs text-lilac">
            <span className="h-1.5 w-1.5 rounded-full bg-violet" />
            Built for students, not spreadsheets
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 font-display text-5xl font-semibold leading-[1.08] text-ink md:text-6xl">
            Your degree,
            <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-violet-soft to-peach">
              finally legible.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 max-w-md text-lg text-muted">
            StudyTracker turns your CPI, credits, timetable and deadlines into
            one live dashboard — so you plan the semester instead of guessing
            your way through it.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-9 flex flex-wrap items-center gap-4">
            <Link to={"/signup"}>
              <button className="rounded-full bg-ink px-6 py-3 font-medium text-void shadow-glowSm transition hover:bg-violet-soft hover:text-void">
                Start tracking →
              </button>
            </Link>
            <Link to={"/login"}>
              <button className="rounded-full border border-white/15 px-6 py-3 font-medium text-ink transition hover:border-violet-soft hover:text-violet-soft">
                See the dashboard
              </button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-10 flex items-center gap-6 font-mono text-xs text-muted">
            <span>JWT + Google OAuth</span>
            <span className="h-1 w-1 rounded-full bg-muted" />
            <span>Dark / Light</span>
            <span className="h-1 w-1 rounded-full bg-muted" />
            <span>Mobile ready</span>
          </motion.div>
        </div>

        
        <div className="relative mx-auto flex h-105 w-105 items-center justify-center md:h-120 md:w-120">
          <div className="absolute h-full w-full rounded-full border border-white/5" />
          <div className="absolute h-[72%] w-[72%] rounded-full border border-white/5" />

          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative z-10 flex h-44 w-44 flex-col items-center justify-center rounded-3xl border border-violet/30 bg-panel/90 shadow-glow">
            <span className="font-mono text-4xl font-semibold text-ink">
              8.9
            </span>
            <span className="mt-1 text-xs text-muted">Current CPI</span>
          </motion.div>

          
          <div ref={ring1Ref} className="absolute h-[72%] w-[72%]">
            {orbitItems
              .filter((i) => i.ring === 1)
              .map(({ Icon, label, angle }, idx) => (
                <OrbitNode
                  key={label}
                  Icon={Icon}
                  label={label}
                  angle={angle}
                  radius={"50%"}
                  delay={0.4 + idx * 0.1}
                />
              ))}
          </div>

          
          <div ref={ring2Ref} className="absolute h-full w-full">
            {orbitItems
              .filter((i) => i.ring === 2)
              .map(({ Icon, label, angle }, idx) => (
                <OrbitNode
                  key={label}
                  Icon={Icon}
                  label={label}
                  angle={angle}
                  radius={"50%"}
                  delay={0.6 + idx * 0.1}
                />
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

type OrbitNodeProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Icon: any;
  label?: string;
  angle: number;
  radius: string;
  delay?: number;
};

const OrbitNode: React.FC<OrbitNodeProps> = ({
  Icon,
  label,
  angle,
  radius,
  delay,
}) => {
  const rad = (angle * Math.PI) / 180;
  const x = `calc(${radius} + ${radius} * ${Math.cos(rad)})`;
  const y = `calc(${radius} + ${radius} * ${Math.sin(rad)})`;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.15 }}
      style={{ left: x, top: y, transform: "translate(-50%, -50%)" }}
      title={label}
      className="absolute flex h-12 w-12 items-center justify-center rounded-2xl border border-violet/30 bg-panel2 text-violet-soft shadow-glowSm">
      <Icon size={20} strokeWidth={1.8} />
    </motion.div>
  );
};

export default Hero;
