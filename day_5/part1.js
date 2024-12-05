const fs = require("fs");
const filePath = "./input.txt";
const fileContent = fs.readFileSync(filePath, "utf8").split("\n");

const solve = (input) => {
  const rules = [];
  const updates = [];
  let half = input.indexOf("");
  updates.push(...input.splice(half + 1));
  rules.push(...input.splice(0, half));

  const mp = new Map();

  for (let rule of rules) {
    let [page, before] = rule.split("|");
    mp.has(page) ? mp.get(page).push(before) : mp.set(page, [before]);
  }

  let res = [];
  for (let update of updates) {
    let arr = update.split(",");
    let inOrder = true;
    for (let i = 0; i < arr.length; i++) {
      let numsAfter = mp.get(arr[i]) || [];
      for (let j = i + 1; j < arr.length; j++) {
        if (!numsAfter.includes(arr[j])) {
          inOrder = false;
          break;
        }
      }
    }
    if (inOrder) res.push(+arr[Math.floor(arr.length / 2)]);
  }
  return res.reduce((acum, cur) => cur + acum, 0);
};

console.log(solve(fileContent));
