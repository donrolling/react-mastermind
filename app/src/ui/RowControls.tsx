import React from 'react';
import update from 'immutability-helper';
import './RowControls.css';
import { CodeResponse } from '../engine/model/CodeResponse';
import { ResponseColors } from '../engine/enum/ResponseColors';
import Pegs from './Pegs';

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
            ResponseClasses: [
                `peg ${ResponseColors[ResponseColors.none]}`,
                `peg ${ResponseColors[ResponseColors.none]}`,
                `peg ${ResponseColors[ResponseColors.none]}`,
                `peg ${ResponseColors[ResponseColors.none]}`
            ],
            Complete: false,
            Disabled: true
        };
    }

    public SetResponse(codeResponse: CodeResponse): void {
        console.log('RowControls SetResponse');
        let responses = [
            codeResponse.One,
            codeResponse.Two,
            codeResponse.Three,
            codeResponse.Four
        ];
        let responseClasses = [
            `peg ${ResponseColors[codeResponse.One]}`,
            `peg ${ResponseColors[codeResponse.Two]}`,
            `peg ${ResponseColors[codeResponse.Three]}`,
            `peg ${ResponseColors[codeResponse.Four]}`
        ];
        this.setState({
            Responses: responses,
            ResponseClasses: responseClasses,
            Disabled: false,
            Complete: true
        });
    }

    public Enable(): void {
        this.setState(update(this.state, {
            Disabled: { $set: false }
        }));
    }

    public Complete(): void {
        this.setState(update(this.state, {
            Complete: { $set: true }
        }));
    }

    private submitRow(): void {
        this.props.SubmitRow();
    }

    render() {
        return (
            <div className="mastermind-row-controls">
                {
                    this.state.Disabled || this.state.Complete
                        ? null
                        : <button className='rowGoButton' onClick={this.submitRow}>Go</button>
                }
                {
                    !this.state.Complete
                        ? null
                        : <Pegs ResponseClasses={this.state.ResponseClasses} />
                }

                <div className="clear-left"></div>
            </div>
        )
    }
}

export default RowControls;