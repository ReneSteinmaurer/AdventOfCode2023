import * as fs from 'fs';

const words = fs.readFileSync('src/day-01/input.txt', 'utf-8');
const inputList = words.split('\r\n');
const testList = [
    'two1nine',
    'eightwothree',
    'abcone2threexyz',
    'xtwone3four',
    '4nineeightseven2',
    'zoneight234',
    '7pqrstsixteen']
let sumOfAllNumbers = 0;

function getNumberSumFromString(str: string):number {
    let stringBuilder = '';
    let elements: string[] = [];
    for (const strElement of str) {
        stringBuilder += strElement;

        if (strElement.match(/\d+/)) {
            elements.push(strElement);
            stringBuilder = '';
        }
        else if (stringBuilder.includes("one")) {
            elements.push("1");
            stringBuilder = '';
        }
        else if (stringBuilder.includes("two")) {
            elements.push("2");
            stringBuilder = '';
        }
        else if (stringBuilder.includes("three")) {
            elements.push("3");
            stringBuilder = '';
        }
        else if (stringBuilder.includes("four")) {
            elements.push("4");
            stringBuilder = '';
        }
        else if (stringBuilder.includes("five")) {
            elements.push("5");
            stringBuilder = '';
        }
        else if (stringBuilder.includes("six")) {
            elements.push("6");
            stringBuilder = '';
        }
        else if (stringBuilder.includes("seven")) {
            elements.push("7");
            stringBuilder = '';
        }
        else if (stringBuilder.includes("eight")) {
            elements.push("8");
            stringBuilder = '';
        }
        else if (stringBuilder.includes("nine")) {
            elements.push("9");
            stringBuilder = '';
        }

    }
    debugger
    return Number.parseInt(elements[0] + elements[elements.length - 1]);
}

for (const input of inputList) {
    sumOfAllNumbers += getNumberSumFromString(input);
}

console.log(sumOfAllNumbers)