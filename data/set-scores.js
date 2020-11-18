import DB from './db';

export default async (playerId, gameId, score) => {
  const existingPoint = await DB.points.findFirst({
    where: {
      game: { key: gameId },
      player: { key: playerId },
    },
  });

  if (existingPoint) {
    await DB.points.update({
      where: {
        id: existingPoint.id,
      },
      data: {
        score,
      },
    });
    return;
  }

  await DB.points.create({
    data: {
      score,
      game: {
        connect: {
          key: gameId,
        },
      },
      player: {
        connect: {
          key: playerId,
        },
      },
    },
  });
};
