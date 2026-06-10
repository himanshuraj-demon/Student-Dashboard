import React, { useState } from "react";

type Note = {
  title: string;
  description: string;
};
import NotesEdit from "./NotesEdit";

const Notesblock = (notes: Note) => {
  const [isEdit, setEdit] = useState<boolean>(true);
  return (
    <>
      {!isEdit && <NotesEdit isEdit={isEdit} setEdit={setEdit}/>}
        <div className="h-40 md:h-80 bg-[#ffffffee] text-black rounded-2xl border-t-10 border-amber-400 p-4 overflow-hidden hover:scale-105 transform-all duration-300 ease-in-out" onClick={()=>setEdit(!isEdit)}>
          <h1 className="text-xl font-semibold mb-2 line-clamp-2">
            {notes.title}
          </h1>
          <p className="text-gray-600 line-clamp-5">{notes.description}</p>
        </div>
    </>
  );
};

export default Notesblock;
