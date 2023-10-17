// vim: noexpandtab

import * as fs from 'fs';
import * as path from 'path';

import { defineConfig } from 'tsup';

import { SharedConfig as SharedConfig_Base_CJS } from './tsup.base.cjs';

export default defineConfig(
	Object.assign({}, SharedConfig_Base_CJS, {
		entry: ['ts/index.ts', '!ts/lib', '!ts/__tests__'],
	})
);
