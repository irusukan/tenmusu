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
    .argument('[name]', 'hello: Show hello(normal) tenmusu-kun \n\
                      smile: Show smile tenmusu-kun\n\
                      sing: Show singing tenmusu-kun\n\
                      jump: Show jumping tenmusu-kun\n\
                      wink: Show wink tenmusu-kun\n\
                      sad: Show sad tenmusu-kun\n\
                      apology: Show apologizing tenmusu-kun\n\
                      run: Show running tenmusu-kun\n\
                      excl: Show ! tenmusu-kun\n\
                      ')
    
    // default width = 30
    .option('-w, --width <number>', 'Output width in characters (10, 20, 30)', '30');

program.parse(process.argv);

const options = program.opts();
// get arguments name
const [name] = program.args;

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

// check arguments
if (name){
    if (asciiMap[name]) {
        displayAsciiArt(asciiMap[name], options.width);
        displayed = true;
    } else {
        console.error(`Invalid ASCII art name: ${name}. Use hello, smile, etc.`);
        process.exit(1);
    }
}else{
    // no arguments
    console.error('Please specify an ASCII art name (e.g., "tenmusu hello"). Use --help for details.');
    process.exit(1);
}
