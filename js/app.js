import { NoteCard } from "./NoteCard.js";

// Pegando os elementos do HTML
const addModal = document.querySelector("#add-modal");
const addForm = document.querySelector("#form-add-note");
const editModal = document.querySelector("#edit-modal");
const editForm = document.querySelector("#form-edit-note");
const openAddModalBtn = document.querySelector("#open-add-modal");
const notesInfo = document.querySelector("#notes-info");
const noteSearch = document.querySelector("#search");

// Array de anotações
const notesList = [];
// Pegando as anotações do localStorage
const notesStorage = localStorage.getItem("notes");

// Função para mostrar as informações da anotações
function showNotesCards(notesList) {
  notesInfo.innerHTML = "";

  notesList.forEach((note, index) => {
    let noteCard = new NoteCard(index, note.title, note.description);
    noteCard.createCard();

    // Adicionando evento de editar anotação
    document.querySelector(`#edit-note-${index}`).addEventListener("click", () => {
      noteCard.editNote();
    });

    // Adicionando evento de deletar anotação
    document.querySelector(`#delete-note-${index}`).addEventListener("click", () => {
      noteCard.deleteNote(notesList);
      showNotesCards(notesList);
    });
  });
}

// Função para salvar as anotações no localStorage
function saveNotes() {
  localStorage.setItem("notes", JSON.stringify(notesList));
}

// Evento para mostrar as anotações ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
  if (notesStorage) {
    notesList.push(...JSON.parse(notesStorage));
    showNotesCards(notesList);
  }
});

// Evento para pesquisar anotações
noteSearch.addEventListener("click", () => {
  let searchValue = document.querySelector("#search-value").value.toLowerCase();
  let filteredNotes = notesList.filter((note) => {
    return (
      note.title.toLowerCase().includes(searchValue)
    );
  });
  
  showNotesCards(filteredNotes);
});

// Evento para abrir o modal de adicionar anotação
openAddModalBtn.addEventListener("click", () => {
  addForm.reset();
  addModal.showModal();
});

// Evento para adicionar anotação
addForm.addEventListener("submit", (event) => {
  event.preventDefault();

  // Pegando os valores do formulário
  let title = addForm.querySelector("#add-note-title");
  let description = addForm.querySelector("#add-note-description");

  // Adicionando a anotação no array
  notesList.push({
    title: title.value,
    description: description.value,
  });

  addModal.close();

  // Salvando as alterações
  saveNotes();
  // Mostrando as anotações
  showNotesCards(notesList);
});

// Evento para fechar o modal de adicionar anotação
addModal.querySelector("#close-modal").addEventListener("click", () => {
  addModal.close();
});

// Evento para editar anotação
editForm.addEventListener("submit", (event) => {
  event.preventDefault();

  // Pegando o index da anotação
  let index = editModal.getAttribute("data-note-index");
  // Pegando os valores do formulário
  let title = editForm.querySelector("#edit-note-title");
  let description = editForm.querySelector("#edit-note-description");

  // Editando a anotação no array
  notesList[index] = {
    title: title.value,
    description: description.value,
  };

  editModal.close();

  // Salvando as alterações
  saveNotes();
  // Mostrando as anotações
  showNotesCards(notesList);
});

// Evento para fechar o modal de editar anotação
editModal.querySelector("#close-modal").addEventListener("click", () => {
  editModal.close();
});
