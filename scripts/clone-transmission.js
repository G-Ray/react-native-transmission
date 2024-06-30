#!/usr/bin/env node
const { execSync } = require('node:child_process');
const { existsSync } = require('node:fs');

if (existsSync('./cpp/transmission')) {
  console.log('Directory ./cpp/transmission already exists.');
  process.exit(0);
}

execSync(
  'git clone -b 4.0.x-pikatorrent --single-branch https://github.com/G-Ray/transmission.git cpp/transmission'
);

execSync('git submodule update --init --recursive', {
  cwd: './cpp/transmission',
});
