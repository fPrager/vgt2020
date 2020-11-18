import getScores from '../../data/get-scores';

export default async (req, res) => {
  res.statusCode = 200;
  const scores = await getScores();
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(scores));
};
