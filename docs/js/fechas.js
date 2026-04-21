function mostrarFecha(id) {
    const fechas = document.querySelectorAll('.fecha');
    const botones = document.querySelectorAll('.fechas-nav button');

    // ocultar todas
    fechas.forEach(f => {
        f.classList.remove('activa');
    });

    // sacar activo de botones
    botones.forEach(b => {
        b.classList.remove('activo');
    });

    // mostrar seleccionada
    const actual = document.getElementById(id);
    if (actual) {
        actual.classList.add('activa');
    }

    // marcar botón activo
    const btn = document.querySelector(`button[onclick="mostrarFecha('${id}')"]`);
    if (btn) {
        btn.classList.add('activo');
    }
}

// inicial
document.addEventListener("DOMContentLoaded", () => {
    mostrarFecha('f1');
});