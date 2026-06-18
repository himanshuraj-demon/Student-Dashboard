import React, { useState } from "react";
import { useTitle } from "../hooks/useTitle";
import Notesblock from "../components/Notesblock";
import { FiPlus } from "react-icons/fi";
import NotesEdit from "../components/NotesEdit";
import { type Note } from "../../constants/types";
import { useAuth } from "../hooks/useAuth";

const Notes = () => {
  const { notes } = useAuth();
  const [isEdit, setEdit] = useState(false);
  const [note, setNote] = useState<Note | null>(null);
  const [addKey, setAddKey] = useState(0);
  const [search, setSearch] = useState("");

  useTitle("Notes");

  const filteredNotes = notes.filter((n: Note) =>
    n.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full md:w-auto h-dvh overflow-x-hidden overflow-y-scroll">
      <div className="flex flex-col gap-2 notesmenu m-1 p-3 rounded-2xl overflow-x-hidden">
        <div className="mb-4 text-center flex flex-col justify-center items-center">
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            📝 Notes Workspace
          </h1>

          <p className="text-sm opacity-70 mt-2 mx-3">
            Create, organize and search your study notes
          </p>
        </div>
        <div className="w-full flex justify-center">
          <input
            type="text"
            placeholder="🔍︎ Search here ..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-[95%] p-2 bg-black text-white notesinput rounded-2xl self-center"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-5">
          {isEdit && <NotesEdit key={addKey} note={note} setEdit={setEdit} />}
          <div
            className="h-40 md:h-80 hover:scale-105 bg-[#ffffaf55] transition-all duration-300 ease-in-out rounded-2xl border-2 border-blue-200 flex justify-center items-center text-2xl cursor-pointer"
            onClick={() => {
              setNote(null);
              setAddKey((k) => k + 1);
              setEdit(true);
            }}>
            Add <FiPlus size={30} />
          </div>
          {filteredNotes.map((_note: Note) => (
            <Notesblock note={_note} key={_note._id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notes;