import { useState } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const links = ['Features', 'About', 'Contact'];

const Nav = () => {
  const [open, setOpen] = useState(false);
  

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 border-b border-white/10 bg-void/80 px-6 py-4 backdrop-blur-md md:px-10"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet text-void">
            <GraduationCap size={18} />
          </div>
          <span className="font-display text-lg font-semibold text-ink">StudyTracker</span>
        </div>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              className="text-sm text-muted transition hover:text-ink"
            >
              {l}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link to={"/login"} className="text-sm text-muted transition hover:text-ink">
            Log In
          </Link>
          <Link
            to={"/signup"}
            className="rounded-full bg-ink px-5 py-2 text-sm font-medium text-void transition hover:bg-violet-soft"
          >
            Get Started
          </Link>
        </div>

        <button onClick={() => setOpen(!open)} className="text-ink md:hidden">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-4 flex flex-col gap-4 md:hidden"
        >
          {links.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              onClick={() => setOpen(false)}
              className="text-sm text-muted"
            >
              {l}
            </a>
          ))}
          <Link to={"/login"} className="text-sm text-muted">
            Log In
          </Link>
          <Link
            to={"/signup"}
            className="rounded-full bg-ink px-5 py-2 text-center text-sm font-medium text-void"
          >
            Get Started
          </Link>
        </motion.div>
      )}
    </motion.header>
  );
};

export default Nav;