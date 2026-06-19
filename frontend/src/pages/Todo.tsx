import { useMemo, useState } from "react";
import { useTitle } from "../hooks/useTitle";
import Todoblock from "../components/TodoBlock";
import { FiPlus, FiSearch } from "react-icons/fi";
import TodoEdit from "../components/TodoEdit";
import { type Todo } from "../../constants/types";
import { useAuth } from "../hooks/useAuth";

const Todos = () => {
  const { todos } = useAuth();
  const [isEdit, setEdit] = useState(false);
  const [todo, setTodo] = useState<Todo | null>(null);
  const [addKey, setAddKey] = useState(0);
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);


  useTitle("Todo");
  const greeting = useMemo(() => {
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 12) return "🌅 Good Morning";
    if (hour >= 12 && hour < 17) return "☀️ Good Afternoon";
    if (hour >= 17 && hour < 21) return "🌇 Good Evening";

    return "🌙 Good Night";
  }, []);

  const totalTasks = todos?.length || 0;
  const completedTasks = todos?.filter((t: Todo) => t.completed).length || 0;
  const completionPercentage =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const filteredTodos = (todos || []).filter((t: Todo) => {
    const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase());
    const matchesTag = selectedTag ? t.tag === selectedTag : true;
    return matchesSearch && matchesTag;
  });

  const tagsList = ["coding", "game", "study", "music", "fitness", "personal"];

  return (
    <div className="w-full md:w-auto h-dvh overflow-x-hidden overflow-y-scroll">
      <div className="flex flex-col gap-4 w-full universal mx-auto m-1 p-4 rounded-2xl overflow-x-hidden todosmenu">
        <div className="mb-2 ">
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            {greeting}
          </h1>
          <p className="text-sm opacity-80 mt-1 italic">
            Today is a new opportunity to be productive!
          </p>
        </div>

        <div className="relative universal border border-slate-800 rounded-2xl p-5 flex items-center gap-5 shadow-lg">
          <div className="relative flex items-center justify-center w-16 h-16 rounded-full border-4 border-purple-600/30">
            <div
              className="absolute inset-0 rounded-full border-4 border-t-blue-500 animate-spin-slow dynamic-dial"
              style={{ transform: `rotate(${completionPercentage * 3.6}deg)` }}
            />
            <span className="text-sm font-bold">{completionPercentage}%</span>
          </div>
          <div>
            <h3 className="font-semibold text-base">
              You have {totalTasks - completedTasks} task
              {totalTasks - completedTasks !== 1 ? "s" : ""} to complete.
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              {completionPercentage === 100
                ? "All caught up! Exceptional job!"
                : "No tasks completed yet. Keep going!"}
            </p>
          </div>
        </div>

        <div className="w-full flex gap-3 items-center">
          <div className="relative flex-1">
            <FiSearch
              className="absolute left-4 top-3.5 text-slate-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search for task..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 universal border border-transparent focus:border-blue-500  placeholder-slate-400 rounded-xl outline-none transition-all text-sm"
            />
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setSelectedTag(null)}
            className={`px-4 py-1.5 rounded-xl text-xs font-medium capitalize whitespace-nowrap transition-all ${
              !selectedTag
                ? "bg-blue-500 text-white"
                : "bg-[#161b33] text-slate-300 hover:bg-slate-800"
            }`}>
            All Tasks ({totalTasks})
          </button>
          {tagsList.map((tag) => {
            const count = todos?.filter((t: Todo) => t.tag === tag).length || 0;
            return (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-1.5 rounded-xl text-xs font-medium capitalize whitespace-nowrap transition-all ${
                  selectedTag === tag
                    ? "bg-blue-500 text-white"
                    : "bg-[#161b33] text-slate-300 hover:bg-slate-800"
                }`}>
                {tag} ({count})
              </button>
            );
          })}
        </div>

        <div className="flex flex-col gap-3 mt-2 min-h-75 items-center">
          {filteredTodos.map((_todo: Todo) => (
            <Todoblock
              todo={_todo}
              key={_todo._id}
              onEditClick={() => {
                setTodo(_todo);
                setEdit(true);
              }}
            />
          ))}

          {filteredTodos.length === 0 && (
            <div className="text-center py-12 text-slate-400 text-sm">
              No tasks found. Click the + button below to add one!
            </div>
          )}
        </div>
      </div>

      {isEdit && <TodoEdit key={addKey} todo={todo} setEdit={setEdit} />}

      <button
        className="fixed md:bottom-3 md:right-20 bottom-22 right-20 w-14 h-14 bg-blue-500 hover:bg-blue-600 active:scale-95 text-white rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all z-40"
        onClick={() => {
          setTodo(null);
          setAddKey((k) => k + 1);
          setEdit(true);
        }}>
        <FiPlus size={28} />
      </button>
    </div>
  );
};

export default Todos;
