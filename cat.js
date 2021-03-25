const fs = require('fs')
const { basename } = require('path');

const [,, ...cmdArgs] = process.argv;

const bn = basename(process.argv[1], '.js');

if (cmdArgs.length !== 1) {
    console.log('Usage: node cat.js FILE');
    process.exit(1);
}

// check if the path exist
if (!fs.existsSync(cmdArgs[0])) {    
    console.log(`${bn}: cannot access ${cmdArgs[0]}: No such file or directory`);
}

const stats = fs.statSync(cmdArgs[0]);
if (stats.isDirectory()) {
    console.log(`${bn}: ${cmdArgs[0]}: Is a directory`);
    process.exit(1);
}
else if (stats.isFile()) {
    const fileContent = fs.readFileSync(cmdArgs[0]).toString();
    console.log(fileContent);
    process.exit(0);
} else {
    console.log('Error');
    process.exit(1);
}
