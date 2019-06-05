import React from 'react';
import './RowControls.css';
import { CodeResponse } from '../engine/model/CodeResponse';
import { ResponseColors } from '../engine/enum/ResponseColors';

type RowControlsProps = {
    SubmitRow: () => void;
    Responses: ResponseColors[] | undefined;
}
type RowControlsState = {
    Responses: ResponseColors[];
    ResponseClasses: string[];
}

class RowControls extends React.Component<RowControlsProps, RowControlsState> {
    constructor(props: RowControlsProps) {
        super(props);
        this.submitRow = this.submitRow.bind(this);
        if(props.Responses){
            this.state = {
                Responses: props.Responses,
                ResponseClasses: [ResponseColors[props.Responses[0]], ResponseColors[props.Responses[1]], ResponseColors[props.Responses[2]], ResponseColors[props.Responses[3]]]
            };    
        } else {
            this.state = {
                Responses: [ResponseColors.none, ResponseColors.none, ResponseColors.none, ResponseColors.none],
                ResponseClasses: [ResponseColors[ResponseColors.none], ResponseColors[ResponseColors.none], ResponseColors[ResponseColors.none], ResponseColors[ResponseColors.none]]
            };    
        }
    }

    public SetResponse(x: CodeResponse): void {
        this.setState(
            {
                Responses: [
                    x.One, 
                    x.Two, 
                    x.Three, 
                    x.Four
                ],
                ResponseClasses: [
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
                    <div className={`peg ${this.state.ResponseClasses[0]}`}></div>
                    <div className={`peg ${this.state.ResponseClasses[1]}`}></div>
                    <div className={`peg ${this.state.ResponseClasses[2]}`}></div>
                    <div className={`peg ${this.state.ResponseClasses[3]}`}></div>
                </div>

                <div className="clear-left"></div>
            </div>
        )
    }
}

export default RowControls;