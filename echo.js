const fs = require('fs');

const [,, ...cmdArgs] = process.argv;

let err = 0;

let out = '';
for (arg of cmdArgs) {
    out += arg + ' '
}
out.slice(0,1);
console.log(out)

process.exit(err);

