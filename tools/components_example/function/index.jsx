import React from 'react';

import './index.scss'

function FunComp(props) {

    const [info, setInfo] = React.useState("I'm function component.")

    const handleClick = () => {
        setInfo("function component clicked!")
    }


    return (
        <div className="fun_comp" onClick={() => handleClick()} >
            {info}
        </div>
    )
}

export default FunComp