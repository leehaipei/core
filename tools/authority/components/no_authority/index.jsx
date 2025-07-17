import React from 'react';
import './index.scss'
export default class NoAuthority extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: false
        }
    }

    reset() {
        this.setState({
            isLoading: true
        }, () => {
            setTimeout(() => {
                localStorage.clear()
                window.location.reload()
            }, 321);
        })
    }

    render() {
        const buttonColor = this.props?.config?.buttonColor || '#006FEE';
        const buttonText = this.props?.config?.buttonText || '#fff';
        const isLoading = this.state.isLoading;

        return (
            <div className='no_authority'>
                <div className='no_authority_info'>{this.props.info}</div>
                <button
                    className={`no_authority_reset ${isLoading ? 'no_authority_reset-loading' : 'no_authority_reset-noloading'}`}
                    style={{ backgroundColor: buttonColor, color: buttonText }}
                    onClick={this.reset.bind(this)}
                    disabled={isLoading}
                >
                    {isLoading ? '重置中...' : '重置'}
                </button>
            </div>
        );
    }
}