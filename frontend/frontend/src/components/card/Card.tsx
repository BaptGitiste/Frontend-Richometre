import { FunctionComponent } from 'react';

import './Card.css';

interface CardProps {
  title: string;
  image: string;
  onClick?: () => void;
}

const Card: FunctionComponent<CardProps> = ({ title, image, onClick }) => {

  return (
    <button type="button" className="card" onClick={onClick}>
        <div className="card-image">
          <img src={image} alt={title}/>
        </div>
        <div className="card-content">
          <span>{title}</span>
        </div>
    </button>
  );
};

export default Card;