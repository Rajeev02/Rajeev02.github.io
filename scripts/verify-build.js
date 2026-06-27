import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distPath = path.join(__dirname, '../dist');
const indexPath = path.join(distPath, 'index.html');

console.log('Starting Build Verification...');

// 1. Check if dist/index.html exists
if (!fs.existsSync(indexPath)) {
  console.error('❌ Build Verification Failed: dist/index.html does not exist.');
  process.exit(1);
}

const html = fs.readFileSync(indexPath, 'utf-8');

// 2. Check for missing script closing tags
const scriptOpenCount = (html.match(/<script\b[^>]*>/g) || []).length;
const scriptCloseCount = (html.match(/<\/script>/g) || []).length;

if (scriptOpenCount !== scriptCloseCount) {
  console.error(`❌ Build Verification Failed: Mismatched script tags. Found ${scriptOpenCount} open tags but ${scriptCloseCount} close tags.`);
  process.exit(1);
}

// 3. Ensure the root div exists
if (!html.includes('id="root"')) {
  console.error('❌ Build Verification Failed: React mounting point <div id="root"> not found.');
  process.exit(1);
}

// 4. Ensure a JS module is being loaded
if (!html.includes('<script type="module"')) {
  console.error('❌ Build Verification Failed: No <script type="module"> found in the build output.');
  process.exit(1);
}

console.log('✅ Build Verification Passed: index.html is structurally sound.');
process.exit(0);
