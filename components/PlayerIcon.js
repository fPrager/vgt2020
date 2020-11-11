import { Tooltip, Avatar } from 'antd';

const PlayerIcon = ({ id, name }) => (
  <Tooltip placement="top" title={name}>
    <img alt={name} className="player-icon" src={require('../assets/avatar/player0.svg')} />
  </Tooltip>
);

export default PlayerIcon;
