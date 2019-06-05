import React from 'react';
import './GameControls.css';
import Marble from './Marble';
import { Code } from '../engine/model/Code';
import './Row.css';

class AnswerRow extends React.Component<Code> {
    render(){
        return (
            <div className="mastermind-row">
                <div className="mastermind-row-marbles">
                    <Marble CodeColor={ this.props.One } ClickCallback={ null } />
                    <Marble CodeColor={ this.props.Two } ClickCallback={ null } />
                    <Marble CodeColor={ this.props.Three } ClickCallback={ null } />
                    <Marble CodeColor={ this.props.Four } ClickCallback={ null } />
                    <div className="clear-left"></div>
                </div>
            </div>
        )
    }
}

export default AnswerRow;