const GameIcon = ({ gameId }) => (
  <div className="game-icon" style={{ maskImage: `url("/assets/games/${gameId}.svg")` }} />
);

export default GameIcon;
