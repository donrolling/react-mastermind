import React from 'react';
import './Board.css';
import GameControls from './GameControls';
import AnswerRow from './AnswerRow';
import PlayRow from './PlayRow';
import { GameFactory } from '../engine/factory/GameFactory';
import { GameState } from '../engine/model/GameState';
import SelectionRow from './SelectionRow';
import { CodeColors } from '../engine/enum/CodeColors';
import { Code } from '../engine/model/Code';
import Marble from './Marble';

type BoardState = {
  GameState: GameState | undefined;
  SelectionRow: SelectionRow | undefined;
  ActiveMarble: Marble | undefined;
}

export class Board extends React.Component<any, BoardState> {
  _selectionRow: SelectionRow;
  constructor(props: any) {
    super(props);
    this.state = {
      GameState: undefined,
      SelectionRow: undefined,
      ActiveMarble: undefined
    };
    this.startGame = this.startGame.bind(this);
    this.selectActiveMarbleColor = this.selectActiveMarbleColor.bind(this);
    this.setActiveMarbleColor = this.setActiveMarbleColor.bind(this);
    this.setSelectionRow = this.setSelectionRow.bind(this);
  }

  startGame() {
    let gameState = GameFactory.CreateCode();
    this.setState({
      GameState: gameState,
      SelectionRow: this.state.SelectionRow,
      ActiveMarble: this.state.ActiveMarble
    });
  }

  selectActiveMarbleColor(x: Marble) {
    if (this.state.SelectionRow) {
      this.setState({
        GameState: this.state.GameState,
        SelectionRow: this.state.SelectionRow,
        ActiveMarble: x
      });
      this.state.SelectionRow.SelectColor();
    } else {
      throw new Error('SelectionRow was null.');
    }
  }

  setActiveMarbleColor(x: CodeColors) {
    if (this.state.ActiveMarble) {
      this.state.ActiveMarble.SetColor(x);
    } else {
      throw new Error('ActiveMarble was null.');
    }
  }
  
  setSelectionRow(x: SelectionRow) {
    if(this.state.SelectionRow){ return; }
    this.setState({
      GameState: this.state.GameState,
      SelectionRow: x,
      ActiveMarble: this.state.ActiveMarble
    });
  }

  submitActiveRow(x: Code) {
    //let codeResponse = this.state.GameState.Guess(x);
    //todo: find the active row and set the response
  }

  render() {
    return (
      <div className="mastermind">
        <div className="mastermind-board">
          <GameControls StartGame={this.startGame} />

          <SelectionRow SelectionCallback={this.setActiveMarbleColor} ref={(x) => { this.setSelectionRow(x); }} />
          <div className="clear-left"></div>

          <div className="mastermind-row-container">
            {
              this.state.GameState 
                ? <AnswerRow 
                    One={this.state.GameState.Code.One} 
                    Two={this.state.GameState.Code.Two} 
                    Three={this.state.GameState.Code.Three} 
                    Four={this.state.GameState.Code.Four} /> 
                : null
            }

            <div className="clear-left"></div>

            {
              this.state.GameState
                ? <PlayRow 
                    SubmitRow={this.submitActiveRow} SetMarble={this.selectActiveMarbleColor} 
                  />
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