/**
 * @description Creates a random id
 * @returns {string} random id
 */
export default function getRandomId() {
	return Date.now().toString(36) + Math.random().toString(36).substr(2);
}
