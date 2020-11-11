import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';

const GameIcon = ({ gameId }) => {
  switch (gameId) {
    case 'game0':
      return <UserOutlined />;
    case 'game1':
      return <VideoCameraOutlined />;
    case 'game2':
    default:
      return <UploadOutlined />;
  }
};

export default GameIcon;
