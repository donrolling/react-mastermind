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
import GameOver from './GameOver';

type BoardState = {
  GameState: GameState | undefined;
  SelectionRow: SelectionRow | undefined;
  AnswerRow: AnswerRow | undefined;
  ActiveMarble: Marble | undefined;
  ActivePlayRow: PlayRow | undefined;
  PlayRows: PlayRow[] | undefined;
  Turns: number[] | undefined;
  ShowAnswer: boolean;
  UpdateMethod: string;
}

export class Board extends React.Component<any, BoardState> {
  private _playRows: PlayRow[] = [];
  private _selectionRow: SelectionRow;
  private _answerRow: AnswerRow;
  private _firstRowEnabled: boolean = false;

  constructor(props: any) {
    super(props);
    this.state = {
      GameState: undefined,
      SelectionRow: undefined,
      AnswerRow: undefined,
      ActiveMarble: undefined,
      ActivePlayRow: undefined,
      PlayRows: undefined,
      Turns: undefined,
      ShowAnswer: true,
      UpdateMethod: "ctor"
    };
    this.addPlayRow = this.addPlayRow.bind(this);
    this.startGame = this.startGame.bind(this);
    this.selectActiveMarbleColor = this.selectActiveMarbleColor.bind(this);
    this.setActiveMarbleColor = this.setActiveMarbleColor.bind(this);
    this.setSelectionRow = this.setSelectionRow.bind(this);
    this.submitActiveRow = this.submitActiveRow.bind(this);
    this.playRowReady = this.playRowReady.bind(this);
    this.enableFirstPlayRow = this.enableFirstPlayRow.bind(this);
  }

  private addPlayRow(playRow: PlayRow) {
    if (this.state.PlayRows || !playRow) { return; }
    this._playRows.push(playRow);
  }

  private selectActiveMarbleColor(marble: Marble, playRow: PlayRow) {
    if (this.state.SelectionRow) {
      this.setState({
        GameState: this.state.GameState,
        SelectionRow: this.state.SelectionRow,
        AnswerRow: this.state.AnswerRow,
        ActiveMarble: marble,
        ActivePlayRow: playRow,
        PlayRows: this.state.PlayRows,
        UpdateMethod: "selectActiveMarbleColor"
      });
      this.state.SelectionRow.SelectColor();
    } else {
      throw new Error('SelectionRow was null.');
    }
  }

  private setActiveMarbleColor(codeColor: CodeColors) {
    if (this.state.ActiveMarble || !codeColor) {
      this.state.ActiveMarble.SetColor(codeColor);
    } else {
      throw new Error('ActiveMarble was null.');
    }
  }

  private setSelectionRow(selectionRow: SelectionRow) {
    if (this.state.SelectionRow || !selectionRow) { return; }
    this._selectionRow = selectionRow;
  }

  private setAnswerRow(answerRow: AnswerRow) {
    if (this.state.AnswerRow) { return; }
    this._answerRow = answerRow;
  }

  private startGame() {
    let gameState = GameFactory.CreateCode();
    let turns: number[] = [];
    for (var i = 0; i < gameState.NumberOfTurns; i++) {
      turns.push(i);
    }

    this.setState({
      GameState: gameState,
      SelectionRow: this.state.SelectionRow,
      AnswerRow: this.state.AnswerRow,
      ActiveMarble: this.state.ActiveMarble,
      ActivePlayRow: this.state.ActivePlayRow,
      PlayRows: this.state.PlayRows,
      Turns: turns
    });
  }

  private submitActiveRow(code: Code) {
    let codeResponse = this.state.GameState.Guess(code);
    this.state.ActivePlayRow.SetResponse(codeResponse);
    let index = this.state.GameState.Turns.length;
    let activePlayRow: PlayRow = undefined;
    let showAnswer = this.state.ShowAnswer;
    if (this.state.GameState.GameOver) {
      showAnswer = true;
    } else {
      activePlayRow = this._playRows[index];
      activePlayRow.Enable();
    }
    this.setState({
      GameState: this.state.GameState,
      SelectionRow: this.state.SelectionRow,
      AnswerRow: this.state.AnswerRow,
      ActiveMarble: this.state.ActiveMarble,
      ActivePlayRow: activePlayRow,
      PlayRows: this.state.PlayRows,
      Turns: this.state.Turns,
      ShowAnswer: showAnswer
    });
  }

  private playRowReady(playRow: PlayRow): void {
    if (this._firstRowEnabled) { return; }
    if (playRow.Index === this.state.GameState.NumberOfTurns - 1) {
      this.enableFirstPlayRow();
    }
  }

  private enableFirstPlayRow(): void {
    this._firstRowEnabled = true;
    if (this._playRows && this._playRows.length > 0) {
      let index = this.state.GameState.Turns.length;
      let activePlayRow = this._playRows[index];
      activePlayRow.Enable();
    }
  }

  componentDidUpdate(prevProps: any, prevState: any, snapshot: any): void {
    if (!this.state.GameState) {
      return;
    }
    if (this.state.UpdateMethod !== 'componentDidUpdate') {
      this.setState({
        GameState: this.state.GameState,
        SelectionRow: this._selectionRow,
        AnswerRow: this._answerRow,
        ActiveMarble: this.state.ActiveMarble,
        ActivePlayRow: this.state.ActivePlayRow,
        PlayRows: this._playRows,
        UpdateMethod: 'componentDidUpdate'
      });
    }
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

          {
            this.state.GameState && this.state.GameState.GameOver
              ? <GameOver Win={this.state.GameState.CodeBroken} NumberOfTurns={this.state.GameState.Turns.length} />
              : null
          }

          <div className="mastermind-row-container">
            {
              this.state.GameState && this.state.ShowAnswer
                ? <AnswerRow
                  One={this.state.GameState.Code.One}
                  Two={this.state.GameState.Code.Two}
                  Three={this.state.GameState.Code.Three}
                  Four={this.state.GameState.Code.Four}
                  ref={(x) => { this.setAnswerRow(x); }}
                />
                : null
            }

            <div className="clear-left"></div>
            {
              this.state.GameState
                ? this.state.Turns.map((i) => (
                  <PlayRow
                    SubmitRow={this.submitActiveRow}
                    SetMarble={this.selectActiveMarbleColor}
                    NotifyReady={this.playRowReady}
                    key={`PlayRow${i}`}
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