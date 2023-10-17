// vim: noexpandtab

/**
 * Loop over array for ever and ever
 */
export function* repeatArray<T>(items: T[]): Generator<T> {
	let index = 0;
	while (true) {
		yield items[index];
		index = (items.length + ++index) % items.length;
	}
}

