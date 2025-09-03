/**
 * Scripts pour EDS Services
 * Gestion du menu, modals, calculs, et formulaire
 */

// Constantes pour les calculs de prix
const IG_RATE = 1.5; // Prix par follower Instagram
const TT_RATE = 2.1; // Prix par follower TikTok
const FF_RATE = 1.9; // Prix par diamant Free Fire

// Initialisation au chargement du document
document.addEventListener('DOMContentLoaded', function() {
    // Mise à jour de l'année dans le footer
    document.getElementById('year').textContent = new Date().getFullYear();
    
    // Gestion du menu mobile
    initMenu();
    
    // Initialisation des modals
    initModals();
    
    // Initialisation des calculatrices de prix
    initCalculators();
});

// Gestion du menu mobile
function initMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('#main-menu');
    
    if (menuToggle && menu) {
        menuToggle.addEventListener('click', function() {
            const expanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !expanded);
            menu.setAttribute('aria-hidden', expanded);
        });
        
        // Fermer le menu en cliquant à l'extérieur
        document.addEventListener('click', function(event) {
            if (!menu.contains(event.target) && event.target !== menuToggle) {
                menuToggle.setAttribute('aria-expanded', 'false');
                menu.setAttribute('aria-hidden', 'true');
            }
        });
    }
}

// Initialisation des modals
function initModals() {
    const modal = document.querySelector('.modal');
    if (!modal) return;
    
    // Bouton de fermeture
    const closeBtn = modal.querySelector('.modal-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.setAttribute('aria-hidden', 'true');
        });
    }
    
    // Fermer le modal en cliquant à l'extérieur
    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.setAttribute('aria-hidden', 'true');
        }
    });
}

// Ouvrir un modal de commande
function openOrderModal(service, defaultQuantity = 1) {
    const modal = document.querySelector('.modal');
    if (!modal) return;
    
    // Pré-remplir les champs
    const serviceField = modal.querySelector('input[name="service"]');
    const quantityField = modal.querySelector('input[name="quantite"]');
    
    if (serviceField) serviceField.value = service;
    if (quantityField) quantityField.value = defaultQuantity;
    
    // Ouvrir le modal
    modal.setAttribute('aria-hidden', 'false');
    
    // Donner le focus au premier champ
    const firstInput = modal.querySelector('input, select, textarea');
    if (firstInput) firstInput.focus();
}

// Initialisation des calculatrices de prix
function initCalculators() {
    // Calculatrice Instagram
    const igInput = document.querySelector('.ig-calculator input');
    if (igInput) {
        igInput.addEventListener('input', function() {
            calculatePrice(this, IG_RATE, '.ig-result');
        });
    }
    
    // Calculatrice TikTok
    const ttInput = document.querySelector('.tt-calculator input');
    if (ttInput) {
        ttInput.addEventListener('input', function() {
            calculatePrice(this, TT_RATE, '.tt-result');
        });
    }
    
    // Calculatrice Free Fire
    const ffInput = document.querySelector('.ff-calculator input');
    if (ffInput) {
        ffInput.addEventListener('input', function() {
            calculatePrice(this, FF_RATE, '.ff-result');
        });
    }
}

// Calcul du prix en fonction de la quantité
function calculatePrice(input, rate, resultSelector) {
    const quantity = parseInt(input.value) || 0;
    const resultElement = document.querySelector(resultSelector);
    
    if (!resultElement) return;
    
    if (quantity <= 0) {
        resultElement.textContent = 'Veuillez entrer une quantité valide (min. 1)';
        return;
    }
    
    const price = Math.round(quantity * rate);
    resultElement.textContent = `Prix: ${price} gourdes`;
}
