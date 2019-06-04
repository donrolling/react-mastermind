import { Code } from "./Code";
import { CodeResponse } from "./CodeResponse";
import { Turn } from "./Turn";

import { CodeTester } from "../service/CodeTester";

import { CodeFactory } from "../factory/CodeFactory";
import { CodeResponseFactory } from "../factory/CodeResponseFactory";

export class GameState {
    Turns: Turn[] = [];
    
    public CodeBroken: boolean = false;
    public GameOver: boolean = false;
    
    public NumberOfTurns: number = 12;//can be 12, 10 or 8
    public Code: Code;
    
    public GameOverMessage(): string {
        return this.getGameOverMessage();
    }

    Guess(guess: Code): CodeResponse {
        if (this.Turns.length >= this.NumberOfTurns) {
            throw this.getGameOverMessage();
        }
        if(!this.Code){
            throw new Error('Code is undefined.');
        }
        let response = CodeTester.Test(guess, this.Code);
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
        if(!this.Code){
            throw new Error('Code is undefined.');
        }
        return `Game over. \r\nCodeBroken: ${ this.CodeBroken }\r\nCode: ${ CodeFactory.ToString(this.Code) }`;
    }
}