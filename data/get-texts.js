import { PrismaClient } from '@prisma/client';
import Data from '../mock/data.json';

// const prisma = new PrismaClient();

export default async (gameId) => (Data.games.find((g) => (g.id === gameId)));
/*

  const game = await prisma.game.findFirst({
    where: {
      key: gameId,
    },
  });
  return game;

  */
