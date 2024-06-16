document.addEventListener("DOMContentLoaded", async function() {
    const contentDiv = document.querySelector(".content");

    try {
        const response = await fetch("http://localhost:8080/api/v1/item", {
            method: "GET",
            headers: {
                "Accept": "*/*"
            }
        });

        if (response.ok) {
            const produtos = await response.json();
            produtos.forEach(produto => {
                const productDiv = document.createElement("div");
                productDiv.classList.add("box");

                productDiv.innerHTML = `
                    <div class="header">
                        <h2>${produto.nome}</h2>
                    </div>
                    <div class="clientInfo">
                        <h4>Estoque:</h4>
                        <p>${produto.estoque}</p>
                        <h4>Valor:</h4>
                        <p>R$ ${produto.valor.toFixed(2)}</p>
                        <h4>ID:</h4>
                        <p>${produto.id}</p>
                    </div>
                `;

                contentDiv.appendChild(productDiv);
            });
        } else {
            contentDiv.innerHTML = "<p>Erro ao carregar os produtos.</p>";
            console.error("Erro na resposta da API:", response.status, response.statusText);
        }
    } catch (error) {
        contentDiv.innerHTML = "<p>Erro ao carregar os produtos. Tente novamente mais tarde.</p>";
        console.error("Erro ao fazer requisição:", error);
    }
});
