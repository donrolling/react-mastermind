import React from 'react';
import update from 'immutability-helper';
import './RowControls.css';
import { CodeResponse } from '../engine/model/CodeResponse';
import { ResponseColors } from '../engine/enum/ResponseColors';

type RowControlsProps = {
    SubmitRow: () => void;
}

type RowControlsState = {
    Responses: ResponseColors[];
    ResponseClasses: string[];
    Complete: boolean;
    Disabled: boolean;
}

class RowControls extends React.Component<RowControlsProps, RowControlsState> {
    constructor(props: RowControlsProps) {
        super(props);
        this.submitRow = this.submitRow.bind(this);
        this.state = {
            Responses: [ResponseColors.none, ResponseColors.none, ResponseColors.none, ResponseColors.none],
            ResponseClasses: [ResponseColors[ResponseColors.none], ResponseColors[ResponseColors.none], ResponseColors[ResponseColors.none], ResponseColors[ResponseColors.none]],
            Complete: false,
            Disabled: true
        };
    }

    public SetResponse(x: CodeResponse): void {
        let responses = [
            x.One,
            x.Two,
            x.Three,
            x.Four
        ];
        let responseClasses = [
            ResponseColors[x.One],
            ResponseColors[x.Two],
            ResponseColors[x.Three],
            ResponseColors[x.Four]
        ];
        this.setState({
            Responses: responses,
            ResponseClasses: responseClasses,
        });
    }

    public Enable(): void {
        this.setState(update(this.state, {
            Disabled: { $set: false }
        }));
    }

    public Disable(): void {
        this.setState(update(this.state, {
            Disabled: { $set: true }
        }));
    }

    submitRow(): void {
        this.props.SubmitRow();
    }

    render() {
        return (
            <div className="mastermind-row-controls">
                {
                    this.state.Disabled || !this.state.Complete
                        ? null
                        : <button className='rowGoButton' onClick={this.submitRow}>Go</button>
                }
                {
                    this.state.Disabled
                        ? null
                        : <div className="pegs">
                            <div className={`peg ${this.state.ResponseClasses[0]}`}></div>
                            <div className={`peg ${this.state.ResponseClasses[1]}`}></div>
                            <div className={`peg ${this.state.ResponseClasses[2]}`}></div>
                            <div className={`peg ${this.state.ResponseClasses[3]}`}></div>
                        </div>
                }

                <div className="clear-left"></div>
            </div>
        )
    }
}

export default RowControls;