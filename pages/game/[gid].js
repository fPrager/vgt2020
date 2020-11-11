import { useRouter } from 'next/router';
import { Divider } from 'antd';

import Data from '../../mock/data.json';
import getGameData from '../../data/get-game-data';
import getAllGameIds from '../../data/get-all-game-ids';
import GameImage from '../../components/GameImage';

export async function getStaticProps({ params }) {
  const gameData = await getGameData(params.gid);
  return {
    props: {
      ...gameData,
    },
  };
}

export async function getStaticPaths() {
  const paths = getAllGameIds();
  return {
    paths,
    fallback: false,
  };
}

const Game = ({
  title, image, rulesContent, notesContent,
}) => (
  <div className="game">
    <Divider>
      <div className="headline">
        { title }
      </div>
    </Divider>
    <div
      className="rules"
      dangerouslySetInnerHTML={{ __html: rulesContent }}
    />
    <GameImage title={title} url={image} />
    <div
      className="notes"
      dangerouslySetInnerHTML={{ __html: notesContent }}
    />
  </div>
);

export default Game;
