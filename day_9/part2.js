const fs = require("fs");
const filePath = "./input.txt";
const fileContent = fs.readFileSync(filePath, "utf8").split("");

const solve = (input) => {
  let arr = [];
  let disk = false;
  let id = 0;
  let numsCount = new Map();
  let openSpaces = [];
  let numIndex = new Map();
  for (let num of input) {
    if (!numsCount.has(id)) {
      numsCount.set(id, +num); // [id, count of ID in array]
      numIndex.set(id, arr.length); // [id, starting index of ID]
    }
    if (disk) openSpaces.push([arr.length, +num]); // [starting index of open spaces, amount]
    for (let i = 0; i < +num; i++) {
      if (!disk) {
        arr.push(id);
      } else {
        arr.push(".");
      }
    }
    if (disk) id++;
    disk = !disk;
  }

  let ids = [...numsCount.keys()];
  for (let i = ids.length - 1; i >= 0; i--) {
    let amountOfNum = numsCount.get(i);
    for (let j = 0; j < openSpaces.length; j++) {
      let start = openSpaces[j][0];
      let spaces = openSpaces[j][1];
      let end = numIndex.get(i);

      if (start + spaces > end) {
        continue;
      }

      if (spaces >= amountOfNum) {
        for (let k = start; k < start + amountOfNum; k++) {
          arr[k] = i;
          arr[end++] = ".";
        }
        openSpaces.splice(j, 1, [start + amountOfNum, spaces - amountOfNum]);
        break;
      }
    }
  }
  return arr
    .map((x, indx) => (x != "." ? x * indx : 0))
    .reduce((cur, acum) => cur + acum, 0);
};

console.log(solve(fileContent));
