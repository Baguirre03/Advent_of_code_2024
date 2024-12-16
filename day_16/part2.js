const fs = require("fs");
const PriorityQueue = require("js-priority-queue");
require("js-priority-queue");
const filePath = "./input.txt";
require("js-priority-queue");
const fileContent = fs
  .readFileSync(filePath, "utf8")
  .split(/\n/)
  .map((x) => x.split(""));

// Start with S
// reach end tile marked iwth E
// move forward increasing score by 1 point
// can rotate clockwise or counterclockwise 90 degrees at a time
// increases score by 1000

const solve = (matrix) => {
  let start = [0, 0];
  matrix.forEach((row, i) => {
    row.forEach((char, j) => {
      if (char == "S") start = [i, j];
    });
  });

  const pq = new PriorityQueue({
    comparator: function (a, b) {
      return a[0] - b[0];
    },
  }); // [weight, r, c]

  const visited = new Set();
  const outOfBounds = (x, y) => matrix[x][y] == "#";
  const checkSet = (x, y, dir) => visited.has(`${x},${y},${dir}`);
  const addSet = (x, y, dir) => visited.add(`${x},${y},${dir}`);

  pq.queue([0, start[0], start[1], "r", [[start[0], start[1]]]]); // weight, r, c, direction, prev
  let res = [];
  while (pq.length) {
    let [w, r, c, curDir, prev] = pq.dequeue();
    addSet(r, c, curDir);

    if (matrix[r][c] == "E") {
      res.push([w, [...prev]]);
    }

    const options = getCords(r, c);
    for (let [x, y, dir] of options) {
      if (checkSet(x, y, dir)) continue;

      if (curDir == dir) {
        pq.queue([w + 1, x, y, dir, [...prev, [x, y]]]);
      } else {
        pq.queue([w + 1001, x, y, dir, [...prev, [x, y]]]);
      }
    }
  }

  let finalSet = new Set();
  let min = res[0][0];
  for (let [score, arr] of res) {
    if (score == min) {
      for (let [x, y] of arr) {
        finalSet.add([x, y].toString());
      }
    }
  }
  return finalSet.size;

  function getCords(x, y) {
    let cords = [];
    const directions = {
      d: [1, 0],
      u: [-1, 0],
      r: [0, 1],
      l: [0, -1],
    };

    for (let [dir, [dx, dy]] of Object.entries(directions)) {
      if (!outOfBounds(x + dx, y + dy)) {
        cords.push([x + dx, y + dy, dir]);
      }
    }
    return cords;
  }
};

console.log(solve(fileContent));
