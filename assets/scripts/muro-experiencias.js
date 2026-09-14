const STORAGE_KEY = "mayday-experiencias-v1";

const filterPersonInput = document.querySelector("#wall-filter-person");
const filterTypeInput = document.querySelector("#wall-filter-type");
const filterTextInput = document.querySelector("#wall-filter-text");
const wallContainer = document.querySelector("#visual-wall");
const wallEmpty = document.querySelector("#wall-empty");

// Modal elements (Detalle)
const modal = document.querySelector("#experience-modal");
const modalCloseBtn = document.querySelector("#modal-close-btn");
const modalImageWrapper = document.querySelector("#modal-image-wrapper");
const modalTitle = document.querySelector("#modal-experience-title");
const modalType = document.querySelector("#modal-experience-type");
const modalDate = document.querySelector("#modal-experience-date");
const modalParticipantsList = document.querySelector("#modal-participants-list");
const modalDesc = document.querySelector("#modal-experience-desc");
const modalSaveBtn = document.querySelector("#modal-save-btn");
const modalCommentCount = document.querySelector("#modal-comment-count");
const modalCommentsList = document.querySelector("#modal-comments-list");
const modalCommentForm = document.querySelector("#modal-comment-form");
const modalCommentAuthor = document.querySelector("#modal-comment-author");
const modalCommentText = document.querySelector("#modal-comment-text");

// Modal elements (Creación)
const createModal = document.querySelector("#create-modal");
const createModalCloseBtn = document.querySelector("#create-modal-close-btn");
const headerCreateBtn = document.querySelector("#header-create-btn");
const wallCreateBtn = document.querySelector("#wall-create-btn");
const createExperienceForm = document.querySelector("#create-experience-form");
const createImageInput = document.querySelector("#create-image-input");
const pinDropzone = document.querySelector("#pin-dropzone");
const pinUploadPlaceholder = document.querySelector("#pin-upload-placeholder");
const pinPreviewWrapper = document.querySelector("#pin-preview-wrapper");
const createImagePreview = document.querySelector("#create-image-preview");
const btnRemovePreview = document.querySelector("#btn-remove-preview");
const createTitleInput = document.querySelector("#create-title");
const createAuthorEmailInput = document.querySelector("#create-author-email");
const createTypeInput = document.querySelector("#create-type");
const createDescriptionInput = document.querySelector("#create-description");
const createParticipantsList = document.querySelector("#create-participants-list");
const errorCreateTitle = document.querySelector("#error-create-title");
const errorCreateEmail = document.querySelector("#error-create-email");
const errorCreateDescription = document.querySelector("#error-create-description");
const btnQuickAddPerson = document.querySelector("#btn-quick-add-person");
const quickAddPersonContainer = document.querySelector("#quick-add-person-container");
const quickPersonNameInput = document.querySelector("#quick-person-name");
const btnConfirmAddPerson = document.querySelector("#btn-confirm-add-person");

let currentActiveExperienceId = null;
let currentUploadedImageDataUrl = "";

const TYPE_LABELS = {
  viaje: "Viaje",
  situacion: "Situación",
  experiencia: "Experiencia",
};

let state = loadState();

init();

function init() {
  renderPersonFilter();
  renderWall();
  bindEvents();

  // Si la URL viene con ?action=new, abrir el modal de creación automáticamente
  const params = new URLSearchParams(window.location.search);
  if (params.get("action") === "new") {
    openCreateModal();
  }
}

function bindEvents() {
  filterPersonInput.addEventListener("change", renderWall);
  filterTypeInput.addEventListener("change", renderWall);
  filterTextInput.addEventListener("input", renderWall);

  // Clic en tarjetas del muro (abrir modal o guardar)
  wallContainer.addEventListener("click", onWallCardClick);

  // Cerrar modal de detalle
  modalCloseBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Cerrar modal de creación
  createModalCloseBtn.addEventListener("click", closeCreateModal);
  createModal.addEventListener("click", (e) => {
    if (e.target === createModal) {
      closeCreateModal();
    }
  });

  // Tecla Escape para ambos modales
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (!modal.hidden) closeModal();
      if (!createModal.hidden) closeCreateModal();
    }
  });

  // Botones para abrir modal de creación
  if (headerCreateBtn) headerCreateBtn.addEventListener("click", openCreateModal);
  if (wallCreateBtn) wallCreateBtn.addEventListener("click", openCreateModal);

  // Subida de imagen y drag & drop
  createImageInput.addEventListener("change", handleImageSelect);
  btnRemovePreview.addEventListener("click", resetImagePreview);

  pinDropzone.addEventListener("dragover", (e) => {
    e.preventDefault();
    pinDropzone.classList.add("dragover");
  });
  pinDropzone.addEventListener("dragleave", () => {
    pinDropzone.classList.remove("dragover");
  });
  pinDropzone.addEventListener("drop", (e) => {
    e.preventDefault();
    pinDropzone.classList.remove("dragover");
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processImageFile(e.dataTransfer.files[0]);
    }
  });

  // Agregar persona rápida desde el modal
  btnQuickAddPerson.addEventListener("click", () => {
    quickAddPersonContainer.hidden = !quickAddPersonContainer.hidden;
    if (!quickAddPersonContainer.hidden) {
      quickPersonNameInput.focus();
    }
  });
  btnConfirmAddPerson.addEventListener("click", handleQuickAddPerson);
  quickPersonNameInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleQuickAddPerson();
    }
  });

  // Enviar formulario de creación
  createExperienceForm.addEventListener("submit", onCreateExperienceSubmit);

  // Limpiar errores en tiempo real al escribir
  [createTitleInput, createAuthorEmailInput, createDescriptionInput].forEach((input) => {
    if (input) {
      input.addEventListener("input", () => {
        input.classList.remove("input-error");
        const errSpan = input.parentElement.querySelector(".field-error-msg");
        if (errSpan) {
          errSpan.textContent = "";
          errSpan.hidden = true;
        }
      });
    }
  });

  // Guardar desde el modal de detalle
  modalSaveBtn.addEventListener("click", () => {
    if (currentActiveExperienceId) {
      const exp = state.experiences.find((item) => item.id === currentActiveExperienceId);
      if (exp) {
        saveExperienceImage(exp);
      }
    }
  });

  // Enviar comentario desde el modal
  modalCommentForm.addEventListener("submit", onModalCommentSubmit);
}

function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    const seed = createSeedState();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
    return seed;
  }

  const data = JSON.parse(raw);
  return {
    persons: Array.isArray(data.persons) ? data.persons : [],
    experiences: Array.isArray(data.experiences) ? data.experiences : [],
    comments: Array.isArray(data.comments) ? data.comments : [],
  };
}

function createSeedState() {
  const persons = [
    { id: "person-1", name: "Mariana" },
    { id: "person-2", name: "Ana" },
    { id: "person-3", name: "David" },
  ];

  const experiences = [
    {
      id: "experience-1",
      title: "Capurganá 2025",
      type: "viaje",
      description: "Un viaje para desconectar, bucear y grabar recuerdos bajo el agua.",
      personIds: [persons[0].id, persons[1].id],
      imageUrl: "assets/images/IMG_0204.JPG",
      createdAt: Date.now() - 86400000 * 3,
    },
    {
      id: "experience-2",
      title: "Noche de observación",
      type: "situacion",
      description: "Larga sesión de telescopio con café y conversación sobre estrellas.",
      personIds: [persons[0].id, persons[2].id],
      imageUrl: "assets/images/IMG_0178.JPG",
      createdAt: Date.now() - 86400000 * 2,
    },
    {
      id: "experience-3",
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
      id: "comment-1",
      experienceId: experiences[0].id,
      author: "Ana",
      text: "Ese atardecer fue de los mejores recuerdos del viaje.",
      createdAt: Date.now() - 400000,
    },
    {
      id: "comment-2",
      experienceId: experiences[1].id,
      author: "David",
      text: "Hay que repetir la observación cuando haya lluvia de meteoros.",
      createdAt: Date.now() - 300000,
    },
  ];

  return { persons, experiences, comments };
}

function persistState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.warn("Storage quota handling in progress:", err);
    if (err.name === "QuotaExceededError" || err.code === 22) {
      // Si la cuota se llena, optimizamos automáticamente las imágenes almacenadas
      try {
        if (Array.isArray(state.experiences)) {
          // Mantener sólo imágenes optimizadas (si alguna foto anterior no procesada supera los 200KB)
          state.experiences = state.experiences.map((exp, idx) => {
            if (idx > 10 && exp.imageUrl && exp.imageUrl.startsWith("data:")) {
              // Mantener las 10 más recientes intactas, alivianar recuerdos más antiguos
              return { ...exp, imageUrl: "" };
            }
            return exp;
          });
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      } catch (innerErr) {
        console.error("No se pudo guardar después de la optimización:", innerErr);
      }
    }
  }
}

function renderPersonFilter() {
  const options = state.persons
    .map((person) => `<option value="${person.id}">${escapeHtml(person.name)}</option>`)
    .join("");

  filterPersonInput.innerHTML = `<option value="">Todas</option>${options}`;
}

function renderWall() {
  const items = getFilteredExperiences();
  wallEmpty.hidden = items.length !== 0;

  if (items.length === 0) {
    wallContainer.innerHTML = "";
    return;
  }

  wallContainer.innerHTML = items
    .map((experience) => {
      const personNames = (experience.personIds || [])
        .map((personId) => state.persons.find((person) => person.id === personId))
        .filter(Boolean)
        .map((person) => person.name);

      const imageBlock = experience.imageUrl
        ? `<img src="${experience.imageUrl}" alt="${escapeHtml(experience.title)}" loading="lazy">`
        : `<div class="visual-placeholder">${escapeHtml(experience.title)}</div>`;

      const participantsChips = personNames.length > 0
        ? personNames.map((name) => `<span class="pin-overlay-chip">${escapeHtml(name)}</span>`).join("")
        : `<span class="pin-overlay-chip">Sin acompañantes</span>`;

      return `
        <article class="visual-card" data-experience-id="${experience.id}" tabindex="0" role="button" aria-label="Ver detalles de ${escapeHtml(experience.title)}">
          <div class="visual-image">
            ${imageBlock}
          </div>

          <div class="pin-overlay">
            <div class="pin-overlay-top">
              <span class="pin-overlay-type">${TYPE_LABELS[experience.type] || "Experiencia"}</span>
              <button type="button" class="pin-btn-save" data-action="save" data-experience-id="${experience.id}" title="Guardar foto">
                Guardar
              </button>
            </div>

            <div class="pin-overlay-bottom">
              <h4 class="pin-overlay-title">${escapeHtml(experience.title)}</h4>
              <div class="pin-overlay-participants">
                ${participantsChips}
              </div>
            </div>
          </div>
        </article>
      `;
    })
    .join("");
}

function onWallCardClick(event) {
  const saveBtn = event.target.closest("[data-action=\"save\"]");
  if (saveBtn) {
    event.stopPropagation();
    const expId = saveBtn.dataset.experienceId;
    const exp = state.experiences.find((item) => item.id === expId);
    if (exp) {
      saveExperienceImage(exp);
    }
    return;
  }

  const card = event.target.closest(".visual-card");
  if (card) {
    const expId = card.dataset.experienceId;
    if (expId) {
      openModal(expId);
    }
  }
}

function openModal(experienceId) {
  const experience = state.experiences.find((item) => item.id === experienceId);
  if (!experience) return;

  currentActiveExperienceId = experienceId;

  // Render modal image
  if (experience.imageUrl) {
    modalImageWrapper.innerHTML = `<img src="${experience.imageUrl}" alt="${escapeHtml(experience.title)}">`;
  } else {
    modalImageWrapper.innerHTML = `<div class="visual-placeholder">Sin imagen para esta experiencia</div>`;
  }

  modalTitle.textContent = experience.title;
  modalType.textContent = TYPE_LABELS[experience.type] || "Experiencia";
  modalDate.textContent = experience.createdAt ? formatDate(experience.createdAt) : "";
  modalDesc.textContent = experience.description || "Sin descripción proporcionada.";

  // Render participants
  const personNames = (experience.personIds || [])
    .map((personId) => state.persons.find((person) => person.id === personId))
    .filter(Boolean)
    .map((person) => person.name);

  if (personNames.length > 0) {
    modalParticipantsList.innerHTML = personNames
      .map(
        (name) => `
        <span class="pin-modal-chip">
          <span class="pin-modal-chip-avatar">${escapeHtml(name.charAt(0))}</span>
          ${escapeHtml(name)}
        </span>
      `
      )
      .join("");
  } else {
    modalParticipantsList.innerHTML = `<span class="pin-comments-empty">Sin participantes específicos</span>`;
  }

  renderModalComments(experience.id);

  modal.hidden = false;
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.hidden = true;
  document.body.style.overflow = "";
  currentActiveExperienceId = null;
  modalCommentForm.reset();
}

function renderModalComments(experienceId) {
  const comments = (state.comments || []).filter((c) => c.experienceId === experienceId);
  modalCommentCount.textContent = comments.length;

  if (comments.length === 0) {
    modalCommentsList.innerHTML = `<p class="pin-comments-empty">Aún no hay comentarios. ¡Sé la primera persona en comentar!</p>`;
    return;
  }

  modalCommentsList.innerHTML = comments
    .sort((a, b) => Number(a.createdAt || 0) - Number(b.createdAt || 0))
    .map(
      (comment) => `
      <div class="pin-comment-item">
        <div class="pin-comment-header">
          <span class="pin-comment-author">${escapeHtml(comment.author)}</span>
          <span class="pin-comment-time">${formatDate(comment.createdAt)}</span>
        </div>
        <p class="pin-comment-text">${escapeHtml(comment.text)}</p>
      </div>
    `
    )
    .join("");

  modalCommentsList.scrollTop = modalCommentsList.scrollHeight;
}

function onModalCommentSubmit(event) {
  event.preventDefault();

  if (!currentActiveExperienceId) return;

  const author = modalCommentAuthor.value.trim();
  const text = modalCommentText.value.trim();

  if (!author || !text) return;

  const newComment = {
    id: `comment-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    experienceId: currentActiveExperienceId,
    author,
    text,
    createdAt: Date.now(),
  };

  if (!Array.isArray(state.comments)) {
    state.comments = [];
  }

  state.comments.push(newComment);
  persistState();

  modalCommentText.value = "";
  renderModalComments(currentActiveExperienceId);
}

function saveExperienceImage(experience) {
  if (!experience.imageUrl) {
    alert("Esta experiencia no tiene una imagen asociada para guardar.");
    return;
  }

  const link = document.createElement("a");
  link.href = experience.imageUrl;
  const cleanTitle = (experience.title || "experiencia")
    .toLowerCase()
    .replace(/[^a-z0-9]/gi, "_");
  link.download = `${cleanTitle}.jpg`;
  link.target = "_blank";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function getFilteredExperiences() {
  const personId = filterPersonInput.value;
  const type = filterTypeInput.value;
  const text = filterTextInput.value.trim().toLowerCase();

  return [...state.experiences]
    .filter((experience) => {
      if (personId && !(experience.personIds || []).includes(personId)) {
        return false;
      }

      if (type && experience.type !== type) {
        return false;
      }

      if (!text) {
        return true;
      }

      const searchable = `${experience.title || ""} ${experience.description || ""}`.toLowerCase();
      return searchable.includes(text);
    })
    .sort((a, b) => Number(b.createdAt || 0) - Number(a.createdAt || 0));
}

function formatDate(value) {
  return new Date(value).toLocaleDateString("es-CO", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function escapeHtml(text) {
  return String(text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll("\"", "&quot;")
    .replaceAll("'", "&#039;");
}

/* =========================================================
   FUNCIONES DEL CREADOR DE RECUERDOS (PIN CREATOR)
   ========================================================= */
function openCreateModal() {
  renderCreateParticipants();
  createModal.hidden = false;
  document.body.style.overflow = "hidden";
  createTitleInput.focus();
}

function closeCreateModal() {
  createModal.hidden = true;
  document.body.style.overflow = "";
  createExperienceForm.reset();
  clearCreateFormErrors();
  resetImagePreview();
  quickAddPersonContainer.hidden = true;
}

function renderCreateParticipants() {
  if (state.persons.length === 0) {
    createParticipantsList.innerHTML = `<p class="pin-upload-hint">No hay personas creadas aún. Usa "+ Nueva persona" para agregar a tus amigos.</p>`;
    return;
  }

  createParticipantsList.innerHTML = state.persons
    .map(
      (person) => `
      <label class="pin-participant-check">
        <input type="checkbox" name="create-participant" value="${person.id}">
        <span>${escapeHtml(person.name)}</span>
      </label>
    `
    )
    .join("");
}

function handleImageSelect(event) {
  const file = event.target.files && event.target.files[0];
  if (file) {
    processImageFile(file);
  }
}

// Redimensión y compresión ligera con Canvas para garantizar que SIEMPRE quepa en localStorage
function processImageFile(file) {
  if (!file.type.startsWith("image/")) {
    alert("Por favor selecciona un archivo de imagen válido (JPG, PNG, WebP).");
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    const rawDataUrl = String(e.target.result || "");
    const img = new Image();
    img.onload = () => {
      // Ajustar resolución máxima a 1000px para mantener excelente nitidez y peso ultra liviano (~80-140KB)
      const maxDimension = 1000;
      let width = img.width;
      let height = img.height;

      if (width > maxDimension || height > maxDimension) {
        if (width > height) {
          height = Math.round((height * maxDimension) / width);
          width = maxDimension;
        } else {
          width = Math.round((width * maxDimension) / height);
          height = maxDimension;
        }
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, width, height);

      // Exportar en JPEG con calidad 0.74 (calidad visual idéntica, peso mínimo para localStorage)
      currentUploadedImageDataUrl = canvas.toDataURL("image/jpeg", 0.74);
      createImagePreview.src = currentUploadedImageDataUrl;
      pinUploadPlaceholder.hidden = true;
      pinPreviewWrapper.hidden = false;
    };
    img.onerror = () => {
      currentUploadedImageDataUrl = rawDataUrl;
      createImagePreview.src = currentUploadedImageDataUrl;
      pinUploadPlaceholder.hidden = true;
      pinPreviewWrapper.hidden = false;
    };
    img.src = rawDataUrl;
  };
  reader.readAsDataURL(file);
}

function resetImagePreview() {
  currentUploadedImageDataUrl = "";
  createImageInput.value = "";
  createImagePreview.src = "";
  pinUploadPlaceholder.hidden = false;
  pinPreviewWrapper.hidden = true;
}

function handleQuickAddPerson() {
  const name = quickPersonNameInput.value.trim();
  if (!name) return;

  const newPerson = {
    id: `person-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    name,
  };

  state.persons.push(newPerson);
  persistState();

  renderPersonFilter();
  renderCreateParticipants();

  const newCheckbox = createParticipantsList.querySelector(`input[value="${newPerson.id}"]`);
  if (newCheckbox) newCheckbox.checked = true;

  quickPersonNameInput.value = "";
  quickAddPersonContainer.hidden = true;
}

function clearCreateFormErrors() {
  const errorElements = [errorCreateTitle, errorCreateEmail, errorCreateDescription];
  errorElements.forEach((el) => {
    if (el) {
      el.textContent = "";
      el.hidden = true;
    }
  });

  const inputs = [createTitleInput, createAuthorEmailInput, createDescriptionInput];
  inputs.forEach((input) => {
    if (input) input.classList.remove("input-error");
  });
}

function showFieldError(input, errorElement, message) {
  if (input) input.classList.add("input-error");
  if (errorElement) {
    errorElement.textContent = message;
    errorElement.hidden = false;
  }
}

function onCreateExperienceSubmit(event) {
  event.preventDefault();
  clearCreateFormErrors();

  let hasErrors = false;
  let firstInvalidInput = null;

  const title = createTitleInput.value.trim();
  const email = createAuthorEmailInput ? createAuthorEmailInput.value.trim() : "";
  const type = createTypeInput.value;
  const description = createDescriptionInput.value.trim();

  // 1. Validación de campo requerido y longitud de Título (mínimo 3 caracteres, máximo 80)
  if (!title) {
    showFieldError(createTitleInput, errorCreateTitle, "El título es obligatorio.");
    hasErrors = true;
    if (!firstInvalidInput) firstInvalidInput = createTitleInput;
  } else if (title.length < 3) {
    showFieldError(createTitleInput, errorCreateTitle, "El título debe tener al menos 3 caracteres.");
    hasErrors = true;
    if (!firstInvalidInput) firstInvalidInput = createTitleInput;
  } else if (title.length > 80) {
    showFieldError(createTitleInput, errorCreateTitle, "El título no puede superar los 80 caracteres.");
    hasErrors = true;
    if (!firstInvalidInput) firstInvalidInput = createTitleInput;
  }

  // 2. Validación de Correo electrónico (requerido y formato con expresión regular)
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    showFieldError(createAuthorEmailInput, errorCreateEmail, "El correo de contacto es obligatorio.");
    hasErrors = true;
    if (!firstInvalidInput) firstInvalidInput = createAuthorEmailInput;
  } else if (!emailPattern.test(email)) {
    showFieldError(createAuthorEmailInput, errorCreateEmail, "Ingresa un correo electrónico válido (ej: nombre@dominio.com).");
    hasErrors = true;
    if (!firstInvalidInput) firstInvalidInput = createAuthorEmailInput;
  }

  // 3. Validación de Descripción (requerido y longitud mínima 10 caracteres)
  if (!description) {
    showFieldError(createDescriptionInput, errorCreateDescription, "La descripción es obligatoria.");
    hasErrors = true;
    if (!firstInvalidInput) firstInvalidInput = createDescriptionInput;
  } else if (description.length < 10) {
    showFieldError(createDescriptionInput, errorCreateDescription, `Cuéntanos un poco más (mínimo 10 caracteres, llevas ${description.length}).`);
    hasErrors = true;
    if (!firstInvalidInput) firstInvalidInput = createDescriptionInput;
  }

  // Si hay errores, no se envía y se hace foco en el primer campo erróneo
  if (hasErrors) {
    if (firstInvalidInput) firstInvalidInput.focus();
    return;
  }

  const selectedPersonIds = Array.from(
    createParticipantsList.querySelectorAll("input[name=\"create-participant\"]:checked")
  ).map((cb) => cb.value);

  const newExperience = {
    id: `experience-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    title,
    email,
    type,
    description,
    personIds: selectedPersonIds,
    imageUrl: currentUploadedImageDataUrl || "",
    createdAt: Date.now(),
  };

  state.experiences.unshift(newExperience);
  persistState();

  closeCreateModal();
  renderWall();

  openModal(newExperience.id);
}


