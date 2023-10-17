// vim: noexpandtab

import * as fs from 'fs';
import * as path from 'path';

import { defineConfig } from 'tsup';

import { SharedConfig as SharedConfig_Base_MJS } from './tsup.base.mjs';

export default defineConfig(
	Object.assign({}, SharedConfig_Base_MJS, {
		entry: ['src/index.ts', '!src/lib', '!src/__tests__'],
	})
);
