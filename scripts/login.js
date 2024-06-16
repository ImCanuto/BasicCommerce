document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("login-form");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");

    form.addEventListener("submit", async function(event) {
        event.preventDefault();
        
        const email = emailInput.value;
        const password = passwordInput.value;

        try {
            const response = await fetch("http://localhost:8080/api/v1/usuario");
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const users = await response.json();
            const user = users.find(user => user.email === email);

            if (user) {
                const hashedPassword = await hashPassword(password);
                if (hashedPassword === user.senha) {
                    // Redirecionar para a página inicial
                    window.location.href = "home.html";
                } else {
                    alert("Senha incorreta.");
                }
            } else {
                alert("Usuário não encontrado.");
            }
        } catch (error) {
            console.error("Erro ao validar login:", error);
            alert("Erro ao validar login. Tente novamente.");
        }
    });

    // Função para criptografar a senha usando SHA-256
    async function hashPassword(password) {
        const encoder = new TextEncoder();
        const data = encoder.encode(password);
        const hashBuffer = await crypto.subtle.digest("SHA-256", data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        return hashHex;
    }
});
