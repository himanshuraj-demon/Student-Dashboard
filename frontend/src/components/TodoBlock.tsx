import React, { useState, useRef, useEffect } from "react";
import { type Todo } from "../../constants/types";
import api from "../services/api";
import { useAuth } from "../hooks/useAuth";
import { HiDotsVertical } from "react-icons/hi";
import { FiMapPin, FiClock } from "react-icons/fi";
import {
  BiCodeAlt,
  BiJoystick,
  BiBookOpen,
  BiMusic,
  BiDumbbell,
  BiUser,
} from "react-icons/bi";

type Props = {
  todo: Todo;
  onEditClick: () => void;
};

// Map tags explicitly to icons
// eslint-disable-next-line react-refresh/only-export-components
export const tagIcons: Record<string, React.ReactNode> = {
  coding: <BiCodeAlt size={16} />,
  game: <BiJoystick size={16} />,
  study: <BiBookOpen size={16} />,
  music: <BiMusic size={16} />,
  fitness: <BiDumbbell size={16} />,
  personal: <BiUser size={16} />,
};

const Todoblock = ({ todo, onEditClick }: Props) => {
  const { setTodos } = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleTogglePin = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await api.put(`/todos/${todo._id}`, { ...todo, pinned: !todo.pinned });
      const res = await api.get("/todos");
      setTodos(res.data);
      setShowMenu(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await api.delete(`/todos/${todo._id}`);
      const res = await api.get("/todos");
      setTodos(res.data);
      setShowMenu(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleComplete = async () => {
    try {
      await api.put(`/todos/${todo._id}`, {
        ...todo,
        completed: !todo.completed,
      });
      const res = await api.get("/todos");
      setTodos(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const formatTodoTime = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return (
      date.toLocaleDateString("en-US", {
        month: "numeric",
        day: "numeric",
        year: "numeric",
      }) +
      " • " +
      date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
    );
  };

  return (
    <div
      onClick={handleToggleComplete}
      className={`relative
    w-full
    md:w-[75%]
    lg:w-[70%]
    min-h-35
    md:min-h-30
    p-4
    rounded-2xl
    transition-all
    duration-300
    cursor-pointer
    overflow-visible
    group hover:shadow-[0_0_25px_rgba(59,130,246,0.35)]
    ${todo.completed ? "opacity-50 scale-[0.99]" : "hover:scale-[1.01]"} ${todo.pinned? "scale-105":""}
  `}
      style={{
        backgroundColor: todo.pinned ? "#3b82f6" : "#2563eb",
        boxShadow: todo.pinned
          ? "0 0 20px rgba(217, 70, 239, 0.3)"
          : "0 0 15px rgba(188, 19, 254, 0.2)",
        color: "#ffffff",
      }}>
      <div className="flex flex-col gap-1.5 pr-8">
        <div className="flex items-center gap-2 text-xs font-medium opacity-90">
          {todo.pinned && <FiMapPin className="fill-white" size={12} />}
          <span>{todo.pinned ? "Pinned" : "Task"}</span>

          <span className="ml-auto text-xs opacity-75">
            {todo.time
              ? new Date(todo.time).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : ""}
          </span>
        </div>

        <h2
          className={`text-lg md:text-xl font-bold tracking-wide ${
            todo.completed ? "line-through opacity-70" : ""
          }`}>
          {todo.title}
        </h2>

        <div className="flex items-center gap-1.5 text-xs font-medium mt-0.5 opacity-95">
          <FiClock size={13} />

          <span>{formatTodoTime(todo.time)}</span>

          {todo.time && new Date(todo.time) < new Date() && !todo.completed && (
            <span className="text-[10px] bg-red-900/50 text-red-200 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ml-1">
              Overdue
            </span>
          )}
        </div>

        {todo.description && (
          <p className="text-sm mt-1 opacity-90 line-clamp-1 md:line-clamp-2 leading-relaxed">
            {todo.description}
          </p>
        )}

        {todo.tag && (
          <div className="flex items-center gap-1.5 mt-3 w-fit px-3 py-1 bg-white/20 border border-white/10 rounded-xl text-xs font-semibold capitalize tracking-wide">
            {tagIcons[todo.tag.toLowerCase()]}
            <span>{todo.tag}</span>
          </div>
        )}
      </div>

      <div className="absolute top-4 right-4" ref={menuRef}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowMenu(!showMenu);
          }}
          className="p-1.5 hover:bg-white/10 rounded-full transition-colors text-white">
          <HiDotsVertical size={20} />
        </button>

        {showMenu && (
          <div className="absolute right-0 mt-1 w-36 bg-[#161b33] border border-slate-800 rounded-xl shadow-2xl overflow-hidden z-30 text-slate-200 text-sm">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEditClick();
                setShowMenu(false);
              }}
              className="w-full px-4 py-2.5 text-left hover:bg-slate-800 transition-colors flex items-center gap-2">
              Modify Item
            </button>

            <button
              onClick={handleTogglePin}
              className="w-full px-4 py-2.5 text-left hover:bg-slate-800 transition-colors flex items-center gap-2 border-t border-slate-800/60">
              {todo.pinned ? "Unpin Header" : "Pin to Header"}
            </button>

            <button
              onClick={handleDelete}
              className="w-full px-4 py-2.5 text-left hover:bg-red-950 text-red-400 transition-colors flex items-center gap-2 border-t border-slate-800/60">
              Delete Item
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Todoblock;
