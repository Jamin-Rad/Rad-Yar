// Structural inventory only. Run: node --import tsx scripts/audit-lesson-structure.cjs
// Signals inspect the route entry file, not its rendered/imported component tree.
const fs = require('node:fs');
const path = require('node:path');
const { CURRICULUM } = require('../data/curriculum.js');
const root = path.resolve(__dirname, '..');
const linked = new Map();
let topicCount = 0;
let unlinkedTopicCount = 0;
function visit(topic) {
  topicCount++;
  if (typeof topic.link === 'string' && topic.link.startsWith('/')) {
    const route = topic.link.split(/[?#]/)[0].replace(/\/$/, '');
    linked.set(route, (linked.get(route) || 0) + 1);
  } else unlinkedTopicCount++;
  for (const child of topic.sub || []) visit(child);
}
for (const subject of CURRICULUM)
  for (const chapter of subject.kapitel || [])
    for (const topic of chapter.themen || []) visit(topic);
const routes = [...linked].sort(([a], [b]) => a.localeCompare(b)).map(([route, occurrences]) => {
  const directory = path.resolve(root, 'app', route.slice(1));
  if (!directory.startsWith(path.join(root, 'app') + path.sep)) throw new Error('Route outside app');
  const entry = ['page.js', 'page.jsx', 'page.tsx', 'page.ts'].map(file => path.join(directory, file)).find(file => fs.existsSync(file));
  const source = entry ? fs.readFileSync(entry, 'utf8') : '';
  return {
    route, curriculumOccurrences: occurrences,
    entry: entry ? path.relative(root, entry).replaceAll('\\', '/') : null,
    entryFileSignals: {
      sharedHeroMention: /\bLessonHero\b/.test(source),
      languageHookMention: /\buseLanguage\b/.test(source),
      sectionProgressMention: /\busePersistedSectionProgress\b/.test(source),
      externalUrlMention: /https?:\/\//.test(source),
      delegatesOrImports: /^import\s/m.test(source),
    },
  };
});
const report = {
  scope: 'Curriculum-linked route entry files only; includes tools and aliases, excludes unlinked routes. Signals are not quality verdicts. Imported content, routing redirects and browser behavior require follow-up.',
  subjects: CURRICULUM.length, topicCount, unlinkedTopicCount,
  uniqueLinkedRoutes: routes.length,
  routesWithDirectEntry: routes.filter(route => route.entry).length,
  routes,
};
const output = JSON.stringify(report, null, 2) + '\n';
if (process.argv[2]) {
  const target = path.resolve(root, process.argv[2]);
  if (!target.startsWith(root + path.sep)) throw new Error('Output must stay inside repository');
  fs.writeFileSync(target, output);
  console.log(JSON.stringify({file: path.relative(root, target), subjects:report.subjects, topics:topicCount, uniqueLinkedRoutes:routes.length, routesWithDirectEntry:report.routesWithDirectEntry}));
} else process.stdout.write(output);
