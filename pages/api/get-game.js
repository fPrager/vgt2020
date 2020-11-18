import getGameData from '../../data/get-game-data';

export default async (req, res) => {
  res.statusCode = 200;
  const {
    query: { gameId },
  } = req;
  const game = await getGameData(gameId);
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(game));
};
