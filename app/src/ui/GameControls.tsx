import React from 'react';
import './GameControls.css';

type GameControlsProps = {
    StartGame: () => void;
}

export class GameControls extends React.Component<GameControlsProps> {
    private _gameType: string = '1';

    constructor(props: GameControlsProps){
        super(props);
        this.handleGameTypeChange = this.handleGameTypeChange.bind(this);
        this.handleStartClick = this.handleStartClick.bind(this);
    }

    handleGameTypeChange(event: React.ChangeEvent){
        console.log(event.target.nodeValue);
        this._gameType = event.target.nodeValue;
    }

    handleStartClick(){
        this.props.StartGame();
    }

    render(){
        return (
            <div className="gameControls" >
                <h3>MASTERMIND</h3>
                <form id="gameOptions">
                    <input type="radio" name="gameType" value="1" checked onChange={ this.handleGameTypeChange } /> VS Computer
                    <input type="radio" name="gameType" value="2" onChange={ this.handleGameTypeChange } /> VS User
                </form>
                <div className="start-button">
                    <button type="button" id="startButton" onClick={ this.handleStartClick }>Start</button>
                </div>
            </div>
        )
    }
}

export default GameControls;