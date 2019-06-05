import { CodeColors } from '../enum/CodeColors'
import { Code } from '../model/Code'

export class CodeMaker {
    private static Max: number = Object.keys(CodeColors).length / 2;// = Enum.GetValues(typeof (CodeColors)).Cast<int>().Max();

    public static Create(): Code {
        var code = new Code();
        code.One = CodeMaker.GetRandomColor();
        code.Two = CodeMaker.GetRandomColor();
        code.Three = CodeMaker.GetRandomColor();
        code.Four = CodeMaker.GetRandomColor();
        return code;
    }

    public static RandomIntFromInterval(min: number, max: number) // min and max included
    {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    public static GetRandomColor() : CodeColors {
        let rand = CodeMaker.RandomIntFromInterval(1, CodeMaker.Max);
        let x = this.getValues(CodeColors)[rand];
        if(x === CodeColors.empty){
            return CodeMaker.GetRandomColor();
        }
        return x;
    }

    private static getValues<T extends number>(e: any) {
        return this.getObjValues(e).filter(v => typeof v === 'number') as T[];
    }

    private static getObjValues(e: any): (number | string)[] {
        return Object.keys(e).map(k => e[k]);
    }
}