import setFinal from '../../data/set-final';

export default async (req, res) => {
  const { final } = req.body;
  await setFinal(final);
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ msg: 'ok' }));
};
