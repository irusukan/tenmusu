const asciify = require('asciify-image');
const fs = require('fs');

const images = [
    { name: 'hello', path: 'assets/hello.png' },
    { name: 'smile', path: 'assets/smile.png' },
    { name: 'sing', path: 'assets/sing.png' },
    { name: 'jump', path: 'assets/jump.png' },
    { name: 'wink', path: 'assets/wink.png' },
    { name: 'sad', path: 'assets/sad.png' },
    { name: 'apology', path: 'assets/apology.png' },
    { name: 'run', path: 'assets/run.png' },
    { name: 'excl', path: 'assets/excl.png' }
];

// width of ASCII art (can be set in options).
// (over 30: same of 30)
const widths = [10, 20, 30];

images.forEach(({ name, path }) => {
    if (!fs.existsSync(path)) {
        console.error(`Image not found: ${path}`);
        return;
    }
    widths.forEach(width => {
        asciify(path, {
            fit: 'box',
            width,
            color: false,
            format: 'string'
        }, (err, converted) => {
            if (err) {
                console.error(`Error converting ${name}:`, err.message);
                return;
            }
            fs.writeFileSync(`ascii/${name}_${width}.txt`, converted);
            console.log(`Saved: ascii/${name}_${width}.txt`);
        });
    });
});