import React from 'react';
import './Row.css';
import Marble from './Marble';
import RowControls from './RowControls';
import { CodeColors } from '../engine/enum/CodeColors';
import { Code } from '../engine/model/Code';
import { CodeFactory } from '../engine/factory/CodeFactory';

type PlayRowProps = { 
    SubmitRow: (x: Code) => void;
    SetMarble: (x: Marble) => void;
};

class PlayRow extends React.Component<PlayRowProps> {
    private _marbles: Marble[];
    private _activeMarble: Marble | undefined;

    constructor(props: PlayRowProps) {
        super(props);
        this.submitRow = this.submitRow.bind(this);
        this.setMarble = this.setMarble.bind(this);

        this._marbles = [
            new Marble({ 
                CodeColor: CodeColors.empty,
                ClickCallback: this.setMarble
            }),            
            new Marble({ 
                CodeColor: CodeColors.empty,
                ClickCallback: this.setMarble
            }),            
            new Marble({ 
                CodeColor: CodeColors.empty,
                ClickCallback: this.setMarble
            }),            
            new Marble({ 
                CodeColor: CodeColors.empty,
                ClickCallback: this.setMarble
            })
        ];
    }

    submitRow(): void {
        //todo: validate row
        var x: Code = CodeFactory.Create(this._marbles[0].CodeColor, this._marbles[1].CodeColor, this._marbles[2].CodeColor, this._marbles[3].CodeColor);
        this.props.SubmitRow(x);
    }

    setMarble(x: Marble): void {
        this._activeMarble = x;
        this.props.SetMarble(x);
    }

    SetActiveMarbleColor(x: CodeColors){
        if(this._activeMarble){
            this._activeMarble.SetColor(x);
        }else{
            throw new Error('Active Marble wasn\'t set');
        }
    }

    render(){
        return (
            <div className="mastermind-row">
                <RowControls SubmitRow={ this.submitRow } />
                
                <div className="mastermind-row-marbles">
                    <Marble CodeColor={ CodeColors.empty } ClickCallback={ this.setMarble } />
                    <Marble CodeColor={ CodeColors.empty } ClickCallback={ this.setMarble } />
                    <Marble CodeColor={ CodeColors.empty } ClickCallback={ this.setMarble } />
                    <Marble CodeColor={ CodeColors.empty } ClickCallback={ this.setMarble } />
                    <div className="clear-left"></div>
                </div>
            </div>
        )
    }
}

export default PlayRow;