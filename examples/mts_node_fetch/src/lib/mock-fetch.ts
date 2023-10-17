// vim: noexpandtab

/**
 * Simulate fetch failure/success without making any network calls
 */
export async function mockFetch(url: string, ...args: unknown[]) {
	const chance = (Math.random() * 10) | 0;
	console.log({ chance, url });
	if (chance % 3 === 0) {
		return {
			json: () => Promise.resolve({ body: "rockin'" }),
		};
	} else {
		throw new Error('Not so lucky this time');
	}
}
