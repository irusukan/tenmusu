#!/usr/bin/env node

const { program } = require('commander');
const fs = require('fs');

const asciiMap = {
    hello: 'hello',
    smile: 'smile',
    sing: 'sing',
    jump: 'jump',
    wink: 'wink',
    sad: 'sad',
    apology: 'apology',
    run: 'run',
    excl: 'excl'
};

program
    .version('1.0.0')
    .option('-h, --hello', 'Show hello(normal) tenmusu-kun')
    .option('-s, --smile', 'Show smile tenmusu-kun')
    .option('-g, --sing', 'Show singing tenmusu-kun')
    .option('-j, --jump', 'Show jumping tenmusu-kun')
    .option('-k, --wink', 'Show wink tenmusu-kun')
    .option('-d, --sad', 'Show sad tenmusu-kun')
    .option('-y, --apology', 'Show apologizing tenmusu-kun')
    .option('-r, --run', 'Show running tenmusu-kun')
    .option('-x, --excl', 'Show ! tenmusu-kun')
    
    // default width = 30
    .option('-w, --width <number>', 'Output width in characters (10, 20, 30)', '30');

program.parse(process.argv);

const options = program.opts();

function displayAsciiArt(name, width) {
    const validWidths = ['10', '20', '30'];
    if (!validWidths.includes(width)) {
        console.error('Invalid width. Use 10, 20, or 30.');
        return;
    }

    const filePath = `ascii/${name}_${width}.txt`;
    if (!fs.existsSync(filePath)) {
        console.error('ASCII art not found.');
        return;
    }

    const ascii = fs.readFileSync(filePath, 'utf8');
    console.log(ascii);
}

let displayed = false;
for (const [key, name] of Object.entries(asciiMap)) {
    if (options[key]) {
        displayAsciiArt(name, options.width);
        displayed = true;
        break;
    }
}


if (!displayed) {
    console.log('Please specify an option. Use --help for details.');
}