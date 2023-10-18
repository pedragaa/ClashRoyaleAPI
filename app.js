'use strict'

// const iconUrls = "https://api.clashroyale.com/v1/cards";
// const apiKey = "ct6bx3wa";
// buscarPersonagens(iconUrls);



const lista = document.getElementById('cards');
const cartaNaoEncontrada = document.getElementById('aviso');

const pesquise = () => {
    const nome = document.querySelector('#input').value
    console.log(nome)
    buscarCarta(nome)
}

const buscarCarta = (nome) => {
    lista.innerHTML = '';
    cartaNaoEncontrada.innerHTML = '';

    const URL =  "https://api.clashroyale.com/v1/cards"
    const apiKey = "ct6bx3wa";


    if (nome.trim() === '') {
        cartaNaoEncontrada.innerHTML = 'Digite o nome de uma carta';
        return;
    }

    var Httpreq = new XMLHttpRequest();
    Httpreq.open(
        "GET",
        "https://api.clashroyale.com/v1/cards" + nome,
        false);
    Httpreq.send(null);

    

    if (Httpreq.status === 200) {
        var arrayCarta = JSON.parse(Httpreq.responseText);
        console.log(arrayCarta.cards.length)
        
        if (arrayCarta.cards.length == 0) {
            cartaNaoEncontrada.innerHTML = 'Carta não encontrada';
        } else if 
        (arrayCarta.cards && Array.isArray(arrayCarta.cards)) {
            arrayCarta.cards.forEach(item => {
                listEl.insertAdjacentHTML('beforeend', `
                    <div class='card'>
                        <div class="card-img">
                            <img src="${item.imageUrl}" alt='${item.name}'/>
                        </div>
                        <div class="card-body">
                            <!-- Adicione outras propriedades do item aqui -->
                        </div>
                    </div>
                `);
            });
        }
    }
}

   