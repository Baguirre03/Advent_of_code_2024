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
  let indx = 0;
  let start = [];
  const res = Array.from({ length: input.length }, () =>
    Array(input[0].length).fill(".")
  );
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      if (input[i][j] == "^") {
        start = [i, j];
      }
    }
  }

  let i = start[0];
  let j = start[1];
  res[i][j] = "X";
  const outOfBounds = (i, j) =>
    i < 0 || j < 0 || i >= input.length || j >= input[0].length;

  while (true) {
    let [dx, dy] = directions[move[indx]];
    let tmpI = i;
    let tmpJ = j;
    i = i + dx;
    j = j + dy;
    if (outOfBounds(i, j)) break;
    if (input[i][j] == "#") {
      indx = indx == 3 ? 0 : indx + 1;
      i = tmpI;
      j = tmpJ;
    }
    res[i][j] = "X";
  }

  return res.flat(Infinity).reduce((acum, cur) => {
    return cur == "X" ? acum + 1 : acum;
  }, 0);
};

console.log(solve(fileContent));
