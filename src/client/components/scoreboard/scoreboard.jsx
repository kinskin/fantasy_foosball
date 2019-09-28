import React from 'react';
import Style from './style.scss';

class Scoreboard extends React.Component{

    render(){

        return(
            <div className='text-center'>
                <div className={Style.contentHeader}>
                    <h1> Hello Scoreboard </h1>
                </div>
                <div className={Style.contentBody}>
                    the score board will be here
                </div>
            </div>
        )
    }
}

export default Scoreboard;