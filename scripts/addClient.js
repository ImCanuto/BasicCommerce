document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("form");

    form.addEventListener("submit", async function(event) {
        event.preventDefault(); // Impede o envio padrão do formulário

        const nome = form.querySelector("input[placeholder='Nome']").value;
        const email = form.querySelector("input[placeholder='Email']").value;

        const cliente = {
            nome: nome,
            email: email
        };

        try {
            const response = await fetch("http://localhost:8080/api/v1/cliente", {
                method: "POST",
                headers: {
                    "Accept": "*/*",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(cliente)
            });

            if (response.ok) {
                alert("Cliente cadastrado com sucesso!");
                window.location.href = "clients.html"; // Redireciona para a página de clientes
            } else {
                alert("Erro ao cadastrar cliente.");
                console.error("Erro na resposta da API:", response.status, response.statusText);
            }
        } catch (error) {
            alert("Erro ao cadastrar cliente. Tente novamente mais tarde.");
            console.error("Erro ao fazer requisição:", error);
        }
    });
});
