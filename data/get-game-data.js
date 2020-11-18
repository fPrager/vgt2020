import DB from './db';

export default async (gameId) => {
  const game = await DB.game.findFirst({
    where: {
      key: gameId,
    },
  });

  return game || { rules: '', notes: '' };
};
