import React from 'react';
import './Board.css';
import GameControls from './GameControls';
import AnswerRow from './AnswerRow';
import PlayRow from './PlayRow';
import { GameFactory } from '../engine/factory/GameFactory';
import { GameState } from '../engine/model/GameState';

export class Board extends React.Component {
  private _rows: number[] = [];
  private _gameState: GameState;

  constructor(){
    super(null);
    this._gameState = GameFactory.CreateCode();
    for(let i = 0;i < this._gameState.Turns.length;i++){
      this._rows.push(i);
    }
  }

  render(){
    return (
      <div className="mastermind">
        <div className="mastermind-board">
          <GameControls />
          
          <div className="mastermind-row-container">
            <AnswerRow />

            {this._rows.map(x => (
              <PlayRow />
            ))}
            <div className="clear-left"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Board;