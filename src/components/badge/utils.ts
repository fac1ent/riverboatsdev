import { Model, Option } from 'scene/interface';

export const findDepencies = (optionToDelete: string, model: Model, filter: Option[]) => {
  const deps: string[] = [];

  model.options.forEach(option => {
    option.deps.includes(optionToDelete)
      && filter.find(o => o.name === option.name)
      && deps.push(option.name);
  });

  return deps;
}
