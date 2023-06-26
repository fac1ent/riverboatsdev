import { Model, Option } from 'scene/interface';

/**
 * It takes a model, a last option and a filter and returns an array of incompatible options
 * @param {Model} model - The model object that contains all the options and their dependencies.
 * @param {string} lastOption - The last option that was selected.
 * @param {string[]} filter - the array of options that have been selected so far
 * @returns An array of strings.
 */
export const findIncompatibleOptions = (model: Model, lastOption: string, filter: Option[]): string[] => {
  let incompatible: string[] = [];

  model.options.forEach(option => {
    if (option.name === lastOption && option.deps.length) {
      incompatible = option.deps.filter(value => !filter.find(o => o.name === value));
    }
  });

  return incompatible;
}
