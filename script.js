// 1. DÉCLARATION DES VARIABLES
const modal = document.getElementById("modal-produit");
const btnFermer = document.getElementById("btn-fermer");
const cartes = document.querySelectorAll(".carte");
const barreRecherche = document.getElementById("input-recherche");

// Variables des éléments DANS la modale
const modalTitre = document.getElementById("modal-titre");
const modalDescription = document.getElementById("modal-description");
const modalImage = document.getElementById("modal-image");
const btnPrev = document.getElementById("modal-prev");
const btnNext = document.getElementById("modal-next");

let imagesActuelles = [];
let indexImageActuelle = 0;

// 2. LOGIQUE D'OUVERTURE & CARROUSEL
cartes.forEach(function(carte) {
    carte.addEventListener("click", function() {
        const titreCarte = carte.querySelector("h3").innerText;
        const descCarte = carte.querySelector("p").innerText;
        
        // Récupération des images multiples (attribut data-images) ou repli sur l'image unique
        const imagesAttr = carte.getAttribute("data-images");
        if (imagesAttr) {
            imagesActuelles = imagesAttr.split(",").map(img => img.trim());
        } else {
            imagesActuelles = [carte.querySelector("img").src];
        }
        
        indexImageActuelle = 0;

        // Écriture dans la modale
        modalTitre.innerText = titreCarte;
        modalDescription.innerText = descCarte;
        modalImage.src = imagesActuelles[indexImageActuelle];

        // Affichage ou non des flèches selon le nombre d'images
        if (btnPrev && btnNext) {
            const displayStyle = imagesActuelles.length > 1 ? "block" : "none";
            btnPrev.style.display = displayStyle;
            btnNext.style.display = displayStyle;
        }

        modal.style.display = "flex";
    });
});

// Gestion des boutons Suivant / Précédent du carrousel
if (btnNext && btnPrev) {
    btnNext.addEventListener("click", function() {
        indexImageActuelle = (indexImageActuelle + 1) % imagesActuelles.length;
        modalImage.src = imagesActuelles[indexImageActuelle];
    });

    btnPrev.addEventListener("click", function() {
        indexImageActuelle = (indexImageActuelle - 1 + imagesActuelles.length) % imagesActuelles.length;
        modalImage.src = imagesActuelles[indexImageActuelle];
    });
}

// 3. LOGIQUE DE FERMETURE
if (btnFermer) {
    btnFermer.addEventListener("click", function() {
        modal.style.display = "none";
    });
}

window.addEventListener("click", function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});

// 4. BARRE DE RECHERCHE EN TEMPS RÉEL
if (barreRecherche) {
    barreRecherche.addEventListener("input", function() {
        const recherche = barreRecherche.value.toLowerCase().trim();

        cartes.forEach(function(carte) {
            const titre = carte.querySelector("h3").innerText.toLowerCase();
            const description = carte.querySelector("p").innerText.toLowerCase();

            if (titre.includes(recherche) || description.includes(recherche)) {
                carte.style.display = "block";
            } else {
                carte.style.display = "none";
            }
        });
    });
}