import React from 'react';
import './RowControls.css';
import { CodeResponse } from '../engine/model/CodeResponse';
import { ResponseColors } from '../engine/enum/ResponseColors';

type RowControlsProps = {
    SubmitRow: () => void;
}
type RowControlsState = {
    Responses: string[];
}

class RowControls extends React.Component<RowControlsProps, RowControlsState> {
    constructor(props: RowControlsProps) {
        super(props);
        this.submitRow = this.submitRow.bind(this);
        let emptyResponse = ResponseColors[ResponseColors.none];
        this.state = {
            Responses: [emptyResponse, emptyResponse, emptyResponse, emptyResponse]
        };
    }

    public SetResponse(x: CodeResponse): void {
        this.setState(
            {
                Responses: [
                    ResponseColors[x.One], 
                    ResponseColors[x.Two], 
                    ResponseColors[x.Three], 
                    ResponseColors[x.Four]
                ]
            }
        );
    }

    submitRow(): void {
        this.props.SubmitRow();
    }

    render() {
        return (
            <div className="mastermind-row-controls">
                <button className='rowGoButton' onClick={this.submitRow}>Go</button>

                <div className="pegs">
                    <div className={`peg ${this.state.Responses[0]}`}></div>
                    <div className={`peg ${this.state.Responses[1]}`}></div>
                    <div className={`peg ${this.state.Responses[2]}`}></div>
                    <div className={`peg ${this.state.Responses[3]}`}></div>
                </div>

                <div className="clear-left"></div>
            </div>
        )
    }
}

export default RowControls;