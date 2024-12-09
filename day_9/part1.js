const fs = require("fs");
const filePath = "./input.txt";
const fileContent = fs.readFileSync(filePath, "utf8").split("");

const solve = (input) => {
  let arr = [];
  let disk = false;
  let indx = 0;
  for (let num of input) {
    let curNum = +num;
    for (let i = 0; i < curNum; i++) {
      if (!disk) {
        arr.push(indx);
      } else {
        arr.push(".");
      }
    }
    if (disk) indx++;
    disk = !disk;
  }
  let back = arr.length - 1;
  let front = 0;
  while (arr[front] != ".") {
    front++;
  }

  while (front < back) {
    arr[front] = arr[back];
    arr[back] = ".";
    back--;
    while (arr[front] != ".") front++;
  }

  return arr
    .filter((x) => x != ".")
    .map((num, indx) => num * indx)
    .reduce((cur, acum) => cur + acum, 0);
};
6607511583593;
console.log(solve(fileContent));
