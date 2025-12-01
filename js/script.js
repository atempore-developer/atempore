const btn = document.getElementById("menu-btn");
const overlay = document.getElementById("menu-overlay");
const mobileMenuLinks = document.querySelectorAll(".mobile-menu a");

let scrollY = 0;

function openMenu() {
    scrollY = window.scrollY;
    document.body.classList.add("menu-open");
    document.body.style.overflow = "hidden";
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
    if (scrollBarWidth > 0) {
        document.body.style.paddingRight = scrollBarWidth + "px";
    }
}

function closeMenu() {
    document.body.classList.add("no-transitions");
    document.body.classList.remove("menu-open");
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";
    window.scrollTo(0, scrollY);
    setTimeout(() => {
        document.body.classList.remove("no-transitions");
    }, 350);
}

if (btn && overlay) {
    btn.addEventListener("click", () => {
        if (document.body.classList.contains("menu-open")) {
            closeMenu();
        } else {
            openMenu();
        }
    });
    overlay.addEventListener("click", closeMenu);
}

mobileMenuLinks.forEach(link => {
    link.addEventListener("click", closeMenu);
});

document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector(".header");
    const menuButton = document.querySelector("#menu-btn");
    const hero = document.querySelector("#hero");
    const triggerServicios = document.querySelector("#servicios-trigger");

    if (!header || !menuButton || !hero || !triggerServicios) return;

    const observerServicios = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.boundingClientRect.top <= 0) {
                header.classList.add("solid-header");
                menuButton.classList.add("solid-menu-button");
            }
        });
    }, { threshold: 0 });

    const observerHero = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                header.classList.remove("solid-header");
                menuButton.classList.remove("solid-menu-button");
            }
        });
    }, { threshold: 0.2 });

    observerServicios.observe(triggerServicios);
    observerHero.observe(hero);
});

const obraCards = document.querySelectorAll(".obra-card img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeLightbox = document.getElementById("close-lightbox");

if (lightbox && lightboxImg && closeLightbox && obraCards.length > 0) {
    obraCards.forEach(img => {
        img.addEventListener("click", () => {
            lightbox.classList.add("open");
            lightboxImg.src = img.src;
        });
    });

    closeLightbox.addEventListener("click", () => {
        lightbox.classList.remove("open");
        lightboxImg.src = "";
    });

    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove("open");
            lightboxImg.src = "";
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const obras = document.querySelectorAll(".obra-card");
    const btn = document.getElementById("btn-ver-mas");

    if (!btn || obras.length <= 6) return;

    obras.forEach((obra, index) => {
        if (index >= 6) obra.classList.add("obra-hidden");
    });

    let expanded = false;

    const updateButton = () => {
        if (expanded) {
            btn.innerHTML = `Ver menos <i class='bx bx-chevron-up'></i>`;
            btn.classList.add("ver-menos");
        } else {
            btn.innerHTML = `Ver más <i class='bx bx-chevron-down'></i>`;
            btn.classList.remove("ver-menos");
        }
    };

    updateButton();

    btn.addEventListener("click", () => {
        expanded = !expanded;

        obras.forEach((obra, index) => {
            if (index >= 6) {
                expanded
                    ? obra.classList.remove("obra-hidden")
                    : obra.classList.add("obra-hidden");
            }
        });

        updateButton();
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const animElements = document.querySelectorAll(
        ".animate, .animate-left, .animate-right, .animate-zoom"
    );

    const animObserver = new IntersectionObserver(entries => {
        if (document.body.classList.contains("no-transitions")) return;
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    }, { threshold: 0.2 });

    animElements.forEach(el => animObserver.observe(el));
});
