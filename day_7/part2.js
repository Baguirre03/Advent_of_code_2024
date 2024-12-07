const fs = require("fs");
const filePath = "./input.txt";
const fileContent = fs.readFileSync(filePath, "utf8").split("\n");

const solve = (input) => {
  let res = 0;
  for (let line of input) {
    let [sum, ...nums] = line.split(" ");
    sum = +sum.slice(0, sum.indexOf(":"));
    nums = nums.map((x) => +x);
    let options = dfs(nums, 0, [], []);
    for (let opt of options) {
      let bool = eval(opt, sum);
      if (bool) {
        res += sum;
        break;
      }
    }
  }

  return res;
};

function eval(nums, goal) {
  while (nums.length > 1) {
    let [num1, op, num2] = [nums.shift(), nums.shift(), nums.shift()];
    if (op == "*") {
      nums.unshift(num1 * num2);
    } else if (op == "+") {
      nums.unshift(num1 + num2);
    } else {
      nums.unshift(+(num1.toString() + num2.toString()));
    }
  }
  if (nums[0] == goal) return true;
  else return false;
}

function dfs(nums, indx, curArr, res) {
  if (indx >= nums.length - 1) {
    curArr.push(nums[indx]);
    res.push([...curArr]);
    return res;
  }
  curArr.push(nums[indx]);

  dfs(nums, indx + 1, [...curArr, "+"], res);
  dfs(nums, indx + 1, [...curArr, "||"], res);
  dfs(nums, indx + 1, [...curArr, "*"], res);

  return res;
}

console.log(solve(fileContent));
