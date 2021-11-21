import { OptionArguments } from '../types';

const removeIdsFromPath = (path: string): string => {
	return path.replace(/\b\/:\S+?(\/|\b)\b/g, "");
}

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