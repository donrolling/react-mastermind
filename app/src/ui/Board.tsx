import React from 'react';
import './Board.css';
import GameControls from './GameControls';
import AnswerRow from './AnswerRow';
import PlayRow from './PlayRow';

const Board: React.FC = () => {
  return (
    <div className="mastermind">
      <div className="mastermind-board">
        <GameControls />
        
        <div className="mastermind-row-container">
          <AnswerRow />
          <PlayRow />
          <div className="clear-left"></div>
        </div>
      </div>
    </div>
  );
}

export default Board;