import { Logger } from "@nestjs/common";

/**
 * Built by lewis 🍺
 * 
 * Be careful when using the cache. 
 * If caching entities, then we must clear
 * the cache after create & update
 */
export class Cache {
	private static CACHE: Record<string, any> = {};
	/**
	 * Get cache data using key string
	 * and set the data using callback
	 * @param key 
	 * @param callback 
	 * @returns 
	 */
    static get<T>(key: string, callback?: () => void): T {
		if(callback !== undefined) {
			if (!this.CACHE.hasOwnProperty(key)) {
				this.put(key, callback());
			}
		}

        return this.CACHE[key];
    }

	/**
	 * Insert data into our cache
	 * @param key 
	 * @param value 
	 */
    static put(key: string, value: any): void {
        this.CACHE[key] = value;
    }

	/**
	 * Clears the whole cache
	 */
	static clear(): void {
		this.CACHE = {};
	}

	/**
	 * Removes certain cache keys using given pattern
	 * @param pattern 
	 */
	static clearByPattern(pattern): void {
		let cleared = false;

		for (const i of Object.keys(this.CACHE)) {
			if (i.includes(pattern)){ delete this.CACHE[i]; cleared = true; }
		}

		if (cleared)
			new Logger('Cache').debug('Cache cleared');
	}
}
