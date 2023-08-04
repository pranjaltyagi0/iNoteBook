import NoteContext from "./noteContext";
import { useEffect, useState } from "react";

const NoteState = (props) => {
  const [token, setToken] = useState(null);
  const [notes, setNotes] = useState([]);
  const host = "http://localhost:5000";

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  // Get all Notes
  const getNotes = async () => {
    // API Call
    if (localStorage.getItem("token")) {
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": `${localStorage.getItem("token")}`,
        },
      });
      const json = await response.json();
      setNotes(json);
    }
  };

  // Add a Note
  const addNote = async (title, description, tag) => {
    // TODO: API Call
    // API Call
    if (localStorage.getItem("token")) {
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": `${token}`,
        },
        body: JSON.stringify({ title, description, tag }),
      });

      const note = await response.json();
      setNotes(notes.concat(note));
    } else {
      alert("You need to logged in before adding notes");
    }
  };

  // Delete a Note
  const deleteNote = async (id) => {
    // API Call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": `${token}`,
      },
    });
    const json = response.json();
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    // API Call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": `${token}`,
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();

    let newNotes = JSON.parse(JSON.stringify(notes));
    // Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag || "General";
        break;
      }
    }
    setNotes(newNotes);
  };

  return (
    <NoteContext.Provider
      value={{
        notes,
        addNote,
        deleteNote,
        editNote,
        getNotes,
        token,
        setToken,
        setNotes,
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
