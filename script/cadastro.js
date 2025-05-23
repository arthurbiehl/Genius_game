

function bemVindo() {
    const nome = document.getElementById('nome').value;

    if (nome.trim() !== "") {
        localStorage.setItem("nomeUsuario", nome);
    } else {
        localStorage.removeItem("nomeUsuario");
    }

    window.location.href = "/index.html";
}
