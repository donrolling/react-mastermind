import React from 'react';
import './Marble.css';
import { CodeColors } from '../engine/enum/CodeColors';

type MarbleProps = { CodeColor:CodeColors };

class Marble extends React.Component<MarbleProps> {
    _color: string;

    constructor(props: MarbleProps) {
        super(props);
        this._color = CodeColors[this.props.CodeColor];
    }

    handleClick(){
    }

    render(){
        return (
            <div className="marble-crater marble-top">
                <div className="marble-crater marble-bottom">
                    <div className={ `marble ${ this._color }` } onClick={ this.handleClick }></div>
                </div>
            </div>
        )
    }
}

export default Marble;