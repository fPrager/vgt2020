import setGameData from '../../data/set-game-data';

export default async (req, res) => {
  const { gameId, rules, notes } = req.body;
  await setGameData(gameId, {
    rules,
    notes,
  });
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ msg: 'ok' }));
};
