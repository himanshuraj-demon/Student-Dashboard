import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stack = {
  Frontend: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'React Router', 'Recharts'],
  Backend: ['Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'JWT', 'Google OAuth'],
  Security: ['Helmet', 'Cookie Auth', 'Protected Routes', 'Input Validation', 'Sanitization'],
};

const proof = [
  { value: '12+', label: 'integrated modules' },
  { value: '100%', label: 'cookie-based auth' },
  { value: '2', label: 'theme modes' },
];

const About = () => {
  const sectionRef = useRef(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const items = statsRef.current!.children;
    gsap.fromTo(
      items,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      }
    );
  }, []);

  return (
    <section id="about" ref={sectionRef} className="relative bg-void px-6 py-28 md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-violet-soft">
              Why StudyTracker
            </span>
            <h2 className="mt-4 font-display text-4xl font-semibold text-ink md:text-5xl">
              Built like the apps you actually trust your data with.
            </h2>
            <p className="mt-5 text-muted">
              StudyTracker isn't a student project bolted onto a spreadsheet — it's a
              full authenticated platform with role-based access, sanitized inputs and
              cookie-secured sessions, so your transcript stays yours.
            </p>

            <div ref={statsRef} className="mt-10 grid grid-cols-3 gap-6">
              {proof.map((p) => (
                <div key={p.label}>
                  <div className="font-mono text-3xl font-semibold text-ink">{p.value}</div>
                  <div className="mt-1 text-xs text-muted">{p.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-5">
            {Object.entries(stack).map(([group, items], i) => (
              <motion.div
                key={group}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-2xl border border-white/10 bg-panel p-6"
              >
                <h4 className="font-display text-sm font-medium text-lilac">{group}</h4>
                <div className="mt-4 flex flex-wrap gap-2">
                  {items.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-panel2 px-3 py-1 font-mono text-xs text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;