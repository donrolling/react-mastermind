import React from 'react';
import './GameControls.css';

export class GameControls extends React.Component {
    private _method: () => void;    
    
    constructor(props: any){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleSubmit(){}
    
    handleChange(){}

    handleClick(){
        var s: any = this.props.children;
        s();
    }

    render(){
        return (
            <div className="gameControls" >
                <h3>MASTERMIND</h3>
                <form id="gameOptions" onSubmit={this.handleSubmit}>
                    <input type="radio" name="gametype" value="1" checked onChange={this.handleChange} /> VS Computer
                    <input type="radio" name="gametype" value="2" onChange={this.handleChange} /> VS User
                </form>
                <div className="start-button">
                    <button type="button" id="startButton" onClick={this.handleClick}>Start</button>
                </div>
            </div>
        )
    }
}

export default GameControls;