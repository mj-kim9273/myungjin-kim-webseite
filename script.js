// Übersetzungen
const translations = {
    de: {
        subtitle: "Künstlerin · Malerin",
        navHome: "Home",
        navWorks: "Werke",
        navBio: "Biografie",
        navContact: "Kontakt",
        navWorksMain: "Werke",
        navBioMain: "Biografie",
        navContactMain: "Kontakt",
        worksTitle: "Meine Werke",
        paintings: "Gemälde",
        paintingsDesc: "Entdecken Sie meine Gemälde",
        drawings: "Zeichnungen",
        drawingsDesc: "Entdecken Sie meine Zeichnungen",
        bioTitle: "Biografie",
        firstName: "Vorname",
        lastName: "Nachname",
        birthPlace: "Geburtsort",
        studio: "Atelier",
        exhibitions: "Ausstellungen",
        education: "Schulbildung / Studium",
        contactTitle: "Kontakt",
        contactEmail: "E-Mail"
    },
    en: {
        subtitle: "Artist · Painter",
        navHome: "Home",
        navWorks: "Works",
        navBio: "Biography",
        navContact: "Contact",
        navWorksMain: "Works",
        navBioMain: "Biography",
        navContactMain: "Contact",
        worksTitle: "My Works",
        paintings: "Paintings",
        paintingsDesc: "Discover my paintings",
        drawings: "Drawings",
        drawingsDesc: "Discover my drawings",
        bioTitle: "Biography",
        firstName: "First Name",
        lastName: "Last Name",
        birthPlace: "Place of Birth",
        studio: "Studio",
        exhibitions: "Exhibitions",
        education: "Education",
        contactTitle: "Contact",
        contactEmail: "Email"
    },
    ko: {
        subtitle: "예술가 · 화가",
        navHome: "홈",
        navWorks: "작품",
        navBio: "약력",
        navContact: "연락처",
        navWorksMain: "작품",
        navBioMain: "약력",
        navContactMain: "연락처",
        worksTitle: "나의 작품",
        paintings: "그림",
        paintingsDesc: "나의 그림을 발견하세요",
        drawings: "드로잉",
        drawingsDesc: "나의 드로잉을 발견하세요",
        bioTitle: "약력",
        firstName: "이름",
        lastName: "성",
        birthPlace: "출생지",
        studio: "작업실",
        exhibitions: "전시회",
        education: "학력",
        contactTitle: "연락처",
        contactEmail: "이메일"
    }
};

// Sprache aus LocalStorage laden oder Standard verwenden
let currentLang = localStorage.getItem('preferredLanguage') || 'de';

function changeLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('preferredLanguage', lang);
    
    // HTML-Attribut aktualisieren
    document.documentElement.lang = lang;
    
    // Alle übersetzten Elemente aktualisieren
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
    
    // Active-Status der Buttons aktualisieren
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        }
    });
}

// Event-Listener für Sprachbuttons
document.querySelectorAll('.lang-btn').forEach(button => {
    button.addEventListener('click', () => {
        const lang = button.getAttribute('data-lang');
        changeLanguage(lang);
    });
});

// Beim Laden der Seite gespeicherte Sprache anwenden
document.addEventListener('DOMContentLoaded', () => {
    changeLanguage(currentLang);
    
    // Animationen für Elemente
    const animateElements = document.querySelectorAll('.gallery-item-clean, .contact-item, .category-card, .nav-card, .year-card');
    
    if (animateElements.length > 0) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        animateElements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
            observer.observe(el);
        });
    }
    
    // Lightbox Funktionalität
    setupLightbox();
});

// Smooth Scrolling für Anchor-Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Lightbox Setup
function setupLightbox() {
    // Lightbox HTML erstellen
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <button class="lightbox-close">&times;</button>
        <img src="" alt="">
    `;
    document.body.appendChild(lightbox);
    
    const lightboxImg = lightbox.querySelector('img');
    const lightboxClose = lightbox.querySelector('.lightbox-close');
    
    // Alle Galerie-Bilder anklickbar machen
    document.querySelectorAll('.gallery-item-clean img').forEach(img => {
        img.addEventListener('click', () => {
            lightboxImg.src = img.src;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Lightbox schließen
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // ESC-Taste zum Schließen
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
}