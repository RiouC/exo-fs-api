const fs = require('fs')
const { basename } = require('path');

const [,, ...cmdArgs] = process.argv;

const bn = basename(process.argv[1], '.js');

if (cmdArgs.length === 0) {
    console.log('Usage: node wc.js [OPTION] FILE');
    process.exit(1);
}

// Options
let options = {'-l': false,
	       '-w': false,
	       '-c': false};

const parseOpt = (arr) => {
    let newArr = [];
    for (let arg of arr) {
	if (Object.keys(options).includes(arg)) {
	    options[arg] = true;
	} else {
	    newArr.push(arg);
	}
    }
    return newArr;
}

// Array without options
const woOpt = parseOpt(cmdArgs);
if (woOpt.length !== 1) {
    console.log('Usage: node wc.js [OPTION] FILE');
    process.exit(1);
}


if (!fs.existsSync(woOpt[0])) {
    console.log(`${bn}: cannot access ${woOpt[0]}: No such file or directory`);
    process.exit(1);
}

const stats = fs.statSync(woOpt[0]);
if (stats.isDirectory()) {
    console.log(`${bn}: ${woOpt[0]}: Is a directory`);
    process.exit(1);
}
else if (stats.isFile()) {
    const explicitOption = Object.values(options).filter(el => el);
    if (!explicitOption.length)
	Object.assign(options, {'-l': true, '-w': true, '-c': true});
    let out = ""
    const fileContent = fs.readFileSync(woOpt[0]).toString();
    const lines = fileContent.split('\n');
    if (options['-l'])
	out += `${lines.length}\t`;
    if (options['-w'])
	out += `${lines.map(line => line.split(' ').length).reduce((acc, curr) => acc+curr)}\t`;
    if (options['-c'])
	out += `${stats.size}\t`;
    console.log(`${out}${woOpt[0]}`);
} else {
    console.log('Error');
    process.exit(1);
}


process.exit(0);
