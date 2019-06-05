import React from 'react';
import './Row.css';
import Marble from './Marble';
import RowControls from './RowControls';
import { CodeColors } from '../engine/enum/CodeColors';
import { Code } from '../engine/model/Code';
import { CodeFactory } from '../engine/factory/CodeFactory';
import { CodeResponse } from '../engine/model/CodeResponse';

type PlayRowProps = { 
    SubmitRow: (x: Code) => void;
    SetMarble: (x: Marble, y: PlayRow) => void;
    Index: number;
};

type PlayRowState = { 
    ActiveMarble: Marble | undefined;
    Marbles: Marble[] | undefined;
    RowControls: RowControls | undefined;
    Disabled: boolean;
};

class PlayRow extends React.Component<PlayRowProps, PlayRowState> {
    private _marbleMapper: number[] = [0,1,2,3];
    private _marbles: Marble[] = [];

    public get Index(){
        return this.props.Index;
    }

    constructor(props: PlayRowProps) {
        super(props);
        this.submitRow = this.submitRow.bind(this);
        this.setMarble = this.setMarble.bind(this);
        this.state = {
            ActiveMarble: undefined,
            Marbles: undefined,
            RowControls: undefined,
            Disabled: true
        };
    }

    public SetActiveMarbleColor(codeColors: CodeColors){
        if(this.state.ActiveMarble){
            this.state.ActiveMarble.SetColor(codeColors);
        }else{
            throw new Error('Active Marble wasn\'t set');
        }
    }

    public Enable(): void {
        this.setState({
            ActiveMarble: this.state.ActiveMarble,
            RowControls: this.state.RowControls,
            Disabled: false
        });
    }

    public Disable(): void {
        this.setState({
            ActiveMarble: this.state.ActiveMarble,
            RowControls: this.state.RowControls,
            Disabled: true
        });
    }

    public SetResponse(response: CodeResponse){
        this.state.RowControls.SetResponse(response);
    }

    addMarble(marble: Marble) {
        if(this.state.Marbles){ return; }
        
        if(marble.Index < this._marbleMapper.length){
          this._marbles.push(marble);
        }
        if(marble.Index === this._marbleMapper.length - 1){
          this.setState({            
            ActiveMarble: this.state.ActiveMarble,
            Marbles: this._marbles,
            RowControls: this.state.RowControls,
            Disabled: this.state.Disabled
          });
        } 
    }

    submitRow(): void {
        let xs: Marble[] = this.state.Marbles;
        let valid = true;
        for(var i = 0;i < xs.length;i++){
            valid = xs[i].CodeColor !== CodeColors.empty;
            if(!valid){
                alert('You have to finish this row.');
                return;
            }
        }
        var x: Code = CodeFactory.Create(xs[0].CodeColor, xs[1].CodeColor, xs[2].CodeColor, xs[3].CodeColor);
        this.props.SubmitRow(x);
    }

    setMarble(x: Marble): void {
        if(this.state.Disabled){ return; }
        this.setState({
            ActiveMarble: x,
            RowControls: this.state.RowControls,
            Disabled: this.state.Disabled
        });
        this.props.SetMarble(x, this);
    }
    
    addRowControls(x: RowControls) {
        if(this.state.RowControls){return;}
        this.setState({
            ActiveMarble: this.state.ActiveMarble,
            RowControls: x,
            Disabled: this.state.Disabled
        });
    }

    render(){
        return (
            <div className="mastermind-row">
                <RowControls 
                    SubmitRow={ this.submitRow }                     
                    ref={(x) => { this.addRowControls(x); }}
                />
                
                <div className="mastermind-row-marbles">
                    {
                        this._marbleMapper.map((i) => (
                            <Marble 
                                CodeColor={ CodeColors.empty } 
                                ClickCallback={ this.setMarble }
                                key={ `Marble${i}` }
                                Index={i}
                                ref={(x) => { this.addMarble(x); }}
                            />
                          ))
                    }
                    <div className="clear-left"></div>
                </div>
            </div>
        )
    }
}

export default PlayRow;