// Všetky obrázky v galérii
const galleryItems = document.querySelectorAll('.gallery-item img');
let currentIndex = 0; // Sledovanie aktuálneho obrázku

galleryItems.forEach((image, index) => {
    // Pri kliknutí na obrázok
    image.addEventListener('click', () => {
        currentIndex = index; // Nastavenie aktuálneho indexu
        openPopup(image.src, image.alt);
    });
});

// Funkcia na otvorenie pop-up okna
function openPopup(src, alt) {
    // Odstráni existujúce pop-up, ak už je otvorený
    const existingPopup = document.querySelector('.popup');
    if (existingPopup) existingPopup.remove();

    // Vytvorenie pop-up kontajnera
    const popUp = document.createElement('div');
    popUp.classList.add('popup');

    // Obrázok v pop-up
    const img = document.createElement('img');
    img.src = src;

    // Popis obrázku
    const details = document.createElement('p');
    details.classList.add('details');
    details.innerText = alt || ''; // Používa alt text na popis

    // Šípka doľava
    const leftArrow = document.createElement('div');
    leftArrow.classList.add('arrow', 'left-arrow');
    leftArrow.innerHTML = '&#9664;'; // Symbol šípky doľava
    leftArrow.addEventListener('click', () => navigateGallery(-1));

    // Šípka doprava
    const rightArrow = document.createElement('div');
    rightArrow.classList.add('arrow', 'right-arrow');
    rightArrow.innerHTML = '&#9654;'; // Symbol šípky doprava
    rightArrow.addEventListener('click', () => navigateGallery(1));

    // Pridanie všetkého do pop-upu
    popUp.appendChild(leftArrow);
    popUp.appendChild(img);
    popUp.appendChild(details);
    popUp.appendChild(rightArrow);
    document.body.appendChild(popUp);

    // Zatvorenie pop-up kliknutím na pozadie
    popUp.addEventListener('click', (e) => {
        if (e.target === popUp) popUp.remove();
    });
}

// Funkcia na navigáciu galérie (šípky)
function navigateGallery(direction) {
    currentIndex = (currentIndex + direction + galleryItems.length) % galleryItems.length;
    const newImage = galleryItems[currentIndex];
    const popUp = document.querySelector('.popup');
    const img = popUp.querySelector('img');
    const details = popUp.querySelector('.details');

    img.src = newImage.src;
    details.innerText = newImage.alt || '';
}

// Efekt pri prechode kurzora na obrázky
galleryItems.forEach((image) => {
    image.addEventListener('mouseover', () => {
        image.style.filter = 'brightness(70%)';
    });
    image.addEventListener('mouseout', () => {
        image.style.filter = 'brightness(100%)';
    });
});
