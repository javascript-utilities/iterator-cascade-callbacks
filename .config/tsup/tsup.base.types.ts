// vim: noexpandtab

import * as fs from 'fs';
import * as path from 'path';

import { defineConfig } from 'tsup';
import type { NormalizedOptions } from 'tsup';

import { SharedConfig as SharedConfig_Base_All } from './tsup.base.all';

const SharedConfig = Object.assign({}, SharedConfig_Base_All, {
	entry: ['ts/asynchronous.ts', '!ts/lib', '!ts/__tests__'],
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
