import React from 'react';

import RightClick from '@/right_click';

import "./index.scss"

export default class ClassComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            info: "I'm class component."
        }
    }


    componentDidMount() {
        this.righter = new RightClick('.class_comp', <RightMenus />);
    }


    render() {
        const { info } = this.state
        return (
            <div className='class_comp'>
                {info}
            </div>
        );
    }
}




class RightMenus extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menuList: [
                { label: '一', value: '1' },
                { label: '二', value: '2' },
                { label: '三', value: '3' }
            ]
        }
    }



    render() {
        return (
            <div className='right_menus' >
                {
                    this.state.menuList.map(item => <div key={item.value} onClick={() => { console.log(item) }} >{item.label}</div>)
                }
            </div>
        );
    }
}