let quantidadeCartas = prompt("Quantas cartas quer jogar? 4 a 14 cartas, apenas números pares.")
const cartas = [];
let elemento = document.querySelector(".jogo");
verificarRequisitos();



function verificarRequisitos() {
    let requisitos = false;
    while (requisitos == false) {
        if (quantidadeCartas >= 4 && quantidadeCartas <= 14 && quantidadeCartas % 2 == 0) {
            requisitos = true;
            iniciaJogo();

        } else {
            quantidadeCartas = prompt("Quantas cartas quer jogar? 4 a 14 cartas, apenas números pares.")
        }
    }
}

function iniciaJogo() {
    for (let cont = 0; cont < quantidadeCartas; cont++) {
        elemento.innerHTML += `
        <div class="card">
            <img src="img/front.png" alt="Front Card">
        </div>
        `;
    }
}

function comparador() { 
	return Math.random() - 0.5; 
}