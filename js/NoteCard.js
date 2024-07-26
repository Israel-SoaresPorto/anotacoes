// classe que cria um card de anotação
export class NoteCard {
  constructor(id, title, description, notes) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.notes = notes;
    this.notesInfo = document.querySelector("#notes-info");
    this.editModal = document.querySelector("#edit-modal");
    this.editForm = document.querySelector("#form-edit-note");
  }

  // método para criar o card de anotação
  renderCard() {
    let card = document.createElement("div");
    card.className = "note-card";
    card.innerHTML = `
          <h3 class="note-card_title">${this.title}</h3>
          <p class="note-card_description">${this.description}</p>
          <button id="edit-note" class="note-card_action edit">
              <img src="assets/edit.png">
          </button>
          <button id="delete-note" class="note-card_action delete">
              <img src="assets/delete.png">
          </button>
          `;
    card.setAttribute("data-note-id", this.id);

    // Adicionando evento para editar a anotação
    card.querySelector("#edit-note").addEventListener("click", () => {
      this.editNote();
    });

    // Adicionando evento para deletar a anotação
    card.querySelector("#delete-note").addEventListener("click", () => {
      this.deleteNote();
      card.remove();
    });

    this.notesInfo.appendChild(card);
  }

  // método para editar a anotação
  editNote() {
    this.editForm.querySelector("#edit-note-title").value = this.title;
    this.editForm.querySelector("#edit-note-description").value =
      this.description;
    this.editModal.setAttribute("data-note-id", this.id);
    this.editModal.showModal();
  }

  // método para deletar a anotação
  deleteNote() {
    let noteIndex = this.notes.findIndex((note) => note.id === this.id);
    if(noteIndex === -1) return;
    this.notes.splice(noteIndex, 1);
    localStorage.setItem("notes", JSON.stringify(this.notes));
  }
}
