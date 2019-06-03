import { GameState } from "../model/GameState";
import { CodeMaker } from "../service/CodeMaker";
import { Code } from "../model/Code";

export class GameFactory {
    public static CreateCode(): GameState {
        var x = new GameState();
        x.Code = CodeMaker.Create();
        return x;
    }

    public static CreateSetCode(code: Code): GameState {
        var x = new GameState();
        x.Code = code;
        return x;
    }
}