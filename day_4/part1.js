const fs = require("fs");
const filePath = "./input.txt";
const fileContent = fs.readFileSync(filePath, "utf8").split("\n");

const directions = {
  L: [-1, 0],
  R: [1, 0],
  D: [0, 1],
  U: [0, -1],
  UL: [-1, -1],
  UR: [-1, 1],
  DL: [1, -1],
  DR: [1, 1],
};

const matrix = fileContent.map((x) => x.split(""));
const xmas = ["X", "M", "A", "S"];

const outOfBounds = (r, c, indx, dir) =>
  r < 0 ||
  c < 0 ||
  r >= matrix.length ||
  c >= matrix[0].length ||
  matrix[r][c] !== xmas[indx];

let res = 0;
const solve = () => {
  let ROWS = matrix.length;
  let COLS = matrix[0].length;
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (matrix[r][c] == xmas[0]) {
        const dirs = [...Object.keys(directions)];
        dirs.forEach((d) => {
          dfs(r, c, 0, d);
        });
      }
    }
  }

  return res;
};

function dfs(r, c, indx, direction) {
  if (outOfBounds(r, c, indx, direction)) return;

  if (indx == 3) {
    res += 1;
  }
  let [x, y] = directions[direction];
  dfs(r + x, c + y, indx + 1, direction);

  return;
}

console.log(solve(matrix));
