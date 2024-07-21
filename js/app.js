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
function showNoteInfo(note) {
  // Criando o elemento principal
  let noteInfo = document.createElement("div");
  noteInfo.setAttribute("id", "note-info");
  noteInfo.classList.add("note_info");
  // Adicionando o index da anotação
  noteInfo.setAttribute("data-note-index", notesList.indexOf(note));

  // Criando o elemento de título da anotação
  let noteTitle = document.createElement("h4");
  // Criando o elemento de descrição da anotação
  let noteDescription = document.createElement("p");

  // Criando o botão de editar anotação
  let editButton = document.createElement("button");
  editButton.classList.add("edit");
  let imgEdit = document.createElement("img");
  imgEdit.src = "assets/edit.png";
  editButton.appendChild(imgEdit);
  editButton.setAttribute("id", "edit-button");
  // Adicionando o evento de editar anotação no botão
  editButton.addEventListener("click", () => {
    // Pegando o index da anotação
    let index = noteInfo.getAttribute("data-note-index");
    // Pegando a anotação para editar
    let noteToEdit = notesList[index];
    // Adicionando os valores da anotação no formulário de edição
    editForm.querySelector("#edit-note-title").value = noteToEdit.title;
    editForm.querySelector("#edit-note-description").value =
      noteToEdit.description;
    // Adicionando o index da anotação no modal de edição
    editModal.setAttribute("data-note-index", index);
    // Abrindo o modal de edição
    editModal.showModal();
  });

  // Criando o botão de deletar anotação
  let deleteButton = document.createElement("button");
  deleteButton.classList.add("delete");
  let imgDelete = document.createElement("img");
  imgDelete.src = "assets/delete.png";
  deleteButton.appendChild(imgDelete);
  deleteButton.setAttribute("id", "delete-button");

  // Adicionando o evento de deletar anotação no botão
  deleteButton.addEventListener("click", () => {
    // Pegando o index da anotação
    let index = noteInfo.getAttribute("data-note-index");
    // Deletando a anotação do array
    notesList.splice(index, 1);
    // Salvando as alterações
    saveNotes();
    // Mostrando as anotações
    showNotesInfo(notesList);
  });

  // Adicionando os valores da anotação nos elementos
  noteTitle.textContent = note.title;
  noteDescription.textContent = note.description;

  // Criando o elemento de título
  let divTitle = document.createElement("div");
  divTitle.classList.add("note_title");

  // Criando o elemento de ações
  let divActions = document.createElement("div");
  divActions.classList.add("note_actions");

  // Criando o elemento de conteúdo da anotação
  let noteContent = document.createElement("div");
  noteContent.classList.add("note_content");

  // Adicionando os elementos no HTML
  divTitle.appendChild(noteTitle);
  divActions.appendChild(editButton);
  divActions.appendChild(deleteButton);
  divTitle.appendChild(divActions);
  noteInfo.appendChild(divTitle);
  noteContent.appendChild(noteDescription);
  noteInfo.appendChild(noteContent);
  notesInfo.appendChild(noteInfo);
}

// Função para mostrar as informações das anotações
function showNotesInfo(notes) {
  notesInfo.innerHTML = "";

  notes.forEach((note) => {
    showNoteInfo(note);
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
    showNotesInfo(notesList);
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

  showNotesInfo(filteredNotes);
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
  showNotesInfo(notesList);
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
  showNotesInfo(notesList);
});

// Evento para fechar o modal de editar anotação
editModal.querySelector("#close-modal").addEventListener("click", () => {
  editModal.close();
});
