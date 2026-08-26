import fs from 'fs';
import path from 'path';

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(filePath));
    } else {
      if (filePath.endsWith('.css') || filePath.endsWith('.tsx')) {
        results.push(filePath);
      }
    }
  });
  return results;
}

const files = walk(path.join(process.cwd(), 'components'));
files.push(path.join(process.cwd(), 'app', 'globals.css'));

let replacedCount = 0;

files.forEach(file => {
  // Exclude Navbar from conversion
  if (file.includes('Navbar')) return;

  const content = fs.readFileSync(file, 'utf8');
  let modified = false;

  const newContent = content.replace(/(\d+\.?\d*)(vw|cqw)/g, (match, p1) => {
    const val = parseFloat(p1);
    // 1vw/cqw = 14.4px
    const pxVal = (val * 14.4).toFixed(1);
    // Remove trailing .0
    const cleanPx = pxVal.endsWith('.0') ? pxVal.slice(0, -2) : pxVal;
    return `${cleanPx}px`;
  });

  if (newContent !== content) {
    fs.writeFileSync(file, newContent, 'utf8');
    replacedCount++;
    console.log(`Converted units in ${file}`);
  }
});

console.log(`Done. Modified ${replacedCount} files.`);
