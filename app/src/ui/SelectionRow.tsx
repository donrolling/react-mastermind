import React from 'react';
import './GameControls.css';
import Marble from './Marble';
import './Row.css';
import { CodeColors } from '../engine/enum/CodeColors';

type SelectionRowProps = {
    SelectionCallback: (x: CodeColors) => void;
}

type SelectionRowState = {
    ShowHideClass: string;
}

class SelectionRow extends React.Component<SelectionRowProps, SelectionRowState> {    
    constructor(props: SelectionRowProps){
        super(props);
        this.setSelectedColor = this.setSelectedColor.bind(this);
        this.state = { ShowHideClass: 'hide' }
    }

    private hide() {
        this.setState({ ShowHideClass: 'hide' });
    }

    private show() {
        this.setState({ ShowHideClass: '' });
    }

    public SelectColor(){
        this.show();
    }

    setSelectedColor(x: Marble){
        this.props.SelectionCallback(x.CodeColor);
        this.hide();
    }

    render(){
        return (
            <div className={ `mastermind-selection-row ${ this.state.ShowHideClass }` }>
                <Marble CodeColor={ CodeColors.yellow } ClickCallback={ this.setSelectedColor } Index={0} />
                <Marble CodeColor={ CodeColors.purple } ClickCallback={ this.setSelectedColor } Index={1} />
                <Marble CodeColor={ CodeColors.orange } ClickCallback={ this.setSelectedColor } Index={2} />
                <Marble CodeColor={ CodeColors.red } ClickCallback={ this.setSelectedColor } Index={3} />
                <Marble CodeColor={ CodeColors.green } ClickCallback={ this.setSelectedColor } Index={4} />
                <Marble CodeColor={ CodeColors.white } ClickCallback={ this.setSelectedColor } Index={5} />
            </div>
        )
    }
}

export default SelectionRow;