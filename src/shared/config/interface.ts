import { Option, Color } from 'scene/interface';

export interface ConfigParams {
  filter: Option[],
  color: Color,
}

export interface ConfigProviderConfig extends ConfigParams {
  handleBadges: (badge: Option) => void;
  changeColor: (color: Color) => void;
  deleteBadge: (badge: Option) => void;
  clearFilter: () => void;
}
