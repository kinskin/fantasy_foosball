import React from 'react';
import Style from './style.scss';

class Lineup extends React.Component{

    render(){

        return(
            <div className='text-center'>
                <div className={Style.contentHeader}>
                    <h1> Hello Lineup </h1>
                </div>
                <div className={Style.contentBody}>
                the line up will be here
                </div>
            </div>
        )
    }
}

export default Lineup;