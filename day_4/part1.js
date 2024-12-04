const fs = require("fs");
const filePath = "./input.txt";
const fileContent = fs.readFileSync(filePath, "utf8").split("\n");

const directions = [
  [-1, 0],
  [1, 0],
  [0, 1],
  [0, -1],
  [-1, -1],
  [-1, 1],
  [1, -1],
  [1, 1],
];

const matrix = fileContent.map((x) => x.split(""));
const xmas = ["X", "M", "A", "S"];
const visited = new Set();
const addVisit = (r, c, indx) => visited.add([r, c, indx].toString());
const checkVisit = (r, c, indx) => visited.has([r, c, indx].toString());

const outOfBounds = (r, c, indx) =>
  r < 0 ||
  c < 0 ||
  r >= matrix.length ||
  c >= matrix[0].length ||
  matrix[r][c] != xmas[indx] ||
  checkVisit(r, c, indx);

let res = 0;

const solve = () => {
  let ROWS = matrix.length;
  let COLS = matrix[0].length;
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (matrix[r][c] == "X") {
        dfs(r, c, 0);
      }
    }
  }

  return res;
};

function dfs(r, c, indx) {
  if (outOfBounds(r, c, indx)) return;
  addVisit(r, c, indx);
  if (indx == 3) {
    res++;
  }

  for (let [x, y] of directions) {
    dfs(x + r, c + y, indx + 1);
  }
}

console.log(solve(matrix));
