import React from 'react';
import Peg from './Peg';

type PegsProps = {
    ResponseClasses: string[];
}

class Pegs extends React.Component<PegsProps> {
    constructor(props: PegsProps) {
        super(props);
        if(!props.ResponseClasses || props.ResponseClasses.length < 4 || props.ResponseClasses.length > 4){
            throw new Error(`ResponseClasses was not valid: ${ props.ResponseClasses }`);
        }
    }

    render() {
        return (
            <div className="pegs">
                <Peg PegClass={this.props.ResponseClasses[0]} />
                <Peg PegClass={this.props.ResponseClasses[1]} />
                <Peg PegClass={this.props.ResponseClasses[2]} />
                <Peg PegClass={this.props.ResponseClasses[3]} />
            </div>
        )
    }
}

export default Pegs;