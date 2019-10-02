import React from 'react';
import { hot } from 'react-hot-loader';

import Style from './style.scss'
import Navbar from './components/navbar/navbar.jsx'
import Home from './components/home/home.jsx'
import Scoreboard from './components/scoreboard/scoreboard.jsx'
import Currentgame from './components/currentgame/currentgame.jsx'
import Lineup from './components/lineup/lineup.jsx'
import Register from './components/register/register.jsx'

class App extends React.Component {

    constructor() {

        super();

        this.state = {
            viewHome: true,
            viewRegistration: false,
            viewScoreboard: false,
            viewLineup: false,
            viewCurrentGame: false,
            initialize: false
        };
    }

    handleHome(status){
        console.log('status for handleHome: ', status)
        this.setState({viewHome: status, viewRegistration: false, viewScoreboard: false, viewLineup: false, viewCurrentGame: false})
    }

    handleRegister(status){
        console.log('status for handleRegister: ', status)
        this.setState({viewHome: false, viewRegistration: status, viewScoreboard: false, viewLineup: false, viewCurrentGame: false})
    }

    handleViewScoreboard(status){
        console.log('status for handleViewScoreboard: ', status)
        this.setState({viewHome: false, viewRegistration: false, viewScoreboard: status, viewLineup: false, viewCurrentGame: false})
    }

    handleViewLineup(status){
        console.log('status for handleViewLineup: ', status)
        this.setState({viewHome: false, viewRegistration: false, viewScoreboard: false, viewLineup: status, viewCurrentGame: false})
    }

    handleViewCurrentGame(status){
        console.log('status for handleViewCurrentGame:', status)
        this.setState({viewHome: false, viewRegistration: false, viewScoreboard: false, viewLineup: false, viewCurrentGame: true})
    }

    handleInitialize(initializeStatus){
        this.setState({initialize: initializeStatus})
    }

    render() {

        let content;
        if(this.state.viewHome === true){
            content = <Home/>
        }
        else if(this.state.viewRegistration === true){
            content = <Register handleInitialize={(initializeStatus)=>{this.handleInitialize(initializeStatus)}}/>
        }
        else if(this.state.viewScoreboard === true){
            content = <Scoreboard/>
        }
        else if(this.state.viewLineup === true){
            content = <Lineup initialize={this.state.initialize}/>
        }
        else if(this.state.viewCurrentGame === true){
            content = <Currentgame/>
        }


        return (
            <div className='container'>
                <div className={Style.banner}>
                    <p>Foosball<br/>Scoreboard</p>
                </div>
                <div className={Style.navbar}>
                    <Navbar
                        handleHome={(status)=>{this.handleHome(status)}}
                        handleRegister={(status)=>{this.handleRegister(status)}}
                        handleViewScoreboard={(status)=>{this.handleViewScoreboard(status)}}
                        handleViewLineup={(status)=>{this.handleViewLineup(status)}}
                        handleViewCurrentGame={(status)=>{this.handleViewCurrentGame(status)}}>
                    </Navbar>
                </div>
                <div className={Style.content}>
                    {content}
                </div>
            </div>
        );
    }
}

export default hot(module)(App);