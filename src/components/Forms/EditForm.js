import { useState } from "react";
import "./Form.css";

export default function EditForm({ onClose, onSave, note }) {
  const [title, setTitle] = useState(note.title);
  const [description, setDescription] = useState(note.description);

  const handleSave = (e) => {
    e.preventDefault();
    onSave(note.id, title, description);
    onModalClose();
    onClose();
  };

  const onModalClose = () => {
    setTitle("");
    setDescription("");
  };

  return (
    <>
      <form className="Form" onSubmit={handleSave}>
        <h2 className="Form__title">Editar anotação</h2>
        <label className="Form__label" htmlFor="input-title">
          Título
        </label>
        <input
          id="input-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <label className="Form__label" htmlFor="input-description">
          Descrição
        </label>
        <textarea
          id="input-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <div className="Form__actions">
          <button type="submit" className="Form__button">
            Salvar
          </button>
          <button
            type="button"
            className="Form__button"
            onClick={() => {
              onModalClose();
              onClose();
            }}
          >
            Cancelar
          </button>
        </div>
      </form>
    </>
  );
}