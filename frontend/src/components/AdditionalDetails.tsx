import { useState } from "react";
import {
  Award,
  BookOpen,
  Plus,
  ChevronDown,
  ChevronUp,
  GraduationCap,
  Layers,
  CheckCircle2,
  Info,
} from "lucide-react";
import { data } from "../../constants/courses";

type Tab = "honours" | "minor";
type Cohort = "2022" | "other";

const ACCENT = {
  honours: {
    bg: "bg-violet-50 dark:bg-violet-500/10",
    text: "text-violet-700 dark:text-violet-400",
    border: "border-violet-200 dark:border-violet-500/30",
    dot: "bg-violet-500",
    icon: "text-violet-500",
  },
  minor: {
    bg: "bg-blue-50 dark:bg-blue-500/10",
    text: "text-blue-700 dark:text-blue-400",
    border: "border-blue-200 dark:border-blue-500/30",
    dot: "bg-blue-500",
    icon: "text-blue-500",
  },
};


const degreeOptions = [
  { label: "BTech", sub: "Base degree only", icon: BookOpen, active: false },
  { label: "BTech (Hons)", sub: "+20 credits in discipline", icon: Award, active: false },
  { label: "BTech + Minor", sub: "+20 credits in another field", icon: Layers, active: false },
  { label: "Hons + Minor", sub: "+20 + 20 credits", icon: GraduationCap, active: false },
];

export default function AdditionalDetails() {
  const [tab, setTab] = useState<Tab>("honours");
  const [cohort, setCohort] = useState<Cohort>("2022");
  const [noteOpen, setNoteOpen] = useState(false);

  const content = data[cohort][tab];
  const accent = ACCENT[tab];

  return (
    <div className="rounded-2xl border border-gray-100 bg-[#ffffff11] p-6 dark:border-white/10 universal md:m-4 mt-4 m-1">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <div className="mb-1 flex items-center gap-2">
            <GraduationCap size={18} className="text-green-500" />
            <h2 className="text-sm font-semibold ">
              Additional learning
            </h2>
          </div>
          <p className="text-xs text-gray-400 dark:text-zinc-500">
            Honours &amp; Minors on top of your BTech
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-1 rounded-xl  p-1 ">
          {(["2022", "other"] as Cohort[]).map((c) => (
            <button
              key={c}
              onClick={() => setCohort(c)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
                cohort === c
                  ? "bg-white  shadow-sm text-black"
                  : "hover:text-gray-600 dark:hover:text-zinc-300"
              }`}
            >
              {c === "2022" ? "AY 2022+" : "Earlier"}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {degreeOptions.map(({ label, sub, icon: Icon }) => (
          <div
            key={label}
            className="rounded-xl bg-gray-50 px-3 py-3 dark:bg-white/5"
          >
            <Icon size={15} className="mb-2" />
            <p className="text-xs font-semibold leading-snug">
              {label}
            </p>
            <p className="mt-0.5 text-[11px]  leading-snug">
              {sub}
            </p>
          </div>
        ))}
      </div>

      
      <div className="mb-5 flex gap-2">
        {(["honours", "minor"] as Tab[]).map((t) => {
          const a = ACCENT[t];
          return (
            <button
              key={t}
              onClick={() => { setTab(t); setNoteOpen(false); }}
              className={`flex items-center gap-1.5 rounded-xl border px-4 py-2 text-xs font-medium transition-all duration-200 ${
                tab === t
                  ? `${a.bg} ${a.text} ${a.border}`
                  : "border-transparent  hover:text-gray-600 dark:hover:text-zinc-300"
              }`}
            >
              {t === "honours" ? <Award size={13} /> : <Plus size={13} />}
              {t === "honours" ? "Honours" : "Minor"}
            </button>
          );
        })}
      </div>
     
      <div className="mb-4 flex flex-col gap-2.5">
        {content.points.map((point, i) => (
          <div key={i} className="flex items-start gap-3">
            <CheckCircle2
              size={15}
              className={`mt-0.5 shrink-0 ${accent.icon}`}
            />
            <p className="text-sm leading-relaxed">
              {point}
            </p>
          </div>
        ))}
      </div>

      
      <div
        className={`mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold ${accent.bg} ${accent.text} ${accent.border}`}
      >
        <span
          className={`inline-block h-1.5 w-1.5 rounded-full ${accent.dot}`}
        />
        20 additional credits required
      </div>

      
      {content.note && (
        <div className="rounded-xl border border-gray-100 bg-gray-50 dark:border-white/5 dark:bg-white/5 overflow-hidden">
          <button
            onClick={() => setNoteOpen((p) => !p)}
            className="flex w-full items-center justify-between px-4 py-3 text-left"
          >
            <span className="flex items-center gap-2 text-xs font-medium">
              <Info size={13} />
              Dual degree / multiple programmes note
            </span>
            {noteOpen ? (
              <ChevronUp size={14} className="text-gray-400" />
            ) : (
              <ChevronDown size={14} className="text-gray-400" />
            )}
          </button>
          {noteOpen && (
            <p className="border-t border-gray-100 px-4 pb-4 pt-3 text-xs leading-relaxed  dark:border-white/5 ">
              {content.note}
            </p>
          )}
        </div>
      )}

     
      <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1.5">
        <div className="flex items-center gap-1.5 text-xs ">
          <span className="inline-block h-0.5 w-4 rounded-full bg-violet-500" />
          Honours
        </div>
        <div className="flex items-center gap-1.5 text-xs ">
          <span className="inline-block h-0.5 w-4 rounded-full bg-blue-500" />
          Minor
        </div>
        <div className="flex items-center gap-1.5 text-xs ">
          <span className="inline-block h-0.5 w-4 rounded-full bg-gray-300 dark:bg-zinc-600" />
          Base BTech
        </div>
      </div>
    </div>
  );
}