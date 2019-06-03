import { CodeResponse } from "../model/CodeResponse";
import { Code } from "../model/Code";
import { ResponseColors } from "../enum/ResponseColors";
import { CodeFactory } from "../factory/CodeFactory";
import { CodeColors } from "../enum/CodeColors";

import * as _ from 'lodash';

export class CodeTester {
    public static AreEqual(guess: Code, answer : Code) : boolean {
        return guess.One == answer.One
            && guess.Two == answer.Two
            && guess.Three == answer.Three
            && guess.Four == answer.Four;
    }

    public static Test(guess:Code, answer:Code) : CodeResponse {
        let list = CodeTester.GenerateListOfResponseColors(guess, answer);
        let response = CodeTester.GenerateResponse(list);
        return response;
    }

    public static GenerateListOfResponseColors(guess:Code, answer:Code) : ResponseColors[] {
        let list: ResponseColors[] = [];
        let answerColors = CodeFactory.ToColorList(answer);
        let guessColors = CodeFactory.ToColorList(guess);

        CodeTester.GetResponse(guess.One, answer.One, list, answerColors);
        CodeTester.GetResponse(guess.Two, answer.Two, list, answerColors);
        CodeTester.GetResponse(guess.Three, answer.Three, list, answerColors);
        CodeTester.GetResponse(guess.Four, answer.Four, list, answerColors);

        while (list.length < 4) {
            list.push(ResponseColors.None);
        }
        return list;
    }

    public static GetResponse(guessColor: CodeColors, answerColor: CodeColors, list: ResponseColors[], answerColors: CodeColors[]) {
        if (guessColor == answerColor) {
            list.push(ResponseColors.Red);
        } else {
            //is maybe white?
            //todo: is this where the bug is?
            //probably yes, because it could count a color that is in the answer twice
            let contains = _.includes(answerColors, guessColor);
            if (contains) {
                list.push(ResponseColors.White);
            } else {
                list.push(ResponseColors.None);
            }
        }
    }

    public static GenerateResponse(list: ResponseColors[]) : CodeResponse {
        list.sort((a, b) => a - b);
        return {
            'One': list[0],
            'Two': list[1],
            'Three': list[2],
            'Four': list[3]
        };
    }

}