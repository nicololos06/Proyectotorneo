function abrirModal(titulo, texto) {
    document.getElementById("modal").style.display = "flex";
    document.getElementById("modalTitulo").innerText = titulo;
    document.getElementById("modalTexto").innerText = texto;
}

function cerrarModal() {
    document.getElementById("modal").style.display = "none";
}

// cerrar clickeando afuera
window.onclick = function(e) {
    const modal = document.getElementById("modal");
    if (e.target === modal) {
        cerrarModal();
    }
}