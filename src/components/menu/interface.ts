import { Option } from 'scene/interface';
export interface Props {
  filter: Option[],
  loading: boolean;
  toggleOrderModal: () => void;
}
