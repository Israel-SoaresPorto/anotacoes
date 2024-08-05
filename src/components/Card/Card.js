import "./Card.css";
import editIcon from "./edit.png";
import deleteIcon from "./delete.png";

export default function Card({ note, onEdit, onDelete }) {
  return (
    <div className="Card" key={note.id}>
      <h3 className="Card__title">{note.title}</h3>
      <p className="Card__description">{note.description}</p>
      <div className="Card__actions">
        <button className="Card__button" onClick={onEdit}>
            <img src={editIcon} alt="Editar" />
        </button>
        <button className="Card__button" onClick={onDelete}>
            <img src={deleteIcon} alt="Deletar" />
        </button>
      </div>
    </div>
  );
}
