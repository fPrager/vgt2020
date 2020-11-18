import setScores from '../../data/set-scores';

export default async (req, res) => {
  const { scores, gameId } = req.body;
  await Promise.all(
    Object.keys(scores).map((pId) => (setScores(pId, gameId, scores[pId]))),
  );
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ msg: 'ok' }));
};
