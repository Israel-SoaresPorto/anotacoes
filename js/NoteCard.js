// classe que cria um card de anotação
export class NoteCard {
  constructor(index, title, description) {
    this.index = index;
    this.title = title;
    this.description = description;
    this.notesInfo = document.querySelector("#notes-info");
    this.editModal = document.querySelector("#edit-modal");
    this.editForm = document.querySelector("#form-edit-note");
  }

  // método para criar o card de anotação
  createCard() {
    let card = document.createElement("div");
    card.className = "note-card";
    card.innerHTML = `
          <h3 class="note-card_title">${this.title}</h3>
          <p class="note-card_description">${this.description}</p>
          <button id="edit-note-${this.index}" class="note-card_action edit">
              <img src="assets/edit.png">
          </button>
          <button id="delete-note-${this.index}" class="note-card_action delete">
              <img src="assets/delete.png">
          </button>
          `;
    card.setAttribute("data-note-index", this.index);

    this.notesInfo.appendChild(card);
  }

  // método para editar a anotação
  editNote() {
    this.editForm.querySelector("#edit-note-title").value = this.title;
    this.editForm.querySelector("#edit-note-description").value =
      this.description;
    this.editModal.setAttribute("data-note-index", this.index);
    this.editModal.showModal();
  }

  // método para deletar a anotação
  deleteNote(notesList) {
    notesList.splice(this.index, 1);
    localStorage.setItem("notes", JSON.stringify(notesList));
  }
}
