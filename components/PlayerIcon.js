import { Tooltip } from 'antd';
import { REMOTE_ASSET_URL } from '../utils/constants';

const PlayerIcon = ({ id, name }) => (
  <Tooltip placement="top" title={name}>
    <img alt={name} className="player-icon" src={`${REMOTE_ASSET_URL}/avatar/${id}.png`} />
  </Tooltip>
);

export default PlayerIcon;
