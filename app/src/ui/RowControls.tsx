import React from 'react';
import './RowControls.css';

class RowControls extends React.Component {
    handleSubmit(){}
    
    handleChange(){}

    handleClick(){
        //draw shit
    }

    render(){
        return (
            <div className="mastermind-row-controls">
                <button className='rowGoButton'>Go</button>

                <div className="pegs">
                    <div className="peg"></div>
                    <div className="peg"></div>
                    <div className="peg"></div>
                    <div className="peg"></div>
                </div>

                <div className="clear-left"></div>
            </div>
        )
    }
}

export default RowControls;