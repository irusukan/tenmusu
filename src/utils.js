const fs = require('fs');

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
    return fs.readFileSync(filePath, 'utf8');
}

// Create a speech bubble if "message" is included in the arguments
function createSpeechBubble(message, optionsWidth) {
    if (message){
    const bubbleWidth = message.length; // Set the width based on the message length

    // Speech bubble
    const topBorder = '_'.repeat(bubbleWidth + 4);
    const bottomBorder = '-'.repeat(bubbleWidth + 4);
    const indent = ' '.repeat(Math.max(0, bubbleWidth - bubbleWidth/2)); 

    let tail = '';
    if (bubbleWidth < optionsWidth * 2){
        // If message length is less than twice the options width, create "\" tails
        tail = `${indent}\\ \n${indent} \\ \n${indent} \\ \n${indent} \\`;
    } else {
        // If message length is greater than twice the options width, create "/" tails
        tail = `${indent}\/ \n${indent} \/ \n${indent} \/ \n${indent} \/`;
    }
    const paddedMessage = message.padEnd(bubbleWidth);
    return `${topBorder}\n< ${paddedMessage} >\n${bottomBorder}\n ${tail} \n`;

    } else {
        return '';
    }
}

module.exports = {
    createSpeechBubble,
    displayAsciiArt
};