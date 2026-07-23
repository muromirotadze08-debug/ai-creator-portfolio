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
        const tools = (project.tools || [])
          .slice(0, 5)
          .map((tool) => `<span>${escapeText(tool)}</span>`)
          .join("");
        const carouselPreview = (project.carouselSlides || [])
          .slice(0, 4)
          .map(
            (slide) => `
              <span class="carousel-mini-slide">
                <span>${escapeText(slide.label)}</span>
                <strong>${escapeText(slide.title)}</strong>
              </span>
            `,
          )
          .join("");
        return `
          <button class="project-card" type="button" data-project-index="${index}">
            <span class="project-mark">${number}</span>
            <span class="project-body">
              <span class="project-meta">${escapeText(project.category)}</span>
              <h3>${escapeText(project.title)}</h3>
              <p>${escapeText(project.summary)}</p>
              ${carouselPreview ? `<span class="carousel-mini">${carouselPreview}</span>` : ""}
              ${tools ? `<span class="tool-strip">${tools}</span>` : ""}
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
    const tools = (project.tools || [])
      .map((tool) => `<span>${escapeText(tool)}</span>`)
      .join("");
    const carouselSlides = (project.carouselSlides || [])
      .map(
        (slide) => `
          <article class="carousel-slide">
            <span>${escapeText(slide.label)}</span>
            <h3>${escapeText(slide.title)}</h3>
            <p>${escapeText(slide.text)}</p>
          </article>
        `,
      )
      .join("");
    const carouselImages = (project.carouselImages || [])
      .map(
        (image) => `
          <figure class="dialog-carousel-image">
            <img src="${escapeText(image.src)}" alt="${escapeText(image.alt)}" />
          </figure>
        `,
      )
      .join("");
    const mediaClass =
      project.media && project.media.orientation === "vertical"
        ? " dialog-media-vertical"
        : "";
    const media =
      project.media && project.media.type === "video"
        ? `
          <figure class="dialog-media${mediaClass}">
            <video
              src="${escapeText(project.media.src)}"
              poster="${escapeText(project.media.poster)}"
              controls
              playsinline
              aria-label="${escapeText(project.media.label || project.title)}"
            ></video>
          </figure>
        `
        : "";

    dialogBody.innerHTML = `
      <article class="dialog-content">
        <p class="eyebrow">${escapeText(project.category)}</p>
        <h2 id="dialogTitle">${escapeText(project.title)}</h2>
        <p>${escapeText(project.summary)}</p>
        <p><strong>Результат:</strong> ${escapeText(project.result)}</p>
        ${media}
        ${carouselImages ? `<section class="dialog-carousel-images" aria-label="Готовые слайды карусели">${carouselImages}</section>` : ""}
        ${carouselSlides ? `<section class="carousel-showcase" aria-label="Визуальный пример карусели">${carouselSlides}</section>` : ""}
        ${tools ? `<div class="dialog-tools" aria-label="Инструменты">${tools}</div>` : ""}
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
