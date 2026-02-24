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
		exhibitionsLegend: "Die folgenden Einträge sind überwiegend deutschsprachig. Begriffe: Gruppenausstellung, Einzelausstellung, Online-Ausstellung, Offene Ateliers.",
		education: "Schulbildung / Studium",
		contactTitle: "Kontakt",
		contactEmail: "E-Mail",
		contactWebsite: "Webseite",
		contactInstagram: "Instagram",

		paintingsYearTitle: "{paintings} {year}"
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
		exhibitionsLegend: "The following entries are mostly in German. Terms: group exhibition, solo exhibition, online exhibition, open studios.",
		education: "Education",
		contactTitle: "Contact",
		contactEmail: "Email",
		contactWebsite: "Website",
		contactInstagram: "Instagram",

		paintingsYearTitle: "{paintings} {year}"
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
		exhibitionsLegend: "아래 항목은 대부분 독일어로 작성되어 있습니다. 용어: 그룹전, 개인전, 온라인 전시, 오픈 스튜디오.",
		education: "학력",
		contactTitle: "연락처",
		contactEmail: "이메일",
		contactWebsite: "사이트",
		contactInstagram: "인스타",

		paintingsYearTitle: "{paintings} {year}"
	}
};

let currentLang = localStorage.getItem("preferredLanguage") || "de";

function applyTranslations(lang) {
	document.documentElement.lang = lang;

	document.querySelectorAll("[data-translate]").forEach((el) => {
		const key = el.getAttribute("data-translate");
		if (!translations[lang] || !translations[lang][key]) return;

		if (key === "paintingsYearTitle") {
			const year = el.getAttribute("data-year") || "";
			const paintingsWord = translations[lang].paintings || "";
			const template = translations[lang].paintingsYearTitle;
			el.textContent = template
				.replace("{paintings}", paintingsWord)
				.replace("{year}", year);
			return;
		}

		el.textContent = translations[lang][key];
	});
}

function updateLanguageBlocks(lang) {
	document.querySelectorAll(".lang-block").forEach((block) => {
		block.style.display = (block.getAttribute("data-lang-block") === lang) ? "" : "none";
	});
}

function setActiveLangButton(lang) {
	document.querySelectorAll(".lang-btn").forEach((btn) => {
		btn.classList.toggle("active", btn.getAttribute("data-lang") === lang);
	});
}

function changeLanguage(lang) {
	currentLang = lang;
	localStorage.setItem("preferredLanguage", lang);

	applyTranslations(lang);
	updateLanguageBlocks(lang);
	setActiveLangButton(lang);
}

document.querySelectorAll(".lang-btn").forEach((button) => {
	button.addEventListener("click", () => {
		changeLanguage(button.getAttribute("data-lang"));
	});
});

document.addEventListener("DOMContentLoaded", () => {
	changeLanguage(currentLang);

	const animateElements = document.querySelectorAll(
		".gallery-item-clean, .contact-item, .category-card, .nav-card, .year-card"
	);

	if (animateElements.length > 0) {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.style.opacity = "1";
						entry.target.style.transform = "translateY(0)";
					}
				});
			},
			{ threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
		);

		animateElements.forEach((el, index) => {
			el.style.opacity = "0";
			el.style.transform = "translateY(30px)";
			el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
			observer.observe(el);
		});
	}

	setupLightbox();
});

function setupLightbox() {
	const galleryImgs = document.querySelectorAll(".gallery-item-clean img");
	if (galleryImgs.length === 0) return;

	const lightbox = document.createElement("div");
	lightbox.className = "lightbox";
	lightbox.innerHTML = `
		<button class="lightbox-close" aria-label="Close">&times;</button>
		<img src="" alt="">
	`;
	document.body.appendChild(lightbox);

	const lightboxImg = lightbox.querySelector("img");
	const lightboxClose = lightbox.querySelector(".lightbox-close");

	galleryImgs.forEach((img) => {
		img.addEventListener("click", () => {
			lightboxImg.src = img.src;
			lightbox.classList.add("active");
			document.body.style.overflow = "hidden";
		});
	});

	function closeLightbox() {
		lightbox.classList.remove("active");
		document.body.style.overflow = "";
		lightboxImg.src = "";
	}

	lightboxClose.addEventListener("click", closeLightbox);
	lightbox.addEventListener("click", (e) => {
		if (e.target === lightbox) closeLightbox();
	});

	document.addEventListener("keydown", (e) => {
		if (e.key === "Escape" && lightbox.classList.contains("active")) {
			closeLightbox();
		}
	});
}