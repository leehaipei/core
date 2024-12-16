import React from 'react';
import './index.scss'
export default class NoAuthority extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    reset() {
        localStorage.clear()
        window.location.reload()
    }

    render() {
        return (
            <div className='no_authority'>
                {this.props.info}
                <div className='reset' onClick={this.reset}>reset</div>
            </div>
        );
    }
}