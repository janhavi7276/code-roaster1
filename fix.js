const fs = require('fs');
const path = require('path');

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (file !== 'node_modules' && file !== '.next') {
        processDir(fullPath);
      }
    } else if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // Fix backslash-escaped backticks
      content = content.replace(/\\`/g, '`');
      
      // Fix backslash-escaped dollar signs
      content = content.replace(/\\\$/g, '$');
      
      // Fix double backslash n
      content = content.replace(/\\\\n/g, '\\n');
      
      fs.writeFileSync(fullPath, content);
      console.log('Fixed', fullPath);
    }
  }
}

processDir(process.cwd());
