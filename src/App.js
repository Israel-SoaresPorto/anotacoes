import { useEffect, useState } from "react";
import "./App.css";
import Modal from "./components/Modal/Modal";
import Card from "./components/Card/Card";
import AddForm from "./components/Forms/AddForm";
import EditForm from "./components/Forms/EditForm";

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalToEdit, setIsModalToEdit] = useState(false);
  const [currentNote, setCurrentNote] = useState({});
  const [notes, setNotes] = useState(
    localStorage.getItem("notes")
      ? JSON.parse(localStorage.getItem("notes"))
      : []
  );

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = (title, description) => {
    const newNote = {
      id: `note-${crypto.getRandomValues(new Uint16Array(1))[0]}`,
      title: title,
      description: description,
    };
    setNotes([...notes, newNote]);
  };

  const editNote = (id, title, description) => {
    const editedNote = {
      id: id,
      title: title,
      description: description,
    };
    const updatedNotes = notes.map((note) => {
      if (note.id === id) {
        return editedNote;
      }
      return note;
    });
    setNotes(updatedNotes);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const deleteNote = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
  };

  return (
    <div className="App">
      <header className="header">
        <h1>Anotações</h1>
      </header>
      <section className="App__actions">
        <button className="new-note-button" onClick={openModal}>
          Nova anotação
        </button>
      </section>
      <Modal isOpen={isModalOpen}>
        {!isModalToEdit ? (
          <AddForm onSave={addNote} onClose={() => setIsModalOpen(false)} />
        ) : (
          <EditForm
            onSave={editNote}
            onClose={() => {
              setIsModalOpen(false);
              setIsModalToEdit(false);
            }}
            note={currentNote}
          />
        )}
      </Modal>
      <section className="App__notes">
        {notes.map((note) => {
          return (
            <Card
              key={note.id}
              note={note}
              onEdit={() => {
                setCurrentNote(note);
                setIsModalToEdit(true);
                setIsModalOpen(true);
              }}
              onDelete={() => deleteNote(note.id)}
            />
          );
        })}
      </section>
    </div>
  );
}
