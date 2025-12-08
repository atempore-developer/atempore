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


// ===============================
// POPUP AUTOMÁTICO SI HAY TIEMPO RESTANTE
// ===============================
document.addEventListener("DOMContentLoaded", () => {

    const h = document.getElementById("h");
    const m = document.getElementById("m");
    const s = document.getElementById("s");

    const modal = document.getElementById("promo-modal");
    const overlay = document.getElementById("promo-overlay");
    const closeBtn = document.querySelector(".promo-close");
    const promoBtn = document.querySelector(".promo-btn");

    // Cerrar al hacer clic en "Ver beneficios"
    if (promoBtn) {
        promoBtn.addEventListener("click", (e) => {
            hidePopup();  // Cierra el modal
        });
    }


    if (!h || !m || !s || !modal || !overlay) return;

    const showPopup = () => {
        overlay.classList.add("show");
        modal.classList.add("show");
    };

    const hidePopup = () => {
        modal.classList.add("hide");
        overlay.classList.remove("show");

        setTimeout(() => {
            modal.classList.remove("show", "hide");
            modal.style.visibility = "hidden";
        }, 300);
    };

    // Mostrar pop-up si el tiempo es distinto a 00:00:00
    const checkCountdown = () => {
        const hh = h.textContent.trim();
        const mm = m.textContent.trim();
        const ss = s.textContent.trim();

        if (hh !== "00" || mm !== "00" || ss !== "00") {
            showPopup();
        }
    };

    // Ejecuta después de 800 ms para dejar cargar los valores del contador
    setTimeout(checkCountdown, 800);

    // Cerrar con X
    closeBtn.addEventListener("click", hidePopup);

    // Cerrar haciendo clic fuera
    overlay.addEventListener("click", hidePopup);

});
// ==================================
// SYNC COUNTDOWN DEL MODAL
// ==================================
document.addEventListener("DOMContentLoaded", () => {

    const h = document.getElementById("h");
    const m = document.getElementById("m");
    const s = document.getElementById("s");

    const mh = document.getElementById("mh");
    const mm = document.getElementById("mm");
    const ms = document.getElementById("ms");

    if (!h || !m || !s || !mh || !mm || !ms) return;

    // Copia los valores cada medio segundo
    setInterval(() => {
        mh.textContent = h.textContent;
        mm.textContent = m.textContent;
        ms.textContent = s.textContent;
    }, 300);

});

// ============================================
//     CARRUSEL TARJETAS
// ============================================

document.addEventListener("DOMContentLoaded", () => {
    const track = document.querySelector(".carrusel-track");
    const items = Array.from(document.querySelectorAll(".carrusel-item"));
    const btnPrev = document.querySelector(".carrusel-btn.prev");
    const btnNext = document.querySelector(".carrusel-btn.next");
    const wrapper = document.querySelector(".carrusel-wrapper");

    if (!track || items.length === 0) return;

    // Oculta flechas si solo hay 1
    if (items.length <= 1) {
        wrapper.classList.add("single");
        return;
    }

    let index = 0;

    function updateCarousel() {
        const itemWidth = items[0].clientWidth + 20; // item + gap
        track.style.transform = `translateX(${-index * itemWidth}px)`;
    }

    btnNext.addEventListener("click", () => {
        if (index < items.length - 1) index++;
        updateCarousel();
    });

    btnPrev.addEventListener("click", () => {
        if (index > 0) index--;
        updateCarousel();
    });

    window.addEventListener("resize", updateCarousel);
});
