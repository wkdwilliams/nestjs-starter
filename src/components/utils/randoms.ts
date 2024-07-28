/**
 * Generates a random string with a given length
 * @param len 
 * @returns 
 */
export function RandomStringGenerator(len = 20): string {
	const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	let result  = '';
  
	for (let i = 0; i < len; i++) {
		result += chars.charAt(Math.floor(Math.random() * chars.length));
	}

	return result;
}
/**
 * Generates a random file name
 * @param originalName 
 * @returns 
 */
export function RandomFileNameGenerator(originalName: string): string {
	if(originalName.split('/').length > 1) {
		const seperated = originalName.split('/');
		const fileName  = seperated[seperated.length-1];
		
		return originalName.replace(
			fileName,
			RandomStringGenerator() + /(?:\.([^.]+))?$/.exec(originalName)[0]
		);
	}

	return RandomStringGenerator() + /(?:\.([^.]+))?$/.exec(originalName)[0];
}

/**
 * Generates a random number between min and max
 * @param min 
 * @param max 
 * @returns 
 */
export function RandomNumberGenerator(min: number, max: number): number {
	let number: number = null;

	do {
		number = Math.floor(Math.random() * (max - min + min) + min)
	}
	while (number > max)

	return number;
}

/**
 * Generates a random number with a given length.
 * RandomNumberGeneratorFromLength(5) will generate something like 29406
 * @param length 
 * @returns 
 */
export function RandomNumberGeneratorFromLength(length: number): number {
	const min = Math.pow(10, length - 1);
	const max = Math.pow(10, length) - 1;

	return Math.floor(Math.random() * (max - min + 1)) + min;
}