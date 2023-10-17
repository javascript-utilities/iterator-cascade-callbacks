// vim: noexpandtab

import * as fs from 'fs';
import * as path from 'path';

import { defineConfig } from 'tsup';
import type { NormalizedOptions } from 'tsup';

import { SharedConfig as SharedConfig_Base_All } from './tsup.base.all';

const target = {
	format: 'cjs',
	runtime: 'es2021',
	sub_directory: 'types',
};

const SharedConfig = Object.assign({}, SharedConfig_Base_All, {
	outDir: path.resolve(path.join(__dirname, '..', '..', 'targets', target.sub_directory)),
	format: target.format,
	entry: ['src/asynchronous.ts', '!src/lib', '!src/__tests__'],
	/**
	 * @see {@link NormalizedOptions.dts Spicificly the `DtsConfig` internal type}
	 */
	dts: {
		/** Emit declaration files only */
		only: true,
		/**
		 * Overrides `compilerOptions`
		 * This option takes higher priority than `compilerOptions` in tsconfig.json
		 */
		compilerOptions: {
			removeComments: false,
		},
	},
	declaration: true,
});

export { SharedConfig };
