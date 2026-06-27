import { motion,type Variants } from 'framer-motion';
import {
  LayoutDashboard,
  BookOpenCheck,
  CalendarRange,
  Clock4,
  NotebookPen,
  ListChecks,
  CalendarDays,
  BarChart3,
  Trophy,
  Sparkles,
} from 'lucide-react';

const features = [
  {
    Icon: LayoutDashboard,
    title: 'Academic Dashboard',
    desc: 'CPI, credits, semester progress and productivity in one screen — no spreadsheet required.',
    big: true,
  },
  {
    Icon: Sparkles,
    title: 'AI Academic Assistant',
    desc: 'Ask it to plan your semester or recommend your next course.',
    big: true,
  },
  {
    Icon: BookOpenCheck,
    title: 'Course Management',
    desc: 'Branch-specific recommendations and credit tracking.',
  },
  {
    Icon: CalendarRange,
    title: 'Semester Planner',
    desc: 'Map out future semesters and balance your credit load.',
  },
  {
    Icon: Clock4,
    title: 'Timetable Generator',
    desc: 'Pick slots, catch conflicts automatically, register with confidence.',
  },
  {
    Icon: NotebookPen,
    title: 'Notes',
    desc: 'Quick notes with themes, synced to the cloud.',
  },
  {
    Icon: ListChecks,
    title: 'Todo Management',
    desc: 'Pin tasks, set deadlines, track what actually got done.',
  },
  {
    Icon: CalendarDays,
    title: 'Academic Calendar Hub',
    desc: 'Every registration date, exam and recess — filterable, semester by semester.',
  },
  {
    Icon: BarChart3,
    title: 'Analytics & Insights',
    desc: 'Charted CPI trends, grade distribution and progress reports.',
  },
  {
    Icon: Trophy,
    title: 'Competition Tracker',
    desc: 'Upcoming coding contests, in one place.',
  },
];

const cardVariant:Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i:number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.06, ease: 'easeOut' },
  }),
};

const Features = () => {
  return (
    <section id="features" className="relative bg-void px-6 py-28 md:px-10">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl"
        >
          <span className="font-mono text-xs uppercase tracking-widest text-violet-soft">
            Everything, tracked
          </span>
          <h2 className="mt-4 font-display text-4xl font-semibold text-ink md:text-5xl">
            One dashboard. Every part of the semester.
          </h2>
          <p className="mt-4 text-muted">
            From the courses you've finished to the contest you haven't registered for yet —
            StudyTracker keeps the whole degree in view.
          </p>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
          {features.map(({ Icon, title, desc, big }, i) => (
            <motion.div
              key={title}
              custom={i}
              variants={cardVariant}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-60px' }}
              whileHover={{ y: -6 }}
              className={`group rounded-2xl border border-white/10 bg-panel p-6 transition-colors hover:border-violet/40 ${
                big ? 'md:col-span-2' : ''
              }`}
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-panel2 text-violet-soft transition-colors group-hover:bg-violet group-hover:text-void">
                <Icon size={20} strokeWidth={1.8} />
              </div>
              <h3 className="mt-5 font-display text-lg font-medium text-ink">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;