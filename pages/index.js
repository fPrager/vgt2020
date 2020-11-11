import { Divider } from 'antd';

import { useEffect, useState } from 'react';
import Data from '../mock/data.json';
import PlayerIcon from '../components/PlayerIcon';
import TropyIcon from '../components/TrophyIcon';

const pyramid = (playerScores) => {
  const newArr = [];

  // sort numerically
  playerScores.sort((p1, p2) => p1.score - p2.score);

  // put the biggest in new array
  newArr.push(playerScores.pop());

  // keep grabbing the biggest remaining item and alternate
  // between pushing and unshifting onto the new array
  while (playerScores.length) {
    newArr[playerScores.length % 2 === 0 ? 'push' : 'unshift'](playerScores.pop());
  }

  return newArr;
};

const Scorebord = () => {
  const [scores, setScores] = useState({});

  useEffect(() => {
    const id = setInterval(() => {
      const ms = Data.players.reduce((mockedScores, p) => {
        const obj = { ...mockedScores };
        Data.games.forEach((g) => {
          obj[`${g.id}-${p.id}`] = Math.round(Math.random() * (Data.maxGameScore / Data.games.length));
        });
        return obj;
      }, {});
      setScores(ms);
    }, 30000);
    return () => clearInterval(id);
  });

  const getScoreOfPlayerInGame = (gameId, playerId) => scores[`${gameId}-${playerId}`] || 0;
  const getHeightOfGameSegment = (gameId, playerId) => `${Math.round((getScoreOfPlayerInGame(gameId, playerId) / Data.maxGameScore) * 100)}%`;
  const getScoreOfPlayer = (playerId) => Data.games.reduce((sum, g) => (sum + (scores[`${g.id}-${playerId}`] || 0)), 0);
  const playerScores = pyramid(Data.players.map((p) => ({ ...p, score: getScoreOfPlayer(p.id) })));

  const getPlayerOrder = (playerId) => playerScores.findIndex((p) => (p.id === playerId));

  const createScoreboard = () => Data.players.map((p) => (
    <div key={p.id} className="player" style={{ order: getPlayerOrder(p.id) }}>
      <div className="bar">
        {
          Data.games.map((g) => (
            getScoreOfPlayerInGame(g.id, p.id)
              ? (
                <div
                  key={g.id}
                  className="segment"
                  style={
                {
                  height: getHeightOfGameSegment(g.id, p.id),
                  backgroundColor: g.color,
                }
}
                >
                  <div className="side-shadow" />
                  <div className="center">{getScoreOfPlayerInGame(g.id, p.id)}</div>
                </div>
              )
              : ''
          ))
        }
      </div>
      <div className="icon">
        <PlayerIcon id={p.id} name={p.name} />
      </div>
    </div>
  ));

  return (
    <>
      <Divider><div className="headline"> Scores</div></Divider>
      <div className="scoreboard">
        { createScoreboard() }
        <TropyIcon />
      </div>
    </>
  );
};

export default Scorebord;
