let quantidadeCartas = prompt("Quantas cartas quer jogar? 4 a 14 cartas, apenas números pares.")
const cartas = ['bobrossparrot',
    'explodyparrot',
    'fiestaparrot',
    'metalparrot',
    'revertitparrot',
    'tripletsparrot',
    'unicornparrot'];
let elemento = document.querySelector(".jogo");
let jogadaCount = 0;
let cartasViradas = 0;
let comparadorCarta = [];
let fimDoJogo = false;
let jogando = false;

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
    let htmlCartas = [];
    for (let index = 0; index < quantidadeCartas; index += 2) {
        htmlCartas.push(`<div class="card" onclick="jogada(this)" data-identifier="card">
        <div class="front-face face" data-identifier="back-face">
            <img src="img/front.png" alt="Front Card">
        </div>
        <div class="back-face face virada" data-identifier="front-face">
            <img src="img/${cartas[index / 2]}.gif">
        </div>
    </div>`);
        htmlCartas.push(`<div class="card" onclick="jogada(this)" data-identifier="card">
        <div class="front-face face" data-identifier="back-face">
            <img src="img/front.png" alt="Front Card">
        </div>
        <div class="back-face face virada" data-identifier="front-face">
            <img src="img/${cartas[index / 2]}.gif">
        </div>
    </div>`);
    }
    htmlCartas.sort(comparador);
    for (let cont = 0; cont < quantidadeCartas; cont++) {
        elemento.innerHTML += htmlCartas[cont];
    }
}

function comparador() {
    return Math.random() - 0.5;
}

function jogada(elemento) {
    if (cartasViradas <= 2 && !elemento.querySelector(".back-face").classList.contains("encontrada") && !jogando) {
        viraCartas(elemento);
        jogadaCount++;
        comparadorCarta[cartasViradas] = elemento.innerHTML;
        comparadorCarta[cartasViradas + 2] = elemento;
        cartasViradas++;
        if (comparadorCarta[0] == comparadorCarta[1]) {
            comparadorCarta[2].querySelector(".back-face").classList.add("encontrada");
            comparadorCarta[3].querySelector(".back-face").classList.add("encontrada");
            cartasViradas = 0;
            jogando = true;
            setTimeout(checarFimDoJogo, 1000);
        } else {
            if (cartasViradas == 2) {
                jogando = true;
                setTimeout(desvirarCartas, 1000);
                cartasViradas = 0;
            }
        }
    }
}


function viraCartas(elemento) {
    elemento.querySelector(".front-face").classList.toggle("virada");
    elemento.querySelector(".back-face").classList.toggle("virada");
}

function desvirarCartas() {
    comparadorCarta[2].querySelector(".front-face").classList.toggle("virada");
    comparadorCarta[2].querySelector(".back-face").classList.toggle("virada");
    comparadorCarta[3].querySelector(".front-face").classList.toggle("virada");
    comparadorCarta[3].querySelector(".back-face").classList.toggle("virada");
    comparadorCarta = [];
    jogando = false;

}

function checarFimDoJogo() {
    jogando = false;
    if (document.querySelectorAll(".encontrada").length == document.querySelectorAll(".card").length) {
        alert(`PARABÉNS, VOCÊ TERMINOU O JOGO EM ${jogadaCount} JOGADAS`);
        let jogoNovamente = prompt("Deseja jogar novamente? s ou n");
        if (jogoNovamente == "s") {
            document.querySelector(".jogo").innerHTML = "";
            quantidadeCartas = 0;
            comparadorCarta = [];
            verificarRequisitos();
        }
    }
}
