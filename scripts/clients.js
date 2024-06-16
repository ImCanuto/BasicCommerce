document.addEventListener("DOMContentLoaded", async function() {
    const contentDiv = document.querySelector(".content");

    try {
        const response = await fetch("http://localhost:8080/api/v1/cliente", {
            method: "GET",
            headers: {
                "Accept": "*/*"
            }
        });

        if (response.ok) {
            const data = await response.json();
            console.log("Dados recebidos da API:", data); // Adicionado para depuração

            // Supondo que a resposta seja { "clients": [...] }
            const clients = data.clients || data; // Modificado para aceitar duas possíveis estruturas

            clients.forEach(client => {
                console.log("Processando cliente:", client); // Adicionado para depuração

                const clientBox = document.createElement("div");
                clientBox.classList.add("box");

                const clientHeader = document.createElement("div");
                clientHeader.classList.add("header");
                const clientName = document.createElement("h2");
                clientName.textContent = client.nome;
                clientHeader.appendChild(clientName);

                const clientInfo = document.createElement("div");
                clientInfo.classList.add("clientInfo");

                const emailLabel = document.createElement("h4");
                emailLabel.textContent = "E-mail:";
                const emailValue = document.createElement("p");
                emailValue.textContent = client.email;

                const idLabel = document.createElement("h4");
                idLabel.textContent = "ID:";
                const idValue = document.createElement("p");
                idValue.textContent = client.id;

                clientInfo.appendChild(emailLabel);
                clientInfo.appendChild(emailValue);
                clientInfo.appendChild(idLabel);
                clientInfo.appendChild(idValue);

                clientBox.appendChild(clientHeader);
                clientBox.appendChild(clientInfo);

                contentDiv.appendChild(clientBox);
            });
        } else {
            console.error("Erro na resposta da API:", response.status, response.statusText);
            contentDiv.innerHTML = "<p>Erro ao carregar os clientes.</p>";
        }
    } catch (error) {
        console.error("Erro ao buscar clientes:", error);
        contentDiv.innerHTML = "<p>Erro ao carregar os clientes. Tente novamente mais tarde.</p>";
    }
});
