import { ResponseColors } from "../enum/ResponseColors";
import { CodeResponse } from "../model/CodeResponse";

import * as _ from 'lodash';

export class CodeResponseFactory {

    public static ToString(codeResponse: CodeResponse): string {
        var delimiter = ", ";
        var colorList = CodeResponseFactory.ToColorList(codeResponse);
        return _.join(colorList, delimiter);
    }
    
    public static ToColorList(codeResponse: CodeResponse): ResponseColors[] {
        return [
            codeResponse.One,
            codeResponse.Two,
            codeResponse.Three,
            codeResponse.Four
        ];
    }
    
    public static CorrectGuess(codeResponse: CodeResponse): boolean {
        var colorList = CodeResponseFactory.ToColorList(codeResponse);
        var xs = _.filter(
            colorList, 
            (a:ResponseColors) => { 
                return a === ResponseColors.Red;
            }
        );
        return xs.length === 4;
    }
}