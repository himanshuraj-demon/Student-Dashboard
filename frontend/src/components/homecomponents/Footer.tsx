import { FaGithub,FaGraduationCap,FaXTwitter ,FaLinkedinIn   } from "react-icons/fa6";

const columns = [
  {
    title: 'Product',
    links: ['Dashboard', 'Timetable Generator', 'Semester Planner', 'AI Assistant'],
  },
  {
    title: 'Resources',
    links: ['Academic Calendar', 'Competition Tracker', 'Changelog', 'Roadmap'],
  },
  {
    title: 'Company',
    links: ['About', 'Contact', 'Privacy', 'Terms'],
  },
];

const Footer = () => {
  return (
    <footer className="relative border-t border-white/10 bg-void px-6 pt-16 pb-8 md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-5">
          <div className="col-span-2">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet text-void">
                <FaGraduationCap size={18} />
              </div>
              <span className="font-display text-lg font-semibold text-ink">
                StudyTracker
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm text-muted">
              The academic dashboard for students who'd rather plan their semester
              than reconstruct it after the fact.
            </p>
            <div className="mt-5 flex gap-3">
                <a
                  
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-muted transition hover:border-violet-soft hover:text-violet-soft"
                >
                  <FaGithub size={16} />
                </a>
                <a
                  
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-muted transition hover:border-violet-soft hover:text-violet-soft"
                >
                  <FaGraduationCap size={16} />
                </a>
                <a
                  
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-muted transition hover:border-violet-soft hover:text-violet-soft"
                >
                  <FaXTwitter  size={16} />
                </a>
                <a
                  
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-muted transition hover:border-violet-soft hover:text-violet-soft"
                >
                  <FaLinkedinIn   size={16} />
                </a>
              
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h5 className="font-display text-sm font-medium text-ink">{col.title}</h5>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-muted transition hover:text-violet-soft">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-muted md:flex-row">
          <span>© {new Date().getFullYear()} StudyTracker. All rights reserved.</span>
          <span className="font-mono">Made for students, by students.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;