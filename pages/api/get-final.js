import getFinal from '../../data/get-final';

export default async (req, res) => {
  res.statusCode = 200;
  const final = await getFinal();
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ final }));
};
