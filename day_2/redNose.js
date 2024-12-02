const fs = require("fs");
const filePath = "./input.txt";
const fileContent = fs.readFileSync(filePath, "utf8").split("\n");
// only safe if levels are all increaisng or all decreasing
// can only differ by one - three

const solve = (input) => {
  let res = 0;
  for (let i = 0; i < input.length; i++) {
    let line = input[i];
    let arr = line.split(" ").map((x) => +x);
    let decreasing = arr[0] - arr[1] == Math.abs(arr[1] - arr[0]);
    // true for decrease, false for increase
    let marker = arr[0];

    // if its increasing we need largest, decreasing we need smallest
    for (let j = 1; j < arr.length; j++) {
      if (Math.abs(arr[j] - arr[j - 1]) > 3) {
        res++;
        break;
      }
      if (decreasing) {
        if (arr[j] >= marker) {
          res++;
          break;
        }
        marker = Math.min(marker, arr[j]);
      } else {
        // increasing
        if (arr[j] <= marker) {
          res++;
          break;
        }
        marker = Math.max(marker, arr[j]);
      }
    }
  }
  return input.length - res;
};

console.log(solve(fileContent));
