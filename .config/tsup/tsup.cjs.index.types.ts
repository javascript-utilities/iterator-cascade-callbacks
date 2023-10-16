// vim: noexpandtab

import * as fs from 'fs';
import * as path from 'path';

import { defineConfig } from 'tsup';

import { SharedConfig as SharedConfig_Base_CJS } from './tsup.base.cjs';
import { SharedConfig as SharedConfig_Base_Types } from './tsup.base.types';

export default defineConfig(
	Object.assign({}, SharedConfig_Base_CJS, SharedConfig_Base_Types, {
		entry: ['ts/index.ts', '!ts/lib', '!ts/__tests__'],
	})
);
