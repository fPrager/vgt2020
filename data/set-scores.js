import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

export default async (playerId, gameId, score) => {

/*
  const existingPoint = await prisma.points.findFirst({
    where: {
      game: { key: gameId },
      player: { key: playerId },
    },
  });

  if (existingPoint) {
    await prisma.points.update({
      where: {
        id: existingPoint.id,
      },
      data: {
        score,
      },
    });
    return;
  }

  await prisma.points.create({
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
  */
};
