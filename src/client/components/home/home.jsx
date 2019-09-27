import React from 'react';
import Style from './style.scss'

class Home extends React.Component{

    render(){

        return(
            <div className='row'>
                <div className='col-4'>
                    <div className={Style.foosball}>
                    </div>
                </div>
                <div className='col-8 text-center'>
                    <div className={Style.contentHeader}>
                        <p>Home</p>
                    </div>
                    <div className={Style.contentBody}>
                        <p>This is a Foosball Scoreboard app</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;