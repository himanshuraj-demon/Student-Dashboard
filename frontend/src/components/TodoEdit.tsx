import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoMdClose } from "react-icons/io";
import { type Todo } from "../../constants/types";
import api from "../services/api";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";
import { tagIcons } from "./TodoBlock";
import toast from "react-hot-toast";

type Props = {
  todo: Todo | null;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
};

const availableTags = [
  "coding",
  "game",
  "study",
  "music",
  "fitness",
  "personal",
];

const TodoEdit = ({ todo, setEdit }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<Todo>();
  const { setTodos } = useAuth();
  const [selectedTag, setSelectedTag] = useState<string>(
    todo?.tag || "personal",
  );
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    if (todo) {
      const formattedTodo = {
        ...todo,
        time: todo.time
          ? new Date(todo.time).toISOString().substring(0, 16)
          : "",
      };
      reset(formattedTodo);
    }
  }, [todo, reset]);

  const onSubmit = async (data: Todo) => {
    const payload = {
      ...data,
      tag: selectedTag,
      pinned: todo ? todo.pinned : false,
      completed: todo ? todo.completed : false,
    };

    try {
      if (todo?._id) {
        await api.put(`/todos/${todo._id}`, payload);
        toast.success("Todo updated");
      } else {
        await api.post("/todos", payload);
        toast.success("Todo created");
      }
      const todosRes = await api.get("/todos");
      setTodos(todosRes.data);
      setEdit(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError("root", {
          message: error.response?.data?.message || error.message,
        });
      } else {
        setError("root", { message: "Something went wrong" });
      }
    }
  };

  const onDelete = async () => {
    if (!todo?._id) return;
    alert("ON DELETE CALLED");
    try {
      await api.delete(`/todos/${todo._id}`);
      const todosRes = await api.get("/todos");
      setTodos(todosRes.data);
      setEdit(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError("root", {
          message: error.response?.data?.message || error.message,
        });
      } else {
        setError("root", { message: "Something went wrong" });
      }
    }
  };

  return (
    <>
      {confirmDelete && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-[#161b33] border border-slate-800 text-white rounded-2xl p-6 w-[90%] max-w-sm flex flex-col gap-4 shadow-2xl">
            <h2 className="text-xl font-bold text-center">
              Discard Task Status?
            </h2>
            <p className="text-center text-slate-400 text-sm">
              This completely purges historical timeline visibility logs. This
              action cannot be undone.
            </p>
            <div className="flex justify-between gap-3 mt-2">
              <button
                type="button"
                className="flex-1 px-4 py-2 rounded-xl bg-slate-800 text-white hover:bg-slate-700 transition-colors text-sm font-medium"
                onClick={() => setConfirmDelete(false)}>
                Cancel
              </button>
              <button
                type="button"
                className="flex-1 px-4 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700 transition-colors text-sm font-medium"
                onClick={onDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs">
        <div className="w-full h-full md:w-125 md:h-auto md:max-h-[90vh] md:rounded-2xl bg-[#161b33] border border-slate-800 text-white shadow-2xl flex flex-col overflow-y-auto">
          <div className="p-4 flex justify-between items-center border-b border-slate-800/60">
            <h3 className="text-lg font-bold tracking-wide">
              {todo ? "Modify Workspace Task" : "Create New Timeline Task"}
            </h3>
            <button
              onClick={() => setEdit(false)}
              className="text-slate-400 hover:text-white transition-colors">
              <IoMdClose size={24} />
            </button>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col p-5 gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Task Title
              </label>
              <input
                {...register("title", {
                  required: "A descriptive title assignment is required",
                })}
                placeholder="What needs to be done?"
                className="w-full p-3 bg-[#1e2540] border border-slate-800 rounded-xl text-white outline-none focus:border-purple-500 text-sm transition-all"
              />
              {errors.title && (
                <span className="text-red-400 text-xs mt-0.5">
                  {errors.title.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Target Deadline
              </label>
              <input
                type="datetime-local"
                {...register("time")}
                className="w-full p-3 bg-[#1e2540] border border-slate-800 rounded-xl text-white outline-none focus:border-purple-500 text-sm transition-all color-scheme-dark"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Description (Optional)
              </label>
              <textarea
                {...register("description")}
                placeholder="Add some details or notes..."
                rows={3}
                className="w-full p-3 bg-[#1e2540] border border-slate-800 rounded-xl text-white outline-none focus:border-purple-500 text-sm transition-all resize-none"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Category Tag
              </label>
              <div className="flex flex-wrap gap-2">
                {availableTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setSelectedTag(tag)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium capitalize border transition-all ${
                      selectedTag === tag
                        ? "bg-purple-600 border-purple-400 text-white shadow-[0_0_10px_rgba(168,85,247,0.3)]"
                        : "bg-[#1e2540] border-slate-800 text-slate-300 hover:border-slate-700"
                    }`}>
                    {tagIcons[tag]}
                    <span>{tag}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-slate-800/60 mt-2">
              {todo?._id ? (
                <div
                  className="px-4 py-2 rounded-xl bg-red-950/40 text-red-400 hover:bg-red-900/40 border border-red-900/30 text-sm font-medium transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    setConfirmDelete(true);
                  }}>
                  Delete Task
                </div>
              ) : (
                <div />
              )}

              <div className="flex gap-2">
                <div
                  onClick={() => setEdit(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium transition-colors">
                  Cancel
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-purple-500 hover:bg-purple-600 text-white text-sm font-medium transition-colors shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                  {todo ? "Save Changes" : "Create Task"}
                </button>
              </div>
            </div>

            {errors.root && (
              <span className="text-red-400 text-center text-xs font-medium">
                {errors.root.message}
              </span>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default TodoEdit;
