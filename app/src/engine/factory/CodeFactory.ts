import { CodeColors } from "../enum/CodeColors";
import { Code } from "../model/Code";

export class CodeFactory
    {
        public static Create(one : CodeColors, two : CodeColors, three : CodeColors, four : CodeColors) : Code 
        {
            var code = new Code();
            code.One = one;
            code.Two = two;
            code.Three = three;
            code.Four = four;
            return code;
        }

        public static CreateFromList(colors: CodeColors[]) : Code 
        {
            var code = new Code();
            code.One = colors[0];
            code.Two = colors[1];
            code.Three = colors[2];
            code.Four = colors[3];
            return code;
        }

        public static ToColorList(code: Code) : CodeColors[]
        {
            return [
                code.One,
                code.Two,
                code.Three,
                code.Four
            ];
        }

        public static ToString(code: Code) : string
        {
            return `${ code.One }, ${ code.Two }, ${ code.Three }, ${ code.Four }`;
        }
    }