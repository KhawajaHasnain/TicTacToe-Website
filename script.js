let game = [".", ".", ".", ".", ".", ".", ".", ".", "."];
let turn = "x";
let win = false;


function convertor (turn, game) {
    let game1 = [];
    
    if (turn === "x") {
        for (let i of game) {
            if (i === "o") {
                game1.push(1);
            }
            else {
                game1.push(2)
            }
        }
    }
    else {
        for (let i of game) {
            if (i === "x") {
                game1.push(1);
            }
            else {
                game1.push(2)
            }
        } 
    }
    return game1;
}

function checkWin (turn, game2) {
    converted = convertor(turn, game2);

    let winning_conditions = [
        [1, 1, 1, 2, 2, 2, 2, 2, 2],
        [2, 2, 2, 1, 1, 1, 2, 2, 2],
        [2, 2, 2, 2, 2, 2, 1, 1, 1],
        [1, 2, 2, 1, 2, 2, 1, 2, 2],
        [2, 1, 2, 2, 1, 2, 2, 1, 2],
        [2, 2, 1, 2, 2, 1, 2, 2, 1],
        [1, 2, 2, 2, 1, 2, 2, 2, 1],
        [2, 2, 1, 2, 1, 2, 1, 2, 2]
    ];

    for (let i of winning_conditions) {
        if (checkAllSame(converted, i)) {
            return true;
        }
    }

    return false;
}

function checkAllSame (arr1, arr2) {
    if (arr1.length !== arr2.length) {return false}

    let count = 0;

    for (let i in arr1) {
        if (arr1[i] === 1 && arr2[i] === 1) {
            count++;
        }
        if (count >= 3) {
            return true
        }
    }

    return false
}

document.querySelector("p").innerText = "Player 1's (x) turn";

let spaces = document.querySelectorAll("button")

spaces.forEach((el, idx) => {
        el.addEventListener("click", () => {
            document.querySelector(".can-do").innerText = ""

            if (win === false) {
                if (game[idx] === ".") {
                    if (turn === "x") {
                        el.querySelector(`.box-${idx + 1}-content-1`).classList.add("cross")
                    }
                    else{
                        el.querySelector(`.box-${idx + 1}-content-1`).classList.add("circle")
                    }

                    game[idx] = turn;

                    if (turn === "x") {
                        turn = "o";
                    }
                    else {
                        turn = "x";
                    }
                }
                else {
                    document.querySelector(".can-do").innerText = "You cannot do that!"
                }

                let winner = turn === "o" ? "1" : "2"

                if (checkWin(turn, game) === true) {
                    document.querySelector(".win").innerText = `Player ${winner} wins`;
                    win = true;
                }

                if (turn === "x") {
                    document.querySelector("p").innerText = "Player 1's (x) turn";
                }
                else {
                    document.querySelector("p").innerText = "Player 2's (o) turn";
                }
            }

            if (win === true) {

                console.log(document.querySelector(".replay").style.visibility)
                document.querySelector(".replay").style.visibility = "visible";
                document.querySelector(".replay").addEventListener("click", () => {
                    location.reload();
                })
            }
        })
})