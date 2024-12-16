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
    [x, y] = [newX, newY];
  }

  return getScores(grid); // end of function

  // HElPER FUNCTIONS
  function simpleSwap(x, y, newX, newY) {
    grid[y][x] = ".";
    grid[newY][newX] = "@";
  }

  function grabAndMoveBoxes(x, y, newX, newY, dx, dy, dir) {
    // grab all the boxes
    if (dir != "^" && dir != "v") {
      let boxes = leftRightBoxes(newX, newY, dx);
      if (checkLast(boxes, dx, dy)) return false;
      leftRightMove(x, y, boxes, dx, dy);
    } else {
      let down = dir == "v";
      let boxes = upDownBoxes(newX, newY, dy);
      if (!checkLastUpDown(boxes, dy)) return false;
      upDownMove(boxes, dy, x, y, down);
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

  function upDownMove(cords, moveY, x, y, down) {
    if (!down) cords.sort((a, b) => (a[1] == b[1] ? a[0] - b[0] : a[1] - b[1]));
    if (down) cords.sort((a, b) => (a[1] == b[1] ? a[0] - b[0] : b[1] - a[1]));
    cords.forEach((cord) => {
      let [x, y] = cord;
      let tmp = grid[y][x];
      grid[y][x] = ".";
      grid[y + moveY][x] = tmp;
    });
    grid[y + moveY][x] = "@";
    grid[y][x] = ".";
  }

  function upDownBoxes(newX, newY, dy) {
    let cords = [];
    let q = [];

    const visited = new Set();
    const inVisit = (x, y) => visited.has(`${x},${y}`);
    const addVisit = (x, y) => visited.add(`${x},${y}`);

    if (grid[newY][newX] == "]") q.push([newX, newY], [newX - 1, newY]);
    else if (grid[newY][newX] == "[") q.push([newX, newY], [newX + 1, newY]);

    while (q.length) {
      let [curX, curY] = q.shift();
      if (inVisit(curX, curY) || outOfbounds(curX, curY)) continue;
      addVisit(curX, curY);

      if (grid[curY][curX] == "[" || grid[curY][curX] == "]")
        cords.push([curX, curY]);

      if (grid[curY + dy][curX] == "[") {
        q.push([curX, curY + dy], [curX + 1, curY + dy]);
      } else if (grid[curY + dy][curX] == "]") {
        q.push([curX, curY + dy], [curX - 1, curY + dy]);
      }
    }

    return cords;
  }

  function checkLast(boxes, moveX, moveY) {
    let lastBox = boxes.at(-1);
    return outOfbounds(lastBox[0] + moveX, lastBox[1] + moveY);
  }

  function checkLastUpDown(boxes, moveY) {
    for (let cord of boxes) {
      if (outOfbounds(cord[0], cord[1] + moveY)) return false;
    }
    return true;
  }

  function getScores(grid) {
    let res = 0;
    grid.forEach((row, i) => {
      row.forEach((char, j) => {
        if (char == "[") {
          res += 100 * i + j;
        }
      });
    });

    return res;
  }
};

console.log(solve(fileContent));
