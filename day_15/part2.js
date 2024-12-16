const fs = require("fs");
const filePath = "./input.txt";
const fileContent = fs.readFileSync(filePath, "utf8").split("\n");

const solve = (input) => {
  let half = input.indexOf("");
  let [grid, directions] = [input.slice(0, half), input.slice(half + 1)];

  // options for directions
  const options = {
    // up and down will be able to extend in multiple directions so
    "^": [-1, 0],
    v: [1, 0],
    "<": [0, -1],
    ">": [0, 1],
  };

  // double the grid with map functions
  grid = grid.map((x) =>
    x
      .split("")
      .map((x) => {
        if (x == "#") return "##";
        if (x == "O") return "[]";
        if (x == "@") return "@.";
        if (x == ".") return "..";
      })
      .join("")
      .split("")
  );

  // filter out directions and make it an array
  directions = directions
    .toString()
    .split("")
    .filter((x) => x != ",");

  // grab @ in the cordinates
  let [x, y] = [0, 0];
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] == "@") {
        [x, y] = [j, i];
      }
    }
  }

  // out of bounds helper that will stop other functions
  const outOfbounds = (x, y) => grid[y][x] == "#";

  // loop through entire directions
  for (let dir of directions) {
    // grab dy and dx
    let [dy, dx] = options[dir];
    let [newX, newY] = [x + dx, y + dy];
    if (outOfbounds(newX, newY)) continue;

    if (grid[newY][newX] == ".") {
      simpleSwap(x, y, newX, newY);
    } else {
      let moved = grabAndMoveBoxes(x, y, newX, newY, dx, dy, dir);
      if (!moved) continue; // if we cant move the boxes continue
    }
    // awda
    [x, y] = [newX, newY];

    console.log(grid.map((t) => t.join("")));
  }

  return getScores(grid); // end of function

  // HElPER FUNCTIONS
  function simpleSwap(x, y, newX, newY) {
    grid[y][x] = ".";
    grid[newY][newX] = "@";
  }

  function grabAndMoveBoxes(x, y, newX, newY, dx, dy, dir) {
    // grab all the boxes
    if (dir != "^" || dir != "v") {
      let boxes = leftRightBoxes(newX, newY, dx);
      if (checkLast(boxes, dx, dy)) return false;
      leftRightMove(x, y, boxes, dx, dy);
    } else {
      let up = dir == "^";
      let down = !up;
      let boxes = upDown(newX, newY, dy, up, down);
      if (checkLast(boxes, dx, dy)) return false;
      upDownMove(x, y, boxes, dx, dy);
    }
    return true;
  }

  function leftRightMove(x, y, cords, dx, dy) {
    let prev = grid[y][x];
    grid[y][x] = ".";
    [x, y] = [x + dx, y + dy];
    cords.forEach((cord) => {
      let [curX, curY] = cord;
      let tmp = grid[curY][curX];
      grid[y][x] = prev;
      prev = tmp;
      [x, y] = [x + dx, y + dy];
    });
    grid[y][x] = prev;
  }

  function leftRightBoxes(newX, newY, moveX) {
    let cords = [];
    while (
      !outOfbounds(newX, newY) &&
      (grid[newY][newX] == "]" || grid[newY][newX] == "[")
    ) {
      cords.push([newX, newY]);
      newX += moveX;
    }

    return cords;
  }

  function upDown(newX, newY, moveY, up, down) {
    let cords = [];
    let visited = new Set();
    let key = (x, y) => `${x},${y}`;
    if (!up && !down) {
      while (
        !outOfbounds(newX, newY) &&
        (grid[newY][newX] == "]" || grid[newY][newX] == "[")
      ) {
        cords.push([newX, newY]);
        newX += moveX;
      }
    } else {
      //up and down helper
    }
    return cords;
  }

  function checkLast(boxes, moveX, moveY) {
    let lastBox = boxes.at(-1);
    return outOfbounds(lastBox[0] + moveX, lastBox[1] + moveY);
  }

  function getScores(grid) {
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
