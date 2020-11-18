import Data from '../../mock/data.json';
import DB from '../../data/db';

export default async (req, res) => {
  console.log('delete points');
  await DB.points.deleteMany();

  console.log('reset games');
  await DB.game.deleteMany();
  await Promise.all(
    Data.games.map((g) => DB.game.create({
      data: {
        key: g.id,
        rules: g.defaultRules,
        notes: g.defaultNotes,
      },
    })),
  );

  console.log('reset player');
  await DB.player.deleteMany();
  await Promise.all(
    Data.players.map((p) => DB.player.create({
      data: {
        key: p.id,
      },
    })),
  );

  console.log('reset vgt');
  await DB.vGT.deleteMany();
  await DB.vGT.create({
    data: {
    },
  });

  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ msg: 'ok' }));
};
