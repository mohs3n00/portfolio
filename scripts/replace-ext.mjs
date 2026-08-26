import fs from 'fs/promises';
import path from 'path';

async function replaceInDir(dir) {
  const files = await fs.readdir(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = await fs.stat(filePath);
    if (stat.isDirectory()) {
      await replaceInDir(filePath);
    } else if (filePath.match(/\.(tsx|ts|css)$/)) {
      let content = await fs.readFile(filePath, 'utf8');
      const newContent = content.replace(/\.(png|jpe?g)/gi, '.webp');
      if (content !== newContent) {
        await fs.writeFile(filePath, newContent, 'utf8');
        console.log(`Updated: ${filePath}`);
      }
    }
  }
}

replaceInDir(path.resolve('./components')).catch(console.error);
