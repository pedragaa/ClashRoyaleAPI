'use strict'

async function fetchCardData() {
    const response = await fetch("https://api.clashroyale.com/v1/cards", {
        method: "GET",
        headers: {
            "Authorization": "Bearer YOUR_API_KEY"  
        }
    });

    if (response.ok) {
        return await response.json();
    } else {
        throw new Error("Erro ao buscar dados da API");
    }
}

// Função para realizar a pesquisa
async function search() {
    const searchInput = document.getElementById("pesquisa").value.toLowerCase();
    const searchResults = document.getElementById("searchResults");
    searchResults.innerHTML = "";

    try {
        const cardData = await fetchCardData();
        const cards = cardData.items;

        cards.forEach(card => {
            if (card.name.toLowerCase().includes(searchInput)) {
                const li = document.createElement("li");
                li.textContent = card.name;
                searchResults.appendChild(li);
            }
        });
    } catch (error) {
        console.error("Erro ao buscar dados da API: " + error.message);
    }
}
