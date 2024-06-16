document.addEventListener("DOMContentLoaded", async function() {
    const contentDiv = document.querySelector(".content");

    // Função para criar um elemento de venda
    function createSaleBox(sale) {
        const boxDiv = document.createElement("div");
        boxDiv.classList.add("box");

        const headerDiv = document.createElement("div");
        headerDiv.classList.add("header");
        const h2 = document.createElement("h2");
        h2.textContent = `#${sale.id}`;
        headerDiv.appendChild(h2);

        const clientInfoDiv = document.createElement("div");
        clientInfoDiv.classList.add("clientInfo");

        const totalH4 = document.createElement("h4");
        totalH4.textContent = "Total:";
        const totalP = document.createElement("p");
        totalP.textContent = sale.total;

        const clientIdH4 = document.createElement("h4");
        clientIdH4.textContent = "Cliente ID:";
        const clientIdP = document.createElement("p");
        clientIdP.textContent = sale.clientId;

        const dateH4 = document.createElement("h4");
        dateH4.textContent = "Data:";
        const dateP = document.createElement("p");
        const date = new Date(sale.dia);
        dateP.textContent = date.toLocaleDateString();

        clientInfoDiv.appendChild(totalH4);
        clientInfoDiv.appendChild(totalP);
        clientInfoDiv.appendChild(clientIdH4);
        clientInfoDiv.appendChild(clientIdP);
        clientInfoDiv.appendChild(dateH4);
        clientInfoDiv.appendChild(dateP);

        boxDiv.appendChild(headerDiv);
        boxDiv.appendChild(clientInfoDiv);

        return boxDiv;
    }

    // Função para preencher a lista de vendas
    async function loadSales() {
        try {
            const response = await fetch("http://localhost:8080/api/v1/vendas");
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const sales = await response.json();
            if (Array.isArray(sales)) {
                sales.forEach(sale => {
                    // Verifica se a estrutura de dados está correta
                    if (sale.id && sale.total && sale.clientId && sale.dia) {
                        const saleBox = createSaleBox(sale);
                        contentDiv.appendChild(saleBox);
                    } else {
                        console.error("Estrutura de dados inesperada:", sale);
                    }
                });
            } else {
                console.error("Resposta inesperada da API:", sales);
            }
        } catch (error) {
            console.error("Erro ao carregar vendas:", error);
        }
    }

    // Chama a função para carregar as vendas
    loadSales();
});
