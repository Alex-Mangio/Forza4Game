let redPlayer = 'R'
let yellowPlayer = 'Y'
let currentPlayer = redPlayer

let gameOver = false
let grid
let currentColumns

let rows = 6
let columns = 7

window.onload = function () {
    setGame();
}

function setGame() {
    grid = [];
    currentColumns = [5, 5, 5, 5, 5, 5, 5]
    for (let i = 0; i < rows; i++) {
        let row = []
        for (let j = 0; j < columns; j++) {
            row.push(' ')
            let tile = document.createElement("div")
            tile.id = i.toString() + '-' + j.toString()
            tile.classList.add("tile")
            tile.addEventListener("click", setMove)
            document.getElementById("grid").append(tile)

        }
        grid.push(row)
    }
}

function setMove() {
    if (gameOver)
        return

    let space = this.id.split("-")
    let i = parseInt(space[0])
    let j = parseInt(space[1])

    i = currentColumns[j]

    if (i < 0)
        return

    grid[i][j] = currentPlayer
    let tile = document.getElementById(i.toString() + "-" + j.toString())

    if (currentPlayer == redPlayer) {
        tile.classList.add("red")
        currentPlayer = yellowPlayer
    }
    else {
        tile.classList.add("yellow")
        currentPlayer = redPlayer
    }

    i -= 1
    currentColumns[j] = i

    checkWinner()
}

function checkWinner() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns - 3; j++) {
            if (grid[i][j] != ' ') {
                if (grid[i][j] == grid[i][j + 1] && grid[i][j + 1] == grid[i][j + 2] && grid[i][j + 2] == grid[i][j + 3]) {
                    setWinner(i, j)
                    return
                }
            }
        }
    }
    for (let j = 0; j < columns; j++) {
        for (let i = 0; i < rows - 3; i++) {
            if (grid[i][j] != ' ') {
                if (grid[i][j] == grid[i + 1][j] && grid[i + 1][j] == grid[i + 2][j] && grid[i + 2][j] == grid[i + 3][j]) {
                    setWinner(i, j)
                    return
                }
            }
        }
    }

    for (let i = 0; i < rows - 3; i++) {
        for (let j = 0; j < columns - 3; j++) {
            if (grid[i][j] != ' ') {
                if (grid[i][j] == grid[i + 1][j + 1] && grid[i + 1][j + 1] == grid[i + 2][j + 2] && grid[i + 2][j + 2] == grid[i + 3][j + 3]) {
                    setWinner(i, j)
                    return
                }
            }
        }
    }

    for (let i = 3; i < rows; i++) {
        for (let j = 0; j < columns - 3; j++) {
            if (grid[i][j] != ' ') {
                if (grid[i][j] == grid[i - 1][j + 1] && grid[i - 1][j + 1] == grid[i - 2][j + 2] && grid[i - 2][j + 2] == grid[i - 3][j + 3]) {
                    setWinner(i, j)
                    return
                }
            }
        }
    }
}

function setWinner(i, j) {
    if (grid[i][j] == redPlayer) {
        document.getElementById("winner").innerText = "RED PLAYER WINS"
        document.getElementById("winner").style.color = "red"
        gameOver = true
    }
    else {
        document.getElementById("winner").innerText = "YELLOW PLAYER WINS"
        document.getElementById("winner").style.color = "yellow"
        gameOver = true
    }
}
