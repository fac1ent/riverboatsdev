import { Model } from 'scene/interface';;

export interface ModelProviderConfig {
  handleModels: (badge: Model) => void;
  model: Model;
  models: Model[];
  openRange: boolean
  getOpenRange: () => void
}
