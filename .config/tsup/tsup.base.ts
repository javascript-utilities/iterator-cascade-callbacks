// vim: noexpandtab

import * as fs from 'fs';
import * as path from 'path';

import type { Options } from 'tsup';

const env = process.env.NODE_ENV;
const package_json = JSON.parse(
	fs.readFileSync(path.resolve(path.join(__dirname, '..', '..', 'package.json')), 'utf8')
);

const SharedConfig = {
	name: package_json.name,
	minify: env === 'production',
	/* @TODO: sort-out why for type bundling errors out */
	// dts: true,
	clean: false,
	sourcemap: true,
} as Options;

export { SharedConfig };
