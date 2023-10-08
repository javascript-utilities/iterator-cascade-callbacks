// vim: noexpandtab

import * as fs from 'fs';
import * as path from 'path';

import { defineConfig } from 'tsup';

import { SharedConfig } from './tsup.base';

const env = process.env.NODE_ENV;

const package_json = JSON.parse(
	fs.readFileSync(path.resolve(path.join(__dirname, '..', '..', 'package.json')), 'utf8')
);

const target = {
	format: 'esm',
	runtime: 'es2021',
	sub_directory: 'mjs',
};

export default defineConfig(
	Object.assign({}, SharedConfig, {
		outDir: path.resolve(path.join(__dirname, '..', '..', 'targets', target.sub_directory)),
		format: target.format,
		entry: ['ts/asynchronous.ts', '!ts/lib', '!ts/__tests__'],
	})
);
