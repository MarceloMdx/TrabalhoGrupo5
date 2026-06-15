const API_BASE_URL = "https://api.serratec.mwmsoftware.com";

export const api = {
async login(email, senha) {
    const response = await fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, senha }),
    });

    if (!response.ok) {
    throw new Error("Falha ao fazer login");
    }

    return response.json();
},

async request(endpoint, method = "GET", token = null, body = null) {
    const headers = {
    "Content-Type": "application/json",
    };

    if (token) {
    headers["Authorization"] = `Bearer ${token}`;
    }

    const options = {
    method,
    headers,
    };

    if (body) {
    options.body = JSON.stringify(body);
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);

    if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(
        error.message || `Erro na requisição: ${response.status}`
    );
    }

    return response.json();
},
};
