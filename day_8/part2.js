const fs = require("fs");
const filePath = "./input.txt";
const fileContent = fs.readFileSync(filePath, "utf8").split("\n");

const solve = (input) => {
  const mp = new Map();
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      let char = input[i][j];
      if (char != ".") {
        mp.has(char) ? mp.get(char).push([j, i]) : mp.set(char, [[j, i]]);
      }
    }
  }

  let set = new Set();
  const outOfBounds = (x, y) =>
    x < 0 || y < 0 || x >= input.length || y >= input[0].length;

  const cases = {
    0: ["+", "-"],
    1: ["-", "+"],
    2: ["-", "-"],
    3: ["+", "+"],
  };

  const addSubtract = (cords, plusMinus, dx, dy) => {
    let [plus, plus2] = plusMinus;
    let x = 0;
    let y = 0;
    x = plus == "+" ? cords[0] + dx : cords[0] - dx;
    y = plus2 == "+" ? cords[1] + dy : cords[1] - dy;
    return [x, y];
  };

  function testCords(cords, indx, dx, dy) {
    set.add([cords[0], cords[1]].toString());
    let [x, y] = addSubtract(cords, cases[indx], dx, dy);
    while (!outOfBounds(x, y)) {
      set.add([x, y].toString());
      [x, y] = addSubtract([x, y], cases[indx], dx, dy);
    }

    return;
  }

  for (let cords of mp.values()) {
    if (cords.length == 1) continue;
    for (let i = 0; i < cords.length; i++) {
      let cord1 = cords[i];
      for (let j = i + 1; j < cords.length; j++) {
        let cord2 = cords[j];
        let [dx, dy] = getDxDy(cord1, cord2);
        const rightSlant = cord1[0] - cord2[0] > 0;
        if (rightSlant) {
          testCords(cord1, 0, dx, dy);
          testCords(cord2, 1, dx, dy);
        } else {
          testCords(cord1, 2, dx, dy);
          testCords(cord2, 3, dx, dy);
        }
      }
    }
  }
  return set.size;
};

const getDxDy = (cord1, cord2) => [
  Math.abs(cord1[0] - cord2[0]),
  Math.abs(cord1[1] - cord2[1]),
];

console.log(solve(fileContent));
