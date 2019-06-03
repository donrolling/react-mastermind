import { CodeColors } from "../enum/CodeColors";
import { ResponseColors } from "../enum/ResponseColors";
import { CodeFactory } from "../factory/CodeFactory";
import * as GameFactory from "../factory/GameFactory";
import { Code } from "../model/Code";
import { GameState } from "../model/GameState";
import { MastermindUIElements } from "../utility/MastermindUIElements";
import { MastermindUIUtility } from "../utility/MastermindUIUtility";
import { DisplayUtility } from "../utility/DisplayUtility";
import { FormUtility } from "../utility/FormUtility";

export class GamePlay {
    private _gameMode: number;
    private _game: GameState;

    constructor() {
        let startButton = document.getElementById(MastermindUIElements.StartButton);
        startButton.addEventListener(MastermindUIElements.Click, () => this.Init());
    }

    public Init(): void {
        this.resetInitialState();
        this.setupGame();
        DisplayUtility.ShowHiddenRow();
        MastermindUIUtility.SetupColorSelector();
        DisplayUtility.CloneRowNode(this._game.NumberOfTurns);
        MastermindUIUtility.SetEventsForActiveRow(this._game);
    }

    private setupGame() {
        let gameMode = FormUtility.GetRadioVal(MastermindUIElements.GameOptionsForm, MastermindUIElements.GameTypeRadioButtons);
        this._gameMode = parseInt(gameMode);

        if (this._gameMode === 1) {
            this._game = GameFactory.GameFactory.CreateWithCode();
        }
        else {
            //todo: let user set code
            let code = new Code();
            this._game = GameFactory.GameFactory.CreateSetCode(code);
        }
    }

    resetInitialState() {
        
    }
}