import boatsJson from '@json/boats.json';

import { ConfigParams } from './interface';

export const defaultState: ConfigParams = {
  filter: [],
  color: boatsJson.boats[0].colors[0],
};
