import Image from 'next/image';
import { Game } from '../../hooks/useGames';
import Item from '../Item';

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
  game: Game;
}

function GameItem({ game, ...props }: Props) {
  return (
    <Item {...props}>
      <div className="game-item">
        <Image
          src={game.thumb_url || game.image_url || 'event.jpeg'}
          height={75}
          width={75}
          objectFit="cover"
          alt="game"
        />
        <div className="game-item__text">
          <span className="game-item__name">{game.name}</span>
          <span className="game-item__year">{game.year_published}</span>
        </div>
      </div>
    </Item>
  );
}

export default GameItem;
