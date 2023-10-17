// vim: noexpandtab

import * as fs from 'fs';
import * as path from 'path';

import { defineConfig } from 'tsup';

import { SharedConfig as SharedConfig_Base_CJS } from './tsup.base.cjs';

export default defineConfig(
	Object.assign({}, SharedConfig_Base_CJS, {
		entry: ['src/index.ts', '!src/lib', '!src/__tests__'],
	})
);
