import { PrismaClient } from '@prisma/client';

import Data from '../../mock/data.json';

const prisma = new PrismaClient();

export default async (req, res) => {
  console.log('reset games');
  await prisma.game.deleteMany();
  await Promise.all(
    Data.games.map((g) => prisma.game.create({
      data: {
        key: g.id,
        rules: g.rules,
        notes: g.notes,
      },
    })),
  );

  console.log('reset player');
  await prisma.player.deleteMany();
  await Promise.all(
    Data.players.map((p) => prisma.player.create({
      data: {
        key: p.id,
      },
    })),
  );

  console.log('reset vgt');
  await prisma.vGT.deleteMany();
  await prisma.vGT.create({
    data: {
    },
  });

  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ msg: 'ok' }));
};
