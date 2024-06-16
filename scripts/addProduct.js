document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("form");

    form.addEventListener("submit", async function(event) {
        event.preventDefault(); // Impede o envio padrão do formulário

        const nome = form.querySelector("input[placeholder='Nome']").value;
        const estoque = form.querySelector("input[placeholder='Estoque']").value;
        const valor = form.querySelector("input[placeholder='Valor']").value;

        const produto = {
            nome: nome,
            estoque: parseInt(estoque),
            valor: parseFloat(valor)
        };

        try {
            const response = await fetch("http://localhost:8080/api/v1/item", {
                method: "POST",
                headers: {
                    "Accept": "*/*",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(produto)
            });

            if (response.ok) {
                alert("Produto cadastrado com sucesso!");
                window.location.href = "products.html"; // Redireciona para a página de produtos
            } else {
                alert("Erro ao cadastrar produto.");
                console.error("Erro na resposta da API:", response.status, response.statusText);
            }
        } catch (error) {
            alert("Erro ao cadastrar produto. Tente novamente mais tarde.");
            console.error("Erro ao fazer requisição:", error);
        }
    });
});
