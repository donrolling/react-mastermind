import React from 'react';
import './Marble.css';
import { CodeColors } from '../engine/enum/CodeColors';

type MarbleProps = { 
    CodeColor: CodeColors,
    ClickCallback: (x: Marble) => void,
    Index: number
};
type MarbleState = { 
    CodeColor: CodeColors,
    ColorClass: string,
    Index: number
};

class Marble extends React.Component<MarbleProps, MarbleState> {
    get CodeColor(): CodeColors {
        return this.state.CodeColor;
    }

    get Index(): number {
        return this.state.Index;
    }

    constructor(props: MarbleProps) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            CodeColor: props.CodeColor,
            ColorClass: CodeColors[props.CodeColor],
            Index: props.Index
        };
    }

    public SetColor(codeColor: CodeColors){
        this.setState({
            CodeColor: codeColor,
            ColorClass: CodeColors[codeColor],
            Index: this.state.Index
        });
    }

    handleClick(){
        if(this.props.ClickCallback){
            this.props.ClickCallback(this);
        }
    }

    render(){
        return (
            <div className="marble-crater marble-top">
                <div className="marble-crater marble-bottom">
                    <div className={ `marble ${ this.state.ColorClass }` } onClick={ this.handleClick }></div>
                </div>
            </div>
        )
    }
}

export default Marble;