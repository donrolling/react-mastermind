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
import { statement } from '@babel/template';

type BoardState = {
  GameState: GameState | undefined;
  SelectionRow: SelectionRow | undefined;
  ActiveMarble: Marble | undefined;
  ActivePlayRow: PlayRow | undefined;
  PlayRows: PlayRow[] | undefined;
  Turns: number[] | undefined;
}

export class Board extends React.Component<any, BoardState> {
  private _playRows: PlayRow[] = [];

  constructor(props: any) {
    super(props);
    this.state = {
      GameState: undefined,
      SelectionRow: undefined,
      ActiveMarble: undefined,
      ActivePlayRow: undefined,
      PlayRows: undefined,
      Turns: undefined
    };
    this.addPlayRow = this.addPlayRow.bind(this);
    this.startGame = this.startGame.bind(this);
    this.selectActiveMarbleColor = this.selectActiveMarbleColor.bind(this);
    this.setActiveMarbleColor = this.setActiveMarbleColor.bind(this);
    this.setSelectionRow = this.setSelectionRow.bind(this);
    this.submitActiveRow = this.submitActiveRow.bind(this);
  }

  addPlayRow(playRow: PlayRow) {
    if(this.state.PlayRows){ return; }
    
    if(playRow.Index < this.state.GameState.NumberOfTurns){
      this._playRows.push(playRow);
    }
    if(playRow.Index === this.state.GameState.NumberOfTurns - 1){
      let firstPlayRow = this._playRows[0];
      firstPlayRow.Enable();
      this.setState({
        GameState: this.state.GameState,
        SelectionRow: this.state.SelectionRow,
        ActiveMarble: this.state.ActiveMarble,
        ActivePlayRow: firstPlayRow,
        PlayRows: this._playRows,
        Turns: this.state.Turns
      });
    } 
  }

  startGame() {
    let gameState = GameFactory.CreateCode();
    let turns: number[] = [];
    for(var i = 0;i < gameState.NumberOfTurns;i++){
      turns.push(i);
    }

    this.setState({
      GameState: gameState,
      SelectionRow: this.state.SelectionRow,
      ActiveMarble: this.state.ActiveMarble,
      ActivePlayRow: this.state.ActivePlayRow,
      PlayRows: this.state.PlayRows,
      Turns: turns
    });
  }

  selectActiveMarbleColor(marble: Marble, playRow: PlayRow) {
    if (this.state.SelectionRow) {
      this.setState({
        GameState: this.state.GameState,
        SelectionRow: this.state.SelectionRow,
        ActiveMarble: marble,
        ActivePlayRow: playRow,
        PlayRows: this.state.PlayRows
      });
      this.state.SelectionRow.SelectColor();
    } else {
      throw new Error('SelectionRow was null.');
    }
  }

  setActiveMarbleColor(codeColor: CodeColors) {
    if (this.state.ActiveMarble) {
      this.state.ActiveMarble.SetColor(codeColor);
    } else {
      throw new Error('ActiveMarble was null.');
    }
  }
  
  setSelectionRow(x: SelectionRow) {
    if(this.state.SelectionRow){ return; }
    this.setState({
      GameState: this.state.GameState,
      SelectionRow: x,
      ActiveMarble: this.state.ActiveMarble,
      ActivePlayRow: this.state.ActivePlayRow,
      PlayRows: this.state.PlayRows
    });
  }

  submitActiveRow(x: Code) {
    let codeResponse = this.state.GameState.Guess(x);
    this.state.ActivePlayRow.SetResponse(codeResponse);
    this.state.ActivePlayRow.Disable();
    let index = this.state.GameState.Turns.length;
    let activePlayRow = this._playRows[index];
    activePlayRow.Enable();
    this.setState({
      GameState: this.state.GameState,
      SelectionRow: this.state.SelectionRow,
      ActiveMarble: this.state.ActiveMarble,
      ActivePlayRow: activePlayRow,
      PlayRows: this.state.PlayRows,
      Turns: this.state.Turns
    });
  }

  render() {
    return (
      <div className="mastermind">
        <div className="mastermind-board">
          <GameControls StartGame={this.startGame} />

          <SelectionRow
            SelectionCallback={this.setActiveMarbleColor} 
            ref={(x) => { this.setSelectionRow(x); }} 
          />
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
              ? this.state.Turns.map((i) => (
                  <PlayRow 
                    SubmitRow={this.submitActiveRow} 
                    SetMarble={this.selectActiveMarbleColor}
                    key={ `PlayRow${i}` }
                    Index={i}
                    ref={(x) => { this.addPlayRow(x); }}
                  />
                ))
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