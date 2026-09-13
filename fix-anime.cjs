const fs = require('fs');

let code = fs.readFileSync('src/components/RobotLoader.tsx', 'utf-8');

// Replace single line `.add({ targets: "X", ... })`
code = code.replace(/\.add\(\{\s*targets:\s*("[^"]+"),\s*(.*?)\}\s*(,\s*".*?")?\)/g, (match, targets, props, offset) => {
  return `.add(${targets}, { ${props} }${offset || ''})`;
});

// Replace multi-line block:
// .add(
//   {
//     targets: "X" or [X, Y],
//     props...
//   }
// )
code = code.replace(/\.add\(\s*\{\s*targets:\s*([\s\S]*?),\s*([\s\S]*?)\}([\s\S]*?)\)/g, (match, targets, props, offset) => {
  return `.add(\n${targets},\n{\n${props}\n}${offset}\n)`;
});

fs.writeFileSync('src/components/RobotLoader.tsx', code);
console.log('Fixed syntax!');
