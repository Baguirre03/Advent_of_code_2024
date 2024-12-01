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

  left.sort((a, b) => a - b);
  right.sort((a, b) => a - b);

  let res = 0;
  for (let i = 0; i < left.length; i++) {
    res += Math.abs(left[i] - right[i]);
  }

  return res;
};

console.log(solve(fileContent));
