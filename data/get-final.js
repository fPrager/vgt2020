import DB from './db';

export default async () => {
  const vgts = await DB.vGT.findMany();
  return vgts[0].final;
};
