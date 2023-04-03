import React from 'react';
import './index.scss'
export default class NoAuthority extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }


    componentDidMount() {
        // require('./index.scss')
    }

    reset() {
        localStorage.clear()
        window.location.reload()
    }

    render() {
        return (
            <div className='no_authority'>
                {this.props.info}
                <p className='reset' onClick={this.reset}>reset</p>
            </div>
        );
    }
}