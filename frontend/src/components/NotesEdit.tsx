import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { IoMdClose } from "react-icons/io";

const noteThemes = [
  { bg: "#FEF3C7", text: "#92400E" }, // Warm Yellow
  { bg: "#DBEAFE", text: "#1E40AF" }, // Soft Blue
  { bg: "#DCFCE7", text: "#166534" }, // Mint Green
  { bg: "#FCE7F3", text: "#9D174D" }, // Pink
  { bg: "#EDE9FE", text: "#6D28D9" }, // Lavender
  { bg: "#FEE2E2", text: "#B91C1C" }, // Soft Red
  { bg: "#E0F2FE", text: "#0369A1" }, // Sky Blue
];

type Edit = {
  isEdit: boolean;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
};

interface Note {
  title: string;
  description: string;
  theme: string;
}

const NotesEdit = ({ isEdit, setEdit }: Edit) => {
  const { register, handleSubmit } = useForm<Note>({
    defaultValues: {
      title: "",
      description: "",
    },
  });
const onSubmit = (data: Note) => {
    const payload = {
      ...data,
    theme: selectedTheme,
};

    console.log(payload);
    setEditing(false);
  };

  
  const [selectedTheme, setSelectedTheme] = useState(noteThemes[0]);
  const [isEditing, setEditing] = useState(false);
  return (
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
            className="text-black hover:text-red-700 hover:scale-125 transform-all duration-300 ease-in-out"
            onClick={() => setEdit(!isEdit)}
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
                <button
                  type="button"
                  className="px-3 py-1 rounded-2xl bg-red-600 text-white"
                  onClick={() => setEditing(false)}>
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-3 py-1 rounded-2xl bg-green-600 text-white">
                  Save Changes
                </button>
              </div>
            ) : (
              <div className="flex justify-end">
                <button
                  type="button"
                  className="px-4 py-1 rounded-2xl bg-blue-600 text-white"
                  onClick={() => setEditing(true)}>
                  Edit
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default NotesEdit;
