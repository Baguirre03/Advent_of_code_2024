const fs = require("fs");
const filePath = "./input.txt";
const fileContent = fs.readFileSync(filePath, "utf8");

const solve = (input) => {
  const regex = /mul\(\d+,\d+\)/g;
  let arr = [...input.matchAll(regex)].map((x) => x[0]);
  let res = 0;
  for (let line of arr) {
    let curArr = line.split("");

    let start = curArr.indexOf("(");
    curArr = curArr.splice(start + 1);
    curArr.pop();

    let [num1, num2] = curArr.join("").split(",");
    if (doIt) res += +num1 * +num2;
  }

  return res;
};

console.log(solve(fileContent));
