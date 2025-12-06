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

// ================= FAQ ACCORDION ==================
document.addEventListener("DOMContentLoaded", () => {
    const faqs = document.querySelectorAll(".faq-item");

    faqs.forEach(item => {
        const button = item.querySelector(".faq-question");

        button.addEventListener("click", () => {
            const isOpen = item.classList.contains("open");

            // Cierra todos
            faqs.forEach(f => {
                f.classList.remove("open");
                f.querySelector(".faq-answer").style.maxHeight = null;
            });

            // Si no estaba abierto, abrirlo
            if (!isOpen) {
                item.classList.add("open");
                const answer = item.querySelector(".faq-answer");
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });
});


// =========================================
//      CONTADOR REGRESIVO 24 HORAS CON LOCALSTORAGE
// =========================================

document.addEventListener("DOMContentLoaded", () => {
    const h = document.getElementById("h");
    const m = document.getElementById("m");
    const s = document.getElementById("s");

    const COUNTDOWN_KEY = "countdown_end_time";

    // Obtiene tiempo de finalización guardado
    let endTime = localStorage.getItem(COUNTDOWN_KEY);

    // Si no existe, se crea uno nuevo (24h desde ahora)
    if (!endTime) {
        endTime = Date.now() + 24 * 60 * 60 * 1000;
        localStorage.setItem(COUNTDOWN_KEY, endTime);
    } else {
        endTime = parseInt(endTime, 10);
    }

    function updateDisplay(total) {
        const hours = String(Math.floor(total / 3600)).padStart(2, "0");
        const mins = String(Math.floor((total % 3600) / 60)).padStart(2, "0");
        const secs = String(total % 60).padStart(2, "0");

        const elements = [
            [h, hours],
            [m, mins],
            [s, secs]
        ];

        elements.forEach(([el, value]) => {
            if (el.textContent !== value) {
                el.textContent = value;

                el.classList.remove("tick");
                void el.offsetWidth; 
                el.classList.add("tick");
            }
        });
    }

    function tick() {
        const now = Date.now();
        let diff = Math.floor((endTime - now) / 1000);

        if (diff <= 0) {
            updateDisplay(0);
            h.textContent = "00";
            m.textContent = "00";
            s.textContent = "00";
            clearInterval(interval);
            return;
        }

        updateDisplay(diff);
    }

    // Primera actualización inmediata
    tick();

    const interval = setInterval(tick, 1000);
});
