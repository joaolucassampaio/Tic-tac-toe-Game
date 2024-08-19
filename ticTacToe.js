//Espera o DOM carregar para inicialização
document.addEventListener('DOMContentLoaded', function() {
    // Criar um novo Modal do Bootstrap
    const modal = new bootstrap.Modal(document.getElementById('nicknamesModal'));
    modal.show();

    //Espera o botão de continuar ser clicado
    document.getElementById('btn-continue').addEventListener('click', function(ev) {
        const player1Nick = document.getElementById('player1Nick').value;
        const player2Nick = document.getElementById('player2Nick').value;
        modal.hide()

        const role = selectPlayerRole(player1Nick, player2Nick);

        const firstPlayer = role.x
        const secondPlayer = role.o

        let isPlayer1turn = true

        //Combinações de vitória
        const winningCombinations = [
            ["btn-00", "btn-01", "btn-02"], // Linha superior
            ["btn-10", "btn-11", "btn-12"], // Linha do meio
            ["btn-20", "btn-21", "btn-22"], // Linha inferior
            ["btn-00", "btn-10", "btn-20"], // Coluna esquerda
            ["btn-01", "btn-11", "btn-21"], // Coluna do meio
            ["btn-02", "btn-12", "btn-22"], // Coluna direita
            ["btn-00", "btn-11", "btn-22"], // Diagonal principal
            ["btn-02", "btn-11", "btn-20"]  // Diagonal secundária
        ];

        document.getElementById('btn-00').addEventListener('click', )
        document.getElementById('btn-01').addEventListener('click', )
        document.getElementById('btn-02').addEventListener('click', )
        document.getElementById('btn-10').addEventListener('click', )
        document.getElementById('btn-11').addEventListener('click', )
        document.getElementById('btn-12').addEventListener('click', )
        document.getElementById('btn-20').addEventListener('click', )
        document.getElementById('btn-21').addEventListener('click', )
        document.getElementById('btn-22').addEventListener('click', )
    });
});

// Função para escolher o jogador que será o 'x' ou 'o'
function selectPlayerRole(player1, player2) {
    // Gera um número aleatório entre 0 e 1
    const randomNumber = Math.random();
    
    if (randomNumber < 0.5) {
        return {
            x: player1,
            o: player2
        };
    } else {
        return {
            x: player2,
            o: player1
        };
    }
}

function switchPlayer(firstPlayer, secondPlayer) {
    document.getElementById('info').innerText = ``
}