const GameImage = ({ title, url }) => (
  <div className="image">
    <div>
      <img alt={title} src={url} />
    </div>
  </div>

);

export default GameImage;
