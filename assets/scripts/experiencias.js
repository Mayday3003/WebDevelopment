const STORAGE_KEY = "mayday-experiencias-v1";

const personForm = document.querySelector("#person-form");
const personIdInput = document.querySelector("#person-id");
const personNameInput = document.querySelector("#person-name");
const errorPersonName = document.querySelector("#error-person-name");
const personCancelEditButton = document.querySelector("#person-cancel-edit");
const personList = document.querySelector("#person-list");

const experienceForm = document.querySelector("#experience-form");
const experienceIdInput = document.querySelector("#experience-id");
const experienceTitleInput = document.querySelector("#experience-title");
const errorExperienceTitle = document.querySelector("#error-experience-title");
const experienceTypeInput = document.querySelector("#experience-type");
const experienceDescriptionInput = document.querySelector("#experience-description");
const errorExperienceDescription = document.querySelector("#error-experience-description");
const experienceImageInput = document.querySelector("#experience-image");
const experienceRemoveImageInput = document.querySelector("#experience-remove-image");
const participantsOptions = document.querySelector("#participants-options");
const experienceCancelEditButton = document.querySelector("#experience-cancel-edit");

const filterPersonInput = document.querySelector("#filter-person");
const filterTypeInput = document.querySelector("#filter-type");
const filterTextInput = document.querySelector("#filter-text");

const experienceWall = document.querySelector("#experience-wall");
const experienceEmpty = document.querySelector("#experience-empty");

const TYPE_LABELS = {
  viaje: "Viaje",
  situacion: "Situación",
  experiencia: "Experiencia",
};

let state = loadState();

init();

function init() {
  renderAll();
  bindEvents();
}

function bindEvents() {
  personForm.addEventListener("submit", onPersonSubmit);
  personCancelEditButton.addEventListener("click", resetPersonForm);
  personList.addEventListener("click", onPersonListClick);

  experienceForm.addEventListener("submit", onExperienceSubmit);
  experienceCancelEditButton.addEventListener("click", resetExperienceForm);
  experienceWall.addEventListener("click", onExperienceWallClick);
  experienceWall.addEventListener("submit", onExperienceWallSubmit);

  filterPersonInput.addEventListener("change", renderExperienceWall);
  filterTypeInput.addEventListener("change", renderExperienceWall);
  filterTextInput.addEventListener("input", renderExperienceWall);

  // Limpiar errores en tiempo real al tipear
  [personNameInput, experienceTitleInput, experienceDescriptionInput].forEach((input) => {
    if (input) {
      input.addEventListener("input", () => {
        input.classList.remove("input-error");
        const errSpan = input.parentElement.querySelector(".field-error-msg") || input.nextElementSibling;
        if (errSpan && errSpan.classList && errSpan.classList.contains("field-error-msg")) {
          errSpan.textContent = "";
          errSpan.hidden = true;
        }
      });
    }
  });
}

function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) {
    return normalizeState(JSON.parse(raw));
  }
  return createSeedState();
}

function normalizeState(data) {
  return {
    persons: Array.isArray(data.persons) ? data.persons : [],
    experiences: Array.isArray(data.experiences)
      ? data.experiences.map((experience) => ({
          ...experience,
          personIds: Array.isArray(experience.personIds) ? experience.personIds : [],
          imageUrl: typeof experience.imageUrl === "string" ? experience.imageUrl : "",
        }))
      : [],
    comments: Array.isArray(data.comments) ? data.comments : [],
  };
}

function createSeedState() {
  const persons = [
    { id: uid("person"), name: "Mariana" },
    { id: uid("person"), name: "Ana" },
    { id: uid("person"), name: "David" },
  ];

  const experiences = [
    {
      id: uid("experience"),
      title: "Capurganá 2025",
      type: "viaje",
      description: "Un viaje para desconectar, bucear y grabar recuerdos bajo el agua.",
      personIds: [persons[0].id, persons[1].id],
      imageUrl: "assets/images/IMG_0204.JPG",
      createdAt: Date.now() - 86400000 * 3,
    },
    {
      id: uid("experience"),
      title: "Noche de observación",
      type: "situacion",
      description: "Larga sesión de telescopio con café y conversación sobre estrellas.",
      personIds: [persons[0].id, persons[2].id],
      imageUrl: "assets/images/IMG_0178.JPG",
      createdAt: Date.now() - 86400000 * 2,
    },
    {
      id: uid("experience"),
      title: "Feria de flores",
      type: "experiencia",
      description: "Color, música y recuerdos que siempre dan ganas de repetir.",
      personIds: [persons[0].id],
      imageUrl: "assets/images/feria.jpeg",
      createdAt: Date.now() - 86400000,
    },
  ];

  const comments = [
    {
      id: uid("comment"),
      experienceId: experiences[0].id,
      author: "Ana",
      text: "Ese atardecer fue de los mejores recuerdos del viaje.",
      createdAt: Date.now() - 400000,
    },
    {
      id: uid("comment"),
      experienceId: experiences[1].id,
      author: "David",
      text: "Hay que repetir la observación cuando haya lluvia de meteoros.",
      createdAt: Date.now() - 300000,
    },
  ];

  return { persons, experiences, comments };
}

function persistState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function renderAll() {
  renderPersonOptions();
  renderPersonFilter();
  renderPersonList();
  renderExperienceWall();
}

function renderPersonList() {
  if (state.persons.length === 0) {
    personList.innerHTML = "<li class=\"entity-item\"><p>No hay personas aún.</p></li>";
    return;
  }

  personList.innerHTML = state.persons
    .map(
      (person) => `
      <li class="entity-item">
        <p>${escapeHtml(person.name)}</p>
        <div class="entity-actions">
          <button type="button" data-action="edit-person" data-id="${person.id}">Editar</button>
          <button type="button" class="danger" data-action="delete-person" data-id="${person.id}">Eliminar</button>
        </div>
      </li>
    `
    )
    .join("");
}

function renderPersonOptions() {
  if (state.persons.length === 0) {
    participantsOptions.innerHTML = "<p>Primero crea al menos una persona.</p>";
    return;
  }

  const selectedIds = getSelectedParticipantIds();

  participantsOptions.innerHTML = state.persons
    .map((person) => {
      const checked = selectedIds.includes(person.id) ? "checked" : "";
      return `
        <div class="participant-option">
          <input type="checkbox" id="participant-${person.id}" value="${person.id}" ${checked}>
          <label for="participant-${person.id}">${escapeHtml(person.name)}</label>
        </div>
      `;
    })
    .join("");
}

function renderPersonFilter() {
  const current = filterPersonInput.value;
  const options = state.persons
    .map((person) => `<option value="${person.id}">${escapeHtml(person.name)}</option>`)
    .join("");

  filterPersonInput.innerHTML = `<option value="">Todas</option>${options}`;
  filterPersonInput.value = state.persons.some((person) => person.id === current) ? current : "";
}

function renderExperienceWall() {
  const filtered = getFilteredExperiences();

  experienceEmpty.hidden = filtered.length !== 0;

  if (filtered.length === 0) {
    experienceWall.innerHTML = "";
    return;
  }

  experienceWall.innerHTML = filtered
    .map((experience) => {
      const personNames = getExperiencePersonNames(experience);
      const comments = state.comments.filter((comment) => comment.experienceId === experience.id);

      return `
        <article class="experience-card">
          ${
            experience.imageUrl
              ? `<img class="experience-card-image" src="${experience.imageUrl}" alt="${escapeHtml(experience.title)}">`
              : ""
          }
          <h4>${escapeHtml(experience.title)}</h4>
          <span class="experience-meta">${TYPE_LABELS[experience.type]}</span>
          <p>${escapeHtml(experience.description)}</p>

          <div class="participants-chips">
            ${personNames.length > 0 ? personNames.map((name) => `<span>${escapeHtml(name)}</span>`).join("") : "<span>Sin participantes</span>"}
          </div>

          <div class="card-actions">
            <button type="button" data-action="edit-experience" data-id="${experience.id}">Editar</button>
            <button type="button" class="danger" data-action="delete-experience" data-id="${experience.id}">Eliminar</button>
          </div>

          <ul class="comment-list">
            ${comments.length > 0 ? comments.map(renderCommentItem).join("") : "<li class=\"comment-item\"><p>Sin comentarios por ahora.</p></li>"}
          </ul>

          <form class="comment-form" data-experience-id="${experience.id}">
            <input type="hidden" name="comment-id">
            <input type="text" name="author" placeholder="Tu nombre" required>
            <textarea name="text" rows="3" placeholder="Escribe tu comentario..." required></textarea>
            <div class="form-actions">
              <button type="submit">Guardar comentario</button>
              <button type="button" class="btn-alt" data-action="cancel-comment-edit" data-id="${experience.id}">Cancelar</button>
            </div>
          </form>
        </article>
      `;
    })
    .join("");
}

function getExperiencePersonNames(experience) {
  return experience.personIds
    .map((personId) => state.persons.find((person) => person.id === personId))
    .filter(Boolean)
    .map((person) => person.name);
}

function renderCommentItem(comment) {
  return `
    <li class="comment-item">
      <span class="comment-meta">${escapeHtml(comment.author)} · ${formatDate(comment.createdAt)}</span>
      <p>${escapeHtml(comment.text)}</p>
      <div class="comment-actions">
        <button type="button" data-action="edit-comment" data-id="${comment.id}">Editar</button>
        <button type="button" class="danger" data-action="delete-comment" data-id="${comment.id}">Eliminar</button>
      </div>
    </li>
  `;
}

function getFilteredExperiences() {
  const personId = filterPersonInput.value;
  const type = filterTypeInput.value;
  const text = filterTextInput.value.trim().toLowerCase();

  return [...state.experiences]
    .filter((experience) => {
      if (personId && !experience.personIds.includes(personId)) {
        return false;
      }

      if (type && experience.type !== type) {
        return false;
      }

      if (!text) {
        return true;
      }

      const searchable = `${experience.title} ${experience.description}`.toLowerCase();
      return searchable.includes(text);
    })
    .sort((a, b) => b.createdAt - a.createdAt);
}

function showFieldError(input, errorElement, message) {
  if (input) input.classList.add("input-error");
  if (errorElement) {
    errorElement.textContent = message;
    errorElement.hidden = false;
  }
}

function clearPersonErrors() {
  if (personNameInput) personNameInput.classList.remove("input-error");
  if (errorPersonName) {
    errorPersonName.textContent = "";
    errorPersonName.hidden = true;
  }
}

function clearExperienceErrors() {
  [experienceTitleInput, experienceDescriptionInput].forEach((input) => {
    if (input) input.classList.remove("input-error");
  });
  [errorExperienceTitle, errorExperienceDescription].forEach((el) => {
    if (el) {
      el.textContent = "";
      el.hidden = true;
    }
  });
}

function onPersonSubmit(event) {
  event.preventDefault();
  clearPersonErrors();

  const name = personNameInput.value.trim();
  const id = personIdInput.value;

  if (!name) {
    showFieldError(personNameInput, errorPersonName, "El nombre de la persona es obligatorio.");
    personNameInput.focus();
    return;
  }

  if (name.length < 2) {
    showFieldError(personNameInput, errorPersonName, "El nombre debe tener al menos 2 caracteres.");
    personNameInput.focus();
    return;
  }

  if (id) {
    const person = state.persons.find((item) => item.id === id);
    if (person) {
      person.name = name;
    }
  } else {
    state.persons.push({ id: uid("person"), name });
  }

  persistState();
  resetPersonForm();
  renderAll();
}

function onPersonListClick(event) {
  const target = event.target;
  if (!(target instanceof HTMLButtonElement)) {
    return;
  }

  const action = target.dataset.action;
  const id = target.dataset.id;
  if (!action || !id) {
    return;
  }

  if (action === "edit-person") {
    editPerson(id);
    return;
  }

  if (action === "delete-person") {
    deletePerson(id);
  }
}

function editPerson(id) {
  const person = state.persons.find((item) => item.id === id);
  if (!person) {
    return;
  }

  clearPersonErrors();
  personIdInput.value = person.id;
  personNameInput.value = person.name;
  personNameInput.focus();
}

function deletePerson(id) {
  state.persons = state.persons.filter((person) => person.id !== id);
  state.experiences = state.experiences.map((experience) => ({
    ...experience,
    personIds: experience.personIds.filter((personId) => personId !== id),
  }));

  persistState();
  renderAll();
}

function resetPersonForm() {
  clearPersonErrors();
  personIdInput.value = "";
  personForm.reset();
}

async function onExperienceSubmit(event) {
  event.preventDefault();
  clearExperienceErrors();

  let hasErrors = false;
  let firstInvalidInput = null;

  const id = experienceIdInput.value;
  const title = experienceTitleInput.value.trim();
  const description = experienceDescriptionInput.value.trim();
  const type = experienceTypeInput.value;
  const personIds = getSelectedParticipantIds();
  const removeImage = experienceRemoveImageInput.checked;
  const imageFile = experienceImageInput.files && experienceImageInput.files[0];

  // 1. Validación de Título (requerido y longitud mínima/máxima)
  if (!title) {
    showFieldError(experienceTitleInput, errorExperienceTitle, "El título es obligatorio.");
    hasErrors = true;
    if (!firstInvalidInput) firstInvalidInput = experienceTitleInput;
  } else if (title.length < 3) {
    showFieldError(experienceTitleInput, errorExperienceTitle, "El título debe tener al menos 3 caracteres.");
    hasErrors = true;
    if (!firstInvalidInput) firstInvalidInput = experienceTitleInput;
  } else if (title.length > 80) {
    showFieldError(experienceTitleInput, errorExperienceTitle, "El título no puede superar los 80 caracteres.");
    hasErrors = true;
    if (!firstInvalidInput) firstInvalidInput = experienceTitleInput;
  }

  // 2. Validación de Descripción (requerida y longitud mínima 10 caracteres)
  if (!description) {
    showFieldError(experienceDescriptionInput, errorExperienceDescription, "La descripción es obligatoria.");
    hasErrors = true;
    if (!firstInvalidInput) firstInvalidInput = experienceDescriptionInput;
  } else if (description.length < 10) {
    showFieldError(experienceDescriptionInput, errorExperienceDescription, `Describe un poco más (mínimo 10 caracteres, llevas ${description.length}).`);
    hasErrors = true;
    if (!firstInvalidInput) firstInvalidInput = experienceDescriptionInput;
  }

  if (hasErrors) {
    if (firstInvalidInput) firstInvalidInput.focus();
    return;
  }

  let uploadedImageUrl = "";
  if (imageFile) {
    uploadedImageUrl = await readFileAsDataUrl(imageFile);
  }

  if (id) {
    const experience = state.experiences.find((item) => item.id === id);
    if (experience) {
      experience.title = title;
      experience.description = description;
      experience.type = type;
      experience.personIds = personIds;
      if (removeImage) {
        experience.imageUrl = "";
      } else if (uploadedImageUrl) {
        experience.imageUrl = uploadedImageUrl;
      }
    }
  } else {
    state.experiences.push({
      id: uid("experience"),
      title,
      description,
      type,
      personIds,
      imageUrl: uploadedImageUrl,
      createdAt: Date.now(),
    });
  }

  persistState();
  resetExperienceForm();
  renderExperienceWall();
}

function getSelectedParticipantIds() {
  return Array.from(participantsOptions.querySelectorAll("input[type=\"checkbox\"]:checked")).map(
    (input) => input.value
  );
}

function resetExperienceForm() {
  clearExperienceErrors();
  experienceIdInput.value = "";
  experienceForm.reset();
  renderPersonOptions();
}

function onExperienceWallClick(event) {
  const target = event.target;
  if (!(target instanceof HTMLButtonElement)) {
    return;
  }

  const action = target.dataset.action;
  const id = target.dataset.id;
  if (!action || !id) {
    return;
  }

  if (action === "edit-experience") {
    editExperience(id);
    return;
  }

  if (action === "delete-experience") {
    deleteExperience(id);
    return;
  }

  if (action === "delete-comment") {
    deleteComment(id);
    return;
  }

  if (action === "edit-comment") {
    editComment(id);
    return;
  }

  if (action === "cancel-comment-edit") {
    resetCommentForm(id);
  }
}

function editExperience(id) {
  const experience = state.experiences.find((item) => item.id === id);
  if (!experience) {
    return;
  }

  experienceIdInput.value = experience.id;
  experienceTitleInput.value = experience.title;
  experienceDescriptionInput.value = experience.description;
  experienceTypeInput.value = experience.type;
  experienceRemoveImageInput.checked = false;
  renderPersonOptionsWithSelection(experience.personIds);
  experienceTitleInput.focus();
}

function renderPersonOptionsWithSelection(selectedIds) {
  if (state.persons.length === 0) {
    participantsOptions.innerHTML = "<p>Primero crea al menos una persona.</p>";
    return;
  }

  participantsOptions.innerHTML = state.persons
    .map((person) => {
      const checked = selectedIds.includes(person.id) ? "checked" : "";
      return `
        <div class="participant-option">
          <input type="checkbox" id="participant-${person.id}" value="${person.id}" ${checked}>
          <label for="participant-${person.id}">${escapeHtml(person.name)}</label>
        </div>
      `;
    })
    .join("");
}

function deleteExperience(id) {
  state.experiences = state.experiences.filter((experience) => experience.id !== id);
  state.comments = state.comments.filter((comment) => comment.experienceId !== id);
  persistState();
  renderExperienceWall();
}

function onExperienceWallSubmit(event) {
  const target = event.target;
  if (!(target instanceof HTMLFormElement) || !target.classList.contains("comment-form")) {
    return;
  }

  event.preventDefault();
  const experienceId = target.dataset.experienceId;
  const commentId = target.querySelector("input[name=\"comment-id\"]").value;
  const authorInput = target.querySelector("input[name=\"author\"]");
  const textInput = target.querySelector("textarea[name=\"text\"]");

  const author = authorInput.value.trim();
  const text = textInput.value.trim();

  if (!experienceId || !author || !text) {
    if (!author) {
      authorInput.focus();
      return;
    }

    textInput.focus();
    return;
  }

  if (commentId) {
    const comment = state.comments.find((item) => item.id === commentId);
    if (comment) {
      comment.author = author;
      comment.text = text;
    }
  } else {
    state.comments.push({
      id: uid("comment"),
      experienceId,
      author,
      text,
      createdAt: Date.now(),
    });
  }

  persistState();
  renderExperienceWall();
}

function deleteComment(id) {
  state.comments = state.comments.filter((comment) => comment.id !== id);
  persistState();
  renderExperienceWall();
}

function editComment(id) {
  const comment = state.comments.find((item) => item.id === id);
  if (!comment) {
    return;
  }

  const form = experienceWall.querySelector(`.comment-form[data-experience-id="${comment.experienceId}"]`);
  if (!form) {
    return;
  }

  form.querySelector("input[name=\"comment-id\"]").value = comment.id;
  form.querySelector("input[name=\"author\"]").value = comment.author;
  form.querySelector("textarea[name=\"text\"]").value = comment.text;
  form.querySelector("input[name=\"author\"]").focus();
}

function resetCommentForm(experienceId) {
  const form = experienceWall.querySelector(`.comment-form[data-experience-id="${experienceId}"]`);
  if (!form) {
    return;
  }

  form.reset();
  form.querySelector("input[name=\"comment-id\"]").value = "";
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

function uid(prefix) {
  const random = Math.random().toString(36).slice(2, 9);
  return `${prefix}-${Date.now()}-${random}`;
}

function formatDate(value) {
  return new Date(value).toLocaleDateString("es-CO", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function escapeHtml(text) {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll("\"", "&quot;")
    .replaceAll("'", "&#039;");
}
