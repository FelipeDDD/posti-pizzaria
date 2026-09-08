const soroBlog = document.getElementById("soro-blog");
const visibleArticles = 6;

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
    card.style.display = index < visibleArticles ? "" : "none";
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
        shouldExpand || index < visibleArticles ? "" : "none";
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

observer.observe(soroBlog, {
  childList: true,
  subtree: true,
});

updateSoroBlog();
