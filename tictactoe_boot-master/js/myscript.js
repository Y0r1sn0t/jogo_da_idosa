

// Jogo da velha - Noah contra Kaleb
document.addEventListener('DOMContentLoaded', function () {

    const celulas = document.querySelectorAll('[data-celula]');
    const status = document.querySelector('.status');
    const aviso = document.getElementById('aviso-resultado');
    const mensagemAviso = document.getElementById('mensagem-resultado');

    let jogadorAtual = 'Noah';
    let jogoAtivo = true;
    let temporizadorReset = null;

    let tabuleiro = ['', '', '', '', '', '', '', '', ''];

    const possibilidades = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    // Função para realizar uma jogada
    function clica(celula) {

        const indice = Array.from(celulas).indexOf(celula);

        if (indice === -1 || tabuleiro[indice] !== '' || !jogoAtivo) {
            return;
        }

        tabuleiro[indice] = jogadorAtual;
        celula.appendChild(carregaImagem(jogadorAtual));

        // Verifica se o jogador venceu
        if (verifica(jogadorAtual)) {

            jogoAtivo = false;
            status.textContent = `${jogadorAtual} venceu!`;

            mostrarResultado(`${jogadorAtual} venceu!`);
            return;
        }

        // Verifica se ainda existem espaços vazios
        if (tabuleiro.includes('')) {

            jogadorAtual = jogadorAtual === 'Noah' ? 'Kaleb' : 'Noah';
            status.textContent = `Próximo jogador: ${jogadorAtual}`;

        } else {

            jogoAtivo = false;
            status.textContent = 'Empate!';

            mostrarResultado('Empate!');
        }
    }

    // Verifica as possibilidades de vitória
    function verifica(jogador) {

        return possibilidades.some((jogada) =>
            jogada.every((indice) => tabuleiro[indice] === jogador)
        );
    }

    // Carrega a imagem correspondente ao jogador
    function carregaImagem(jogador) {

        const imagem = new Image();

        imagem.src = jogador === 'Noah'
            ? 'images/Noah.png'
            : 'images/kaleb.png';

        imagem.alt = jogador;

        return imagem;
    }

    // Exibe o aviso de vitória ou empate
    function mostrarResultado(mensagem) {

        mensagemAviso.textContent = mensagem;

        aviso.classList.add('mostrar');
        aviso.setAttribute('aria-hidden', 'false');

        // Mantém o aviso visível por 3 segundos
        temporizadorReset = window.setTimeout(function () {

            aviso.classList.remove('mostrar');
            aviso.setAttribute('aria-hidden', 'true');

            // Aguarda o aviso desaparecer antes de reiniciar
            window.setTimeout(resetJogo, 400);

        }, 3000);
    }

    // Reinicia o jogo automaticamente
    function resetJogo() {

        if (temporizadorReset !== null) {
            window.clearTimeout(temporizadorReset);
            temporizadorReset = null;
        }

        tabuleiro = ['', '', '', '', '', '', '', '', ''];

        jogoAtivo = true;
        jogadorAtual = 'Noah';

        celulas.forEach((celula) => {
            celula.replaceChildren();
        });

        status.textContent = 'Próximo jogador: Noah';
    }

    // Adiciona os eventos de clique às células
    celulas.forEach((celula) => {

        celula.addEventListener('click', function () {
            clica(celula);
        });

    });

    status.textContent = 'Próximo jogador: Noah';

});
