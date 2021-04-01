const fs = require('fs')
const { basename } = require('path');

// get commandline arguments except 'node' and 'wc.js'
// you can then use for of loop
const [,, ...cmdArgs] = process.argv;

// get name of the program without .js extension (here, it's wc)
const bn = basename(process.argv[1], '.js');

// test if we have something after node wc.js, if not, exit
if (cmdArgs.length === 0) {
    console.log('Usage: node wc.js [OPTION] FILE');
    process.exit(1);
}

// Options
let options = {'-l': false,
	       '-w': false,
	       '-c': false};

// function to parse cmdArgs, it will read every element
// if it's an option (-l, -w, or -c) it will change options and set the value to true
// else, it will add the element to newArr (everything that is not an option)
const parseOpt = (arr) => {
    let newArr = [];
    for (let arg of arr) {
	// if (Object.keys(options).includes(arg)) {
	if (options.hasOwnProperty(arg)) {
	    options[arg] = true;
	} else {
	    newArr.push(arg);
	}
    }
    return newArr;
}

// Array without options
const woOpt = parseOpt(cmdArgs);

// test if array without option is of length 1 (we don't handle multiple files yet)
if (woOpt.length !== 1) {
    console.log('Usage: node wc.js [OPTION] FILE');
    process.exit(1);
}

// test if woOpt[0] exists
if (!fs.existsSync(woOpt[0])) {
    console.log(`${bn}: cannot access ${woOpt[0]}: No such file or directory`);
    process.exit(1);
}

// test if woOpt[0] is a directory
const stats = fs.statSync(woOpt[0]);
if (stats.isDirectory()) {
    console.log(`${bn}: ${woOpt[0]}: Is a directory`);
    process.exit(1);
}
// if woOpt is a file
else if (stats.isFile()) {
    // test if program is called without any options, if that's the case,
    // set all options to true
    const explicitOption = Object.values(options).filter(el => el);
    if (!explicitOption.length)
	Object.assign(options, {'-l': true, '-w': true, '-c': true});

    // out is a string variable that we will update and display at the end
    let out = ""

    // get the lines of the file
    const fileContent = fs.readFileSync(woOpt[0]).toString();
    const lines = fileContent.split('\n');
    if (options['-l']) // if -l option, concatenate the nuber of lines to out
	out += `${lines.length}\t`;
    if (options['-w']) // if -w option, compute the number of words, and add it to out
	out += `${lines.map(line => line.split(' ').length).reduce((acc, curr) => acc+curr)}\t`;
    if (options['-c']) // if -c option, get the number of bytes of the file, thanks to stats
	out += `${stats.size}\t`;
    console.log(`${out}${woOpt[0]}`);
}
// if it's not a directory nor a file (like a symlink, a device, …), we exit
else {
    console.log('Error');
    process.exit(1);
}


process.exit(0);
