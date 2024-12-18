const fs = require("fs");
const filePath = "./input.txt";
const fileContent = fs.readFileSync(filePath, "utf8").split("\n");

// x cordinate is from the left
// y is from top

const l = 70;
const byte = 1025;
const solve = (input) => {
  // declare array and fill in bytes
  const arr = Array.from({ length: l + 1 }, () => Array(l + 1).fill("."));
  input.forEach((inp, indx) => {
    if (indx < byte) {
      let [x, y] = inp.split(",").map((x) => +x);
      arr[y][x] = "#";
    }
  });

  // search
  let [x, y] = [0, 0];
  let end = [arr.length - 1, arr.length - 1];

  const outOfBounds = (x, y) =>
    x < 0 || y < 0 || x >= arr[0].length || y >= arr.length || arr[y][x] == "#";
  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  return search(x, y);

  function search(x, y) {
    let q = [[0, x, y]]; // [steps, x, y]
    const visited = new Set();
    const checkVisit = (x, y) => visited.has(`${x},${y}`);
    const addVisit = (x, y) => visited.add(`${x},${y}`);

    while (q.length) {
      let curLength = q.length;
      for (let i = 0; i < curLength; i++) {
        let [steps, curX, curY] = q.shift();
        if (curX == end[0] && curY == end[1]) return steps;
        for (let [dx, dy] of directions) {
          let newX = dx + curX;
          let newY = dy + curY;
          if (!outOfBounds(newX, newY) && !checkVisit(newX, newY)) {
            addVisit(newX, newY);
            q.push([steps + 1, newX, newY]);
          }
        }
      }
    }
  }
};

console.log(solve(fileContent));
