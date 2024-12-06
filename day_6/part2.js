const fs = require("fs");
const filePath = "./input.txt";
const fileContent = fs
  .readFileSync(filePath, "utf8")
  .split("\n")
  .map((x) => x.split(""));

let move = ["up", "right", "down", "left"];

const directions = {
  up: [-1, 0],
  down: [1, 0],
  right: [0, 1],
  left: [0, -1],
};

const solve = (input) => {
  let start = [];
  let res = 0;
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      if (input[i][j] == "^") {
        start = [i, j];
      }
    }
  }

  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      if (input[i][j] === ".") {
        input[i][j] = "#";
        res += checkCycle(input, start[0], start[1], 0);
        input[i][j] = ".";
      }
    }
  }

  return res;
};

function checkCycle(input, i, j, indx) {
  let mp = new Set();
  const outOfBounds = (i, j) =>
    i < 0 || j < 0 || i >= input.length || j >= input[0].length;

  while (true) {
    let [dx, dy] = directions[move[indx]];
    let tmpI = i;
    let tmpJ = j;
    i = i + dx;
    j = j + dy;
    if (mp.has([i, j, indx].toString())) return 1;
    if (outOfBounds(i, j)) break;
    if (input[i][j] == "#") {
      mp.add([i, j, indx].toString());
      indx = indx == 3 ? 0 : indx + 1;
      i = tmpI;
      j = tmpJ;
    }
  }

  return 0;
}

console.log(solve(fileContent));
