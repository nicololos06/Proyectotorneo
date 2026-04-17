document.querySelectorAll(".regla-header").forEach(btn => {
    btn.addEventListener("click", () => {
        const regla = btn.parentElement;

        // cerrar otros (modo app pro)
        document.querySelectorAll(".regla").forEach(r => {
            if (r !== regla) {
                r.classList.remove("active");
            }
        });

        // toggle actual
        regla.classList.toggle("active");
    });
});