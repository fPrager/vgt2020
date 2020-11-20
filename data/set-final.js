import DB from './db';

export default async (flag) => {
  const game = await await DB.vGT.updateMany({
    data: {
      final: flag,
    },
  });
  return game;
};
