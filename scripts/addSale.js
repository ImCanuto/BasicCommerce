document.addEventListener("DOMContentLoaded", async function() {
    const produtoSelect = document.createElement("select");
    const clienteSelect = document.createElement("select");
    const form = document.querySelector("form");

    // Adicionando classes para estilização
    produtoSelect.classList.add("form-control");
    clienteSelect.classList.add("form-control");

    // Função para criar uma opção para um select
    function createOption(text, value) {
        const option = document.createElement("option");
        option.textContent = text;
        option.value = value;
        return option;
    }

    // Função para preencher os selects
    async function fillSelects() {
        try {
            // Fetch produtos
            const produtosResponse = await fetch("http://localhost:8080/api/v1/item");
            const produtos = await produtosResponse.json();
            produtos.forEach(produto => {
                produtoSelect.appendChild(createOption(produto.nome, produto.id));
            });

            // Fetch clientes
            const clientesResponse = await fetch("http://localhost:8080/api/v1/cliente");
            const clientes = await clientesResponse.json();
            clientes.forEach(cliente => {
                clienteSelect.appendChild(createOption(cliente.nome, cliente.id));
            });
        } catch (error) {
            console.error("Erro ao carregar produtos ou clientes:", error);
        }
    }

    // Chamar a função para preencher os selects
    await fillSelects();

    // Substituir os inputs de Produto ID e Cliente ID pelos selects
    const produtoInput = form.querySelector("input[placeholder='Produto ID']");
    const clienteInput = form.querySelector("input[placeholder='Cliente ID']");

    produtoInput.replaceWith(produtoSelect);
    clienteInput.replaceWith(clienteSelect);

    // Manipulador de evento para envio do formulário
    form.addEventListener("submit", async function(event) {
        event.preventDefault(); // Impede o envio padrão do formulário

        const produtoId = produtoSelect.value;
        const total = form.querySelector("input[placeholder='Total']").value;
        const clienteId = clienteSelect.value;
        const data = form.querySelector("input[placeholder='Data']").value;

        const venda = {
            venda: {
                id: crypto.randomUUID(),
                total: parseFloat(total),
                clientId: clienteId,
                dia: new Date(data).toISOString()
            },
            items: [
                {
                    id: produtoId
                }
            ]
        };

        try {
            const response = await fetch("http://localhost:8080/api/v1/vendas", {
                method: "POST",
                headers: {
                    "Accept": "*/*",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(venda)
            });

            if (response.ok) {
                alert("Venda registrada com sucesso!");
                window.location.href = "sales.html"; // Redireciona para a página de vendas
            } else {
                alert("Erro ao registrar venda.");
                console.error("Erro na resposta da API:", response.status, response.statusText);
            }
        } catch (error) {
            alert("Erro ao registrar venda. Tente novamente mais tarde.");
            console.error("Erro ao fazer requisição:", error);
        }
    });
});
