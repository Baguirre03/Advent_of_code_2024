const fs = require("fs");
const filePath = "./input.txt";
const fileContent = fs
  .readFileSync(filePath, "utf8")
  .split("\n")
  .map((x) => x.split(""));

//price of fence required for a region is found by multiplying that region's area by its perimeter. The total price

const solve = (input) => {
  let rows = input.length;
  let cols = input[0].length;
  const outOfBounds = (r, c, l, t) => {
    const cases = r < 0 || c < 0 || r >= rows || c >= cols || input[r][c] != l;
    return t ? cases || visited.has([r, c].toString()) : cases;
  };

  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  let res = 0;
  let cords = [];
  let visited = new Set();
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (!visited.has([r, c].toString())) {
        let letter = input[r][c];
        let [area, p] = [search(r, c, letter, 0), 0];
        cords.forEach((cord) => {
          p += findPerimeter(cord[0], cord[1], letter);
        });
        cords = [];
        res += area * p;
      }
    }
  }

  return res;

  function search(r, c, letter, count) {
    let res = 0;
    if (outOfBounds(r, c, letter, true)) return 0;
    visited.add([r, c].toString());
    cords.push([r, c]);
    for (let [dx, dy] of directions) {
      if (outOfBounds(r + dx, c + dy, letter)) continue;
      res += search(r + dx, c + dy, letter, count + 1);
    }

    return res + 1;
  }

  function findPerimeter(r, c, letter) {
    let sides = directions.map((x) => {
      return [x[0] + r, x[1] + c];
    });
    let perimeter = 0;
    sides.forEach((side) => {
      let [x, y] = side;
      if (outOfBounds(x, y, letter, false)) {
        perimeter++;
      }
    });

    return perimeter;
  }
};

console.log(solve(fileContent));
