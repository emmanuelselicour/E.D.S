/* ========== MENU TOGGLE ========== */
const menuToggle = document.getElementById("menuToggle");
const menuPanel = document.getElementById("menuPanel");

menuToggle.addEventListener("click", () => {
  const expanded = menuToggle.getAttribute("aria-expanded") === "true" || false;
  menuToggle.setAttribute("aria-expanded", !expanded);
  menuPanel.classList.toggle("active");
});

/* Close menu si itilizatè klike deyò */
document.addEventListener("click", (e) => {
  if (!menuPanel.contains(e.target) && !menuToggle.contains(e.target)) {
    menuPanel.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", false);
  }
});

/* ========== MODAL MERCI ========== */
const modal = document.getElementById("merciModal");
const closeBtns = modal.querySelectorAll("[data-close-modal]");

closeBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    modal.classList.remove("active");
    const goto = btn.getAttribute("data-goto");
    if (goto) {
      window.location.href = goto;
    }
  });
});

/* Ouvri modal otomatik si sou paj “merci.html” */
if (window.location.pathname.includes("merci.html")) {
  modal.classList.add("active");
}

/* ========== FOOTER YEAR DYNAMIQUE ========== */
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

/* ========== CALCULATEUR PRIX (Pou Instagram/TikTok/FreeFire) ==========
   Yo ka ajoute sa sou services.html si ou vle dinamik kalkil prix la
   Exemple:
   - instagram: 1000 followers = 1500 gourdes
   - tiktok: 1000 followers = 2100 gourdes
   - freefire: 100 diamants = 190 gourdes
   Fonksyon yo ka rele sou input onchange
============================================================= */
function calculPrixInstagram(qte) {
  const prixUnitaire = 1500 / 1000; // prix par follower
  return Math.ceil(qte * prixUnitaire);
}

function calculPrixTikTok(qte) {
  const prixUnitaire = 2100 / 1000; // prix par follower
  return Math.ceil(qte * prixUnitaire);
}

function calculPrixFreeFire(qte) {
  const prixUnitaire = 190 / 100; // prix par diamant
  return Math.ceil(qte * prixUnitaire);
}

/* Si w vle, nou ka fè l'affichage automatique sou services.html ak event listener */   