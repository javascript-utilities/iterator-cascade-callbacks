// vim: noexpandtab

import * as fs from 'fs';
import * as path from 'path';

import { defineConfig } from 'tsup';

import { SharedConfig as SharedConfig_Base_Types } from './tsup.base.types';

export default defineConfig(
	Object.assign({}, SharedConfig_Base_Types, {
		entry: ['src/asynchronous.ts', '!src/lib', '!src/__tests__'],
	})
);
