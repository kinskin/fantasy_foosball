import React from 'react';
import Style from './style.scss';

class Currentgame extends React.Component{

    render(){

        return(
            <div className='text-center'>
                <div className={Style.contentHeader}>
                    <h1> Hello Currentgame </h1>
                </div>
                <div className={Style.contentBody}>
                the current game counter will be here
                </div>
            </div>
        )
    }
}

export default Currentgame;