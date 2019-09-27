import React from 'react';
import { hot } from 'react-hot-loader';

import Style from './style.scss'
import Navbar from './components/navbar/navbar.jsx'
import Home from './components/home/home.jsx'


class App extends React.Component {

    constructor() {

        super();

        this.state = {
            viewHome: true,
            viewRegistration: false,
            viewScoreboard: false,
            viewLineup: false,
            viewCurrentGame: false
        };
    }

    handleRegister(status){
        console.log('status for handleRegister: ', status)
    }

    handleViewScoreboard(status){
        console.log('status for handleViewScoreboard: ', status)
    }

    handleViewLineup(status){
        console.log('status for handleViewLineup: ', status)
    }

    handleViewCurrentGame(status){
        console.log('status for handleViewCurrentGame:', status)
    }



    render() {


        return (
            <div className='container'>
                <div className={Style.banner}>
                    <p>Foosball</p>
                </div>
                <div className={Style.navbar}>
                    <Navbar
                        handleRegister={(status)=>{this.handleRegister(status)}}
                        handleViewScoreboard={(status)=>{this.handleViewScoreboard(status)}}
                        handleViewLineup={(status)=>{this.handleViewLineup(status)}}
                        handleViewCurrentGame={(status)=>{this.handleViewCurrentGame(status)}}>
                    </Navbar>
                </div>
                <div className={Style.content}>
                    <Home/>
                </div>
            </div>
        );
    }
}

export default hot(module)(App);