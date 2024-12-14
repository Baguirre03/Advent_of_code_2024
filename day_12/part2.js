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
        let [area, p] = [search(r, c, letter, 0), findPerimeter(cords, letter)];
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

  function findPerimeter(cords, letter) {
    let dict = {
      u: 0,
      l: 0,
      r: 0,
      d: 0,
    };

    const mp = new Map();
    const key = (x, y) => [x, y].toString();

    // DOWN FUNCTIONS
    const addType = (x, y, type) => {
      let k = key(x, y);
      if (!mp.has(k)) return true;
      let opts = mp.get(k);
      return !opts.has(type);
    };

    const addTypeSet = (x, y, type) => {
      let k = key(x, y);
      if (mp.has(k)) mp.get(k).add(type);
      else mp.set(k, new Set(type));
    };

    for (let cord of cords) {
      cords.sort((a, b) => (a[0] == b[0] ? a[1] - b[1] : a[0] - b[0]));
      let [x, y] = cord;
      // x goes up and down
      // y goes left and right.

      // look up
      if (outOfBounds(x - 1, y, letter, false)) {
        addTypeSet(x, y, "u");
        if (addType(x, y - 1, "u") && addType(x, y + 1, "u")) {
          dict["u"]++;
        }
      }
      // look down
      if (outOfBounds(x + 1, y, letter, false)) {
        addTypeSet(x, y, "d");
        if (addType(x, y - 1, "d") && addType(x, y + 1, "d")) {
          dict["d"]++;
        }
      }

      // look left
      if (outOfBounds(x, y - 1, letter, false)) {
        addTypeSet(x, y, "l");
        if (addType(x + 1, y, "l") && addType(x - 1, y, "l")) {
          dict["l"]++;
        }
      }

      // look right
      if (outOfBounds(x, y + 1, letter, false)) {
        addTypeSet(x, y, "r");
        if (addType(x + 1, y, "r") && addType(x - 1, y, "r")) {
          dict["r"]++;
        }
      }
    }

    return Object.values(dict).reduce((c, a) => a + c);
  }
};

console.log(solve(fileContent));
