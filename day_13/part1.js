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

let mp = new Map();
const solve = (input) => {
  let res = 0;
  input.forEach((position) => {
    let [a, b, c] = position;
    mp = new Map();
    let tmp = search(a, b, c, 0, 0);
    res += tmp == Infinity ? 0 : tmp;
  });
  return res;
};

// a = abutton
// b = bbutton
// c = prize
function search(a, b, c, x, y) {
  if (mp.has([x, y].toString())) return mp.get([x, y].toString());
  if (x > c[0] || y > c[1]) return Infinity;
  if (c[0] == x && c[1] == y) return 0;

  let s1 = 3 + search(a, b, c, x + a[0], y + a[1]);
  let s2 = 1 + search(a, b, c, x + b[0], y + b[1]);

  mp.set([x, y].toString(), Math.min(s1, s2));

  return mp.get([x, y].toString());
}

console.log(solve(fileContent));
