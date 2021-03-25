const fs = require('fs')
const { basename } = require('path');

const [,, ...cmdArgs] = process.argv;
const dest = cmdArgs[cmdArgs.length -1]

const bn = basename(process.argv[1], '.js');

if (cmdArgs.length < 2) {
    console.log('Usage: node append.js SRC... DEST');
    process.exit(1);
}


for (const src of cmdArgs.slice(0, -1)) {
    if (!fs.existsSync(src)) {
	console.log(`${bn}: cannot access ${src}: No such file or directory`);
	process.exit(1);
    }

    const stats = fs.statSync(src);
    if (stats.isDirectory()) {
	console.log(`${bn}: ${cmdArgs[0]}: Is a directory`);
	process.exit(1);
    }
    else if (stats.isFile()) {
	fs.appendFileSync(dest, fs.readFileSync(src).toString());
    } else {
	console.log('Error');
	process.exit(1);
    }
}

process.exit(0);
