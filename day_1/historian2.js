const fs = require("fs");
const filePath = "./input.txt";
const fileContent = fs.readFileSync(filePath, "utf8");

const solve = (input) => {
  let left = [];
  let right = [];
  let cur = 0;
  input
    .split(/[\n\s]/)
    .filter((x) => x.length)
    .map((x) => +x)
    .forEach((x) => {
      cur % 2 ? right.push(x) : left.push(x);
      cur++;
    });

  let res = 0;
  let mp = new Map();
  right.forEach((x) => {
    mp.set(x, mp.get(x) + 1 || 1);
  });

  left.forEach((x) => {
    res += x * mp.get(x) || 0;
  });

  return res;
};

console.log(solve(fileContent));
