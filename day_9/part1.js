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

  arr.splice(arr.indexOf("."));
  let res = 0;
  arr.forEach((num, indx) => (res += num * indx));
  return res;
};

console.log(solve(fileContent));
