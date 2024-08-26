// FUNÇÕES DE ESTRUTURAÇÃO DA LÓGICA DO JOGO DA VELHA:

// Define qual jogador será "X" e "O"
function getPlayerRole(player1Nick, player2Nick) {
    const randomNumber = Math.floor(Math.random() * 10 + 1)
    if(randomNumber < 5) {
        return {
            firstPlayerInfo: {
                nick: player1Nick,
                role: "X"
            },
            secondPlayerInfo: {
                nick: player2Nick,
                role: "O"
            }
            }
    }else {
        return {
            firstPlayerInfo: {
                nick: player2Nick,
                role: "X"
            },
            secondPlayerInfo: {
                nick: player1Nick,
                role: "O"
            }
        }
    }
}

// Troca a vez dos jogadores
function switchPlayerTurn(firstPlayer, secondPlayer, currentPlayer) {
    if(currentPlayer === firstPlayer) {
        currentPlayer = secondPlayer
        return currentPlayer
    }else {
        currentPlayer = firstPlayer
        return currentPlayer
    }
}

// Verifica se há um vencedor
function checkWinningCombination(allBtns, currentPlayer, firstPlayer, secondPlayer) {
    let gameState = []
    for(let i = 0; i < allBtns.length; i++) {
        let currentBtn = allBtns[i]
        let currentInnerText = currentBtn.innerText
        gameState.push(currentInnerText)
    }

    const winningCombinations = [
        [0, 1, 2], // Linha 1
        [3, 4, 5], // Linha 2
        [6, 7, 8], // Linha 3
        [0, 3, 6], // Coluna 1
        [1, 4, 7], // Coluna 2
        [2, 5, 8], // Coluna 3
        [0, 4, 8], // Diagonal principal
        [2, 4, 6]  // Diagonal secundária
    ]

    let winnerFound = false
    winningCombinations.forEach(function(comb) {
        const [a, b, c] = comb //Ex: [0, 1, 2]
        if(gameState[a] != '' && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            currentPlayer = switchPlayerTurn(firstPlayer, secondPlayer, currentPlayer)
            alert(`O jogador ${currentPlayer.nick} ganhou!`)
            winnerFound = true

            // Colore os botões para indicar vitória
            allBtns[a].style.backgroundColor = '#4dff91'
            allBtns[b].style.backgroundColor = '#4dff91'
            allBtns[c].style.backgroundColor = '#4dff91'

            // Desabilita os botões
            for(let i = 0; i < allBtns.length; i++) {
                allBtns[i].disabled = true
            }
        }
    })

    // Verifica se há um empate
    if (!winnerFound && !gameState.includes('')) {
        alert('Empate!')

        // Colore os botões para indicar empate
        for(let i=0; i<allBtns.length;i++) {
            allBtns[i].style.backgroundColor = '#ff0043'
            allBtns[i].disabled = true
        }
    }
}

// Espera o conteúdo HTML ser carregado
document.addEventListener('DOMContentLoaded', function() {
    const modal = new bootstrap.Modal(document.getElementById('nicknamesModal'))
    modal.show()

    // Espera o botão de continuar ser clicado para começar o jogo
    document.getElementById('btn-continue').addEventListener('click', function(ev) {
        const player1Nick = document.getElementById('player1Nick').value
        const player2Nick = document.getElementById('player2Nick').value
        modal.hide()

        const roleDatabase = getPlayerRole(player1Nick, player2Nick)
        // Define qual jogador começará
        const firstPlayer = roleDatabase.firstPlayerInfo
        const secondPlayer = roleDatabase.secondPlayerInfo

        let currentPlayer = firstPlayer

        let currentPlayerInfo = document.getElementById('info')
            currentPlayerInfo.innerText = `É o turno do jogador ${currentPlayer.nick}`

        const allBtns = document.querySelectorAll('.table-btn')
        allBtns.forEach(function (btn) {
            btn.addEventListener('click', gameSetup);
        })
        function gameSetup(ev) {
            const currentBtn = ev.currentTarget
            let currentInnerText = currentBtn.innerText

            if(currentInnerText.trim() === '') {
                currentBtn.innerText = currentPlayer.role
                currentPlayer = switchPlayerTurn(firstPlayer, secondPlayer, currentPlayer)
                currentPlayerInfo.innerText = `É o turno do jogador ${currentPlayer.nick}`
            }

            // Checa se há um vencedor sempre que um botão é clicado
            checkWinningCombination(allBtns, currentPlayer, firstPlayer, secondPlayer)
        }

        document.getElementById('btn-reset').addEventListener('click', gameReset)
        // Reseta o jogo
        function gameReset() {
            const allBtns = document.querySelectorAll('.table-btn')
                // Limpa os innerText de todos os botões
                allBtns.forEach(function (btn) {
                    btn.innerText = ''
                })

                // Reseta a cor dos botões
                allBtns.forEach(function (btn) {
                    btn.style.backgroundColor = ''
                })

                // Define qual jogador começará novamente
                currentPlayer = firstPlayer
                currentPlayerInfo.innerText = `É o turno do jogador ${currentPlayer.nick}`

                // Habilita os botões novamente
                for(let i = 0; i < allBtns.length; i++) {
                    allBtns[i].disabled = false
                }
        }
    })
})