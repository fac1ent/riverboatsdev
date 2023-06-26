import { Color } from 'scene/interface';

export interface Props {
  currentColor: Color;
  colors: Color[];
  changeColor: (color: Color) => void;
}
