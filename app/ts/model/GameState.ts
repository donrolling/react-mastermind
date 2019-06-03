import { Code } from "../model/Code";
import { CodeResponse } from "../model/CodeResponse";
import { Turn } from "../model/Turn";

import { CodeMaker } from "../service/CodeMaker";
import { CodeTester } from "../service/CodeTester";

import { CodeFactory } from "../factory/CodeFactory";
import { CodeResponseFactory } from "../factory/CodeResponseFactory";

export class GameState {
    Turns: Turn[] = [];
    
    public CodeBroken: boolean;
    public GameOver: boolean;
    
    public NumberOfTurns: number = 12;//can be 12, 10 or 8
    private _code: Code;
    
    set Code(code : Code){
        this._code = code;
    }
    
    public GameOverMessage(): string {
        return this.getGameOverMessage();
    }

    Guess(guess: Code): CodeResponse {
        if (this.Turns.length >= this.NumberOfTurns) {
            throw this.getGameOverMessage();
        }
        let response = CodeTester.Test(guess, this._code);
        this.Turns.push({ 'Code': guess, 'CodeResponse': response });
        if (CodeResponseFactory.CorrectGuess(response)) {
            this.CodeBroken = true;
            this.GameOver = true;
        }
        if (this.Turns.length >= this.NumberOfTurns) {
            this.CodeBroken = false;
            this.GameOver = true;
        }
        return response;

    }

    private getGameOverMessage(): string {
        return `Game over. \r\nCodeBroken: ${ this.CodeBroken }\r\nCode: ${ CodeFactory.ToString(this._code) }`;
    }
}