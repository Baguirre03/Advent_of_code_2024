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

  let res = 0;
  const outOfBounds = (r, c) =>
    r < 0 || c < 0 || r >= matrix.length || c >= matrix[0].length;

  function search(r, c, prev, indx) {
    let cur = matrix[r][c];
    if (cur != prev + 1) return;
    if (cur == 9) {
      res++;
      return;
    }

    for (let [dx, dy] of directions) {
      if (outOfBounds(r + dx, c + dy)) continue;
      search(r + dx, c + dy, cur, indx);
    }
    return 1;
  }

  heads.forEach((zero, indx) => {
    search(zero[0], zero[1], -1, indx);
  });

  return res;
};

console.log(solve(fileContent));
