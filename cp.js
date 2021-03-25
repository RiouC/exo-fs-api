const fs = require('fs')
const { basename } = require('path');

const [,, ...cmdArgs] = process.argv;

const bn = basename(process.argv[1], '.js');

if (cmdArgs.length !== 2) {
    console.log('Usage: node cp.js SRC DEST');
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
fs.copyFileSync(cmdArgs[0], cmdArgs[1]);
process.exit(0);
