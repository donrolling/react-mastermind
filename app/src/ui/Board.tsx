import React from 'react';
import './Board.css';
import GameControls from './GameControls';
import AnswerRow from './AnswerRow';
import PlayRow from './PlayRow';
import { GameFactory } from '../engine/factory/GameFactory';
import { GameState } from '../engine/model/GameState';

export class Board extends React.Component {
  private _gameState: GameState;

  constructor(props:any){
    super(props);
    this.setGameState = this.setGameState.bind(this);
  }

  setGameState(){
    this._gameState = GameFactory.CreateCode();
    console.log(this._gameState);
    this.forceUpdate();
  }

  render(){
    return (
      <div className="mastermind">
        <div className="mastermind-board">
          <GameControls>{this.setGameState}</GameControls>
          
          <div className="mastermind-row-container">
            { this._gameState ? <AnswerRow One={this._gameState.Code.One} Two={this._gameState.Code.Two} Three={this._gameState.Code.Three} Four={this._gameState.Code.Four} /> : null }

            <div className="clear-left"></div>

            { 
              this._gameState 
                ? <PlayRow /> 
                : null 
            }
            
            <div className="clear-left"></div>
          </div>
          <div className="clear-left"></div>
        </div>
      </div>
    );
  }
}

export default Board;