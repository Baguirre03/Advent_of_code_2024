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
  const inBounds = (x, y) => {
    if (x < 0 || y < 0 || x >= input.length || y >= input[0].length)
      return false;

    set.add([x, y].toString());
    return true;
  };

  for (let cords of mp.values()) {
    for (let i = 0; i < cords.length; i++) {
      let cord1 = cords[i];
      for (let j = i + 1; j < cords.length; j++) {
        let cord2 = cords[j];
        let [dx, dy] = getDxDy(cord1, cord2);
        const rightSlant = cord1[0] - cord2[0] > 0;
        if (rightSlant) {
          inBounds(cord1[0] + dx, cord1[1] - dy);
          inBounds(cord2[0] - dx, cord2[1] + dy);
        } else {
          inBounds(cord1[0] - dx, cord1[1] - dy);
          inBounds(cord2[0] + dx, cord2[1] + dy);
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
