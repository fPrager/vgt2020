import {
  Divider, Skeleton, Row, Col,
} from 'antd';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

import Data from '../../mock/data.json';
import { REMOTE_ASSET_URL } from '../../utils/constants';

export function getStaticProps({ params }) {
  const { gId } = params;
  const gameData = Data.games.find((g) => g.id === gId);
  return {
    props: {
      ...gameData,
    },
  };
}

export async function getStaticPaths() {
  const paths = Data.games.map((g) => ({ params: { gId: g.id } }));
  return {
    paths,
    fallback: false,
  };
}

const REFRESH_INTERVALL = 5000;

const Game = ({
  id, title, image, defaultRules, defaultNotes,
}) => {
  const [rules, setRules] = useState(false);
  const [notes, setNotes] = useState(false);

  const requestGameData = async () => {
    const resGame = await fetch(`/api/get-game?gameId=${id}`);
    const dataGame = await resGame.json();

    setRules(dataGame.rules);
    setNotes(dataGame.notes);
  };

  useEffect(() => {
    const refresh = setInterval(requestGameData, REFRESH_INTERVALL);
    requestGameData();
    return () => clearInterval(refresh);
  });

  return (
    <div className="game">
      <Divider>
        <div className="headline">
          { title }
        </div>
      </Divider>
      <Row justify="center">
        <Col span="12" flex>
          <div className="image">
            <img alt={title} src={`${REMOTE_ASSET_URL}/games/${id}.png`} />
          </div>
        </Col>
      </Row>
      <div className="game--text-container">
        {
        rules
          && (
            <div className="game--text">
              <div className="subline">
                Rules
              </div>
              <div className="rules">
                {
                rules === false
                  ? <Skeleton />
                  : <ReactMarkdown>{rules}</ReactMarkdown>
              }
              </div>
            </div>
          )
      }
        {
        notes
          && (
            <div className="game--text">
              <div className="subline">
                Notes
              </div>
              <div className="notes">
                {
                notes === false
                  ? <Skeleton />
                  : <ReactMarkdown>{notes}</ReactMarkdown>
              }
              </div>
            </div>
          )
      }
      </div>
    </div>
  );
};

export default Game;
