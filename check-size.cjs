const fs = require('fs');
// Very simple check: file exists and has size
console.log(fs.statSync('public/test-mask-screenshot.png').size);
