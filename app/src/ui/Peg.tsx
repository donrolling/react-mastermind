import React from 'react';

type PegProps = {
    PegClass: string;
}

class Peg extends React.Component<PegProps> {
    constructor(props: PegProps) {
        super(props);
    }

    render() {
        return (
            <div className={this.props.PegClass}></div>
        )
    }
}

export default Peg;