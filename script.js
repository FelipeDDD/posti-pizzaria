const soroBlog = document.getElementById("soro-blog");
const designPreview = new URLSearchParams(window.location.search).get("design");
const mobileViewport = window.matchMedia("(max-width: 600px)");

// Comparação temporária, ativada somente pelos links de prévia.
if (designPreview === "final" || designPreview === "compacto") {
  const articlesSection = document.querySelector(".artigos_section");
  const contactSection = document.getElementById("localizacao")?.closest(".centralizer");

  if (designPreview === "final" && articlesSection && contactSection) {
    contactSection.insertAdjacentElement("afterend", articlesSection);
    articlesSection.classList.add("artigos_section--final");
  }

  const previewNav = document.createElement("nav");
  previewNav.className = "design-preview";
  previewNav.setAttribute("aria-label", "Comparar versões do site");

  const label = document.createElement("strong");
  label.textContent = "Comparar versões:";
  previewNav.appendChild(label);

  [
    ["final", "Artigos no final"],
    ["compacto", "Posição atual · 3 no celular"],
    [null, "Original"],
  ].forEach(([design, text]) => {
    const url = new URL(window.location.href);
    if (design) url.searchParams.set("design", design);
    else url.searchParams.delete("design");
    url.searchParams.delete("post");
    url.hash = "";

    const link = document.createElement("a");
    link.href = url.toString();
    link.textContent = text;
    if (design === designPreview) link.setAttribute("aria-current", "page");
    previewNav.appendChild(link);
  });

  document.body.prepend(previewNav);
}

function getVisibleArticles() {
  return designPreview === "compacto" && mobileViewport.matches ? 3 : 6;
}

function updateSoroBlog() {
  if (!soroBlog) return;

  const cards = [...soroBlog.querySelectorAll(".soro-blog-card")];
  const oldButton = document.getElementById("soro-show-all");
  const backButton = document.getElementById("soro-back-to-articles");
  const isArticle = new URLSearchParams(window.location.search).has("post");

  // Estamos dentro de um artigo, não na lista
  if (isArticle) {
  if (oldButton) {
    oldButton.remove();
  }

  if (!backButton) {
    const button = document.createElement("button");

    button.id = "soro-back-to-articles";
    button.textContent = "Voltar aos artigos";

    button.addEventListener("click", () => {
  const url = new URL(window.location.href);

  url.searchParams.delete("post");
  url.hash = "soro-blog";

  window.location.href = url.toString();
});

    soroBlog.insertAdjacentElement("afterend", button);
  }

  return;
}

if (backButton) {
  backButton.remove();
}

  // Sempre volta para o estado inicial quando a lista é carregada novamente
  cards.forEach((card, index) => {
    card.style.display = index < getVisibleArticles() ? "" : "none";
  });

  if (oldButton) {
    oldButton.remove();
  }

  const button = document.createElement("button");

  button.id = "soro-show-all";
  button.textContent = "Ver todos os artigos";
  button.dataset.expanded = "false";

  button.addEventListener("click", () => {
    const currentCards = [...soroBlog.querySelectorAll(".soro-blog-card")];

    const shouldExpand = button.dataset.expanded !== "true";

    currentCards.forEach((card, index) => {
      card.style.display =
        shouldExpand || index < getVisibleArticles() ? "" : "none";
    });

    button.dataset.expanded = shouldExpand ? "true" : "false";

    button.textContent = shouldExpand
      ? "Mostrar menos"
      : "Ver todos os artigos";

    if (!shouldExpand) {
      requestAnimationFrame(() => {
        button.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      });
    }
  });

  soroBlog.insertAdjacentElement("afterend", button);
}

const observer = new MutationObserver(() => {
  updateSoroBlog();
});

// Ao girar o celular ou redimensionar, mantém a escolha de expandir a lista.
mobileViewport.addEventListener("change", () => {
  if (designPreview !== "compacto" || !soroBlog) return;
  if (new URLSearchParams(window.location.search).has("post")) return;

  const expanded = document.getElementById("soro-show-all")?.dataset.expanded === "true";
  soroBlog.querySelectorAll(".soro-blog-card").forEach((card, index) => {
    card.style.display = expanded || index < getVisibleArticles() ? "" : "none";
  });
});

if (soroBlog) {
  observer.observe(soroBlog, {
    childList: true,
    subtree: true,
  });
}

updateSoroBlog();
