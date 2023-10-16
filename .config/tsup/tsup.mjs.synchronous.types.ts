// vim: noexpandtab

import * as fs from 'fs';
import * as path from 'path';

import { defineConfig } from 'tsup';

import { SharedConfig as SharedConfig_Base_MJS } from './tsup.base.mjs';
import { SharedConfig as SharedConfig_Base_Types } from './tsup.base.types';

export default defineConfig(
	Object.assign({}, SharedConfig_Base_MJS, SharedConfig_Base_Types, {
		entry: ['ts/synchronous.ts', '!ts/lib', '!ts/__tests__'],
	})
);
