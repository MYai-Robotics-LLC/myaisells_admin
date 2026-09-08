#!/usr/bin/env node
import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
process.chdir(root);

function fromEnvFile(file, key) {
  if (!existsSync(file)) {
    return undefined;
  }
  for (const raw of readFileSync(file, 'utf8').split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith('#')) {
      continue;
    }
    const eq = line.indexOf('=');
    if (eq !== -1 && line.slice(0, eq).trim() === key) {
      return line
        .slice(eq + 1)
        .trim()
        .replace(/^["']|["']$/g, '');
    }
  }
  return undefined;
}

let token = (process.env.NODE_AUTH_TOKEN ?? '').trim();
if (!token) {
  token = fromEnvFile('.env.local', 'NODE_AUTH_TOKEN') ?? '';
}
token = token.replace(/[\r\n]+/g, '');

if (!token) {
  console.error(
    'NODE_AUTH_TOKEN is not set. Add it to .env.local (see .npmrc) or export it before installing.',
  );
  process.exit(1);
}

const args = ['install', ...process.argv.slice(2)];
const viaNode = process.env.npm_execpath;
const run = viaNode
  ? spawnSync(process.execPath, [viaNode, ...args], {
      stdio: 'inherit',
      env: { ...process.env, NODE_AUTH_TOKEN: token },
    })
  : spawnSync('pnpm', args, {
      stdio: 'inherit',
      shell: process.platform === 'win32',
      env: { ...process.env, NODE_AUTH_TOKEN: token },
    });

if (run.error) {
  console.error(run.error.message);
  process.exit(1);
}
process.exit(run.status ?? 0);
