import React from 'react';
import './GameControls.css';

class Marble extends React.Component {
    handleClick(){
    }

    render(){
        return (
            <div className="marble-crater marble-top">
                <div className="marble-crater marble-bottom">
                    <div className="marble empty" onClick={this.handleClick}></div>
                </div>
            </div>
        )
    }
}

export default Marble;