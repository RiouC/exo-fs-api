const fs = require('fs')
const { basename } = require('path');

const [,, ...cmdArgs] = process.argv;

const bn = basename(process.argv[1], '.js');

let n = 10;

if (cmdArgs.length === 0) {
    console.log('Usage: node tail.js [-n <number>] FILE');
    process.exit(1);
}

// Options
let options = {'-n': 10};

const parseOpt = (arr) => {
    let newArr = [];
    for (let i = 0; i < arr.length; i++) {
	if (Object.keys(options).includes(arr[i])) {
	    if (arr[i+1]) {
		options[arr[i]] = arr[i+1];
		i++;
	    } else {
		console.log(`${bn}: option requires an argument -- 'n'`);
		process.exit(1);
	    }
	} else {
	    newArr.push(arr[i]);
	}
    }
    return newArr;
}

// Array without options
const woOpt = parseOpt(cmdArgs);



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
    const fileContent = fs.readFileSync(woOpt[0]).toString();
    const lines = fileContent.split('\n');
    for (let i = lines.length - options['-n'] -1; i < lines.length; i++) {
	// TODO : remove last empty line in stdout
	console.log(lines[i]);
    }
} else {
    console.log('Error');
    process.exit(1);
}


process.exit(0);
