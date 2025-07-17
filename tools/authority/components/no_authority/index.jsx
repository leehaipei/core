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
        const buttonColor = this.props?.config?.buttonColor;
        return (
            <div className='no_authority'>
                <div className='no_authority_info'>{this.props.info}</div>
                <button className='no_authority_reset' style={{ backgroundColor: buttonColor || '#006FEE' }} onClick={this.reset}>重置</button>
            </div>
        );
    }
}