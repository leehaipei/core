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
                <div className='no_authority_info'>{this.props.info}</div>
                <button className='no_authority_reset' onClick={this.reset}>重置</button>
            </div>
        );
    }
}