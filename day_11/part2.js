const fs = require("fs");
const filePath = "./input.txt";
const fileContent = fs.readFileSync(filePath, "utf8").split(" ");

// if stone == 0; replaced by number 1
// if stone is even number of digits == two stones
// left stone is left half, right right (no leading zeros)
// if no other rules apply
// olds stone * 2024

const solve = (stones) => {
  let final = 0;
  for (let i = 0; i < stones.length; i++) {
    let tmp = findStone([stones[i]], 1, stones[i]);
    final += tmp;
  }
  return final;
};

let key = (s, step) => `${s}${step}`;
let mp = new Map();
const findStone = (stones, indx, start) => {
  let k = key(start, indx);
  if (indx == 76) {
    return stones.length;
  }

  if (mp.has(k)) return mp.get(k);

  let tmp = [];
  for (let i = 0; i < stones.length; i++) {
    let curStone = stones[i];
    if (evenDigits(curStone)) {
      tmp.push(...leftRight(curStone));
    } else if (curStone == "0") {
      tmp.push("1");
    } else {
      tmp.push((curStone * 2024).toString());
    }
  }
  let count = findStone(tmp, indx + 1, start);
  mp.set(k, count);

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
