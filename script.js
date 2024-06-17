const modal = document.querySelector('dialog');

function AbrirModal() {
    modal.showModal();
}

function CloseModal() {
    modal.close();
}

function logar() {
    let login = document.getElementById("email").value.trim(); // Remove espaços em branco no início e no fim
    let senha = document.getElementById("password").value;

    if (login !== "") { // Verifica se o campo de email está preenchido
        // Armazena apenas o email no localStorage
        localStorage.setItem("email", login);
        alert("Registro realizado com sucesso!");
        window.location.href = "promocoes.html"; // Redireciona para a página de promoções
    } else {
        document.getElementById("respostaLogin").innerHTML = "Preencha o campo de email";
    }
}
