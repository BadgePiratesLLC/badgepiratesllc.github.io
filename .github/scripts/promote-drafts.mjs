import fs from 'fs';
import path from 'path';
const DRAFTS = process.env.DRAFTS_DIR || '_drafts';
const POSTS  = process.env.POSTS_DIR  || '_posts';
const today  = process.env.TODAY || new Date().toISOString().slice(0,10);
if (!fs.existsSync(DRAFTS)) { console.log('no _drafts dir'); process.exit(0); }
let promoted = 0;
for (const f of fs.readdirSync(DRAFTS)) {
  if (!f.endsWith('.md')) continue;
  const src = path.join(DRAFTS, f);
  const raw = fs.readFileSync(src, 'utf8');
  const fm = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!fm) continue;
  const tgt = (fm[1].match(/^publish_target:\s*['"]?(\d{4}-\d{2}-\d{2})/m) || [])[1];
  if (!tgt) continue;
  if (tgt > today) { console.log(`skip ${f} (target ${tgt} > today ${today})`); continue; }
  let body = raw.replace(/^publish_target:.*\r?\n/m, '');
  body = /^date:.*$/m.test(body) ? body.replace(/^date:.*$/m, `date: ${tgt}`)
                                 : body.replace(/^---\r?\n/, `---\ndate: ${tgt}\n`);
  fs.mkdirSync(POSTS, { recursive: true });
  const dest = path.join(POSTS, `${tgt}-${f}`);
  fs.writeFileSync(dest, body);
  fs.unlinkSync(src);
  console.log(`promoted ${f} -> ${dest}`);
  promoted++;
}
console.log(`done: ${promoted} promoted`);
