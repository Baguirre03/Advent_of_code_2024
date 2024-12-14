const fs = require("fs");
const filePath = "./input.txt";
const fileContent = fs.readFileSync(filePath, "utf8").split("\n");

const solve = (input) => {
  let res = 0;

  for (let line of input) {
    let [sum, ...nums] = line.split(" ");
    sum = +sum.slice(0, sum.indexOf(":"));
    nums = nums.map((x) => +x);
    if (dfs(sum, nums, true, 0, 0)) {
      res += sum;
      continue;
    }

    if (dfs(sum, nums, false, 0, 0)) {
      res += sum;
    }
  }

  return res;
};

// true == ADD, false(add) == MULTIPLY
function dfs(goal, nums, add, curSum, indx) {
  if (curSum == goal) {
    return true;
  }
  if (curSum > goal || indx >= nums.length) {
    return false;
  }
  if (add) {
    curSum += nums[indx];
  } else {
    curSum *= nums[indx];
  }

  return (
    dfs(goal, nums, true, curSum, indx + 1) ||
    dfs(goal, nums, false, curSum, indx + 1)
  );
}

console.log(solve(fileContent));
