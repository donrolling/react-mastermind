import React from 'react';
import './GameControls.css';
import './Row.css';

type GameOverProps = {
    Win: boolean,
    NumberOfTurns: number
}

type GameOverState = {
    PanelClass: string
    Message: string
}

class GameOver extends React.Component<GameOverProps, GameOverState> {
    constructor(props: GameOverProps) {
        super(props);
        this.state = {
            PanelClass: props.Win ? 'win' : 'lose',
            Message: props.Win ? `You won in ${this.props.NumberOfTurns} turns, great!` : `You lost after ${this.props.NumberOfTurns} turns. Try again!`
        }
    }

    render() {
        return (
            <div className={`gameOverPanel ${this.state}`} >
                <p>{this.state.Message}</p>
            </div>
        )
    }
}

export default GameOver;