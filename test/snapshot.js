/*
 * Lints test/invalid.scss with the shipped config and compares every reported
 * warning (line, column, severity, rule) against test/invalid.snapshot.json.
 *
 *     npm test               compare against the snapshot
 *     npm test -- --update   rewrite the snapshot after an intentional change
 */
import { readFile, writeFile } from 'node:fs/promises';
import stylelint from 'stylelint';

const target = 'test/invalid.scss';
const snapshotFile = new URL('./invalid.snapshot.json', import.meta.url);
const update = process.argv.includes('--update');
const { results: [result] } = await stylelint.lint({
    files: [target],
    configFile: 'index.js'
});
const actual = [
    ...result.invalidOptionWarnings.map((warning) => {
        return `invalid-option ${warning.text}`;
    }),
    ...result.deprecations.map((deprecation) => {
        return `deprecation ${deprecation.text}`;
    }),
    ...result.warnings
        .toSorted((a, b) => {
            return a.line - b.line || a.column - b.column || a.rule.localeCompare(b.rule);
        })
        .map((warning) => {
            return `${warning.line}:${warning.column} ${warning.severity} ${warning.rule}`;
        })
];

if (update) {
    await writeFile(snapshotFile, `${JSON.stringify(actual, null, 4)}\n`);
    console.info(`Snapshot updated with ${actual.length} messages.`);
    process.exit(0);
}

const expected = JSON.parse(await readFile(snapshotFile, 'utf8'));
const missing = expected.filter((entry) => {
    return !actual.includes(entry);
});
const unexpected = actual.filter((entry) => {
    return !expected.includes(entry);
});

if (missing.length === 0 && unexpected.length === 0) {
    console.info(`Snapshot matches: ${actual.length} messages in ${target}.`);
    process.exit(0);
}

console.error(`Snapshot mismatch in ${target}.`);

for (const entry of missing) {
    console.error(`  - no longer reported: ${entry}`);
}

for (const entry of unexpected) {
    console.error(`  + newly reported:     ${entry}`);
}

console.error('\nRun "npm test -- --update" if the change is intended.');
process.exit(1);
