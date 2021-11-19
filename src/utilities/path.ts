import { OptionArguments } from '../types';

export const pathReplacer = (path: string, replacers?: OptionArguments): string => {
  if (!replacers) return path;

  const matchLookup = Object.keys(replacers);
  let updatedPath = path;

  matchLookup.forEach(lookup => {
    const regex = new RegExp("\\" + lookup, 'g');
    updatedPath = updatedPath.replace(regex, String(replacers[lookup]))
  })

  return updatedPath;
}