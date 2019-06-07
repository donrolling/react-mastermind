import React from 'react';
import update from 'immutability-helper';
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
    NotifyReady: (x: PlayRow) => void;
    Index: number;
};

type PlayRowState = {
    ActiveMarble: Marble | undefined;
    Marbles: Marble[] | undefined;
    RowControls: RowControls | undefined;
    Disabled: boolean;
    UpdateMethod: string;
};

class PlayRow extends React.Component<PlayRowProps, PlayRowState> {
    private _marbleMapper: number[] = [0, 1, 2, 3];
    private _marbles: Marble[] = [];
    _rowControls: RowControls;

    public get Index() {
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
            Disabled: true,
            UpdateMethod: 'ctor'
        };
    }

    public Enable(): void {
        this.setState(update(this.state, {
            Disabled: { $set: false },
            UpdateMethod: { $set: 'Enable' }
        }));
    }

    public SetActiveMarbleColor(codeColors: CodeColors) {
        if (this.state.ActiveMarble) {
            this.state.ActiveMarble.SetColor(codeColors);
        } else {
            throw new Error('Active Marble wasn\'t set');
        }
    }

    public SetResponse(response: CodeResponse) {
        if (!this.state.RowControls) { return; }
        this.setState(update(this.state, {
            Disabled: { $set: true },
            UpdateMethod: { $set: 'Disable' }
        }));
        this.state.RowControls.SetResponse(response);       
    }

    private addMarble(marble: Marble) {
        if (this.state.Marbles) {
            return;
        }
        if (!marble) {
            return;
        }
        if (marble.Index < this._marbleMapper.length) {
            this._marbles.push(marble);
        }
    }

    private addRowControls(rowControls: RowControls) {
        if (this.state.RowControls) {
            return;
        }
        if (!rowControls) {
            return;
        }
        this._rowControls = rowControls;
    }

    private setMarble(marble: Marble): void {
        if (this.state.Disabled) {
            return;
        }
        this.setState(update(this.state, {
            ActiveMarble: { $set: marble }
        }));
        this.props.SetMarble(marble, this);
    }

    private submitRow(): void {
        if (this.state.Disabled) {
            return;
        }
        let marbles: Marble[] = this.state.Marbles;
        let valid = true;
        for (var i = 0; i < marbles.length; i++) {
            valid = marbles[i].CodeColor !== CodeColors.empty;
            if (!valid) {
                alert('You have to finish this row.');
                return;
            }
        }
        var code: Code = CodeFactory.Create(marbles[0].CodeColor, marbles[1].CodeColor, marbles[2].CodeColor, marbles[3].CodeColor);
        this.props.SubmitRow(code);
    }

    componentDidUpdate(prevProps: any, prevState: any, snapshot: any): void {
        //don't really set the state until everything is ready
        if (
            this.state.UpdateMethod !== 'componentDidUpdate'
            && this._rowControls
            && this._marbles
            && this._marbles.length > 0
        ) {
            if (this.state.RowControls
                && (
                    this.state.UpdateMethod === 'Enable'
                    || this.state.UpdateMethod === 'Disable'
                )
            ) {
                if(this.state.UpdateMethod === 'Enable'){
                    this.state.RowControls.Enable();
                }
                if(this.state.UpdateMethod === 'Disable'){
                    //this.state.RowControls.Disable();
                }
            } else {
                this.setState(update(this.state, {
                    RowControls: { $set: this._rowControls },
                    Marbles: { $set: this._marbles },
                    UpdateMethod: { $set: 'componentDidUpdate' }
                }));
            }
        } else {
            //send notification that we're setup and ready
            this.props.NotifyReady(this);
        }
    }

    render() {
        return (
            <div className="mastermind-row">
                <RowControls
                    key={'RowControls'}
                    SubmitRow={this.submitRow}
                    ref={(x) => { this.addRowControls(x); }}
                />

                <div className="mastermind-row-marbles">
                    {
                        this._marbleMapper.map((i) => (
                            <Marble
                                CodeColor={CodeColors.empty}
                                ClickCallback={this.setMarble}
                                key={`Marble${i}`}
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