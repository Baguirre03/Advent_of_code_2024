const fs = require("fs");
const filePath = "./input.txt";
const fileContent = fs
  .readFileSync(filePath, "utf8")
  .split(/\ns*\n/)
  .map((x) =>
    x.split(/\n/).map((x) =>
      x
        .split(/[+,=]/)
        .map((x) => +x)
        .filter((x) => x)
    )
  );

const solve = (input) => {
  input = input.map((pos) => {
    let [a, b, c, d, x, y] = [
      pos[0][0],
      pos[1][0],
      pos[0][1],
      pos[1][1],
      pos[2][0] + 10000000000000,
      pos[2][1] + 10000000000000,
    ];

    let det = a * d - b * c;
    let n = (d * x - b * y) / det;
    let m = (-c * x + a * y) / det;

    if ([n, m].some((num) => num != parseInt(num))) return null;
    return [n, m];
  });

  return input
    .filter((x) => x)
    .map((x) => 3 * x[0] + x[1])
    .reduce((c, a) => c + a);
};

console.log(solve(fileContent));
