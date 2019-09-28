import React from 'react';
import Style from './style.scss'

class Navbar extends React.Component{


    handleHome(){
        this.props.handleHome(true)
    }

    handleRegister(){
        this.props.handleRegister(true);
    }

    handleViewScoreboard(){
        this.props.handleViewScoreboard(true)
    }

    handleViewLineup(){
        this.props.handleViewLineup(true);
    }

    handleViewCurrentGame(){
        this.props.handleViewCurrentGame(true);
    }

    render(){


        return(
            <div className={Style.navbar}>
                <p className='btn btn-md' onClick={()=>{this.handleHome()}}>Home</p>
                ||
                <p className='btn btn-md' onClick={()=>{this.handleRegister()}}>Register team / View team</p>
                ||
                <p className='btn btn-md' onClick={()=>{this.handleViewLineup()}}>Line up</p>
                ||
                <p className='btn btn-md' onClick={()=>{this.handleViewCurrentGame()}}>Current game</p>
                ||
                 <p className='btn btn-md' onClick={()=>{this.handleViewScoreboard()}}>Scoreboard</p>
            </div>
        )
    }
}

export default Navbar;