import fs from "fs";

interface Cube {
    red: number,
    green: number,
    blue: number;
}

interface Game {
    id: number,
    cubes: Cube[],
}

function getGameValueFromString(str: string): Game {
    let gameId = str.replace(':', '').split(' ')[1];
    let values = str.substring(str.indexOf(':') + 1).split(';');
    let cubeList: Cube[] = []
    let lastValue;

    for (let i = 0; i < values.length; i++) {
        let blue = 0;
        let red = 0
        let green = 0;
        let cubeValues = values[i].split(' ');
        for (let j = 0; j < cubeValues.length; j++) {
            lastValue = cubeValues[j - 1]

            if (cubeValues[j].includes('blue')) {
                blue += Number.parseInt(lastValue);
            }
            else if (cubeValues[j].includes('red')) {
                red += Number.parseInt(lastValue);
            }
            else if (cubeValues[j].includes('green')) {
                green += Number.parseInt(lastValue);
            }
        }


        cubeList.push({red: red, blue: blue, green: green})
    }

    return {
        id: Number.parseInt(gameId),
        cubes: cubeList
    };
}


function getPossibleGames(games: Game[], blue: number, green: number, red: number) {
    let possibleGames: Game[] = [];
    let isPossible = true;

    for (const game of games) {
        isPossible = true;

        for (let i = 0; i < game.cubes.length; i++) {
            if (game.cubes[i].blue > blue) {
                isPossible = false;
            }
            else if (game.cubes[i].red > red) {
                isPossible = false;
            }
            else if (game.cubes[i].green > green) {
                isPossible = false;
            }
        }

        if (isPossible) {
            possibleGames.push(game);
        }
    }

    return possibleGames;
}

function getSumOfIdsFromPossibleGames(games: Game[]) {
    let ids = 0;
    for (const game of games) {
        ids += game.id;
    }
    return ids;
}

function getResultOfCubesWithHighestRedGreenBlue(game: Game) {
    let maxRed = 0;
    let maxGreen = 0;
    let maxBlue = 0;

    for (const cube of game.cubes) {
        debugger
        if (cube.green > maxGreen) {
            maxGreen = cube.green;
        }
        if (cube.blue > maxBlue) {
            maxBlue = cube.blue;
        }
        if (cube.red > maxRed) {
            maxRed = cube.red;
        }
    }

    return (maxRed * maxBlue * maxGreen);
}

function getResultOfAllWithHighestRedGreenBlue(games: Game[]) {
    let result = 0;

    for (const game of games) {
        debugger
        result += getResultOfCubesWithHighestRedGreenBlue(game)
    }

    return result;
}



let test =
    [
        'Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green',
        'Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue',
        'Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red',
        'Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red',
        'Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green',
    ]

const words = fs.readFileSync('src/day-02/input.txt', 'utf-8');
const inputList = words.split('\r\n');
let gameList: Game[] = []

for (const inputListElement of inputList) {
    gameList.push(getGameValueFromString(inputListElement));
}

let possibleGames = getPossibleGames(gameList, 14, 13, 12);
console.log(possibleGames)
console.log("Sum of possible games: ", getSumOfIdsFromPossibleGames(possibleGames));

console.log(getResultOfAllWithHighestRedGreenBlue(gameList));