import Data from '../mock/data.json';

const getAllGameIds = () => Data.games.map((g) => (
  {
    params: {
      gid: g.id,
    },
  }
));

export default getAllGameIds;
