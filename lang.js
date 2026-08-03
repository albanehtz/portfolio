// lang.js — bascule FR / EN
// À inclure sur TOUTES les pages du site (juste avant </body>),
// avec un bouton <button id="lang-toggle" class="nav-lang">EN</button> dans la nav.

(function () {
  const STORAGE_KEY = "site-lang";

  function applyLang(lang) {
    // Éléments texte simple : data-fr / data-en
    document.querySelectorAll("[data-fr][data-en]").forEach((el) => {
      el.textContent = lang === "en" ? el.dataset.en : el.dataset.fr;
    });

    // Éléments avec mise en forme interne (ex: <br>) : data-fr-html / data-en-html
    document.querySelectorAll("[data-fr-html][data-en-html]").forEach((el) => {
      el.innerHTML = lang === "en" ? el.dataset.enHtml : el.dataset.frHtml;
    });

    // Met à jour <html lang="...">
    document.documentElement.setAttribute("lang", lang);

    // Met à jour le bouton lui-même (il affiche la langue vers laquelle basculer)
    const btn = document.getElementById("lang-toggle");
    if (btn) btn.textContent = lang === "en" ? "FR" : "EN";

    localStorage.setItem(STORAGE_KEY, lang);
  }

  // Langue au chargement : celle sauvegardée, sinon FR par défaut
  const savedLang = localStorage.getItem(STORAGE_KEY) || "fr";
  applyLang(savedLang);

  const btn = document.getElementById("lang-toggle");
  if (btn) {
    btn.addEventListener("click", () => {
      const current = localStorage.getItem(STORAGE_KEY) || "fr";
      applyLang(current === "fr" ? "en" : "fr");
    });
  }
})();
