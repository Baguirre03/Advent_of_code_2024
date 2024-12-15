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
  for (let i = 0; i < input.length; i++) {
    let inp = input[i];
    let [px, py] = [inp[0], inp[1]];
    let [vx, vy] = [inp[2], inp[3]];
    let j = 0;
    while (j < 100) {
      [px, py] = translate(px, py, vx, vy, arr);
      j++;
    }
    arr[py][px] += 1;
  }

  const halfHeight = Math.floor(arr.length / 2);
  const halfWidth = Math.floor(arr[0].length / 2);

  let tl = arr
    .slice(0, halfHeight)
    .map((x) => x.slice(0, halfWidth))
    .flat()
    .reduce((a, c) => a + c);
  let bl = arr
    .slice(halfHeight + 1, arr.length)
    .map((x) => x.slice(0, halfWidth))
    .flat()
    .reduce((a, c) => a + c);

  let br = arr
    .slice(halfHeight + 1, arr.length)
    .map((x) => x.slice(halfWidth + 1, arr[0].length))
    .flat()
    .reduce((a, c) => a + c);

  let tr = arr
    .slice(0, halfHeight)
    .map((x) => x.slice(halfWidth + 1, arr[0].length))
    .flat()
    .reduce((a, c) => a + c);

  return tl * bl * br * tr;
};

function translate(px, py, vx, vy, arr) {
  let newX = (px + vx) % arr[0].length;
  let newY = (py + vy) % arr.length;

  if (newX < 0) newX += arr[0].length;
  if (newY < 0) newY += arr.length;

  return [newX, newY];
}

console.log(solve(fileContent));
