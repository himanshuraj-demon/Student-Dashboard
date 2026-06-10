import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoMdClose } from "react-icons/io";
import { type Note } from "../../constants/types";
import api from "../services/api";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";

const noteThemes = [
  { bg: "#FEF3C7", text: "#92400E" }, // Warm Yellow
  { bg: "#DBEAFE", text: "#1E40AF" }, // Soft Blue
  { bg: "#DCFCE7", text: "#166534" }, // Mint Green
  { bg: "#FCE7F3", text: "#9D174D" }, // Pink
  { bg: "#EDE9FE", text: "#6D28D9" }, // Lavender
  { bg: "#FEE2E2", text: "#B91C1C" }, // Soft Red
  { bg: "#E0F2FE", text: "#0369A1" }, // Sky Blue
];

type Props = {
  note: Note | null;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
};

const NotesEdit = ({ note, setEdit }: Props) => {
  const { register, handleSubmit, reset, setError, formState: { errors } } = useForm<Note>();
  const { setNotes } = useAuth();
  const [isEditing, setEditing] = useState(note === null);
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    if (note) {
      reset(note);
    }
  }, [note, reset]);

  const onSubmit = async (data: Note) => {
    const payload = {
      ...data,
      theme: selectedTheme,
    };
    try {
      if (note?._id) {
        await api.put(`/notes/${note._id}`, payload);
        const notesRes = await api.get("/notes");
        setNotes(notesRes.data);
      } else {
        await api.post("/notes", payload);
        const notesRes = await api.get("/notes");
        setNotes(notesRes.data);
      }
      setEdit(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError("root", {
          message: error.response?.data?.message || error.message,
        });
        console.log("error");
      } else {
        setError("root", {
          message: "Something went wrong",
        });
      }
    }
  };

  const onDelete = async () => {
    if (!note?._id) return;
    try {
      await api.delete(`/notes/${note._id}`);
      const notesRes = await api.get("/notes");
      setNotes(notesRes.data);
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

  const [selectedTheme, setSelectedTheme] = useState(
    note?.theme ?? noteThemes[0],
  );

  return (
    <>
      {confirmDelete && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/60">
          <div className="bg-white text-black rounded-2xl shadow-2xl p-6 w-[90%] max-w-sm flex flex-col gap-4">
            <h2 className="text-xl font-bold text-center">Delete Note?</h2>
            <p className="text-center text-gray-600 text-sm">
              This action cannot be undone. Are you sure you want to delete this note?
            </p>
            <div className="flex justify-between gap-3 mt-2">
              <button
                type="button"
                className="flex-1 px-4 py-2 rounded-2xl bg-gray-200 text-black"
                onClick={() => setConfirmDelete(false)}>
                Cancel
              </button>
              <button
                type="button"
                className="flex-1 px-4 py-2 rounded-2xl bg-red-600 text-white"
                onClick={onDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
        <div
          className="w-full h-full md:w-1/2 md:h-[80vh] md:rounded-2xl shadow-xl flex flex-col"
          style={{
            backgroundColor: selectedTheme.bg,
            color: selectedTheme.text,
          }}>
          <div className="m-3 self-end">
            <IoMdClose
              size={30}
              className="text-black hover:text-red-700 hover:scale-125 transform-all duration-300 ease-in-out cursor-pointer"
              onClick={() => setEdit((prev) => !prev)}
            />
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col flex-1 p-5 gap-4">
            <input
              {...register("title")}
              disabled={!isEditing}
              placeholder="Title"
              className="
        bg-transparent
        outline-none
        border-none
        text-3xl
        font-bold
        placeholder:opacity-60
      "
            />

            <textarea
              {...register("description")}
              disabled={!isEditing}
              placeholder="Start writing..."
              className="
        flex-1
        resize-none
        bg-transparent
        outline-none
        border-none
        text-lg
        leading-relaxed
        placeholder:opacity-60
      "
            />

            <div className="mt-auto">
              {isEditing && (
                <div className="flex gap-3 flex-wrap justify-end mb-4">
                  {noteThemes.map((theme, index) => (
                    <button
                      key={index}
                      type="button"
                      disabled={!isEditing}
                      onClick={() => setSelectedTheme(theme)}
                      className={`w-8 h-8 rounded-full border-2 transition-all ${
                        selectedTheme.bg === theme.bg
                          ? "border-black scale-110"
                          : "border-gray-300"
                      }`}
                      style={{ backgroundColor: theme.bg }}
                    />
                  ))}
                </div>
              )}

              {isEditing ? (
                <div className="flex justify-between">
                  <div
                    className="px-3 py-1 rounded-2xl bg-red-600 text-white cursor-pointer"
                    onClick={() => setEditing(false)}>
                    Cancel
                  </div>

                  <button
                    type="submit"
                    className="px-3 py-1 rounded-2xl bg-green-600 text-white cursor-pointer">
                    Save Changes
                  </button>
                </div>
              ) : (
                <div className="flex justify-between">
                  {note?._id && (
                    <div
                  
                      className="px-4 py-1 rounded-2xl bg-red-600 text-white cursor-pointer"
                      onClick={() => setConfirmDelete(true)}>
                      Delete
                    </div>
                  )}
                  <div
                    className="px-4 py-1 rounded-2xl bg-blue-600 text-white ml-auto cursor-pointer"
                    onClick={() => setEditing(true)}>
                    Edit
                  </div>
                </div>
              )}
            </div>
            {errors.root && (
              <span className="text-red-500 text-center">
                {errors.root.message}
              </span>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default NotesEdit;