#!/usr/bin/env node

const { program } = require('commander');
const fs = require('fs');
const { createSpeechBubble, displayAsciiArt } = require('./utils');

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
    .argument('[message]', 'tenmusu-kun say "message"')
    
    // Default width = 30
    .option('-w, --width <number>', 'Output width in characters (10, 20, 30)', '30');

program.parse(process.argv);

// Extract name (first argument) and message (second argument) from arguments
const [name, message] = program.args;

// Extract options
const options = program.opts();

// Check arguments
if (name){
    if (asciiMap[name]) {
        const asciiArt = displayAsciiArt(asciiMap[name], options.width);
        if(!asciiArt){
            process.exit(1);
        }

        const bubble = createSpeechBubble(message, parseInt(options.width));
        console.log(bubble + asciiArt);
    } else {
        console.error(`Invalid ASCII art name: ${name}. Use hello, smile, etc.`);
        process.exit(1);
    }
}else{
    // No arguments
    console.error('Please specify an ASCII art name (e.g., "tenmusu hello"). Use --help for details.');
    process.exit(1);
}