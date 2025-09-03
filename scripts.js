/**
 * Scripts pour EDS Services
 * Gestion du menu, modals, calculs, et formulaire avec upload Cloudinary
 * Netlify Forms ne sauvegarde pas les fichiers uploadés, donc nous utilisons Cloudinary
 * pour uploader l'image et envoyer l'URL dans un champ caché
 * Documentation: https://cloudinary.com/documentation/upload_images
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
    
    // Gestion de la soumission des formulaires
    initForms();
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

// Initialisation des formulaires
function initForms() {
    // Formulaire de commande
    const orderForm = document.querySelector('form[name="order-form"]');
    if (orderForm) {
        orderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validation basique
            if (!validateForm(this)) return;
            
            // Upload du screenshot si fourni
            const fileInput = this.querySelector('input[type="file"]');
            if (fileInput && fileInput.files.length > 0) {
                // Upload vers Cloudinary avant soumission
                uploadToCloudinary(fileInput.files[0])
                    .then(url => {
                        // Ajouter l'URL au formulaire
                        addHiddenField(this, 'screenshot_url', url);
                        // Soumettre le formulaire
                        this.submit();
                    })
                    .catch(error => {
                        alert('Erreur lors de l\'upload de l\'image: ' + error);
                    });
            } else {
                // Soumettre sans image
                this.submit();
            }
        });
    }
    
    // Formulaire de contact
    const contactForm = document.querySelector('form[name="contact-form"]');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            if (!validateForm(this)) {
                e.preventDefault();
            }
        });
    }
    
    // Formulaire de problème
    const problemForm = document.querySelector('form[name="problem-form"]');
    if (problemForm) {
        problemForm.addEventListener('submit', function(e) {
            if (!validateForm(this)) {
                e.preventDefault();
            }
        });
    }
}

// Validation de formulaire
function validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.style.borderColor = 'red';
            
            // Réinitialiser le style après un moment
            setTimeout(() => {
                input.style.borderColor = '';
            }, 3000);
        }
    });
    
    // Validation du fichier (taille max 8MB)
    const fileInput = form.querySelector('input[type="file"]');
    if (fileInput && fileInput.files.length > 0) {
        const file = fileInput.files[0];
        if (file.size > 8 * 1024 * 1024) {
            alert('Le fichier ne doit pas dépasser 8MB');
            isValid = false;
        }
    }
    
    return isValid;
}

// Upload vers Cloudinary
function uploadToCloudinary(file) {
    return new Promise((resolve, reject) => {
        // Configuration Cloudinary - À REMPLACER avec vos propres credentials
        const cloudName = 'votre_cloud_name';
        const uploadPreset = 'votre_upload_preset';
        
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', uploadPreset);
        
        fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.secure_url) {
                resolve(data.secure_url);
            } else {
                reject('Erreur lors de l\'upload');
            }
        })
        .catch(error => {
            reject(error);
        });
    });
}

// Ajouter un champ caché au formulaire
function addHiddenField(form, name, value) {
    let input = form.querySelector(`input[name="${name}"]`);
    if (!input) {
        input = document.createElement('input');
        input.type = 'hidden';
        input.name = name;
        form.appendChild(input);
    }
    input.value = value;
}