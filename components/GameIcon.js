const GameIcon = ({ gameId }) => (
  <div className="game-icon anticon" style={{ maskImage: `url("/assets/games/${gameId}.svg")` }} />
);

export default GameIcon;
