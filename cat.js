const fs = require('fs')
const { basename } = require('path');

const [,, ...cmdArgs] = process.argv;

const bn = basename(process.argv[1], '.js');

if (cmdArgs.length === 0) {
    console.log('Usage: node cat.js FILE...');
    process.exit(1);
}


for (const file of cmdArgs) {
    if (!fs.existsSync(file)) {
	console.log(`${bn}: cannot access ${cmdArgs[0]}: No such file or directory`);
	process.exit(1);
    }

    const stats = fs.statSync(file);
    if (stats.isDirectory()) {
	console.log(`${bn}: ${cmdArgs[0]}: Is a directory`);
	process.exit(1);
    }
    else if (stats.isFile()) {
	const fileContent = fs.readFileSync(file).toString();
	console.log(fileContent);
    } else {
	console.log('Error');
	process.exit(1);
    }
}

process.exit(0);
