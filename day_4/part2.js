const fs = require("fs");
const filePath = "./input.txt";
const fileContent = fs.readFileSync(filePath, "utf8").split("\n");

const directions = {
  UL: [-1, -1],
  UR: [-1, 1],
  DL: [1, -1],
  DR: [1, 1],
};

const matrix = fileContent.map((x) => x.split(""));
let res = Array.from({ length: matrix.length }, () =>
  Array(matrix[0].length).fill(0)
);
const xmas = ["M", "A", "S"];

const outOfBounds = (r, c, indx, dir) =>
  r < 0 ||
  c < 0 ||
  r >= matrix.length ||
  c >= matrix[0].length ||
  matrix[r][c] !== xmas[indx];

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
  let final = 0;
  res.forEach((row) => {
    row.forEach((x) => {
      if (x >= 2) final += x - 1;
    });
  });
  return final;
};

function dfs(r, c, indx, direction, prev) {
  if (outOfBounds(r, c, indx, direction)) return;
  if (indx == 2) {
    let [prevX, prevY] = prev;
    res[prevX][prevY] += 1;
  }

  let [x, y] = directions[direction];
  dfs(r + x, c + y, indx + 1, direction, [r, c]);

  return;
}

console.log(solve(matrix));
