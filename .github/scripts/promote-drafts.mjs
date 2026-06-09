import fs from 'fs';
import path from 'path';
// Promotes a draft ONLY if it carries an explicit `publish_on: YYYY-MM-DD` that
// has arrived. `publish_target` (a planning note left in skeleton drafts) is
// intentionally ignored — a draft is never auto-published unless someone has
// deliberately stamped `publish_on`.
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
  const on = (fm[1].match(/^publish_on:\s*['"]?(\d{4}-\d{2}-\d{2})/m) || [])[1];
  if (!on) continue;                                   // no publish_on -> never auto-publish
  if (on > today) { console.log(`skip ${f} (publish_on ${on} > today ${today})`); continue; }
  let body = raw.replace(/^publish_on:.*\r?\n/m, '');
  body = /^date:.*$/m.test(body) ? body.replace(/^date:.*$/m, `date: ${on}`)
                                 : body.replace(/^---\r?\n/, `---\ndate: ${on}\n`);
  fs.mkdirSync(POSTS, { recursive: true });
  const dest = path.join(POSTS, `${on}-${f}`);
  fs.writeFileSync(dest, body);
  fs.unlinkSync(src);
  console.log(`promoted ${f} -> ${dest}`);
  promoted++;
}
console.log(`done: ${promoted} promoted`);
