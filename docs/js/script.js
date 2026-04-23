// CARRUSEL AUTOMÁTICO Y NAVEGACIÓN
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    let currentSlide = 0;
    let autoSlideInterval;

    // Función para mostrar slide actual
    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
    }

    // Siguiente slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    // Anterior slide
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    // INICIAR CARRUSEL AUTOMÁTICO (15 segundos = 15000ms)
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 7000);
    }

    // PAUSAR CARRUSEL
    function pauseAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    // REANUDAR CARRUSEL
    function resumeAutoSlide() {
        pauseAutoSlide();
        startAutoSlide();
    }

    // EVENTOS
    nextBtn.addEventListener('click', () => {
        nextSlide();
        resumeAutoSlide();
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        resumeAutoSlide();
    });

    // Pausar al hacer hover
    const heroSection = document.querySelector('.hero-section');
    heroSection.addEventListener('mouseenter', pauseAutoSlide);
    heroSection.addEventListener('mouseleave', resumeAutoSlide);

    // INICIAR CARRUSEL
    showSlide(currentSlide);
    startAutoSlide();
});


// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const target = document.getElementById(targetId);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Cerrar cards al navegar
            document.querySelectorAll('.card.expanded').forEach(card => {
                card.querySelector('.card-content').style.maxHeight = null;
                card.classList.remove('expanded');
            });
        }
    });
});

document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const email = document.getElementById("email").value;
    const telefono = document.getElementById("telefono").value;
    const categoria = document.getElementById("categoria").value;
    const comentario = document.getElementById("comentario").value;

    const modalidad = document.querySelector('input[name="modalidad"]:checked')?.value;

    const mensaje = `Hola, quiero información del torneo:
    
Nombre: ${nombre}
Email: ${email}
Teléfono: ${telefono}
Categoría: ${categoria}
Modalidad: ${modalidad}

Mensaje: ${comentario}`;

    const numero = "5491134214866";

    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;

    window.open(url, "_blank");
});