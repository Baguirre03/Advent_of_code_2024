const fs = require("fs");
const filePath = "./input.txt";
const fileContent = fs.readFileSync(filePath, "utf8").split(" ");

// if stone == 0; replaced by number 1
// if stone is even number of digits == two stones
// left stone is left half, right right (no leading zeros)
// if no other rules apply
// olds stone * 2024

const solve = (stones) => {
  return stones.map((x) => dfs(x, 0)).reduce((a, c) => a + c);
};

let key = (curVal, step) => `${curVal},${step}`;
let mp = new Map();

const dfs = (num, indx) => {
  let res = 0;

  if (indx == 75) {
    return 1;
  }

  let k = key(num, indx);
  if (mp.has(k)) return mp.get(k);
  if (evenDigits(num)) {
    let [left, right] = leftRight(num);
    res += dfs(left, indx + 1) + dfs(right, indx + 1);
  } else if (num == "0") {
    res += dfs("1", indx + 1);
  } else {
    res += dfs((num * 2024).toString(), indx + 1);
  }
  mp.set(k, res);
  return mp.get(k);
};

const evenDigits = (stone) => {
  return !(stone.length % 2);
};

const leftRight = (curStone) => {
  let half = curStone.length / 2;
  let [left, right] = [
    curStone.toString().slice(0, half),
    curStone.toString().slice(half),
  ];
  return [left, removeZeros(right)];
};

const removeZeros = (right) => {
  let tmp = +right;
  return tmp.toString();
};

console.log(solve(fileContent));
