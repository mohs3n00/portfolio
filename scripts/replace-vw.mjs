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
      if (filePath.endsWith('.css')) {
        results.push(filePath);
      }
    }
  });
  return results;
}

const cssFiles = walk(path.join(process.cwd(), 'components'));
// also global css
cssFiles.push(path.join(process.cwd(), 'app', 'globals.css'));

let replacedCount = 0;

cssFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  // replace number followed by vw (e.g. 100vw, 50.5vw) with cqw
  // Be careful not to replace something like class="vw-something"
  // Regex: (\d+\.?\d*)vw
  if (content.includes('vw')) {
    const newContent = content.replace(/(\d+\.?\d*)vw/g, '$1cqw');
    if (newContent !== content) {
      fs.writeFileSync(file, newContent, 'utf8');
      replacedCount++;
      console.log(`Replaced vw in ${file}`);
    }
  }
});

console.log(`Done. Modified ${replacedCount} files.`);
