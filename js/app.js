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
function showNotesCards(notes) {
  notesInfo.innerHTML = "";

  notes.forEach((note) => {
    let noteCard = new NoteCard(note.id, note.title, note.description, notesList);
    noteCard.renderCard();
  });
}

// Função para salvar as anotações no localStorage
function saveNotes() {
  localStorage.setItem("notes", JSON.stringify(notesList));
}

// Evento para mostrar as anotações ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
  if (!notesStorage) {
    notesInfo.innerHTML = "<h2>Nenhuma anotação encontrada</h2>";
    return;
  }

  notesList.push(...JSON.parse(notesStorage));
  showNotesCards(notesList);
});

// Evento para pesquisar anotações
noteSearch.addEventListener("click", () => {
  let searchValue = document.querySelector("#search-value");
  let filteredNotes = notesList.filter((note) => {
    return note.title.toLowerCase().includes(searchValue.value.toLowerCase());
  });

  if(filteredNotes.length === 0) {
    notesInfo.innerHTML = "<h2>Nenhuma anotação encontrada</h2>";
    return;
  }

  showNotesCards(filteredNotes);
  searchValue.value = "";
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
    id: `note_${crypto.getRandomValues(new Uint32Array(1))[0]}`,
    title: title.value,
    description: description.value,
  });

  // Fechando o modal
  addModal.close();

  // Salvando a anotação
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

  // Pegando o id da anotação
  let id = editModal.getAttribute("data-note-id");
  // Pegando o index da anotação no array
  let index = notesList.findIndex((note) => note.id === id);
  // Pegando os valores do formulário
  let title = editForm.querySelector("#edit-note-title");
  let description = editForm.querySelector("#edit-note-description");

  // Editando a anotação no array
  notesList[index].title = title.value;
  notesList[index].description = description.value;

  // Fechando o modal
  editModal.close();

  // Salvando as alterações
  saveNotes();

  // Mostrando as alterações no card
  let card = document.querySelector(`.note-card[data-note-id="${id}"]`);
  card.querySelector(".note-card_title").textContent = title.value;
  card.querySelector(".note-card_description").textContent = description.value;
});

// Evento para fechar o modal de editar anotação
editModal.querySelector("#close-modal").addEventListener("click", () => {
  editModal.close();
});
