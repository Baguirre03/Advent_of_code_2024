const fs = require("fs");
const filePath = "./input.txt";
const fileContent = fs.readFileSync(filePath, "utf8").split("\n");

const solve = (input) => {
  let half = input.indexOf("");
  let [grid, directions] = [input.slice(0, half), input.slice(half + 1)];

  let [x, y] = [0, 0];
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] == "@") {
        [x, y] = [i, j];
      }
    }
  }

  const options = {
    "^": [-1, 0],
    v: [1, 0],
    "<": [0, -1],
    ">": [0, 1],
  };

  grid = grid.map((x) => x.split(""));
  directions = directions
    .toString()
    .split("")
    .filter((x) => x != ",");

  const outOfbounds = (x, y) => grid[y][x] == "#";

  for (let i = 0; i < directions.length; i++) {
    let dir = directions[i];
    let [dy, dx] = options[dir];
    let [newX, newY] = [x + dx, y + dy];
    if (outOfbounds(newX, newY)) continue;

    if (grid[newY][newX] == ".") {
      grid[y][x] = ".";
      grid[newY][newX] = "@";
    } else {
      let boxes = grabBoxes(newX, newY, dx, dy);
      if (checkLast(boxes, dx, dy)) continue;
      moveBoxes(x, y, boxes, dx, dy);
    }

    [x, y] = [newX, newY];
  }

  return getScores();

  function moveBoxes(x, y, cords, moveX, moveY) {
    let prev = ".";
    grid[y][x] = prev;
    prev = "@";
    cords.forEach((cord) => {
      let [cordx, cordy] = cord;
      let cur = grid[cordy][cordx];

      let [newX, newY] = [cordx + moveX, cordy + moveY];
      grid[newY][newX] = cur;
      grid[cordy][cordx] = prev;

      prev = cur;
    });
  }

  function grabBoxes(newX, newY, moveX, moveY) {
    let cords = [];
    while (
      !outOfbounds(newX, newY) &&
      (grid[newY][newX] == "O" || grid[newY][newX] == "#")
    ) {
      cords.push([newX, newY]);
      newX += moveX;
      newY += moveY;
    }

    return cords;
  }

  function checkLast(boxes, moveX, moveY) {
    let lastBox = boxes.at(-1);
    return outOfbounds(lastBox[0] + moveX, lastBox[1] + moveY);
  }

  function getScores() {
    let res = 0;
    grid.forEach((row, i) => {
      row.forEach((char, j) => {
        if (char == "O") {
          res += 100 * i + j;
        }
      });
    });

    return res;
  }
};

console.log(solve(fileContent));
