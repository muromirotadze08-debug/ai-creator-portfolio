(function () {
  const config = window.portfolioConfig || { projects: [] };
  const grid = document.querySelector("#projectGrid");
  const dialog = document.querySelector("#projectDialog");
  const dialogBody = document.querySelector("#dialogBody");
  const closeButton = document.querySelector("#dialogClose");

  function escapeText(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function renderProjects() {
    grid.innerHTML = config.projects
      .map((project, index) => {
        const number = String(index + 1).padStart(2, "0");
        return `
          <button class="project-card" type="button" data-project-index="${index}">
            <span class="project-mark">${number}</span>
            <span class="project-body">
              <span class="project-meta">${escapeText(project.category)}</span>
              <h3>${escapeText(project.title)}</h3>
              <p>${escapeText(project.summary)}</p>
              <span class="project-open">Открыть кейс</span>
            </span>
          </button>
        `;
      })
      .join("");
  }

  function openProject(project) {
    const pipeline = project.pipeline
      .map((item) => `<li>${escapeText(item)}</li>`)
      .join("");

    dialogBody.innerHTML = `
      <article class="dialog-content">
        <p class="eyebrow">${escapeText(project.category)}</p>
        <h2 id="dialogTitle">${escapeText(project.title)}</h2>
        <p>${escapeText(project.summary)}</p>
        <p><strong>Результат:</strong> ${escapeText(project.result)}</p>
        <ul>${pipeline}</ul>
      </article>
    `;
    dialog.showModal();
  }

  grid.addEventListener("click", (event) => {
    const card = event.target.closest("[data-project-index]");
    if (!card) return;
    const project = config.projects[Number(card.dataset.projectIndex)];
    if (project) openProject(project);
  });

  closeButton.addEventListener("click", () => dialog.close());

  renderProjects();
})();
