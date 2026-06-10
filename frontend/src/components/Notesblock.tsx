import React, { useState } from "react";
import {type Note } from "../../constants/types";

import NotesEdit from "./NotesEdit";
type Props = {
  note: Note;
};

const Notesblock = ({ note }: Props) => {
  const [isEdit, setEdit] = useState<boolean>(false);
  return (
    <>
      {isEdit && <NotesEdit note={note} setEdit={setEdit}/>}
        <div className="h-40 md:h-80 bg-[#ffffffee] text-black rounded-2xl border-t-10 border-amber-400 p-4 overflow-hidden hover:scale-105 transform-all duration-300 ease-in-out" style={{
            backgroundColor: note?.theme.bg || "#ffffffee",
          }} onClick={()=>setEdit(!isEdit)}>
          <h1 className="text-xl font-semibold mb-2 line-clamp-2">
            {note.title}
          </h1>
          <p className="text-gray-600 line-clamp-5">{note.description}</p>
        </div>
    </>
  );
};

export default Notesblock;