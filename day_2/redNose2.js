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
    let marker = decreasing ? Infinity : -Infinity;
    let firstGood = true;
    for (let j = 0; j < arr.length; j++) {
      if (Math.abs(arr[j] - arr[j - 1]) > 3) {
        firstGood = false;
      } else if (decreasing && arr[j] >= marker) {
        firstGood = false;
      } else if (!decreasing && arr[j] <= marker) {
        firstGood = false;
      }
      marker = decreasing ? Math.min(marker, arr[j]) : Math.max(marker, arr[j]);
    }
    if (firstGood) {
      res++;
      continue;
    }

    let permutes = permute(arr, [], 0);
    for (let curArr of permutes) {
      let decreasing2 =
        curArr[0] - curArr[1] == Math.abs(curArr[1] - curArr[0]);
      let marker2 = curArr[0];
      let works = true;
      for (let j = 1; j < curArr.length; j++) {
        if (Math.abs(curArr[j] - curArr[j - 1]) > 3) {
          works = false;
        } else if (decreasing2 && curArr[j] >= marker2) {
          works = false;
        } else if (!decreasing2 && curArr[j] <= marker2) {
          works = false;
        }
        marker2 = decreasing2
          ? Math.min(marker2, curArr[j])
          : Math.max(marker2, curArr[j]);
      }
      if (works) {
        console.log(curArr, "working arr", arr, "starting array");
        res++;
        break;
      }
    }
  }
  return res;
};

function permute(arr, res, i) {
  if (i > arr.length) return res;
  let tmp = [...arr];
  tmp.splice(i, 1);
  res.push(tmp);

  return permute(arr, res, i + 1);
}

console.log(solve(fileContent));
