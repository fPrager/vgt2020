const GameIcon = ({ gameId }) => (
  <div className="game-icon anticon" style={{ WebkitMaskImage: `url("/assets/games/${gameId}.svg")`, maskImage: `url("/assets/games/${gameId}.svg")` }} />
);

export default GameIcon;
