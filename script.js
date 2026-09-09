const soroBlog = document.getElementById("soro-blog");
const mobileViewport = window.matchMedia("(max-width: 600px)");

function getVisibleArticles() {
  return mobileViewport.matches ? 3 : 6;
}

function updateSoroBlog() {
  if (!soroBlog) return;

  const cards = [...soroBlog.querySelectorAll(".soro-blog-card")];
  const oldButton = document.getElementById("soro-show-all");
  const backButton = document.getElementById("soro-back-to-articles");
  const isArticle = new URLSearchParams(window.location.search).has("post");

  // O artigo individual usa apenas o botão de retorno ao final do conteúdo.
  if (isArticle) {
    if (oldButton) oldButton.remove();

    if (!backButton) {
      const button = document.createElement("button");
      button.id = "soro-back-to-articles";
      button.type = "button";
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

  if (backButton) backButton.remove();

  // Ao carregar novamente a lista, volta ao limite da largura atual da tela.
  cards.forEach((card, index) => {
    card.style.display = index < getVisibleArticles() ? "" : "none";
  });

  if (oldButton) oldButton.remove();

  const button = document.createElement("button");
  button.id = "soro-show-all";
  button.type = "button";
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
        button.scrollIntoView({ behavior: "smooth", block: "center" });
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
  if (!soroBlog) return;
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
