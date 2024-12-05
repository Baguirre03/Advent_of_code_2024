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
      for (let j = 0; j < arr.length - i - 1; j++) {
        let compare = mp.get(arr[j]) || [];
        if (!compare.includes(arr[j + 1])) {
          let tmp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = tmp;
          inOrder = false;
        }
      }
    }
    let m = Math.floor(arr.length / 2);
    if (!inOrder) res.push(+arr[m]);
  }
  return res.reduce((acum, cur) => cur + acum, 0);
};

console.log(solve(fileContent));
