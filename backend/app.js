async function buscarCarta(event) {
    event.preventDefault();

    const nomeCarta = document.getElementById("input").value.trim();
    const resultadoDiv = document.getElementById("resultado-carta");
    resultadoDiv.innerHTML = "Carregando...";

    const traducaoCartas = {
        "Knight": "Cavaleiro",
        "Archers": "Arqueiras",
        "Giant": "Gigante",
        "Mini P.E.K.K.A": "Mini P.E.K.K.A",
        "Balloon": "Balão",
        "Witch": "Bruxa",
        "Barbarians": "Bárbaros",
        "Golem": "Golem",
        "Skeleton Army": "Exército de Esqueletos",
        "Bomber": "Bombardeiro",
        "Musketeer": "Mosqueteira",
        "Baby Dragon": "Bebê Dragão",
        "Prince": "Príncipe",
        "Wizard": "Mago",
        "Mini Dragon": "Mini Dragão",
        "Valkyrie": "Valquíria",
        "Skeletons": "Esqueletos",
        "Hog Rider": "Corredor",
        "Minions": "Servos",
        "Spear Goblins": "Goblins Lanceiros",
        "Goblin Gang": "Gangue de Goblins",
        "Mega Minion": "Mega Servo",
        "Dark Prince": "Príncipe das Trevas",
        "Ice Wizard": "Mago de Gelo",
        "Fire Spirits": "Espíritos de Fogo",
        "Lumberjack": "Lenhador",
        "Elite Barbarians": "Bárbaros de Elite",
        "Electro Wizard": "Mago Elétrico",
        "Ballon": "Balão",

        // Adicione mais traduções conforme precisar
    };

    try {
        const response = await fetch("http://localhost:3000/cartas");
        const data = await response.json();

        if (!data.items || !Array.isArray(data.items)) {
            throw new Error("Resposta inesperada da API.");
        }

        // Converter nome em português para o nome em inglês correspondente
        const nomeIngles = Object.entries(traducaoCartas)
            .find(([en, pt]) => pt.toLowerCase() === nomeCarta.toLowerCase())?.[0] || nomeCarta;

        const carta = data.items.find(c => c.name.toLowerCase() === nomeIngles.toLowerCase());

        if (carta) {
            const nomePortugues = traducaoCartas[carta.name] || carta.name;

            resultadoDiv.innerHTML = `
                <h2>${nomePortugues}</h2>
                <img src="${carta.iconUrls.medium}" alt="${nomePortugues}" />
                <p><strong>Nivel Máximo:</strong> ${carta.maxLevel}</p>
                <p><strong>Raridade:</strong> ${carta.rarity}</p>
                <p><strong>Elixir:</strong> ${carta.elixirCost || "N/A"}</p>
            `;
        } else {
            resultadoDiv.innerHTML = `<p style="color: red;">Carta "${nomeCarta}" não encontrada.</p>`;
        }
    } catch (error) {
        console.error("Erro ao buscar carta:", error);
        resultadoDiv.innerHTML = `<p style="color: red;">Erro ao buscar a carta.</p>`;
    }
}
