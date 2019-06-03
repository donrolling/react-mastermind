import React from 'react';
import './GameControls.css';
import Marble from './Marble';
import RowControls from './RowControls';

class PlayRow extends React.Component {
    handleSubmit(){}
    
    handleChange(){}

    handleClick(){
        //draw shit
    }

    render(){
        return (
            <div className="mastermind-row">
                <RowControls />
                
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

export default PlayRow;