import React from 'react';
import './Row.css';
import Marble from './Marble';
import RowControls from './RowControls';
import { CodeColors } from '../engine/enum/CodeColors';

class PlayRow extends React.Component {
    handleSubmit(){}
    
    handleChange(){}

    handleClick(){
    }

    render(){
        return (
            <div className="mastermind-row">
                <RowControls />
                
                <div className="mastermind-row-marbles">
                    <Marble CodeColor={ CodeColors.empty } />
                    <Marble CodeColor={ CodeColors.empty } />
                    <Marble CodeColor={ CodeColors.empty } />
                    <Marble CodeColor={ CodeColors.empty } />
                    <div className="clear-left"></div>
                </div>
            </div>
        )
    }
}

export default PlayRow;