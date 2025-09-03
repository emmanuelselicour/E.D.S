
## Installation et déploiement

1. Déposer tous les fichiers dans un repository GitHub
2. Se connecter à Netlify et choisir "New site from Git"
3. Sélectionner le repository et la branche main
4. Laisser les paramètres par défaut (build command: none, publish directory: root)
5. Cliquer sur "Deploy site"

## Configuration des formulaires Netlify

Netlify détectera automatiquement les formulaires avec l'attribut `data-netlify="true"`. Pour recevoir les soumissions par email:

1. Aller dans "Site settings" > "Forms" > "Form notifications"
2. Ajouter une notification email avec votre adresse

## Configuration de Cloudinary (optionnel)

Pour gérer l'upload des screenshots de preuve de paiement:

1. Créer un compte sur [Cloudinary](https://cloudinary.com/)
2. Récupérer votre `cloud_name` et créer un `upload_preset` non signé
3. Modifier le fichier `scripts.js` avec vos credentials:
   - Remplacez `votre_cloud_name` par votre cloud name Cloudinary
   - Remplacez `votre_upload_preset` par votre upload preset

## Modification des numéros de paiement

Pour modifier les numéros MonCash/NatCash affichés, éditez le fichier `services.html` et recherchez:

```html
<div class="payment-method">
    <img src="https://files.catbox.moe/788ew1.jpg" alt="MonCash">
    <span>+509-32311840</span>
</div>
<div class="payment-method">
    <img src="https://files.catbox.moe/v812y5.jpg" alt="NatCash">
    <span>+509-43895284</span>
</div>