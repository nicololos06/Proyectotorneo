 /* --- CURSOR PERSONALIZADO --- */
    const cursor = document.getElementById('cursor');
    const cursorRing = document.getElementById('cursorRing');
    let mouseX = 0, mouseY = 0;

    document.addEventListener('mousemove', e => {
        mouseX = e.clientX; mouseY = e.clientY;
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
        setTimeout(() => {
            cursorRing.style.left = mouseX + 'px';
            cursorRing.style.top = mouseY + 'px';
        }, 80);
    });

    document.querySelectorAll('a, button, .info-card, .gallery-item, .premio-card').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.width = '20px';
            cursor.style.height = '20px';
            cursorRing.style.width = '56px';
            cursorRing.style.height = '56px';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.width = '12px';
            cursor.style.height = '12px';
            cursorRing.style.width = '36px';
            cursorRing.style.height = '36px';
        });
    });

    /* --- HEADER SCROLL --- */
    const header = document.getElementById('header');
    const progressBar = document.getElementById('progressBar');

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const total = document.documentElement.scrollHeight - window.innerHeight;
        progressBar.style.width = (scrolled / total * 100) + '%';
        header.classList.toggle('scrolled', scrolled > 50);
    });

    /* --- HAMBURGER --- */
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        mobileMenu.classList.toggle('open');
    });

    function closeMobileMenu() {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
    }

    /* --- HERO CAROUSEL --- */
    const slides = document.querySelectorAll('.hero-slide');
    const dotsContainer = document.getElementById('heroDots');
    let currentSlide = 0;
    let autoSlide;

    slides.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.className = 'dot' + (i === 0 ? ' active' : '');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    });

    function goToSlide(n) {
        slides[currentSlide].classList.remove('active');
        document.querySelectorAll('.dot')[currentSlide].classList.remove('active');
        currentSlide = (n + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
        document.querySelectorAll('.dot')[currentSlide].classList.add('active');
    }

    function startAuto() {
        autoSlide = setInterval(() => goToSlide(currentSlide + 1), 6000);
    }
    function stopAuto() { clearInterval(autoSlide); }

    startAuto();
    document.querySelector('.hero').addEventListener('mouseenter', stopAuto);
    document.querySelector('.hero').addEventListener('mouseleave', startAuto);

    /* --- PARTICLES --- */
    const particlesContainer = document.getElementById('particles');
    for (let i = 0; i < 20; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        p.style.left = Math.random() * 100 + '%';
        p.style.bottom = Math.random() * 30 + '%';
        p.style.animationDuration = (4 + Math.random() * 6) + 's';
        p.style.animationDelay = (Math.random() * 6) + 's';
        p.style.width = (2 + Math.random() * 3) + 'px';
        p.style.height = p.style.width;
        particlesContainer.appendChild(p);
    }

    /* --- STATS COUNTER --- */
    function animateCount(el, target, duration) {
        let start = 0;
        const step = target / (duration / 16);
        const timer = setInterval(() => {
            start += step;
            if (start >= target) { el.textContent = target; clearInterval(timer); }
            else el.textContent = Math.floor(start);
        }, 16);
    }

    const statNums = document.querySelectorAll('[data-count]');
    const statsObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCount(entry.target, parseInt(entry.target.dataset.count), 1000);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    statNums.forEach(n => statsObserver.observe(n));

    /* --- REVEAL ON SCROLL --- */
    const reveals = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    reveals.forEach(r => revealObserver.observe(r));

    /* --- CALENDARIO TABS --- */
    document.getElementById('calTabs').addEventListener('click', e => {
        const btn = e.target.closest('.cal-tab');
        if (!btn) return;
        document.querySelectorAll('.cal-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.cal-panel').forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById('cal-' + btn.dataset.tab).classList.add('active');
    });

    /* --- GALERÍA LIGHTBOX --- */
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lbImg = document.getElementById('lbImg');
    let lbIndex = 0;
    const lbImages = [...galleryItems].map(el => el.dataset.src);

    galleryItems.forEach((item, i) => {
        item.addEventListener('click', () => {
            lbIndex = i;
            lbImg.src = lbImages[i];
            lightbox.classList.add('open');
        });
    });

    document.getElementById('lbClose').addEventListener('click', () => lightbox.classList.remove('open'));
    lightbox.addEventListener('click', e => { if (e.target === lightbox) lightbox.classList.remove('open'); });

    document.getElementById('lbPrev').addEventListener('click', () => {
        lbIndex = (lbIndex - 1 + lbImages.length) % lbImages.length;
        lbImg.src = lbImages[lbIndex];
    });
    document.getElementById('lbNext').addEventListener('click', () => {
        lbIndex = (lbIndex + 1) % lbImages.length;
        lbImg.src = lbImages[lbIndex];
    });

    document.addEventListener('keydown', e => {
        if (!lightbox.classList.contains('open')) return;
        if (e.key === 'ArrowLeft') document.getElementById('lbPrev').click();
        if (e.key === 'ArrowRight') document.getElementById('lbNext').click();
        if (e.key === 'Escape') lightbox.classList.remove('open');
    });

    /* --- ACCORDION --- */
    document.querySelectorAll('.accordion-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const item = btn.parentElement;
            const body = item.querySelector('.accordion-body');
            const isOpen = item.classList.contains('open');

            document.querySelectorAll('.accordion-item').forEach(i => {
                i.classList.remove('open');
                i.querySelector('.accordion-body').style.maxHeight = null;
            });

            if (!isOpen) {
                item.classList.add('open');
                body.style.maxHeight = body.scrollHeight + 'px';
            }
        });
    });

    /* --- MODAL PREMIOS --- */
    function openModal(title, text) {
        const parts = title.split(' ');
        document.getElementById('modalIcon').textContent = parts[0];
        document.getElementById('modalTitle').textContent = parts.slice(1).join(' ');
        document.getElementById('modalText').textContent = text;
        document.getElementById('modalOverlay').classList.add('open');
    }

    function closeModal() {
        document.getElementById('modalOverlay').classList.remove('open');
    }

    function closeModalOutside(e) {
        if (e.target === document.getElementById('modalOverlay')) closeModal();
    }

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') closeModal();
    });

    /* --- FORMULARIO WHATSAPP --- */
    document.getElementById('contactForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const nombre = document.getElementById('nombre').value;
        const email = document.getElementById('email').value;
        const telefono = document.getElementById('telefono').value;
        const categoria = document.getElementById('categoria').value;
        const comentario = document.getElementById('comentario').value;
        const modalidad = document.querySelector('input[name="modalidad"]:checked')?.value || 'No especificada';

        const mensaje = `Hola! Consulta desde la web del Torneo Don Bosco 2026:\n\nNombre: ${nombre}\nEmail: ${email}\nTeléfono: ${telefono}\nCategoría: ${categoria}\nModalidad: ${modalidad}\n\nMensaje: ${comentario}`;
        const url = `https://wa.me/5491134214866?text=${encodeURIComponent(mensaje)}`;

        const toast = document.getElementById('toast');
        toast.classList.add('show');
        setTimeout(() => { toast.classList.remove('show'); window.open(url, '_blank'); }, 1200);
    });

    /* --- SMOOTH SCROLL para href con # --- */
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });