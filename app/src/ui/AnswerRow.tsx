import React from 'react';
import './GameControls.css';
import Marble from './Marble';
import { Code } from '../engine/model/Code';
import './Row.css';

class AnswerRow extends React.Component<Code> {
    handleSubmit(){}
    
    handleChange(){}

    handleClick(){
        //draw shit
    }

    render(){
        return (
            <div className="mastermind-row">
                <div className="mastermind-row-marbles">
                    <Marble CodeColor={ this.props.One } />
                    <Marble CodeColor={ this.props.Two } />
                    <Marble CodeColor={ this.props.Three } />
                    <Marble CodeColor={ this.props.Four } />
                    <div className="clear-left"></div>
                </div>
            </div>
        )
    }
}

export default AnswerRow;