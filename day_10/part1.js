const fs = require("fs");
const filePath = "./input.txt";
const fileContent = fs
  .readFileSync(filePath, "utf8")
  .split("\n")
  .map((x) => x.split("").map((x) => +x));

const directions = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

const solve = (matrix) => {
  let heads = [];
  matrix.forEach((inp, i) => {
    inp.forEach((num, j) => {
      if (num == "0") heads.push([i, j]);
    });
  });

  const outOfBounds = (r, c) =>
    r < 0 || c < 0 || r >= matrix.length || c >= matrix[0].length;

  const visited = new Set();
  const key = (r, c) => `${r},${c}`;

  function search(r, c, prev) {
    let cur = matrix[r][c];
    if (cur != prev + 1) return 0;
    if (cur == 9 && !visited.has(key(r, c))) {
      visited.add(key(r, c));
      return 1;
    }
    let score = 0;
    for (let [dx, dy] of directions) {
      if (outOfBounds(r + dx, c + dy)) continue;
      score += search(r + dx, c + dy, cur);
    }

    return score;
  }

  heads.forEach((x, indx) => {
    heads[indx] = search(x[0], x[1], -1);
    visited.forEach((nine) => visited.delete(nine));
  });

  return heads.reduce((cur, acum) => cur + acum);
};
794;

console.log(solve(fileContent));
