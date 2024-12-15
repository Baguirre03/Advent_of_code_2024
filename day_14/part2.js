const fs = require("fs");
const filePath = "./input.txt";
const fileContent = fs
  .readFileSync(filePath, "utf8")
  .split(/\n/)
  .map((line) =>
    line
      .split(/[=, ]/)
      .map((num) => +num)
      .filter((x) => !isNaN(x))
  );

const solve = (input) => {
  let arr = Array.from({ length: 103 }, () => Array(101).fill(0));
  let i = 0;
  input.forEach((inp) => {
    let [px, py] = [inp[0], inp[1]];
    arr[py][px] += 1;
  });
  while (unique(arr) || i == 0) {
    for (let j = 0; j < input.length; j++) {
      let inp = input[j];
      let [px, py] = [inp[0], inp[1]];
      let [vx, vy] = [inp[2], inp[3]];

      arr[py][px] -= 1;
      [px, py] = translate(px, py, vx, vy, arr);
      arr[py][px] += 1;
      inp[0] = px;
      inp[1] = py;
    }
    i++;
  }
  return i;
};

const unique = (arr) => arr.flat().filter((x) => x > 1).length >= 1;

function translate(px, py, vx, vy, arr) {
  let newX = (px + vx) % arr[0].length;
  let newY = (py + vy) % arr.length;

  if (newX < 0) newX += arr[0].length;
  if (newY < 0) newY += arr.length;

  return [newX, newY];
}

console.log(solve(fileContent));
