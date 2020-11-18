import { PrismaClient } from '@prisma/client';
import Data from '../mock/data.json';

// const prisma = new PrismaClient();
/*
  const points = await prisma.points.findMany();
  const games = await prisma.game.findMany();
  const player = await prisma.player.findMany();

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

  return scores; */

export default async () => Data.players.reduce((obj, p) => ({ ...obj, [p.id]: p.scores }), {});
