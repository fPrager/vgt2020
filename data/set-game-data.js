import DB from './db';

export default async (gameId, data) => {
  await DB.game.update({
    where: {
      key: gameId,
    },
    data,
  });
};
