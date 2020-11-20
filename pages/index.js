import { useEffect, useState } from 'react';
import { Tooltip } from 'antd';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
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

const REFRESH_INTERVALL = 5000;

const Scorebord = () => {
  const [initial, setInital] = useState(true);
  const [lefts, setLefts] = useState(Data.players.map((p, index) => (100 * (index / Data.players.length))));
  const [heights, setHeights] = useState(new Array(Data.players.length).fill(new Array(Data.games.length).fill(0)));
  const [points, setPoints] = useState(new Array(Data.players.length).fill(new Array(Data.games.length).fill(0)));
  const [{ width, height }, setDimension] = useState({ width: 0, height: 0 });
  const [showConfetti, setShowConfett] = useState(false);

  const updateLeftsAndHeights = async () => {
    const res = await fetch('./api/get-scores');
    const data = await res.json();
    const playerScores = pyramid(Data.players.map(
      (p) => ({ id: p.id, score: data[p.id].reduce((sum, g) => (sum + g.score), 0) }),
    ));
    const newLefts = Data.players.map(
      (p) => playerScores.findIndex((s) => s.id === p.id),
    ).map((index) => (100 * (index / playerScores.length)));
    setLefts(newLefts);

    const newHeights = Data.players.map((p) => Data.games.map((g) => (Math.round((data[p.id].find((e) => e.gameId === g.id).score / Data.maxGameScore) * 100))));
    setHeights(newHeights);

    const newPoints = Data.players.map((p) => Data.games.map((g) => (data[p.id].find((e) => e.gameId === g.id).score)));
    setPoints(newPoints);

    setInital(false);

    setDimension({ width: window.screen.width, height: window.screen.height });

    const resFinal = await fetch('./api/get-final');
    const dataFinal = await resFinal.json();
    setShowConfett(dataFinal.final);
  };

  useEffect(() => {
    if (initial) {
      updateLeftsAndHeights();
      return () => {};
    }

    const id = setInterval(updateLeftsAndHeights, REFRESH_INTERVALL);
    return () => clearInterval(id);
  });

  const createScoreboard = () => Data.players.map((p, pIndex) => (
    <div key={p.id} className="player" style={{ left: `${lefts[pIndex]}%` }}>
      <div className="bar">
        {
          Data.games.map((g, gIndex) => (
            heights[pIndex][gIndex]
              ? (
                <Tooltip placement="top" title={g.title}>
                  <div
                    key={g.id}
                    className="segment"
                    style={
                {
                  height: `${heights[pIndex][gIndex]}%`,
                  backgroundColor: g.color,
                }
}
                  >
                    <div className="side-shadow" />
                    <div className="center">{points[pIndex][gIndex]}</div>
                  </div>
                </Tooltip>
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
      <Confetti width={width} height={height} numberOfPieces={showConfetti ? 200 : 1} />
      <div className="scoreboard" style={{ minWidth: `${Data.players.length * 6}rem` }}>
        <TropyIcon />
        { createScoreboard() }
      </div>
    </>
  );
};

export default React.memo(Scorebord);
