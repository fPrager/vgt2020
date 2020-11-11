import { useRouter } from 'next/router';

const Player = () => {
  const router = useRouter();
  const { pid } = router.query;

  return (
    <p>
      Player:
      {pid}
    </p>
  );
};

export default Player;
