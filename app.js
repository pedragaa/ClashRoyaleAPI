'use strict'

const iconUrls = "https://api.clashroyale.com/v1/cards";
const listaPersonagens = document.getElementById('list');

async function buscarPersonagens(url,nome = '') {
    const resposta = await fetch(nome ? `${url}?name=${nome}` : url);
    const dados = await resposta.json();
    exibirPersonagens(dados.results);

}

function pesquisarPersonagens(evento) {
    evento.preventDefault();
    const nomePersonagem = document.querySelector('#input').value;
    buscarPersonagens(iconUrls , nomePersonagem);

}

function exibirPersonagens(personagens) {
    listaPersonagens.innerHTML = '';

    personagens.forEach(personagens => {
        listaPersonagens.insertAdjacentHTML('beforeend', 
        <div class='card' onclick="mostrarInfo(this)">
            <div class="card-header">
                <p class='card-title'>${personagem.name}</p>
            </div>
            <div class="card-img">
                <img src="${personagem.image}" alt='${personagem.name}'/>
            </div>
            <div class="card-body" style="display: none;">
                <p><b>Gênero:</b> ${personagem.gender}</p>
                <p><b>Espécie:</b> ${personagem.species}</p>
                <p><b>Origem:</b> ${personagem.origin.name}</p>
            </div>
        </div>
    );
    });
}
function mostrarInfo(card) {
    const cardBody = card.querySelector('.card-body');
    cardBody.style.display = cardBody.style.display === 'none'
}
buscarPersonagens(urlApi);

   