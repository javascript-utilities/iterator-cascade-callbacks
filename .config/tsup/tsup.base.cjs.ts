// vim: noexpandtab

/**
 * @file Applies to all files matching glob of: ./tsup.cjs.*.ts
 */

import * as fs from 'fs';
import * as path from 'path';

import type { Options } from 'tsup';

import { SharedConfig as SharedConfig_Base_All } from './tsup.base.all';

const target = {
	format: 'cjs',
	runtime: 'es2021',
	sub_directory: 'cjs',
};

const SharedConfig = Object.assign({}, SharedConfig_Base_All, {
	outDir: path.resolve(path.join(__dirname, '..', '..', 'targets', target.sub_directory)),
	format: target.format,
}) as Options;

export { SharedConfig };
