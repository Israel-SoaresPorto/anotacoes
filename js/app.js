const addModal = document.querySelector("#add-modal");
const addForm = document.querySelector("#form-add-note");
const editModal = document.querySelector("#edit-modal");
const editForm = document.querySelector("#form-edit-note");
const openAddModalBtn = document.querySelector("#open-add-modal");
const notesInfo = document.querySelector("#notes-info");

const notesList = [];

function showNoteInfo(note) {
  let noteInfo = document.createElement("div");

  noteInfo.setAttribute("id", "note-info");
  noteInfo.classList.add("note_info");
  noteInfo.setAttribute("data-note-index", notesList.indexOf(note));

  let noteTitle = document.createElement("h4");
  let noteDescription = document.createElement("p");

  let editButton = document.createElement("button");
  editButton.classList.add("edit");
  let imgEdit = document.createElement("img");
  imgEdit.src = "assets/edit.png";
  editButton.appendChild(imgEdit);
  editButton.setAttribute("id", "edit-button");

  editButton.addEventListener("click", () => {
    let index = noteInfo.getAttribute("data-note-index");
    let noteToEdit = notesList[index];

    editForm.querySelector("#edit-note-title").value = noteToEdit.title;
    editForm.querySelector("#edit-note-description").value =
      noteToEdit.description;
    editModal.setAttribute("data-note-index", index);

    editModal.showModal();
  });

  let deleteButton = document.createElement("button");
  deleteButton.classList.add("delete");
  let imgDelete = document.createElement("img");
  imgDelete.src = "assets/delete.png";
  deleteButton.appendChild(imgDelete);
  deleteButton.setAttribute("id", "delete-button");

  deleteButton.addEventListener("click", () => {
    let index = noteInfo.getAttribute("data-note-index");
    notesList.splice(index, 1);

    showNotesInfo(notesList);
  });

  noteTitle.textContent = note.title;
  noteDescription.textContent = note.description;

  let divTitle = document.createElement("div");
  divTitle.classList.add("note_title");

  let divActions = document.createElement("div");
  divActions.classList.add("note_actions");

  let noteContent = document.createElement("div");
  noteContent.classList.add("note_content");

  divTitle.appendChild(noteTitle);
  divActions.appendChild(editButton);
  divActions.appendChild(deleteButton);
  divTitle.appendChild(divActions);

  noteInfo.appendChild(divTitle);
  noteContent.appendChild(noteDescription);
  noteInfo.appendChild(noteContent);
  notesInfo.appendChild(noteInfo);
}

function showNotesInfo(notes) {
  notesInfo.innerHTML = "";

  notes.forEach((note) => {
    showNoteInfo(note);
  });
}

openAddModalBtn.addEventListener("click", () => {
  addForm.reset();
  addModal.showModal();
});

addForm.addEventListener("submit", (event) => {
  event.preventDefault();

  let title = addForm.querySelector("#add-note-title");
  let description = addForm.querySelector("#add-note-description");

  notesList.push({
    title: title.value,
    description: description.value,
  });

  addModal.close();

  showNotesInfo(notesList);
});

addModal.querySelector("#close-modal").addEventListener("click", () => {
  addModal.close();
});

editForm.addEventListener("submit", (event) => {
  event.preventDefault();

  let index = editModal.getAttribute("data-note-index");
  let title = editForm.querySelector("#edit-note-title");
  let description = editForm.querySelector("#edit-note-description");

  notesList[index] = {
    title: title.value,
    description: description.value,
  };

  editModal.close();

  showNotesInfo(notesList);
});

editModal.querySelector("#close-modal").addEventListener("click", () => {
  editModal.close();
});
