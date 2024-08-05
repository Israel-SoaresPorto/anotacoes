import { useState } from "react";
import "./Form.css";

export default function AddForm({ onClose, onSave }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSave = (e) => {
    e.preventDefault();
    onSave(title, description);
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
        <h2 className="Form__title">Nova anotação</h2>
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
