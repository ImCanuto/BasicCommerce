document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("form");
    form.addEventListener("submit", async function(event) {
        event.preventDefault();

        const nome = form.querySelector("input[type='text']").value;
        const email = form.querySelector("input[type='email']").value;
        const senha = form.querySelector("input[type='password']").value;

        const usuario = {
            id: "",
            nome: nome,
            email: email,
            senha: senha
        };

        try {
            const response = await fetch("http://localhost:8080/api/v1/usuario", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(usuario)
            });

            if (response.ok) {
                alert("Usuário cadastrado com sucesso!");
                window.location.href = "./login.html";
            } else {
                const errorData = await response.json();
                alert("Erro ao cadastrar usuário: " + errorData.message);
            }
        } catch (error) {
            console.error("Erro ao cadastrar usuário:", error);
            alert("Erro ao cadastrar usuário!");
        }
    });
});
