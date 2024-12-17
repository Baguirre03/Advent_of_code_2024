const fs = require("fs");
const filePath = "./input.txt";
const fileContent = fs.readFileSync(filePath, "utf8").split(/[:,\n]/);

// Combo operands 0 through 3 represent literal values 0 through 3.
// Combo operand 4 represents the value of register A.
// Combo operand 5 represents the value of register B.
// Combo operand 6 represents the value of register C.
// Combo operand 7 is reserved and will not appear in valid programs.

// 0 performs divison
// numerator is value in A register
// denominator is found by raising 2 to the power of the combo operand
// result is truncated

// 1 calculatse bitwise XOr of register B and literal num

// 2 calculates value of combo % 8
// then wrties value to b register

// 3 does nothing if A is 0, however if not 0 it jumps
// sets instructions pointer to the value of iters lieral, the instruction is no
// longer increased by 2 after this happens

// 4 caluclates bitwise XOR of register B and C then stores result in register B
// reads an operand but ignors it

// 5 calculates value of its combo % 8 then outputs value

// 6 works like 0 but result is stored in B register

// 7 does 0 but stored in C register

const solve = (input) => {
  input = input
    .filter((x) => x != "")
    .map((x) => +x)
    .filter((x) => !isNaN(x));
  let [a, b, c, instructions] = [0, 0, 0, 0];
  [a, b, c, ...instructions] = [
    input[0],
    input[1],
    input[2],
    ...input.slice(3),
  ];

  const getABC = (num) => {
    if (num < 4) return num;
    if (num == 4) return a;
    if (num == 5) return b;
    if (num == 6) return c;
  };

  let p = 0;
  let final = "";

  while (p < instructions.length) {
    if (instructions[p] == 3 && a != 0) {
      p = instructions[p + 1];
      continue;
    }

    solveCode(instructions[p], instructions[p + 1]);
    p += 2;
  }

  function solveCode(code, num) {
    if (code == 0) {
      let d = Math.pow(2, getABC(num));
      a = Math.trunc(a / d);
    } else if (code == 1) {
      b ^= num;
    } else if (code == 2) {
      b = getABC(num) % 8;
    } else if (code == 4) {
      b ^= c;
    } else if (code == 5) {
      let res = getABC(num) % 8;
      final += res;
    } else if (code == 6) {
      let d = Math.pow(2, getABC(num));
      b = Math.trunc(a / d);
    } else if (code == 7) {
      let d = Math.pow(2, getABC(num));
      c = Math.trunc(a / d);
    }
  }
  return final;
};

console.log(solve(fileContent));
