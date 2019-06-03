import React from 'react';
import './GameControls.css';
import Marble from './Marble';
import { Code } from '../engine/model/Code';

class AnswerRow extends React.Component {
    constructor(colorCode: Code){
        super(null);
    }

    handleSubmit(){}
    
    handleChange(){}

    handleClick(){
        //draw shit
    }

    render(){
        return (
            <div className="mastermind-row">
                <div className="mastermind-row-marbles">
                    <Marble />
                    <Marble />
                    <Marble />
                    <Marble />                    
                    <div className="clear-left"></div>
                </div>
            </div>
        )
    }
}

export default AnswerRow;