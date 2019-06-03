import { MastermindUIElements } from "./MastermindUIElements";
import { MastermindUIUtility } from "./MastermindUIUtility";

export class DisplayUtility {

    public static ShowHiddenRow() {
        let row = document.querySelector(MastermindUIElements.RowTemplateClass);
        if (row.className.indexOf(' ') >= 0) {
            row.className = row.className.split(' ')[0];
        }
    }
    
    public static CloneRowNode(numberOfTurns: number) {
        let board = document.querySelector(MastermindUIElements.Board);
        let row = document.querySelector(MastermindUIElements.RowTemplateClass);
        row.className = MastermindUIElements.RowClass.replace('.', '');
        //make an extra one for the answer and an extra one for the template
        let x = numberOfTurns + 1;
        for (var i = 0; i < x; i++) {
            board.appendChild(row.cloneNode(true));
        }
        //find the first one and change its name and hide it        
        let firstChild = document.querySelector(MastermindUIElements.RowClass);
        firstChild.className = `${MastermindUIElements.RowTemplateClass.replace('.', '')} hide`;
        
        //clean up final row
        DisplayUtility.CleanFinalNode(board);
    }    
    
    public static CleanFinalNode(board: Element) {
        let answerRow = board.querySelector(MastermindUIElements.RowClass) as HTMLElement;
        //let answerRow = rows[rows.length - 1];
        let answerRowGoButton = answerRow.querySelector(MastermindUIElements.RowGoButton);
        let answerRowPegs = answerRow.querySelector(MastermindUIElements.PegsClass);
        answerRowGoButton.remove();
        answerRowPegs.remove();
    }

}