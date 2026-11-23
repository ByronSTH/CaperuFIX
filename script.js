
/* =========================================
   1. MENU DE NAVEGACION MOVIL
========================================= */

const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");
const navLinks = document.querySelectorAll(".nav-link");

// Abrir y cerrar el menu
menuToggle.addEventListener("click", () => {

    navMenu.classList.toggle("active");

    const menuAbierto = navMenu.classList.contains("active");
    menuToggle.classList.toggle("active", menuAbierto);

    menuToggle.setAttribute("aria-expanded", menuAbierto);
    menuToggle.setAttribute(
        "aria-label",
        menuAbierto ? "Cerrar menú" : "Abrir menú"
    );

});

// Cerrar el menu al seleccionar una opcion
navLinks.forEach(link => {

    link.addEventListener("click", () => {

        navMenu.classList.remove("active");
        menuToggle.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Abrir menú");

    });

});


// Cerrar el menu al hacer clic fuera de el
document.addEventListener("click", (event) => {

    const clicEnMenu = navMenu.contains(event.target);
    const clicEnBoton = menuToggle.contains(event.target);

    if (!clicEnMenu && !clicEnBoton) {

        navMenu.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Abrir menú");

    }

});



/* =========================================
   2. ANO AUTOMATICO DEL FOOTER
========================================= */

const currentYear = document.getElementById("current-year");

currentYear.textContent = new Date().getFullYear();



/* =========================================
   3. ANIMACIONES AL DESPLAZARSE
========================================= */

// Seleccionar elementos que queremos animar
const animatedElements = document.querySelectorAll(
    ".service-card, .process-card, .about-content, .about-image, .section-heading"
);

// Configurar el observador
const observerOptions = {
    threshold: 0.15
};

// Crear observador de elementos visibles
const sectionObserver = new IntersectionObserver((entries, observer) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("visible");

            observer.unobserve(entry.target);

        }

    });

}, observerOptions);


// Observar cada elemento
animatedElements.forEach(element => {

    element.classList.add("reveal");

    sectionObserver.observe(element);

});



/* =========================================
   4. ANO Y ESTADO INICIAL DEL MENU
========================================= */

// Asegurar que el menu comience cerrado
navMenu.classList.remove("active");

menuToggle.setAttribute("aria-expanded", "false");



/* =========================================
   5. NAVEGACION ACTIVA
========================================= */

// Cambiar el enlace activo segun la seccion visible
const pageSections = document.querySelectorAll(
    "#inicio, #servicios, #nosotros, #contacto"
);

const navigationObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            const sectionId = entry.target.getAttribute("id");

            navLinks.forEach(link => {

                link.classList.remove("active");

                if (link.getAttribute("href") === `#${sectionId}`) {

                    link.classList.add("active");

                }

            });

        }

    });

}, {
    threshold: 0.4
});


// Observar las secciones
pageSections.forEach(section => {

    navigationObserver.observe(section);

});
