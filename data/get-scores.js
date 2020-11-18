import DB from './db';

export default async () => {
  const points = await DB.points.findMany();
  const games = await DB.game.findMany();
  const player = await DB.player.findMany();

  const scores = player.reduce((obj, p) => ({
    ...obj,
    [p.key]: games.map((g) => ({
      gameId: g.key,
      score: (
        points.find(
          (po) => (po.gameId === g.id && po.playerId === p.id),
        ) || {}
      ).score || 0,
    })),
  }), {});

  return scores;
};
