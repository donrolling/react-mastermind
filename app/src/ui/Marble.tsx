import React from 'react';
import './GameControls.css';
import { CodeColors } from '../engine/enum/CodeColors';

class Marble extends React.Component {
    public CodeColors: CodeColors;
    public Color: string;

    constructor(CodeColor: CodeColors){
        super(null);
        this.CodeColors = CodeColor;
        this.Color = CodeColor.toString().toLowerCase();
    }

    handleClick(){
    }

    render(){
        return (
            <div className="marble-crater marble-top">
                <div className="marble-crater marble-bottom">
                    <div className={ `marble ${ this.Color }` } onClick={ this.handleClick }></div>
                </div>
            </div>
        )
    }
}

export default Marble;