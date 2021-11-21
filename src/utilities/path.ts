import { OptionArguments } from '../types';

/**
 *	Removes all unused identifiers from url
 *	Eg of identifiers /:id 
 *	@param path the url to be trimmed
 *	@returns string
 */
const removeIdsFromPath = (path: string): string => {
	return path.replace(/\b\/:\S+?(\/|\b)\b/g, "");
}

/**
 *	normalizes paths will identifier values
 *	@param path url
 *	@param replacers key/value pair with the keys matching a substring in path and the values the replacement
 *	@returns 
 */
export const pathReplacer = (path: string, replacers?: OptionArguments): string => {
	if (!replacers) return removeIdsFromPath(path);

	const matchLookup = Object.keys(replacers);
	let updatedPath = path;

	matchLookup.forEach(lookup => {
		const regex = new RegExp("\\" + lookup, 'g');
		updatedPath = updatedPath.replace(regex, String(replacers[lookup]))
	})

	return removeIdsFromPath(updatedPath);
}